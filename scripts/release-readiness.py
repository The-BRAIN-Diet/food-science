"""Run from the candidate root: python3 scripts/release-readiness.py NEW_OUTPUT_DIRECTORY.
All generators, tests and the standard release build run in a disposable local clone.
A successful execution still requires review of the baseline diff and scientific deltas.
"""
import hashlib, json, os, re, subprocess, sys, tempfile
from pathlib import Path

root = Path.cwd()
out = Path(sys.argv[1]).resolve()
out.mkdir(parents=True, exist_ok=False)
def git(*args):
    return subprocess.check_output(['git', *args], cwd=root, text=True).strip()
remote = git('remote','get-url','github')
baseline = git('ls-remote',remote,'refs/heads/main').split()[0]
(out/'baseline.txt').write_text(baseline+'\n')
os.environ.update(SEC_BASE_REF='ebbc10ed11484192c972952d8c47645bd3c5bf4e', NODE_OPTIONS='--max-old-space-size=4096', TERSER_PARALLEL='1', DOCUSAURUS_NO_PERSISTENT_CACHE='1')
results = {}
inputs = json.loads((out.parent/'reconciled-inputs.sha256.json').read_text())
plan = json.loads((out.parent/'sync-plan.json').read_text())['paths']
reviewed = {p for p,status in plan.items() if status=='requires reconciliation'}
if reviewed != set(inputs):
    raise ValueError('Reconciliation manifest does not cover the approved path set')
drift = [p for p in inputs if not (root/p).is_file() or hashlib.sha256((root/p).read_bytes()).hexdigest()!=inputs[p]]
(out/'reconciled-paths.json').write_text(json.dumps({'reviewed':sorted(reviewed),'changed_since_review':drift},indent=2))
results['reconciled-paths']=int(bool(drift))
def check(name, args):
    with (out/(name+'.log')).open('w') as log:
        ret = subprocess.run(args,cwd=work,stdout=log,stderr=subprocess.STDOUT)
    results[name] = ret.returncode
    (out/'checks.json').write_text(json.dumps(results,indent=2)+'\n')
    return ret.returncode
with tempfile.TemporaryDirectory(prefix='brain-readiness-') as tmp:
    work = Path(tmp)/'candidate'
    subprocess.run(['git','clone','--quiet','--shared','--no-checkout',str(root),str(work)],check=True)
    subprocess.run(['git','reset','--mixed',git('rev-parse','HEAD')],cwd=work,check=True,stdout=subprocess.DEVNULL)
    subprocess.run(['rsync','-a','--exclude=/.git','--exclude=/node_modules',str(root)+'/',str(work)+'/'],check=True)
    (work/'node_modules').symlink_to((root/'node_modules').resolve())
    # Stage only in the disposable clone to include previously untracked candidate files.
    subprocess.run(['git','add','-A', '--', '.'],cwd=work,check=True)
    subprocess.run(['git','fetch','--quiet','--no-tags',remote,baseline],cwd=work,check=True)
    check('manifest',['git','diff','--cached','--name-status',baseline])
    check('publication-diff',['git','diff','--cached','--no-ext-diff',baseline,'--','docs','src','registry','system','static','netlify.toml'])
    config=(work/'src/data/inputMappingScopes.mjs').read_text()
    imports=dict(re.findall(r"import\s+(\w+)\s+from\s+'(\./[^']+)'",config))
    bindings=re.search(r'export default\s*\{([^}]+)\}',config)[1]
    scopes={}
    for pair in bindings.split(','):
        key,binding=pair.strip().split(':')
        scopes[key.strip("' ")] = work/'src/data'/imports[binding.strip()]
    expected={}
    for p in (work/'docs/biological-targets').rglob('*.md*'):
        m=re.search(r'^pm_id: *(\S+)\s*$',p.read_text().split('---',2)[1] if p.read_text().startswith('---') else '',re.M)
        if m:
            pm=m[1].strip("'\u0022"); scope=re.split(r'[-(]',pm,1)[0] if not pm.startswith('BRS-X') else 'BRS-X'
            expected.setdefault(scope,[]).append(pm)
    details={}
    for scope,p in scopes.items():
        check('generate-'+scope,['node','scripts/generate-input-substance-food.mjs','--brs',scope])
        data=json.loads(p.read_text())
        ids=data['pilot_pms']
        details[scope]={'expected':sorted(expected.get(scope,[])), 'generated':sorted(ids),'relationships':len(data['relationships'])}
        results['coverage-'+scope]=int(sorted(ids)!=sorted(expected.get(scope,[])) or data['scope']!=scope or len(set(ids))!=len(ids) or any(r['pm'] not in ids for r in data['relationships']))
    results['configured-scope-set']=int(set(expected)!=set(scopes))
    (out/'scopes.json').write_text(json.dumps(details,indent=2))
    check('ranked-provenance',['node','scripts/generate-ranked-food-sources.mjs'])
    check('explorer',['node','scripts/build-pm-explorer-sources.mjs'])
    explorer= json.loads((work/'static/explore/pm-explorer/pm-sources.json').read_text())
    for scope,d in details.items():
        ids=[p['id'] for p in explorer['pms'] if p['id'] in d['expected']]
        results['explorer-'+scope]=int(sorted(ids)!=d['expected'])
    check('projection-audit',['node','scripts/release-projection-audit.mjs',baseline,str(out)])
    check('ledger-and-protocols',['node','--test','scripts/food-wheel-evidence-ledger.test.mjs','scripts/exact-child-mapping.test.mjs'])
    check('generated-drift',['git','diff','--exit-code','--stat','--','static','src/data','system/generated','docs'])
    focused='citrus-pectin-integration pm4-resistant-starch pectin-sulforaphane-sources compact-pm-explorer cross-brs-dietary-recovery canonical-scientific-projections intervention-food-substance'.split()
    check('focused',['node','--test',*['scripts/'+n+'.test.mjs' for n in focused]])
    for task in ['substance:validate','bib:validate','nutrition:validate','dietary-inputs:check','findings:check','sec:check','mechanisms:validate','presentation:check','test:composition-provenance','test:substance-schema','test:input-substance-food','test:recipe-nutrition','build']:
        check(task.replace(':','-'),['npm','run',task])
print('Human release review required. Results:',out)
sys.exit(int(any(results.values())))

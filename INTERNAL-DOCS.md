# Local-only Training and QA

Training modules and the QA Registry are deliberately **untracked**. They must not be committed or pushed to GitHub.

They load only when Docusaurus sees:

```bash
INCLUDE_INTERNAL_DOCS=true
```

Store that flag in `.env.local` (gitignored):

```bash
INCLUDE_INTERNAL_DOCS=true
```

Then run `npm start`. That script sets `INCLUDE_INTERNAL_DOCS=true`, so Training and the QA Registry appear in the local sidebar when those untracked files exist on disk.

Without the flag, `npm run build` ignores those directories and succeeds even if they are absent. Do not put local-only files under `static/`.

Generate the local QA dataset with `npm run qc:generate` when you need the review queue.

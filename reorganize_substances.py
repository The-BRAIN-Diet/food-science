#!/usr/bin/env python3
"""
Script to reorganize substances folder structure according to the official ontology.
Moves files to new locations based on their classification.
"""

import shutil
from pathlib import Path
import re
from typing import Dict, List, Tuple

# Base directory
BASE_DIR = Path("docs/substances")

# Mapping of current files to new locations based on their tags and content
# Format: (current_path, new_path_relative_to_substances)
FILE_MAPPINGS = {
    # ===== NUTRIENTS =====
    
    # Macronutrients - Amino Acids
    "nutrients/leucine.md": "nutrients/macronutrients/amino-acids/essential/leucine.md",
    "nutrients/lysine.md": "nutrients/macronutrients/amino-acids/essential/lysine.md",
    "nutrients/threonine.md": "nutrients/macronutrients/amino-acids/essential/threonine.md",
    "nutrients/histidine.md": "nutrients/macronutrients/amino-acids/essential/histidine.md",
    "nutrients/isoleucine.md": "nutrients/macronutrients/amino-acids/essential/isoleucine.md",
    "nutrients/methionine.md": "nutrients/macronutrients/amino-acids/essential/methionine.md",
    "nutrients/phenylalanine.md": "nutrients/macronutrients/amino-acids/essential/phenylalanine.md",
    "nutrients/tryptophan.md": "nutrients/macronutrients/amino-acids/essential/tryptophan.md",
    "nutrients/valine.md": "nutrients/macronutrients/amino-acids/essential/valine.md",
    
    "nutrients/tyrosine.md": "nutrients/macronutrients/amino-acids/conditionals/tyrosine.md",
    "nutrients/glycine.md": "nutrients/macronutrients/amino-acids/conditionals/glycine.md",
    
    # Note: Tryptophan and Tyrosine are also neuroactive, but we'll keep them in their primary category
    
    # Macronutrients - Fatty Acids
    "nutrients/ala-alpha-linolenic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-3/ala-alpha-linolenic-acid.md",
    "nutrients/epa-eicosapentaenoic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-3/epa-eicosapentaenoic-acid.md",
    "nutrients/dha-docosahexaenoic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-3/dha-docosahexaenoic-acid.md",
    "nutrients/dpa-docosapentaenoic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-3/dpa-docosapentaenoic-acid.md",
    "nutrients/omega-3.md": "nutrients/macronutrients/fatty-acids/pufas/omega-3/omega-3.md",
    
    "nutrients/linoleic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-6/linoleic-acid.md",
    "nutrients/arachidonic-acid.md": "nutrients/macronutrients/fatty-acids/pufas/omega-6/arachidonic-acid.md",
    
    "nutrients/capric-triglyceride.md": "nutrients/macronutrients/fatty-acids/saturated/capric-triglyceride.md",
    "nutrients/caproic-triglyceride.md": "nutrients/macronutrients/fatty-acids/saturated/caproic-triglyceride.md",
    "nutrients/caprylic-triglyceride.md": "nutrients/macronutrients/fatty-acids/saturated/caprylic-triglyceride.md",
    "nutrients/mct-medium-chain-triglycerides.md": "nutrients/macronutrients/fatty-acids/saturated/mct-medium-chain-triglycerides.md",
    
    # Macronutrients - Phospholipids (moved to bioactive compounds later, but keeping here for now)
    "nutrients/phosphatidylcholine.md": "nutrients/macronutrients/fatty-acids/phospholipids/phosphatidylcholine.md",
    "nutrients/phosphatidylethanolamine.md": "nutrients/macronutrients/fatty-acids/phospholipids/phosphatidylethanolamine.md",
    "nutrients/phosphatidylserine.md": "nutrients/macronutrients/fatty-acids/phospholipids/phosphatidylserine.md",
    
    # Micronutrients - Vitamins
    "nutrients/vitamin-a.md": "nutrients/micronutrients/vitamins/vitamin-a.md",
    "nutrients/vitamin-b1.md": "nutrients/micronutrients/vitamins/vitamin-b1.md",
    "nutrients/vitamin-b2.md": "nutrients/micronutrients/vitamins/vitamin-b2.md",
    "nutrients/vitamin-b3.md": "nutrients/micronutrients/vitamins/vitamin-b3.md",
    "nutrients/vitamin-b5.md": "nutrients/micronutrients/vitamins/vitamin-b5.md",
    "nutrients/vitamin-b6.md": "nutrients/micronutrients/vitamins/vitamin-b6.md",
    "nutrients/vitamin-b9.md": "nutrients/micronutrients/vitamins/vitamin-b9.md",
    "nutrients/vitamin-b12.md": "nutrients/micronutrients/vitamins/vitamin-b12.md",
    "nutrients/vitamin-c.md": "nutrients/micronutrients/vitamins/vitamin-c.md",
    "nutrients/vitamin-d.md": "nutrients/micronutrients/vitamins/vitamin-d.md",
    "nutrients/vitamin-e.md": "nutrients/micronutrients/vitamins/vitamin-e.md",
    "nutrients/vitamin-k2.md": "nutrients/micronutrients/vitamins/vitamin-k2.md",
    
    # Micronutrients - Minerals
    "nutrients/calcium.md": "nutrients/micronutrients/minerals/macro/calcium.md",
    "nutrients/magnesium.md": "nutrients/micronutrients/minerals/macro/magnesium.md",
    "nutrients/potassium.md": "nutrients/micronutrients/minerals/macro/potassium.md",
    "nutrients/sodium.md": "nutrients/micronutrients/minerals/macro/sodium.md",
    
    "nutrients/zinc.md": "nutrients/micronutrients/minerals/trace/zinc.md",
    "nutrients/copper.md": "nutrients/micronutrients/minerals/trace/copper.md",
    "nutrients/iron.md": "nutrients/micronutrients/minerals/trace/iron.md",
    "nutrients/manganese.md": "nutrients/micronutrients/minerals/trace/manganese.md",
    "nutrients/selenium.md": "nutrients/micronutrients/minerals/trace/selenium.md",
    "nutrients/iodine.md": "nutrients/micronutrients/minerals/trace/iodine.md",
    
    # ===== BIOACTIVE COMPOUNDS =====
    
    # Polyphenols - Flavonoids
    "bioactive-substances/quercetin.md": "bioactive-compounds/polyphenols/flavonols/quercetin.md",
    "bioactive-substances/egcg.md": "bioactive-compounds/polyphenols/flavan-3-ols/egcg.md",
    "bioactive-substances/genistein.md": "bioactive-compounds/polyphenols/isoflavones/genistein.md",
    
    # Polyphenols - Secoiridoids (olive oil)
    "bioactive-substances/oleuropein.md": "bioactive-compounds/polyphenols/secoiridoids/oleuropein.md",
    "bioactive-substances/oleocanthal.md": "bioactive-compounds/polyphenols/secoiridoids/oleocanthal.md",
    "bioactive-substances/oleacein.md": "bioactive-compounds/polyphenols/secoiridoids/oleacein.md",
    "bioactive-substances/tyrosol.md": "bioactive-compounds/polyphenols/phenolic-acids/tyrosol.md",
    "bioactive-substances/hydroxytyrosol.md": "bioactive-compounds/polyphenols/phenolic-acids/hydroxytyrosol.md",
    
    # Carotenoids
    "bioactive-substances/beta-carotene.md": "bioactive-compounds/carotenoids/beta-carotene.md",
    "bioactive-substances/lycopene.md": "bioactive-compounds/carotenoids/lycopene.md",
    "bioactive-substances/lutein.md": "bioactive-compounds/carotenoids/lutein.md",
    "bioactive-substances/zeaxanthin.md": "bioactive-compounds/carotenoids/zeaxanthin.md",
    
    # Terpenes
    "bioactive-substances/cinnamaldehyde.md": "bioactive-compounds/terpenes/phenylpropanoids/cinnamaldehyde.md",
    "bioactive-substances/saffron.md": "bioactive-compounds/terpenes/monoterpenes/saffron.md",
    
    # Lipid-Based Compounds
    "bioactive-substances/coq10.md": "bioactive-compounds/lipid-based/coq10.md",
    "bioactive-substances/creatine.md": "bioactive-compounds/lipid-based/creatine.md",
    
    # Choline & Methylation
    "bioactive-substances/choline.md": "bioactive-compounds/choline-methylation/choline.md",
    
    # Alkaloids
    "bioactive-substances/berberine.md": "bioactive-compounds/alkaloids/berberine.md",
    "bioactive-substances/l-theanine.md": "bioactive-compounds/alkaloids/l-theanine.md",
    
    # Other bioactive
    "bioactive-substances/curcumin.md": "bioactive-compounds/polyphenols/curcuminoids/curcumin.md",
    "bioactive-substances/taurine.md": "bioactive-compounds/taurine.md",
    
    # ===== METABOLITES =====
    
    # Microbial Metabolites - SCFAs
    "metabolites/butyrate.md": "microbial-metabolites/scfas/butyrate.md",
    "metabolites/propionate.md": "microbial-metabolites/scfas/propionate.md",
    "metabolites/acetate.md": "microbial-metabolites/scfas/acetate.md",
    "metabolites/scfas.md": "microbial-metabolites/scfas/scfas.md",
    
    # Secondary plant metabolite conversions
    "metabolites/urolithin-a.md": "microbial-metabolites/secondary-plant-conversions/urolithin-a.md",
}

def read_frontmatter(file_path: Path) -> Dict:
    """Read frontmatter from a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n', content, re.DOTALL)
    if not frontmatter_match:
        return {}
    
    frontmatter_text = frontmatter_match.group(1)
    frontmatter = {}
    
    for line in frontmatter_text.split('\n'):
        line = line.strip()
        if ':' in line and not line.startswith('  '):
            parts = line.split(':', 1)
            key = parts[0].strip()
            value = parts[1].strip() if len(parts) > 1 else ''
            if key and value:
                frontmatter[key] = value
    
    return frontmatter

def create_index_file(dir_path: Path, title: str, description: str = ""):
    """Create an index.md file for a directory."""
    index_path = dir_path / "index.md"
    if index_path.exists():
        return
    
    content = f"""---
title: {title}
sidebar_label: {title}
description: {description}
tags:
  - Area
---

# {title}

{description}
"""
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)

def main():
    """Main function to reorganize substances."""
    print("Reorganizing substances folder structure...\n")
    
    # Create all necessary directories
    for new_path in FILE_MAPPINGS.values():
        target_dir = BASE_DIR / Path(new_path).parent
        target_dir.mkdir(parents=True, exist_ok=True)
    
    # Move files
    moved_count = 0
    skipped_count = 0
    
    for old_path_str, new_path_str in FILE_MAPPINGS.items():
        old_path = BASE_DIR / old_path_str
        new_path = BASE_DIR / new_path_str
        
        if not old_path.exists():
            print(f"⚠️  Skipping (not found): {old_path_str}")
            skipped_count += 1
            continue
        
        if new_path.exists():
            print(f"⚠️  Skipping (target exists): {new_path_str}")
            skipped_count += 1
            continue
        
        # Move the file
        shutil.move(str(old_path), str(new_path))
        print(f"✓ Moved: {old_path_str} → {new_path_str}")
        moved_count += 1
    
    # Create index files for major directories
    create_index_file(
        BASE_DIR / "nutrients" / "macronutrients" / "amino-acids",
        "Amino Acids",
        "Essential and conditional amino acids"
    )
    create_index_file(
        BASE_DIR / "nutrients" / "macronutrients" / "fatty-acids",
        "Fatty Acids",
        "Saturated, monounsaturated, and polyunsaturated fatty acids"
    )
    create_index_file(
        BASE_DIR / "nutrients" / "micronutrients" / "vitamins",
        "Vitamins",
        "Essential vitamins"
    )
    create_index_file(
        BASE_DIR / "nutrients" / "micronutrients" / "minerals",
        "Minerals",
        "Macro and trace minerals"
    )
    create_index_file(
        BASE_DIR / "bioactive-compounds" / "polyphenols",
        "Polyphenols",
        "Flavonoids and non-flavonoid polyphenols"
    )
    create_index_file(
        BASE_DIR / "microbial-metabolites" / "scfas",
        "Short-Chain Fatty Acids",
        "SCFAs produced by gut microbiota"
    )
    
    print(f"\n✅ Completed!")
    print(f"   Moved: {moved_count} files")
    print(f"   Skipped: {skipped_count} files")
    print(f"\n⚠️  Note: You may need to update the main substances/index.md file")
    print(f"   to reflect the new structure.")

if __name__ == "__main__":
    main()

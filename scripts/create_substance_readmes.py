#!/usr/bin/env python3
"""
Script to create README.md files for all folders in docs/substances/.
"""

import re
from pathlib import Path

SUBSTANCES_DIR = Path("docs/substances")

# Tag mapping for folder names to TagList tags
FOLDER_TAG_MAP = {
    "bioactive-compounds": "Bioactive",
    "polyphenols": "Polyphenol",
    "flavonols": "Flavonol",
    "flavan-3-ols": "Flavan-3-Ol",
    "curcuminoids": "Curcuminoid",
    "phenolic-acids": "Phenolic-Acid",
    "isoflavones": "Isoflavone",
    "secoiridoids": "Secoiridoid",
    "carotenoids": "Carotenoid",
    "alkaloids": "Alkaloid",
    "terpenes": "Terpene",
    "monoterpenes": "Monoterpene",
    "phenylpropanoids": "Phenylpropanoid",
    "choline-methylation": "Choline",
    "lipid-based": "Lipid",
    "nutrients": "Nutrient",
    "amino-acids": "Amino-Acid",
    "essential": "Essential-Amino-Acid",
    "conditionals": "Nonessential-Amino-Acid",
    "fatty-acids": "Fatty-Acid",
    "pufas": "Pufa",
    "omega-3": "Omega-3",
    "omega-6": "Omega-6",
    "saturated": "Saturated-Fat",
    "phospholipids": "Phospholipid",
    "vitamins": "Vitamin",
    "minerals": "Mineral",
    "macro": "Mineral",
    "trace": "Mineral",
    "microbial-metabolites": "Metabolite",
    "scfas": "Scfa",
    "secondary-plant-conversions": "Postbiotic",
}


def format_folder_name(folder_name: str) -> str:
    """
    Format folder name for title (capitalize each word, keep hyphens).
    Example: omega-3 → Omega-3, amino-acids → Amino-acids
    """
    # Split by hyphens and underscores, capitalize each part
    parts = re.split(r'[-_]', folder_name)
    formatted = '-'.join(word.capitalize() for word in parts)
    return formatted


def get_tag_for_folder(folder_path: Path) -> str:
    """
    Get the appropriate tag for a folder based on its path.
    Returns the most specific tag available, or falls back to a generic one.
    """
    # Check folder name first
    folder_name = folder_path.name
    if folder_name in FOLDER_TAG_MAP:
        return FOLDER_TAG_MAP[folder_name]
    
    # Check parent folders
    for parent in folder_path.parents:
        if parent.name in FOLDER_TAG_MAP:
            return FOLDER_TAG_MAP[parent.name]
    
    # Default fallback
    return "Substance"


def create_readme_for_folder(folder_path: Path):
    """
    Create README.md file in the given folder.
    """
    folder_name = folder_path.name
    title = format_folder_name(folder_name)
    tag = get_tag_for_folder(folder_path)
    
    content = f"""---
title: {title}
description: Auto-generated category page for {folder_name} in The BRAIN Diet ontology.
---

<TagList tag="{tag}" filter="substances" />
"""
    
    readme_path = folder_path / "README.md"
    with open(readme_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return readme_path


def main():
    """
    Main function to create README.md files for all folders.
    """
    if not SUBSTANCES_DIR.exists():
        print(f"Substances directory not found: {SUBSTANCES_DIR}")
        return
    
    # Find all directories in docs/substances/**
    directories = [d for d in SUBSTANCES_DIR.rglob("*") if d.is_dir()]
    
    # Filter out .cursor and other hidden/system directories
    directories = [d for d in directories if not d.name.startswith('.') and '.cursor' not in str(d)]
    
    print(f"Found {len(directories)} directories")
    print("Creating README.md files...\n")
    
    created_count = 0
    
    for directory in sorted(directories):
        readme_path = create_readme_for_folder(directory)
        rel_path = readme_path.relative_to(Path("."))
        print(f"✓ Created: {rel_path}")
        created_count += 1
    
    print(f"\n✅ Completed! Created {created_count} README.md files.")


if __name__ == "__main__":
    main()

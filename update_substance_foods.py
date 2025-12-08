#!/usr/bin/env python3
"""
Update all substance pages to use SubstanceFoods component instead of TagList for foods.
"""

import os
import re
from pathlib import Path

def update_substance_foods(file_path):
    """Update a single substance file to use SubstanceFoods component."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match TagList with filter="foods"
        # Matches: <TagList tag="..." filter="foods" />
        pattern = r'<TagList\s+tag="([^"]+)"\s+filter="foods"\s*/>'
        
        # Replace with SubstanceFoods
        replacement = r'<SubstanceFoods tag="\1" />'
        
        new_content = re.sub(pattern, replacement, content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    """Update all substance pages."""
    base_dir = Path("docs/substances")
    
    if not base_dir.exists():
        print(f"Directory {base_dir} does not exist")
        return
    
    updated_count = 0
    total_count = 0
    
    # Find all .md files in substances directory
    for md_file in base_dir.rglob("*.md"):
        total_count += 1
        if update_substance_foods(md_file):
            updated_count += 1
            print(f"Updated: {md_file}")
    
    print(f"\nUpdated {updated_count} out of {total_count} substance files")

if __name__ == "__main__":
    main()



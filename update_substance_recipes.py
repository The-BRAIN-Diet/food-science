#!/usr/bin/env python3
"""
Update all substance pages to use SubstanceRecipes instead of TagList for recipes.
Replaces <TagList tag="..." filter="recipes" /> with <SubstanceRecipes tag="..." />
"""

import re
import os
from pathlib import Path

def update_file(file_path):
    """Update a single file to replace TagList with SubstanceRecipes for recipes."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match <TagList tag="..." filter="recipes" />
    # This handles both single and double quotes, and various spacing
    pattern = r'<TagList\s+tag=["\']([^"\']+)["\']\s+filter=["\']recipes["\']\s*/>'
    
    def replace_func(match):
        tag_name = match.group(1)
        return f'<SubstanceRecipes tag="{tag_name}" />'
    
    new_content = re.sub(pattern, replace_func, content)
    
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    """Main function to update all substance pages."""
    base_dir = Path('docs/substances')
    
    if not base_dir.exists():
        print(f"Error: {base_dir} does not exist")
        return
    
    updated_files = []
    
    # Find all .md files in substances directory (excluding index.md)
    for md_file in base_dir.rglob('*.md'):
        if md_file.name == 'index.md':
            continue
        
        if update_file(md_file):
            updated_files.append(str(md_file))
            print(f"Updated: {md_file}")
    
    print(f"\nTotal files updated: {len(updated_files)}")

if __name__ == '__main__':
    main()



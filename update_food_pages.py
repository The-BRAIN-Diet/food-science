#!/usr/bin/env python3
"""
Update all food pages to use FoodRecipes component instead of TagList for recipes.
"""

import os
import re
from pathlib import Path

def update_food_page(file_path):
    """Update a single food file to use FoodRecipes component."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match TagList with filter="recipes" in the Recipes section
        # Matches: <TagList tag="..." filter="recipes" />
        pattern = r'<TagList\s+tag="([^"]+)"\s+filter="recipes"\s*/>'
        
        # Replace with FoodRecipes
        replacement = r'<FoodRecipes tag="\1" />'
        
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
    """Update all food pages."""
    base_dir = Path("docs/foods")
    
    if not base_dir.exists():
        print(f"Directory {base_dir} does not exist")
        return
    
    updated_count = 0
    total_count = 0
    
    # Find all .md files in foods directory
    for md_file in base_dir.rglob("*.md"):
        total_count += 1
        if update_food_page(md_file):
            updated_count += 1
            print(f"Updated: {md_file}")
    
    print(f"\nUpdated {updated_count} out of {total_count} food files")

if __name__ == "__main__":
    main()



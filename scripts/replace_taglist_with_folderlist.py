#!/usr/bin/env python3
"""
Script to replace all <TagList> elements in docs/substances/**/README.md files
with <FolderList folder="..."/> based on the folder path.
"""

import re
from pathlib import Path

SUBSTANCES_DIR = Path("docs/substances")

def replace_taglist_in_readme(readme_path: Path):
    """Replace TagList with FolderList in a README.md file."""
    # Get the folder path relative to docs/
    folder_path = str(readme_path.parent).replace("docs/", "")
    
    # Read the file
    content = readme_path.read_text(encoding='utf-8')
    
    # Find and replace all TagList elements
    # Pattern: <TagList ... />
    pattern = r'<TagList[^>]*/>'
    
    # Replace with FolderList
    replacement = f'<FolderList folder="{folder_path}" />'
    
    new_content = re.sub(pattern, replacement, content)
    
    # Only write if content changed
    if new_content != content:
        readme_path.write_text(new_content, encoding='utf-8')
        return True
    return False

def main():
    """Main function to process all README.md files."""
    readme_files = list(SUBSTANCES_DIR.rglob("README.md"))
    
    print(f"Found {len(readme_files)} README.md files")
    print("Replacing <TagList> with <FolderList>...\n")
    
    updated_count = 0
    for readme_path in sorted(readme_files):
        folder_path = str(readme_path.parent).replace("docs/", "")
        if replace_taglist_in_readme(readme_path):
            print(f"✓ Updated: {readme_path.relative_to(Path('.'))}")
            print(f"  Folder: {folder_path}")
            updated_count += 1
    
    print(f"\n✅ Completed! Updated {updated_count} files.")

if __name__ == "__main__":
    main()

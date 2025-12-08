#!/usr/bin/env python3
"""
Reorder sections in all substance pages so Foods comes after Recipes.
New order: Overview -> Recipes -> Foods -> Biological Mechanisms -> References
"""

import re
from pathlib import Path

def reorder_substance_sections(file_path):
    """Reorder sections in a substance file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split content into frontmatter and body
        frontmatter_match = re.search(r'^---\n.*?\n---\n\n', content, re.DOTALL)
        if not frontmatter_match:
            return False
        
        frontmatter_end = frontmatter_match.end()
        frontmatter = content[:frontmatter_end]
        body = content[frontmatter_end:]
        
        # Find all section headers
        section_pattern = r'^## (Overview|Recipes|Foods|Biological Mechanisms and Implications|References)\s*\n'
        sections = {}
        section_order = []
        
        for match in re.finditer(section_pattern, body, re.MULTILINE):
            section_name = match.group(1)
            section_start = match.start()
            section_order.append((section_name, section_start))
        
        if len(section_order) < 3:
            # Not enough sections to reorder
            return False
        
        # Extract each section's content
        section_contents = {}
        for i, (name, start) in enumerate(section_order):
            end = section_order[i + 1][1] if i + 1 < len(section_order) else len(body)
            section_contents[name] = body[start:end]
        
        # Check if already in correct order
        current_order = [name for name, _ in section_order]
        desired_order = ['Overview', 'Recipes', 'Foods', 'Biological Mechanisms and Implications', 'References']
        
        # Filter to only include sections that exist
        existing_sections = [s for s in desired_order if s in section_contents]
        if current_order == existing_sections:
            return False
        
        # Rebuild body with correct order
        new_body = ''
        for section_name in existing_sections:
            if section_name in section_contents:
                new_body += section_contents[section_name]
        
        new_content = frontmatter + new_body
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Reorder sections in all substance pages."""
    base_dir = Path("docs/substances")
    
    if not base_dir.exists():
        print(f"Directory {base_dir} does not exist")
        return
    
    updated_count = 0
    total_count = 0
    
    # Find all .md files in substances directory
    for md_file in base_dir.rglob("*.md"):
        total_count += 1
        if reorder_substance_sections(md_file):
            updated_count += 1
            print(f"Updated: {md_file}")
    
    print(f"\nUpdated {updated_count} out of {total_count} substance files")

if __name__ == "__main__":
    main()

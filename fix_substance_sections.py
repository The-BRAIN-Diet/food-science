#!/usr/bin/env python3
"""
Fix and reorder sections in all substance pages.
New order: Overview -> Recipes -> Foods -> Biological Mechanisms -> References
This script preserves all sections and just reorders them.
"""

import re
from pathlib import Path

def fix_substance_sections(file_path):
    """Fix and reorder sections in a substance file."""
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
        
        # Find all section headers and their content
        section_pattern = r'^## (Overview|Recipes|Foods|Biological Mechanisms and Implications|References)\s*\n'
        
        sections = {}
        section_positions = []
        
        for match in re.finditer(section_pattern, body, re.MULTILINE):
            section_name = match.group(1)
            section_start = match.start()
            section_positions.append((section_name, section_start))
        
        if len(section_positions) < 2:
            # Not enough sections to reorder
            return False
        
        # Extract each section's content (from header to next header or end)
        for i, (name, start) in enumerate(section_positions):
            end = section_positions[i + 1][1] if i + 1 < len(section_positions) else len(body)
            sections[name] = body[start:end].rstrip()
        
        # Desired order
        desired_order = ['Overview', 'Recipes', 'Foods', 'Biological Mechanisms and Implications', 'References']
        
        # Build new body with sections in correct order
        new_body_parts = []
        for section_name in desired_order:
            if section_name in sections:
                new_body_parts.append(sections[section_name])
        
        new_body = '\n\n'.join(new_body_parts)
        if new_body:
            new_body += '\n'
        
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
    """Fix sections in all substance pages."""
    base_dir = Path("docs/substances")
    
    if not base_dir.exists():
        print(f"Directory {base_dir} does not exist")
        return
    
    updated_count = 0
    total_count = 0
    
    # Find all .md files in substances directory
    for md_file in base_dir.rglob("*.md"):
        total_count += 1
        if fix_substance_sections(md_file):
            updated_count += 1
            print(f"Updated: {md_file}")
    
    print(f"\nUpdated {updated_count} out of {total_count} substance files")

if __name__ == "__main__":
    main()



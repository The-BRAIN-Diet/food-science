#!/usr/bin/env python3
"""
Script to fetch InChIKeys from PubChem for all substances, download their structure images,
and add them to frontmatter with local image paths.
"""

import os
import re
import urllib.request
import urllib.parse
import json
import time
from pathlib import Path
from typing import Optional, Dict

# PubChem API base URL
PUBCHEM_BASE = "https://pubchem.ncbi.nlm.nih.gov/rest/pug"

# Local directory for storing InChI images
INCHI_IMAGE_DIR = Path("static/img/inchi")
INCHI_IMAGE_DIR.mkdir(parents=True, exist_ok=True)

# Mapping of substance names to their PubChem search terms
# Some substances need specific names or have common aliases
SUBSTANCE_NAME_MAP = {
    "ALA (Alpha-Linolenic Acid)": "alpha-linolenic acid",
    "Alpha-Linolenic Acid": "alpha-linolenic acid",
    "MCT (Medium-Chain Triglycerides)": None,  # Not a single compound
    "CoQ10": "coenzyme Q10",
    "Coenzyme Q10 (CoQ10)": "coenzyme Q10",
    "L-Theanine": "L-theanine",
    "EGCG": "epigallocatechin gallate",
    "EGCG (Green Tea Catechin)": "epigallocatechin gallate",
    "SCFAs": None,  # Short-chain fatty acids - not a single compound
    "Short-Chain Fatty Acids (SCFAs)": None,  # Not a single compound
    "Omega-3": None,  # Not a single compound
    "β-Carotene": "beta-carotene",
    "Beta-Carotene": "beta-carotene",
    "Curcumin (Turmeric)": "curcumin",
    "Curcumin": "curcumin",
    "Hydroxytyrosol (Olive Polyphenol)": "hydroxytyrosol",
    "Hydroxytyrosol": "hydroxytyrosol",
    "Quercetin (and Isoquercetin)": "quercetin",
    "Quercetin": "quercetin",
    "Saffron (Crocin, Safranal)": None,  # Multiple compounds
    "Arachidonic Acid (AA, n-6)": "arachidonic acid",
    "Arachidonic Acid": "arachidonic acid",
    "Phosphatidylcholine (PC)": "1-palmitoyl-2-oleoyl-sn-glycero-3-phosphocholine",  # Representative structure
    "Phosphatidylcholine": "1-palmitoyl-2-oleoyl-sn-glycero-3-phosphocholine",
    "Phosphatidylethanolamine": "1-palmitoyl-2-oleoyl-sn-glycero-3-phosphoethanolamine",
    "Phosphatidylserine": "1-palmitoyl-2-oleoyl-sn-glycero-3-phosphoserine",
    "Vitamin A": "retinol",
    "Vitamin B1": "thiamine",
    "Vitamin B2": "riboflavin",
    "Vitamin B3": "niacin",
    "Vitamin B5": "pantothenic acid",
    "Vitamin B6": "pyridoxine",
    "Vitamin B9": "folic acid",
    "Vitamin B12": "cobalamin",
    "Vitamin C": "ascorbic acid",
    "Vitamin D": "cholecalciferol",
    "Vitamin E": "alpha-tocopherol",
    "Vitamin K2": "menaquinone",
}


def search_pubchem_by_name(name: str) -> Optional[str]:
    """
    Search PubChem by name and return the InChIKey.
    Returns None if not found or if there are multiple matches.
    """
    try:
        # Clean the name
        search_name = name.strip()
        
        # Use mapped name if available
        if search_name in SUBSTANCE_NAME_MAP:
            mapped = SUBSTANCE_NAME_MAP[search_name]
            if mapped is None:
                return None  # Skip substances that aren't single compounds
            search_name = mapped
        
        # PubChem API endpoint
        url = f"{PUBCHEM_BASE}/compound/name/{urllib.parse.quote(search_name)}/property/InChIKey/JSON"
        
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            if "PropertyTable" in data and "Properties" in data["PropertyTable"]:
                properties = data["PropertyTable"]["Properties"]
                if len(properties) == 1 and "InChIKey" in properties[0]:
                    return properties[0]["InChIKey"]
                elif len(properties) > 1:
                    # Multiple matches - try to get the first one
                    # This might not be perfect but is better than nothing
                    for prop in properties:
                        if "InChIKey" in prop:
                            return prop["InChIKey"]
        
        return None
    except urllib.error.HTTPError as e:
        if e.code == 404:
            # Not found
            return None
        print(f"  HTTP Error searching PubChem for '{name}': {e}")
        return None
    except Exception as e:
        print(f"  Error searching PubChem for '{name}': {e}")
        return None


def get_cid_from_inchikey(inchikey: str) -> Optional[int]:
    """
    Get the PubChem CID (Compound ID) from an InChIKey.
    Returns None if not found.
    """
    try:
        url = f"{PUBCHEM_BASE}/compound/inchikey/{urllib.parse.quote(inchikey)}/cids/JSON"
        req = urllib.request.Request(url)
        req.add_header('User-Agent', 'Mozilla/5.0')
        
        with urllib.request.urlopen(req, timeout=10) as response:
            data = json.loads(response.read().decode('utf-8'))
            
            if "IdentifierList" in data and "CID" in data["IdentifierList"]:
                cids = data["IdentifierList"]["CID"]
                if len(cids) > 0:
                    return cids[0]
        
        return None
    except Exception as e:
        print(f"  Error getting CID for InChIKey '{inchikey}': {e}")
        return None


def download_inchi_image(inchikey: str, cid: int) -> Optional[str]:
    """
    Download the InChI structure image from PubChem and save it locally.
    Tries PNG first, then SVG if PNG fails.
    Returns the local image path relative to static/ (e.g., "/img/inchi/XXXXX.png")
    or None if download failed.
    """
    # Try PNG first
    for format_type in ['PNG', 'SVG']:
        try:
            url = f"{PUBCHEM_BASE}/compound/cid/{cid}/{format_type}"
            req = urllib.request.Request(url)
            req.add_header('User-Agent', 'Mozilla/5.0')
            
            with urllib.request.urlopen(req, timeout=15) as response:
                # Check if we got a valid image
                content_type = response.headers.get('Content-Type', '')
                if format_type == 'PNG' and 'image/png' not in content_type:
                    continue
                if format_type == 'SVG' and 'image/svg' not in content_type and 'text/plain' not in content_type:
                    continue
                
                # Read the image data
                image_data = response.read()
                
                # Check minimum size (avoid error pages)
                if len(image_data) < 200:
                    continue
                
                # Save to local file
                file_extension = format_type.lower()
                local_filename = f"{inchikey}.{file_extension}"
                local_path = INCHI_IMAGE_DIR / local_filename
                
                with open(local_path, 'wb') as f:
                    f.write(image_data)
                
                # Return path relative to static/ for use in markdown
                return f"/img/inchi/{local_filename}"
        except urllib.error.HTTPError as e:
            if e.code == 503:
                # Rate limited, wait a bit and try next format
                time.sleep(2)
                continue
            if format_type == 'PNG':
                # Try SVG next
                continue
            return None
        except Exception as e:
            if format_type == 'PNG':
                # Try SVG next
                continue
            print(f"  Error downloading {format_type} image: {e}")
            return None
    
    return None


def read_frontmatter(file_path: Path) -> tuple[Dict, str]:
    """
    Read frontmatter from a markdown file.
    Returns (frontmatter_dict, rest_of_content).
    """
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Match YAML frontmatter
    frontmatter_match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    
    if not frontmatter_match:
        return {}, content
    
    frontmatter_text = frontmatter_match.group(1)
    rest_content = frontmatter_match.group(2)
    
    # Parse YAML (simple parser for key: value pairs)
    frontmatter = {}
    current_key = None
    in_list = False
    list_items = []
    in_dict = False
    current_dict = {}
    
    for line in frontmatter_text.split('\n'):
        line = line.rstrip()
        
        # Skip empty lines
        if not line.strip():
            continue
        
        # Check if it's a list item
        if line.startswith('  - '):
            if current_key:
                list_items.append(line[4:].strip())
                in_list = True
        # Check if it's a nested key (indented, like in mechanisms:)
        elif line.startswith('  ') and ':' in line and not line.startswith('  -'):
            # Nested key (like in mechanisms:)
            if current_key and not in_list:
                in_dict = True
                if current_key not in frontmatter:
                    frontmatter[current_key] = {}
                nested_key = line.split(':', 1)[0].strip()
                nested_value = line.split(':', 1)[1].strip()
                frontmatter[current_key][nested_key] = nested_value
        # Regular key: value
        elif ':' in line and not line.startswith(' '):
            # Save previous key if we were in a list
            if current_key and in_list:
                frontmatter[current_key] = list_items
                list_items = []
                in_list = False
            # Save previous dict if we were in a dict
            if current_key and in_dict:
                # Already saved above
                in_dict = False
            
            parts = line.split(':', 1)
            current_key = parts[0].strip()
            current_value = parts[1].strip() if len(parts) > 1 else ''
            
            if current_value:
                frontmatter[current_key] = current_value
            else:
                # Initialize as empty dict if it might have nested values
                frontmatter[current_key] = {}
    
    # Save last key if it was a list
    if current_key and in_list:
        frontmatter[current_key] = list_items
    
    return frontmatter, rest_content


def write_frontmatter(file_path: Path, frontmatter: Dict, rest_content: str):
    """
    Write frontmatter and content back to file.
    """
    # Convert frontmatter to YAML string
    yaml_lines = []
    
    for key, value in frontmatter.items():
        if isinstance(value, list):
            yaml_lines.append(f"{key}:")
            for item in value:
                yaml_lines.append(f"  - {item}")
        elif isinstance(value, dict):
            yaml_lines.append(f"{key}:")
            for nested_key, nested_value in value.items():
                yaml_lines.append(f"  {nested_key}: {nested_value}")
        elif value is None:
            yaml_lines.append(f"{key}:")
        else:
            yaml_lines.append(f"{key}: {value}")
    
    yaml_text = '\n'.join(yaml_lines)
    
    # Write file
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(f"---\n{yaml_text}\n---\n{rest_content}")


def process_substance_file(file_path: Path, download_images: bool = True) -> bool:
    """
    Process a single substance file:
    1. Read frontmatter
    2. Check if inchikey already exists, if not search PubChem
    3. If download_images is True and inchikey exists, download the image
    4. Add inchikey and inchi_image to frontmatter
    5. Write back to file
    
    Returns True if file was updated.
    """
    print(f"Processing: {file_path.name}")
    
    # Read file
    frontmatter, rest_content = read_frontmatter(file_path)
    
    updated = False
    inchikey = frontmatter.get('inchikey', '')
    
    # Get InChIKey if it doesn't exist
    if not inchikey:
        # Get substance name from title
        title = frontmatter.get('title', '')
        if not title:
            print(f"  No title found, skipping")
            return False
        
        # Remove parenthetical info for search (e.g., "Curcumin (Turmeric)" -> "Curcumin")
        search_name = title.split('(')[0].strip()
        
        print(f"  Searching PubChem for: {search_name}")
        
        # Search PubChem - try mapped name first, then the cleaned title
        if search_name in SUBSTANCE_NAME_MAP:
            mapped = SUBSTANCE_NAME_MAP[search_name]
            if mapped is not None:
                inchikey = search_pubchem_by_name(mapped)
        
        # If not found via mapping, try the cleaned name
        if not inchikey:
            inchikey = search_pubchem_by_name(search_name)
        
        if inchikey:
            frontmatter['inchikey'] = inchikey
            updated = True
            print(f"  ✓ Added InChIKey: {inchikey}")
        else:
            print(f"  ✗ Could not find InChIKey")
            return False
    else:
        print(f"  Already has InChIKey: {inchikey}")
    
    # Download image if requested and InChIKey exists
    if download_images and inchikey:
        # Check if image already exists locally
        png_path = INCHI_IMAGE_DIR / f"{inchikey}.png"
        svg_path = INCHI_IMAGE_DIR / f"{inchikey}.svg"
        
        if png_path.exists():
            image_path = f"/img/inchi/{inchikey}.png"
            if frontmatter.get('inchi_image') != image_path:
                frontmatter['inchi_image'] = image_path
                updated = True
                print(f"  ✓ Image already exists locally: {image_path}")
        elif svg_path.exists():
            image_path = f"/img/inchi/{inchikey}.svg"
            if frontmatter.get('inchi_image') != image_path:
                frontmatter['inchi_image'] = image_path
                updated = True
                print(f"  ✓ Image already exists locally: {image_path}")
        else:
            # Download the image
            print(f"  Downloading image for InChIKey: {inchikey}")
            cid = get_cid_from_inchikey(inchikey)
            if cid:
                image_path = download_inchi_image(inchikey, cid)
                if image_path:
                    frontmatter['inchi_image'] = image_path
                    updated = True
                    print(f"  ✓ Downloaded and saved image: {image_path}")
                    # Be nice to PubChem API
                    time.sleep(1)
                else:
                    print(f"  ✗ Could not download image")
            else:
                print(f"  ✗ Could not get CID for InChIKey")
    
    # Write back if updated
    if updated:
        write_frontmatter(file_path, frontmatter, rest_content)
        return True
    
    return False


def main():
    """Main function to process all substance files."""
    import sys
    
    # Check if --no-images flag is set
    download_images = '--no-images' not in sys.argv
    
    substances_dir = Path("docs/substances")
    
    # Get all substance markdown files (excluding index.md files)
    # Search recursively in all subdirectories
    substance_files = []
    for file_path in substances_dir.rglob("*.md"):
        if file_path.name != "index.md":
            substance_files.append(file_path)
    
    print(f"Found {len(substance_files)} substance files")
    if download_images:
        print("Will download InChI images to static/img/inchi/\n")
    else:
        print("Skipping image download (--no-images flag set)\n")
    
    updated_count = 0
    
    for file_path in sorted(substance_files):
        try:
            if process_substance_file(file_path, download_images=download_images):
                updated_count += 1
            print()  # Blank line between files
            
            # Be nice to PubChem API - add a small delay
            time.sleep(0.5)
        except Exception as e:
            print(f"  ERROR processing {file_path.name}: {e}\n")
    
    print(f"\nCompleted! Updated {updated_count} files.")
    if download_images:
        print(f"Images saved to: {INCHI_IMAGE_DIR}")


if __name__ == "__main__":
    main()


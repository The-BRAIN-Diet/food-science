import os
import json
import shutil
import frontmatter
from pathlib import Path

# Registry path
REGISTRY_PATH = Path("registry/substances.json")
BASE = Path("docs/substances")

# Tag inference rules based on folder names
TAG_RULES = [
    ("omega-3", ["omega-3", "pufa", "fatty-acid"]),
    ("omega-6", ["omega-6", "pufa", "fatty-acid"]),
    ("pufas", ["pufa", "fatty-acid"]),
    ("saturated", ["saturated-fat", "fatty-acid"]),
    ("fatty-acids", ["fatty-acid"]),
    ("phospholipids", ["phospholipid"]),
    ("amino-acids", ["amino-acid"]),
    ("polyphenols", ["polyphenol"]),
    ("flavonols", ["flavonol", "polyphenol"]),
    ("flavan-3-ols", ["flavan-3-ol", "polyphenol"]),
    ("curcuminoids", ["curcuminoid", "polyphenol"]),
    ("phenolic-acids", ["phenolic-acid", "polyphenol"]),
    ("isoflavones", ["isoflavone", "polyphenol"]),
    ("secoiridoids", ["secoiridoid", "polyphenol"]),
    ("carotenoids", ["carotenoid"]),
    ("alkaloids", ["alkaloid"]),
    ("terpenes", ["terpene"]),
    ("monoterpenes", ["monoterpene", "terpene"]),
    ("phenylpropanoids", ["phenylpropanoid", "terpene"]),
    ("scfas", ["scfa", "postbiotic"]),
    ("secondary-plant-conversions", ["postbiotic"]),
    ("minerals", ["mineral"]),
    ("vitamins", ["vitamin"]),
    ("macro", ["mineral"]),
    ("trace", ["mineral"]),
    ("essential", ["essential-amino-acid"]),
    ("conditionals", ["nonessential-amino-acid"]),
    ("choline-methylation", ["choline"]),
    ("lipid-based", ["lipid"]),
    ("microbial-metabolites", ["metabolite"]),
    ("bioactive-compounds", ["bioactive"]),
    ("nutrients", ["nutrient"]),
]


def load_registry():
    return json.loads(REGISTRY_PATH.read_text())


def find_substance_files():
    """Get all markdown files in docs/substances (excluding README.md and index.md)."""
    return [p for p in BASE.rglob("*.md") if p.name not in ["README.md", "index.md"]]


def detect_duplicates(files):
    """Detect duplicate filenames (excluding README.md and index.md)."""
    seen = {}
    duplicates = []
    for f in files:
        # Skip category pages
        if f.name in ["README.md", "index.md"]:
            continue
        name = f.name.lower()
        if name in seen:
            duplicates.append((name, seen[name], f))
        else:
            seen[name] = f
    return duplicates


def infer_tags_from_path(path):
    """Infer tags from folder path based on TAG_RULES."""
    tags = set()
    p = str(path).replace("\\", "/").lower()
    
    for folder, taglist in TAG_RULES:
        if f"/{folder}/" in p or p.endswith(f"/{folder}"):
            tags.update(taglist)
    
    return sorted(tags)


def update_frontmatter(path, canonical_tags):
    """Update frontmatter with canonical tags, merging with existing tags and inferred tags."""
    post = frontmatter.load(path)
    old_tags = post.get("tags", [])
    
    # Infer tags from path
    inferred_tags = infer_tags_from_path(path)
    
    # Merge all tags: existing + canonical + inferred
    merged = sorted(set(old_tags).union(set(canonical_tags)).union(set(inferred_tags)))
    post["tags"] = merged
    
    with open(path, "w") as f:
        f.write(frontmatter.dumps(post))
    print(f"Updated tags for {path}: {merged}")


def build_registry_entry(path):
    """Create a canonical registry entry from a substance file path."""
    rel = path.relative_to(BASE)

    slug = path.stem.lower()

    # Human-friendly title from filename
    title = slug.replace("-", " ").title()

    # Infer tags from path
    inferred_tags = infer_tags_from_path(path)

    # Build entry with inferred tags
    entry = {
        "path": str(rel),
        "tags": inferred_tags,
        "title": title,
        "inchikey": "",
        "list_image": ""
    }

    return slug, entry


def sync_registry():
    """Add any missing substances to the registry and update tags for existing ones."""
    registry = load_registry()
    files = find_substance_files()

    added = 0
    updated = 0

    for f in files:
        slug, entry = build_registry_entry(f)

        if slug not in registry:
            registry[slug] = entry
            added += 1
        else:
            # Update tags if they've changed (merge with existing)
            existing_tags = set(registry[slug].get("tags", []))
            new_tags = set(entry["tags"])
            merged_tags = sorted(existing_tags.union(new_tags))
            
            if merged_tags != registry[slug].get("tags", []):
                registry[slug]["tags"] = merged_tags
                updated += 1

    if added > 0 or updated > 0:
        # Preserve comment in output
        output = {"//": registry.pop("//", "Canonical substance registry for The BRAIN Diet. This file will define the correct path, tags, and metadata for every substance.")}
        output.update(registry)
        REGISTRY_PATH.write_text(json.dumps(output, indent=2))
        
        if added > 0:
            print(f"✔ Added {added} new substances to registry.")
        if updated > 0:
            print(f"✔ Updated tags for {updated} existing substances.")
    else:
        print("✔ Registry already includes all substances with up-to-date tags.")

    return registry


def check_canonical_paths(registry):
    """Check if each substance exists at its canonical path."""
    print("\n🔎 Checking canonical paths...")

    mismatches = []

    for slug, entry in registry.items():
        # Skip the comment entry
        if slug == "//":
            continue
            
        canonical = BASE / entry["path"]

        if not canonical.exists():
            # Try to find the file somewhere else
            found = None
            for f in find_substance_files():
                if f.stem.lower() == slug:
                    found = f
                    break

            if found:
                mismatches.append((slug, entry["path"], str(found.relative_to(BASE))))
                print(f"❌ Path mismatch for {slug}:")
                print(f"   Registry says: {entry['path']}")
                print(f"   Actual file:   {found.relative_to(BASE)}")
            else:
                print(f"❌ Missing file for {slug} — registry path does not exist nor any file found.")

    if not mismatches:
        print("✔ All substances are in their canonical locations.\n")
    else:
        print(f"\n⚠ Found {len(mismatches)} path mismatches.\n")

    return mismatches


def auto_move_to_canonical(registry):
    """Automatically move files into their canonical ontology folders."""
    print("\n📦 Auto-healing ontology paths…")

    files = find_substance_files()
    moved_count = 0

    for slug, entry in registry.items():
        # Skip the comment entry
        if slug == "//":
            continue
            
        canonical = BASE / entry["path"]

        # If canonical file already exists, continue
        if canonical.exists():
            continue

        # Try to locate the file elsewhere
        found = None
        for f in files:
            if f.stem.lower() == slug:
                found = f
                break

        # If no file found, warn and skip
        if not found:
            print(f"❌ Missing substance file for {slug} — cannot auto-heal.")
            continue

        # If file is already at canonical path, skip
        if found.resolve() == canonical.resolve():
            continue

        # Create target directory
        canonical.parent.mkdir(parents=True, exist_ok=True)

        # Move file
        shutil.move(str(found), str(canonical))
        moved_count += 1

        print(f"✔ Moved {slug} → {entry['path']}")

    if moved_count == 0:
        print("✔ All files already in canonical locations.")
    else:
        print(f"📦 Auto-heal complete — {moved_count} files moved.")


def main():
    print("🔍 Running ontology sync…")

    registry = sync_registry()

    files = find_substance_files()
    duplicates = detect_duplicates(files)

    if duplicates:
        print("❌ Duplicate substance files detected:")
        for name, first, second in duplicates:
            print(f" - {name} in {first} AND {second}")
    else:
        print("✔ No duplicate substance files detected.")

    # Check canonical paths
    mismatches = check_canonical_paths(registry)

    # Auto-move misplaced files
    if mismatches:
        auto_move_to_canonical(registry)
    else:
        print("✔ No auto-move needed — paths are clean.")

    print("✔ Ontology sync complete.")


if __name__ == "__main__":
    main()

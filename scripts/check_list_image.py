import os
import frontmatter

docs_path = "docs/foods"

def find_missing_list_images(path):
    missing = []
    for root, _, files in os.walk(path):
        for file in files:
            if file.endswith(".mdx") or file.endswith(".md"):
                full_path = os.path.join(root, file)
                with open(full_path, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                    if 'list_image' not in post.metadata:
                        missing.append(full_path)
    return missing

if __name__ == "__main__":
    results = find_missing_list_images(docs_path)
    if results:
        print("❌ The following files are missing 'list_image':")
        for r in results:
            print(f" - {r}")
    else:
        print("✅ All files have a 'list_image' field!")


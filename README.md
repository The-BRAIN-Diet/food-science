# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

From the terminal in Cursor.

```bash
npm install
```

## Local Development

### Starting the Development Server

Using npm (recommended in Cursor):

```bash
npm run start
```

This command starts a local development server. Once it's running, navigate to:

**http://localhost:3000**

Most changes are reflected live without having to restart the server. The development server will automatically reload when you save changes to files.

## Git Workflow in Cursor/VS Code

All Git operations can be done using the Source Control panel in Cursor/VS Code without using the command line.

### Working on a Branch

1. **To Create and switch to a new branch:**

   - Click on the branch name in the bottom-left corner of the status bar (it will show something like "main" or "robs-changes")
   - Click "Create new branch..." or "New Branch..."
   - Enter your branch name (e.g., "update-food-pages")
   - Press Enter to create and switch to the new branch

2. **Make your changes and commit:**

   - Make your file edits as usual
   - Open the Source Control panel by clicking the Git icon in the left sidebar (or press `Ctrl+Shift+G`)
   - You'll see a list of changed files under "Changes"
   - Click the "+" icon next to each file to stage it, or click the "+" next to "Changes" to **stage** all files
   - Enter a commit message in the text box at the top of the Source Control panel
   - Click the checkmark icon (✓) or press `Ctrl+Enter` / `Cmd+Enter` to commit

3. **Push your branch to origin:**
   - After committing, you'll see a notification or an up arrow (↑) with a number indicating unpushed commits
   - Click the up arrow or the "Sync Changes" button, or:
   - Click the "..." menu (three dots) in the Source Control panel
   - Select "Push" or "Push to..."

### Syncing with Main Branch

To sync your branch with the latest changes from main:

1. **Fetch the latest changes from GitHub:**

   - Click the "..." menu (three dots) in the Source Control panel
   - Select "Fetch"

2. **Merge origin/main into your current branch:**

   - Click the "..." menu (three dots) in the Source Control panel
   - Select "Branch" → "Merge Branch..."
   - Choose "origin/main" from the list
   - Click "Merge"
   - If there are conflicts, Cursor will highlight them. Resolve conflicts in the files, then:
     - Stage the resolved files in the Source Control panel
     - Commit the merge with a message like "Merge origin/main into your-branch-name"
   - (You might be able to get cursor to help with this)

3. **Push the merged changes:**
   - Click the up arrow (↑) or "Sync Changes" button to push your merged branch

## Creating a Pull Request on GitHub

1. **Push your branch to GitHub** (see Git Workflow above)

2. **Navigate to GitHub** and you should see a banner suggesting to create a pull request, or:

   - Go to the repository on GitHub
   - Click "Pull requests" tab
   - Click "New pull request"
   - Select your branch to compare with `main`

3. **Fill out the PR:**

   - Add a descriptive title
   - Add a description of your changes
   - Request reviewers if needed
   - Add labels if applicable

4. **Create the pull request** by clicking "Create pull request"

5. **Review The Pull Request**

   - Make sure the netlify preview builds properly.
   - Navigate to the preview link to see your changes as they would appear on the site.

6. **After review and approval, merge the PR:**

   - Click "Merge pull request" on GitHub
   - Choose merge strategy (usually "Create a merge commit" or "Squash and merge")
   - Confirm the merge
   - Optionally delete the branch after merging

7. **Update your local main branch:**
   - Click on the branch name in the bottom-left corner of the status bar
   - Select "main" to switch to the main branch
   - Click the "..." menu (three dots) in the Source Control panel
   - Select "Pull" or "Pull from..." to get the latest changes from origin/main

## Build

If netlify build fails, you can run the same build on your own machine to see the error messages there (useful for sharing with Cursor)

```bash
npm run build
```

## Working with Cursor AI

This project uses Cursor-specific configuration files to help guide AI assistance and maintain consistency across the codebase.

### AGENTS.md

The `AGENTS.md` file in the root directory contains high-level instructions and guidelines for AI agents working on this project. It provides context about:

- Project structure and conventions
- Coding standards and best practices
- Domain-specific knowledge (nutrition, brain health, etc.)
- Workflow preferences

When working with Cursor, you can reference this file using `@AGENTS.md` to ensure AI suggestions align with project guidelines.

### .cursor/rules Files

The `.cursor/rules/` directory contains context-specific rule files that provide detailed formatting and content guidelines for specific parts of the project. These files help Cursor understand:

- **File format requirements** - Structure, front matter, and content organization
- **Tagging conventions** - How to tag documents and link related content
- **Content standards** - What information to include and how to present it

For example, `docs/foods/.cursor/rules/Foods-Pages.mdc` defines the exact format for all food documentation pages, including:

- Required front matter fields (tags, list_image, etc.)
- Section structure (Overview, Recipes, Substances, Preparation Notes, etc.)
- Reference formatting and citation requirements

You can reference these rule files in Cursor by using `@` followed by the file path (e.g., `@Foods-Pages.mdc` or `@.cursor/rules/Foods-Pages.mdc`) to ensure AI assistance follows the specified format.

**Tip:** When asking Cursor to create or update files, reference the appropriate rule file to ensure consistency across the documentation.

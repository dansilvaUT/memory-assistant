# GitHub Setup and Collaboration Guide

This guide will help you set up the GitHub repository and add your second contributor.

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to [https://github.com/new](https://github.com/new)
2. Repository name: `memory-assistant`
3. Description: "AI-powered memory capture app for hackathon"
4. Choose **Public** or **Private** (your choice)
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Option B: Via GitHub CLI (if you have `gh` installed)
```bash
gh repo create memory-assistant --public --source=. --remote=origin
```

## Step 2: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands:

```bash
# Add the remote repository
git remote add origin https://github.com/YOUR-USERNAME/memory-assistant.git

# Push your code to GitHub
git push -u origin main
```

Replace `YOUR-USERNAME` with your GitHub username.

## Step 3: Verify the Push

```bash
# Check that everything was pushed
git log

# You should see your initial commit
```

Visit your repository on GitHub to confirm all files are there:
`https://github.com/YOUR-USERNAME/memory-assistant`

## Step 4: Add Second Contributor

### Via GitHub Website:
1. Go to your repository on GitHub
2. Click "Settings" (top menu)
3. Click "Collaborators" in the left sidebar
4. Click "Add people"
5. Enter your collaborator's GitHub username or email
6. Click "Add [username] to this repository"
7. They'll receive an invitation email

### Via GitHub CLI:
```bash
gh repo add-collaborator YOUR-USERNAME/memory-assistant COLLABORATOR-USERNAME
```

## Step 5: Second Contributor Setup

The second contributor should:

1. **Accept the invitation**:
   - Check email for invitation
   - Or go to: `https://github.com/YOUR-USERNAME/memory-assistant/invitations`

2. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR-USERNAME/memory-assistant.git
   cd memory-assistant
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Set up environment**:
   - Create `.env` file (see README.md for details)
   - Add database credentials
   - Add Anthropic API key

5. **Verify setup**:
   ```bash
   npm run dev
   ```

## Git Workflow for Both Contributors

### Daily Workflow

**Before starting work:**
```bash
# Always pull latest changes first
git pull origin main

# Create a feature branch
git checkout -b feature/your-feature-name
```

**While working:**
```bash
# Check what you've changed
git status

# Add your changes
git add .

# Commit with a clear message
git commit -m "Add feature description"
```

**When ready to share:**
```bash
# Push your branch to GitHub
git push origin feature/your-feature-name

# Then create a Pull Request on GitHub
```

### Creating a Pull Request

1. Go to the repository on GitHub
2. Click "Pull requests" tab
3. Click "New pull request"
4. Select your feature branch
5. Add title and description
6. Click "Create pull request"
7. Request review from your collaborator

### Reviewing a Pull Request

1. Go to "Pull requests" tab
2. Click on the PR to review
3. Review the code changes
4. Leave comments if needed
5. Click "Approve" or "Request changes"
6. If approved, click "Merge pull request"

### After PR is Merged

```bash
# Switch back to main branch
git checkout main

# Pull the latest changes (including merged PR)
git pull origin main

# Delete your local feature branch (optional)
git branch -d feature/your-feature-name
```

## Handling Merge Conflicts

If you get a merge conflict:

```bash
# Pull the latest changes
git pull origin main

# Git will show which files have conflicts
# Open those files and look for:
# <<<<<<< HEAD
# Your changes
# =======
# Other person's changes
# >>>>>>> branch-name

# Edit the files to resolve conflicts
# Remove the conflict markers and keep the code you want

# Add the resolved files
git add .

# Commit the merge
git commit -m "Resolve merge conflicts"

# Push your changes
git push origin your-branch-name
```

## Best Practices

### Communication
- Coordinate who's working on what
- Use GitHub Issues to track tasks
- Comment on PRs for questions/suggestions

### Branching
- Always create feature branches
- Keep branches small and focused
- Delete branches after merging

### Commits
- Commit frequently with clear messages
- Each commit should be a logical unit of work
- Use present tense: "Add feature" not "Added feature"

### Pull Requests
- Keep PRs small and reviewable
- Write descriptive PR descriptions
- Review each other's PRs promptly
- Test before approving

### Avoiding Conflicts
- Pull from main frequently
- Don't work on the same files simultaneously
- Communicate about overlapping work
- Merge main into your branch regularly:
  ```bash
  git checkout main
  git pull origin main
  git checkout your-branch
  git merge main
  ```

## Useful Git Commands

```bash
# See commit history
git log --oneline

# See all branches
git branch -a

# Switch branches
git checkout branch-name

# Discard local changes to a file
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1

# See what changed in a file
git diff filename

# See remote repository info
git remote -v
```

## GitHub Repository Settings

### Recommended Settings:
1. **Branch Protection** (Settings > Branches):
   - Protect the `main` branch
   - Require pull request reviews before merging
   - Require status checks to pass

2. **Issues** (Settings > Features):
   - Enable Issues for task tracking

3. **Projects** (optional):
   - Create a project board for sprint planning

## Troubleshooting

### "Permission denied" when pushing
- Make sure collaborator accepted the invitation
- Check that you're using the correct GitHub username
- Try using SSH instead of HTTPS

### "Repository not found"
- Verify the repository URL
- Ensure you have access rights
- Check your GitHub authentication

### Merge conflicts every time
- Pull more frequently
- Communicate about who's working on what
- Consider splitting work into different files

## Quick Reference

```bash
# Essential daily commands
git pull origin main              # Get latest changes
git checkout -b feature/name      # Create feature branch
git add .                         # Stage changes
git commit -m "message"           # Commit changes
git push origin feature/name      # Push to GitHub

# PR workflow
# 1. Push your branch
# 2. Create PR on GitHub
# 3. Get review
# 4. Merge on GitHub
# 5. Pull main locally
```

## Additional Resources

- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [GitHub Flow Guide](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Resolving Merge Conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts)

---

Need help? Create an issue in the repository or discuss with your teammate!

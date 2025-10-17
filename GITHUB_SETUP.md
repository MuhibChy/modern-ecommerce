# GitHub Setup Guide

## 🚀 Upload Your Project to GitHub

Follow these steps to upload your Modern E-Commerce website to GitHub.

---

## Method 1: Using GitHub Desktop (Easiest)

### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account

### Step 2: Add Repository
1. Open GitHub Desktop
2. Click **File** → **Add Local Repository**
3. Browse to: `c:\xampp\htdocs\AISecurityTech\modern-ecommerce`
4. Click **Add Repository**

### Step 3: Create Repository on GitHub
1. Click **Publish repository** button
2. Enter repository details:
   - **Name**: modern-ecommerce
   - **Description**: Modern e-commerce website with glassmorphism design
   - **Keep this code private**: Uncheck (or check if you want it private)
3. Click **Publish repository**

### Step 4: Done!
Your project is now on GitHub! 🎉

---

## Method 2: Using Git Command Line

### Step 1: Install Git (if not installed)
Download from: https://git-scm.com/download/win

### Step 2: Open Git Bash or Command Prompt
Navigate to your project:
```bash
cd c:/xampp/htdocs/AISecurityTech/modern-ecommerce
```

### Step 3: Initialize Git Repository
```bash
git init
```

### Step 4: Add All Files
```bash
git add .
```

### Step 5: Create First Commit
```bash
git commit -m "Initial commit: Modern e-commerce website"
```

### Step 6: Create Repository on GitHub
1. Go to: https://github.com/new
2. Repository name: `modern-ecommerce`
3. Description: `Modern e-commerce website with glassmorphism design`
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click **Create repository**

### Step 7: Link to GitHub
Replace `YOUR_USERNAME` with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/modern-ecommerce.git
```

### Step 8: Push to GitHub
```bash
git branch -M main
git push -u origin main
```

### Step 9: Done!
Your project is now on GitHub! 🎉

---

## Method 3: Using Visual Studio Code

### Step 1: Open Project in VS Code
1. Open VS Code
2. File → Open Folder
3. Select: `c:\xampp\htdocs\AISecurityTech\modern-ecommerce`

### Step 2: Initialize Repository
1. Click **Source Control** icon (left sidebar)
2. Click **Initialize Repository**

### Step 3: Stage All Files
1. Click **+** next to "Changes" to stage all files
2. Or click **...** → **Stage All Changes**

### Step 4: Commit
1. Enter commit message: "Initial commit: Modern e-commerce website"
2. Click **✓ Commit** button

### Step 5: Publish to GitHub
1. Click **Publish Branch** button
2. Sign in to GitHub if prompted
3. Choose repository name and visibility
4. Click **Publish**

### Step 6: Done!
Your project is now on GitHub! 🎉

---

## What Gets Uploaded

### ✅ Files Included:
- All source code (`src/` folder)
- Configuration files
- Documentation (8 files)
- Package.json and dependencies list
- Public assets
- Scripts (install.bat, start.bat, build.bat)

### ❌ Files Excluded (via .gitignore):
- `node_modules/` (too large, can be reinstalled)
- `dist/` (build output, generated on deployment)
- Log files
- Editor-specific files
- Environment variables (.env)

---

## Repository Settings (Recommended)

### After Upload:

1. **Add Topics** (for discoverability):
   - react
   - ecommerce
   - tailwindcss
   - vite
   - glassmorphism
   - shopping-cart
   - modern-ui

2. **Add Website URL** (after deployment):
   - Settings → General → Website
   - Add your deployed URL (Vercel, Netlify, etc.)

3. **Enable GitHub Pages** (optional):
   - Settings → Pages
   - Source: Deploy from branch
   - Branch: main, folder: /dist
   - Note: You'll need to build first

4. **Add Repository Description**:
   ```
   Modern e-commerce website combining portfolio aesthetics with full shopping functionality. 
   Features glassmorphism UI, AI backgrounds, React, TailwindCSS, and responsive design.
   ```

5. **Add License** (optional):
   - Add file → Create new file
   - Name: LICENSE
   - Choose MIT License template

---

## Keeping Your Repository Updated

### After Making Changes:

**Using GitHub Desktop:**
1. Open GitHub Desktop
2. Review changes
3. Enter commit message
4. Click **Commit to main**
5. Click **Push origin**

**Using Command Line:**
```bash
git add .
git commit -m "Description of changes"
git push
```

**Using VS Code:**
1. Source Control panel
2. Stage changes (+)
3. Enter commit message
4. Click ✓ Commit
5. Click **Sync Changes**

---

## Cloning Your Repository

To download your project on another computer:

```bash
git clone https://github.com/YOUR_USERNAME/modern-ecommerce.git
cd modern-ecommerce
npm install
npm run dev
```

---

## Collaboration Features

### Invite Collaborators:
1. Repository → Settings → Collaborators
2. Add people → Enter username/email
3. Send invitation

### Create Branches:
```bash
git checkout -b feature-name
# Make changes
git add .
git commit -m "Add feature"
git push -u origin feature-name
```

### Create Pull Requests:
1. Go to repository on GitHub
2. Click **Pull requests** → **New pull request**
3. Select branches to compare
4. Create pull request

---

## GitHub Actions (CI/CD)

Want automatic deployment? Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## README Badge (Optional)

Add badges to your README.md:

```markdown
![React](https://img.shields.io/badge/React-18.2.0-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.6-38B2AC)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
```

---

## Troubleshooting

### Issue: "Repository already exists"
**Solution:** Use a different repository name or delete the existing one

### Issue: "Permission denied"
**Solution:** 
- Check if you're logged in to GitHub
- Use HTTPS instead of SSH
- Generate a Personal Access Token if needed

### Issue: "Large files warning"
**Solution:** 
- Ensure node_modules is in .gitignore
- Don't commit dist folder
- Use Git LFS for large assets

### Issue: "Failed to push"
**Solution:**
```bash
git pull origin main --rebase
git push origin main
```

---

## Security Best Practices

### ⚠️ Never Commit:
- API keys or secrets
- `.env` files with sensitive data
- Database credentials
- Private keys

### ✅ Use Environment Variables:
1. Add sensitive data to `.env`
2. Ensure `.env` is in `.gitignore`
3. Use `.env.example` as template
4. Document required variables in README

### ✅ Use GitHub Secrets:
1. Repository → Settings → Secrets
2. Add secrets for CI/CD
3. Reference in workflows: `${{ secrets.SECRET_NAME }}`

---

## Next Steps After Upload

1. ✅ **Deploy to Vercel/Netlify**
   - Connect GitHub repository
   - Auto-deploy on push

2. ✅ **Set up Branch Protection**
   - Require pull request reviews
   - Require status checks

3. ✅ **Add Issue Templates**
   - Bug report template
   - Feature request template

4. ✅ **Create Project Board**
   - Track features and bugs
   - Organize development

5. ✅ **Add Contributing Guidelines**
   - Create CONTRIBUTING.md
   - Define code standards

---

## Useful Git Commands

```bash
# Check status
git status

# View changes
git diff

# View commit history
git log

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Discard local changes
git checkout -- .

# Update from remote
git pull

# Create and switch to new branch
git checkout -b branch-name

# Switch branches
git checkout main

# Delete branch
git branch -d branch-name

# View remotes
git remote -v

# Add remote
git remote add origin URL
```

---

## Resources

- **Git Documentation**: https://git-scm.com/doc
- **GitHub Guides**: https://guides.github.com/
- **GitHub Desktop**: https://desktop.github.com/
- **Git Cheat Sheet**: https://education.github.com/git-cheat-sheet-education.pdf

---

## Support

If you encounter issues:
1. Check GitHub's status page
2. Review error messages carefully
3. Search GitHub Community forums
4. Check repository permissions

---

**Congratulations!** 🎉 Your project is now version-controlled and backed up on GitHub!

---

**Created:** October 2025  
**Version:** 1.0.0

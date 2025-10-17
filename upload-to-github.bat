@echo off
echo ========================================
echo Modern E-Commerce - GitHub Upload
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    echo Alternative: Use GitHub Desktop from https://desktop.github.com/
    echo.
    pause
    exit /b 1
)

echo [INFO] Git version:
git --version
echo.

REM Navigate to project directory
cd /d "%~dp0"

REM Check if already a git repository
if exist ".git" (
    echo [INFO] Git repository already initialized.
    echo.
) else (
    echo [INFO] Initializing Git repository...
    git init
    echo.
)

echo [INFO] Checking Git status...
git status
echo.

echo ========================================
echo IMPORTANT: Before continuing
echo ========================================
echo.
echo 1. Make sure you have a GitHub account
echo 2. Create a new repository on GitHub:
echo    https://github.com/new
echo.
echo Repository settings:
echo    - Name: modern-ecommerce
echo    - Description: Modern e-commerce website with glassmorphism design
echo    - Public or Private: Your choice
echo    - DO NOT initialize with README
echo.
echo 3. Copy the repository URL (will look like):
echo    https://github.com/YOUR_USERNAME/modern-ecommerce.git
echo.
pause

echo.
echo ========================================
echo Step 1: Adding files to Git
echo ========================================
echo.

git add .

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add files!
    pause
    exit /b 1
)

echo [SUCCESS] Files added successfully!
echo.

echo ========================================
echo Step 2: Creating initial commit
echo ========================================
echo.

git commit -m "Initial commit: Modern e-commerce website with React, TailwindCSS, and glassmorphism design"

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to create commit!
    echo.
    echo This might be because:
    echo 1. No changes to commit
    echo 2. Git user not configured
    echo.
    echo To configure Git user:
    echo   git config --global user.name "Your Name"
    echo   git config --global user.email "your.email@example.com"
    echo.
    pause
    exit /b 1
)

echo [SUCCESS] Commit created successfully!
echo.

echo ========================================
echo Step 3: Connecting to GitHub
echo ========================================
echo.
echo Please enter your GitHub repository URL
echo Example: https://github.com/username/modern-ecommerce.git
echo.
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL provided!
    pause
    exit /b 1
)

echo.
echo [INFO] Adding remote repository...

REM Remove existing origin if it exists
git remote remove origin 2>nul

git remote add origin %REPO_URL%

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add remote repository!
    pause
    exit /b 1
)

echo [SUCCESS] Remote repository added!
echo.

echo ========================================
echo Step 4: Pushing to GitHub
echo ========================================
echo.
echo [INFO] Renaming branch to 'main'...
git branch -M main
echo.

echo [INFO] Pushing to GitHub...
echo You may be prompted to enter your GitHub credentials.
echo.

git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to push to GitHub!
    echo.
    echo Common solutions:
    echo 1. Check your internet connection
    echo 2. Verify the repository URL is correct
    echo 3. Make sure you have access to the repository
    echo 4. Try using a Personal Access Token instead of password
    echo.
    echo To create a Personal Access Token:
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Generate new token (classic)
    echo 3. Select 'repo' scope
    echo 4. Use token as password when prompted
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Upload Complete!
echo ========================================
echo.
echo Your project is now on GitHub! 🎉
echo.
echo Repository URL: %REPO_URL%
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Add topics: react, ecommerce, tailwindcss, vite
echo 3. Deploy to Vercel or Netlify
echo 4. Share your project!
echo.
echo To update your repository in the future:
echo   git add .
echo   git commit -m "Your commit message"
echo   git push
echo.
pause

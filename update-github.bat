@echo off
echo ========================================
echo Modern E-Commerce - Update GitHub
echo ========================================
echo.

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

REM Navigate to project directory
cd /d "%~dp0"

echo [INFO] Checking Git status...
git status
echo.

echo ========================================
echo Step 1: Adding changes
echo ========================================
echo.

git add .

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to add files!
    pause
    exit /b 1
)

echo [SUCCESS] Files added!
echo.

echo ========================================
echo Step 2: Creating commit
echo ========================================
echo.

git commit -m "Fix GitHub Pages deployment with Vite config and GitHub Actions"

if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] No changes to commit or commit failed.
    echo.
    pause
)

echo.
echo ========================================
echo Step 3: Pushing to GitHub
echo ========================================
echo.

git push

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to push to GitHub!
    echo.
    echo Please check:
    echo 1. Your internet connection
    echo 2. GitHub credentials
    echo 3. Repository permissions
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Update Complete!
echo ========================================
echo.
echo Your changes have been pushed to GitHub!
echo.
echo Next steps:
echo 1. Go to: https://github.com/muhibchy/modern-ecommerce/settings/pages
echo 2. Under "Build and deployment", select "GitHub Actions"
echo 3. Save the settings
echo 4. Go to Actions tab: https://github.com/muhibchy/modern-ecommerce/actions
echo 5. Watch the deployment workflow run
echo 6. Once complete, visit: https://muhibchy.github.io/modern-ecommerce/
echo.
echo The site will be fully functional in 5-10 minutes!
echo.
pause

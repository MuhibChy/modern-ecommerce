@echo off
echo ========================================
echo Modern E-Commerce - Complete Deployment
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed!
    echo Running installation...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Installation failed!
        pause
        exit /b 1
    )
)

echo ========================================
echo Step 1: Building Production Version
echo ========================================
echo.

call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed!
    echo Please check the error messages above.
    echo.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed!
echo.

echo ========================================
echo Step 2: Committing Changes
echo ========================================
echo.

git add .
git commit -m "Fix deployment: Use HashRouter and build for GitHub Pages"

echo.
echo ========================================
echo Step 3: Pushing to GitHub
echo ========================================
echo.

git push

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to push to GitHub!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Pushed to GitHub!
echo.

echo ========================================
echo Step 4: Deploying to GitHub Pages
echo ========================================
echo.

REM Check if gh-pages is installed
npm list gh-pages >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installing gh-pages...
    call npm install --save-dev gh-pages
)

echo [INFO] Deploying to GitHub Pages...
echo.

call npx gh-pages -d dist

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Deployment failed!
    echo.
    echo Please try manually:
    echo 1. Go to: https://github.com/muhibchy/modern-ecommerce/settings/pages
    echo 2. Set Source to: gh-pages branch
    echo 3. Wait a few minutes
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Deployment Complete! 🎉
echo ========================================
echo.
echo Your site is being deployed to:
echo https://muhibchy.github.io/modern-ecommerce/
echo.
echo IMPORTANT: Final Steps
echo ========================================
echo.
echo 1. Go to: https://github.com/muhibchy/modern-ecommerce/settings/pages
echo.
echo 2. Under "Build and deployment":
echo    - Source: Deploy from a branch
echo    - Branch: gh-pages
echo    - Folder: / (root)
echo.
echo 3. Click Save
echo.
echo 4. Wait 2-5 minutes for deployment
echo.
echo 5. Visit: https://muhibchy.github.io/modern-ecommerce/
echo.
echo Your site will be FULLY WORKING! ✅
echo.
echo Changes made:
echo - Switched to HashRouter for GitHub Pages compatibility
echo - Built production version
echo - Deployed to gh-pages branch
echo.
pause

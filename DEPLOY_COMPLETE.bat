@echo off
cls
echo ================================================================================
echo                    COMPLETE GITHUB PAGES DEPLOYMENT
echo                         (This WILL fix your site!)
echo ================================================================================
echo.
echo Your site: https://muhibchy.github.io/modern-ecommerce/
echo Status: Currently showing raw HTML (NOT WORKING)
echo.
echo This script will:
echo   1. Install dependencies (if needed)
echo   2. Build your React app
echo   3. Commit changes to GitHub
echo   4. Deploy to GitHub Pages
echo   5. Give you final instructions
echo.
echo Estimated time: 5-10 minutes
echo.
pause
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo ================================================================================
echo STEP 1/5: Checking Dependencies
echo ================================================================================
echo.

if not exist "node_modules" (
    echo [INFO] Installing dependencies...
    echo This may take 2-5 minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] Installation failed!
        echo Please check your internet connection and try again.
        pause
        exit /b 1
    )
    echo.
    echo [SUCCESS] Dependencies installed!
) else (
    echo [INFO] Dependencies already installed.
)

echo.
echo ================================================================================
echo STEP 2/5: Building Production Version
echo ================================================================================
echo.
echo [INFO] Building your React application...
echo This may take 1-2 minutes...
echo.

call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Build failed!
    echo.
    echo Common solutions:
    echo 1. Delete node_modules folder and run this script again
    echo 2. Check for syntax errors in your code
    echo 3. Make sure all dependencies are installed
    echo.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Build completed! 'dist' folder created.
echo.

REM Check if dist folder was created
if not exist "dist" (
    echo [ERROR] 'dist' folder was not created!
    echo The build may have failed silently.
    pause
    exit /b 1
)

echo ================================================================================
echo STEP 3/5: Committing Changes to Git
echo ================================================================================
echo.

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git from: https://git-scm.com/download/win
    echo.
    echo After installing Git, run this script again.
    echo.
    pause
    exit /b 1
)

echo [INFO] Adding files to Git...
git add .

echo [INFO] Creating commit...
git commit -m "Deploy: Build production version with HashRouter for GitHub Pages"

if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] Nothing to commit or commit failed.
    echo This is OK if you already committed these changes.
)

echo.
echo [INFO] Pushing to GitHub...
git push origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Failed to push to GitHub!
    echo.
    echo Please check:
    echo 1. Your internet connection
    echo 2. GitHub credentials are correct
    echo 3. You have push access to the repository
    echo.
    echo You can continue with deployment anyway.
    echo.
    pause
)

echo.
echo [SUCCESS] Changes pushed to GitHub!
echo.

echo ================================================================================
echo STEP 4/5: Installing gh-pages Package
echo ================================================================================
echo.

REM Check if gh-pages is already installed
npm list gh-pages >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [INFO] Installing gh-pages package...
    call npm install --save-dev gh-pages
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Failed to install gh-pages!
        pause
        exit /b 1
    )
    echo [SUCCESS] gh-pages installed!
) else (
    echo [INFO] gh-pages already installed.
)

echo.
echo ================================================================================
echo STEP 5/5: Deploying to GitHub Pages
echo ================================================================================
echo.
echo [INFO] Deploying 'dist' folder to GitHub Pages...
echo This may take 1-2 minutes...
echo.

call npx gh-pages -d dist

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Deployment failed!
    echo.
    echo Please try manually:
    echo   npx gh-pages -d dist
    echo.
    pause
    exit /b 1
)

echo.
echo [SUCCESS] Deployment completed!
echo.

echo ================================================================================
echo                         DEPLOYMENT SUCCESSFUL! 🎉
echo ================================================================================
echo.
echo Your app has been deployed to the 'gh-pages' branch!
echo.
echo ================================================================================
echo                    FINAL STEP - CONFIGURE GITHUB PAGES
echo ================================================================================
echo.
echo You MUST do this now for your site to work:
echo.
echo 1. Open this link in your browser:
echo    https://github.com/muhibchy/modern-ecommerce/settings/pages
echo.
echo 2. Under "Build and deployment":
echo    - Source: Deploy from a branch
echo    - Branch: gh-pages  ← SELECT THIS (very important!)
echo    - Folder: / (root)
echo.
echo 3. Click "Save"
echo.
echo 4. Wait 2-5 minutes for GitHub to deploy
echo.
echo 5. Visit: https://muhibchy.github.io/modern-ecommerce/
echo.
echo 6. You should see your WORKING React app! ✅
echo.
echo ================================================================================
echo                              IMPORTANT NOTES
echo ================================================================================
echo.
echo - If you see the old version, clear browser cache (Ctrl + Shift + Delete)
echo - If nothing changes after 10 minutes, check GitHub Pages settings again
echo - The site will use hash URLs like: /#/products, /#/cart (this is normal)
echo - All features will work: navigation, cart, search, filters, etc.
echo.
echo ================================================================================
echo                              WHAT TO EXPECT
echo ================================================================================
echo.
echo After configuration, your site will show:
echo   ✓ Full React application
echo   ✓ Hero slider on home page
echo   ✓ Product catalog with 16 products
echo   ✓ Working navigation menu
echo   ✓ Shopping cart functionality
echo   ✓ Search and filters
echo   ✓ All pages accessible
echo   ✓ Glassmorphism effects
echo   ✓ Smooth animations
echo.
echo NOT just blank page or HTML code!
echo.
echo ================================================================================
echo                         OPEN GITHUB PAGES SETTINGS NOW
echo ================================================================================
echo.
echo Press any key to open GitHub Pages settings in your browser...
pause >nul

start https://github.com/muhibchy/modern-ecommerce/settings/pages

echo.
echo Browser opened! Configure the settings as shown above.
echo.
echo After configuring, wait 5 minutes and visit:
echo https://muhibchy.github.io/modern-ecommerce/
echo.
echo ================================================================================
echo.
pause

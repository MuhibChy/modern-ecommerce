@echo off
echo ========================================
echo Modern E-Commerce - GitHub Pages Deploy
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [ERROR] Dependencies not installed!
    echo Please run install.bat first.
    echo.
    pause
    exit /b 1
)

echo [INFO] Building production version...
echo.

REM Build the project
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
echo Deployment Instructions
echo ========================================
echo.
echo The 'dist' folder is now ready for deployment.
echo.
echo OPTION 1: Automatic Deployment (Recommended)
echo --------------------------------------------
echo 1. Commit and push your changes to GitHub:
echo    git add .
echo    git commit -m "Update for GitHub Pages deployment"
echo    git push
echo.
echo 2. GitHub Actions will automatically build and deploy
echo    Check: https://github.com/muhibchy/modern-ecommerce/actions
echo.
echo OPTION 2: Manual Deployment
echo ---------------------------
echo 1. Go to your repository settings:
echo    https://github.com/muhibchy/modern-ecommerce/settings/pages
echo.
echo 2. Under "Build and deployment":
echo    - Source: Deploy from a branch
echo    - Branch: gh-pages
echo    - Folder: / (root)
echo.
echo 3. Install gh-pages package (first time only):
echo    npm install --save-dev gh-pages
echo.
echo 4. Deploy:
echo    npm run deploy
echo.
echo Your site will be available at:
echo https://muhibchy.github.io/modern-ecommerce/
echo.
echo Note: It may take a few minutes for changes to appear.
echo.
pause

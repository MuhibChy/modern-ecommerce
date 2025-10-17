@echo off
echo ========================================
echo Modern E-Commerce - Production Build
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

echo [INFO] Building for production...
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
echo ========================================
echo [SUCCESS] Build completed!
echo ========================================
echo.
echo Production files are in the 'dist' folder
echo.
echo To preview the production build, run:
echo   npm run preview
echo.
echo To deploy, upload the 'dist' folder contents to your web server.
echo See DEPLOYMENT.md for detailed instructions.
echo.
pause

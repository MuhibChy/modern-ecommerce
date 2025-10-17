@echo off
echo ========================================
echo Modern E-Commerce - Installation Script
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display Node.js version
echo [INFO] Node.js version:
node --version
echo.

REM Check if npm is available
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not available!
    echo Please reinstall Node.js from: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

REM Display npm version
echo [INFO] npm version:
npm --version
echo.

REM Navigate to project directory
cd /d "%~dp0"

echo [INFO] Installing dependencies...
echo This may take 2-5 minutes depending on your internet speed.
echo.

REM Install dependencies
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Installation failed!
    echo Please check the error messages above.
    echo.
    echo Common solutions:
    echo 1. Run this script as Administrator
    echo 2. Clear npm cache: npm cache clean --force
    echo 3. Delete node_modules folder and try again
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo [SUCCESS] Installation completed!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Or double-click: start.bat
echo.
pause

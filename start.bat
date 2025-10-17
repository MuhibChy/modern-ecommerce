@echo off
echo ========================================
echo Modern E-Commerce - Starting Dev Server
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo [WARNING] Dependencies not installed!
    echo Running installation first...
    echo.
    call install.bat
    if %ERRORLEVEL% NEQ 0 (
        echo [ERROR] Installation failed. Please run install.bat manually.
        pause
        exit /b 1
    )
)

echo [INFO] Starting development server...
echo.
echo The site will open at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Start the development server
call npm run dev

pause

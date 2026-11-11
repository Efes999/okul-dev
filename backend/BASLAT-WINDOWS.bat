@echo off
cd /d "%~dp0"
if not exist .env copy .env.example .env >nul
call npm.cmd install
if errorlevel 1 (echo Paket kurulumu basarisiz & pause & exit /b 1)
call npm.cmd run dev
pause

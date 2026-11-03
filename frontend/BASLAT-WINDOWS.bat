@echo off
cd /d "%~dp0"
echo Kampus Etkinlikleri - Sprint 6
call npm.cmd install
if errorlevel 1 (
  echo Paket kurulumu basarisiz. Node.js 22 veya daha yenisini kontrol edin.
  pause
  exit /b 1
)
call npm.cmd run dev
pause

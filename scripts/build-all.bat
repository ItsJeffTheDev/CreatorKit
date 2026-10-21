@echo off
setlocal EnableExtensions
title CreatorKit Multi-Platform Builder
cd /d "%~dp0"

echo.
echo  CreatorKit Build Helper
echo  ======================
echo  Android APK and Windows EXE can be built on Windows.
echo  iOS and macOS builds require macOS and Xcode.
echo.

where node >nul 2>nul || (echo ERROR: Install Node.js LTS first.& pause & exit /b 1)
where npm >nul 2>nul || (echo ERROR: npm was not found.& pause & exit /b 1)
if not exist package.json (echo ERROR: package.json not found. Run from the project root.& pause & exit /b 1)

echo Choose a target:
echo  1. Android APK (Capacitor + Android Studio/Gradle)
echo  2. Windows EXE (Electron Builder)
echo  3. Web build
echo  4. Run all Windows-supported targets
echo  5. Show macOS/iOS build instructions
set /p TARGET=Enter 1-5: 

echo.
echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 goto fail

if "%TARGET%"=="1" goto android
if "%TARGET%"=="2" goto windows
if "%TARGET%"=="3" goto web
if "%TARGET%"=="4" goto all
if "%TARGET%"=="5" goto apple
echo Invalid choice.
pause
exit /b 2

:android
call npm run build || goto fail
if not exist node_modules\@capacitor\cli (
  echo Capacitor is not installed/configured in this project.
  echo Add @capacitor/core, @capacitor/cli, and @capacitor/android, then run npx cap add android.
  goto fail
)
call npx cap sync android || goto fail
if not exist android\gradlew.bat (
  echo Android project missing. Run npx cap add android after Capacitor setup.
  goto fail
)
pushd android
call gradlew.bat assembleDebug
if errorlevel 1 (popd & goto fail)
popd
echo.
echo APK output: android\app\build\outputs\apk\debug\app-debug.apk
echo This is a debug APK, not a Play Store release.
goto done

:windows
call npm run build || goto fail
call npm exec -- electron-builder --win nsis
if errorlevel 1 goto fail
echo Check the dist folder for the Windows installer/EXE.
goto done

:web
call npm run build || goto fail
echo Web build complete. Check the dist folder.
goto done

:all
call npm run build || goto fail
if exist node_modules\@capacitor\cli (
  call npx cap sync android || goto fail
  if exist android\gradlew.bat (
    pushd android
    call gradlew.bat assembleDebug
    if errorlevel 1 (popd & goto fail)
    popd
  ) else echo Skipping APK: android\gradlew.bat is missing.
) else echo Skipping APK: Capacitor is not configured.
call npm exec -- electron-builder --win nsis
if errorlevel 1 goto fail
echo.
echo Windows-supported targets completed. See dist and Android build output.
goto done

:apple
echo.
echo macOS .app and iOS .ipa builds cannot be produced directly on Windows.
echo They require a Mac runner with Xcode and valid Apple signing/provisioning.
echo See docs\MULTI-PLATFORM-BUILDS.md and the GitHub Actions workflow.
goto done

:fail
echo.
echo BUILD FAILED. Read the error above and confirm dependencies/toolchains are installed.
pause
exit /b 1

:done
echo.
pause
exit /b 0

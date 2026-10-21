# CreatorKit multi-platform builds

## Windows helper
Run `scripts\build-all.bat` from the project root. It offers web, Android debug APK, Windows desktop installer, or all Windows-supported targets.

## Requirements by target
- Web: Node.js LTS and npm.
- Android APK: Node.js, Java JDK, Android SDK, and a generated Capacitor `android/` project. The helper produces a debug APK for testing. A Play Store release needs a signed AAB and release testing.
- Windows EXE: electron-builder packages the desktop app into an installer and portable target.
- macOS .app/.dmg: build on macOS for reliable native packaging and signing. Run `npm run desktop:mac` on a Mac or use the desktop GitHub Actions workflow.
- iOS .ipa: requires macOS, Xcode, Apple developer signing/provisioning, and a configured Capacitor `ios/` project. Run `npx cap add ios`, `npx cap sync ios`, then `npx cap open ios` on a Mac.
- Linux: run `npm run desktop:linux` on Linux for native packaging.

## First Android setup
Run `npm install`, then `npx cap add android`, then `npx cap sync android`. The Android Studio SDK and Java environment must be installed. After that, run `scripts\build-all.bat` and choose Android APK.

## Important
A Windows BAT file cannot compile native iOS apps because Xcode only runs on macOS. Build scripts automate packaging but do not guarantee store readiness. Configure a final application ID, privacy policy, permissions, signing, store metadata and real-device tests. Never commit signing keys, passwords, or API secrets.
# CreatorKit

CreatorKit is a creator planning workspace with a YouTube-inspired red, black, and white theme.

**Live AppDeploy version:** https://creatorkit-tsuasd.v2.appdeploy.ai/

The UI uses a YouTube-inspired red, black, and white palette, the custom CreatorKit play mark, responsive icon styling, and reduced-motion-aware transitions. A wide SVG banner is available at `public/creator-banner.svg`.

The UI uses a YouTube-inspired red, black, and white palette, the custom CreatorKit play mark, responsive icon styling, and reduced-motion-aware transitions. A wide SVG banner is available at `public/creator-banner.svg`.

## Current repository app
- Empty-by-default idea workspace; no seeded/sample creator records
- Add, search, and delete ideas; set content format, notes, target date, and published status
- Dashboard counts derived from saved records
- Planned-content view
- Browser localStorage persistence and JSON backup export
- Responsive web and mobile layout with reduced-motion support
- Capacitor configuration for Android/iOS webview packaging
- Electron desktop packaging configuration for Windows, macOS, and Linux
- Windows multi-platform helper: scripts/build-all.bat

## Run locally
Install Node.js 22 LTS or another compatible current LTS release, then:
```sh
npm install
npm run dev
```
Production web build:
```sh
npm run build
```

## Build targets
Run `scripts\build-all.bat` on Windows for the interactive build menu. See [Multi-platform build notes](docs/MULTI-PLATFORM-BUILDS.md).

- **Android debug APK:** install Android Studio, Android SDK and a compatible Java JDK; run `npx cap add android` once, then choose Android APK in the BAT helper.
- **Windows EXE/installer:** choose Windows EXE in the BAT helper.
- **macOS app/DMG:** run `npm run desktop:mac` on macOS or use the desktop GitHub Actions workflow.
- **iOS IPA:** requires macOS, Xcode, Apple signing credentials and provisioning. Windows cannot run Xcode or natively sign iOS builds.
- **Linux:** run `npm run desktop:linux` on Linux.

The GitHub Actions workflow for cross-platform packaging is in [release.yml](.github/workflows/release.yml); release steps and platform limitations are documented in [docs/RELEASES.md](docs/RELEASES.md). Push a version tag such as `v0.1.0` to trigger a release build.

## Data and privacy
In this repository version, idea records are stored in the current browser profile on the current device. Export backups regularly; clearing browser storage can erase local records. There is no YouTube API integration or real payment backend configured in this repository version. Do not present manual counts as automatically synced YouTube analytics.

## Release status
This is an initial source baseline, not a claim that the app is store-ready. Before public release, run a clean install/build and test each target, verify data isolation, configure a privacy policy and support contact, choose the final package ID, configure platform signing, and satisfy each store's current policies. Digital subscription payments need a real server-verified billing implementation. Never commit signing keys, passwords, or API secrets.

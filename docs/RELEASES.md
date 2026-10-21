# Multi-platform releases

## Create a GitHub release

1. Push the latest source to `main`.
2. Create and push a version tag, for example:
   `git tag v0.1.0`
   `git push origin v0.1.0`
3. Open the repository's **Actions** tab and watch **Build CreatorKit release**.
4. If all build jobs pass, the workflow publishes a prerelease with platform assets.

A manual run from Actions validates/builds artifacts but does not publish a GitHub Release; publishing is tag-triggered.

## Artifacts

- Web: static site archive.
- Windows: NSIS installer and portable executable.
- macOS: DMG and ZIP. Notarization/signing is not configured by default.
- Linux: AppImage and DEB.
- Android: debug APK for installation/testing. A Play Store release needs a signed Android App Bundle (AAB), app signing, store listing, and policy/privacy materials.
- iOS: unsigned iOS Simulator app for development/testing only. It is not an iPhone-installable IPA. A real iOS release requires macOS/Xcode, Apple Developer signing certificates, provisioning profiles, app privacy disclosures, and App Store Connect submission.

## Important product readiness limits

This pipeline compiles and packages the repository's current starter app. It does not add missing product features by itself. The current source baseline stores idea records in browser-local storage and does not configure YouTube API integration, user accounts/cloud sync, or a real server-verified payment/subscription system. Do not advertise those features as available until implemented and tested.

Before a public production release, test the UI and data persistence on each target, add automated tests, set up privacy/support pages, confirm the final bundle identifier, and configure platform signing. Never store signing keys or passwords in source control.

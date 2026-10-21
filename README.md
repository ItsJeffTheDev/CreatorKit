# CreatorKit

CreatorKit is a creator workspace for organizing video ideas, planning a publishing calendar, drafting scripts, tracking upload readiness, and reviewing creator progress.

**Live app:** https://creatorkit-tsuasd.v2.appdeploy.ai/

## Current features
- Idea vault with categories, status, search, and editing
- Content calendar for planned videos
- Script builder with starter structures for Shorts, tutorials, devlogs, and reviews
- Upload checklist for each planned video
- Progress tracking and manually entered channel statistics
- Local browser saving plus JSON backup/restore and CSV export
- Responsive desktop and mobile layout

## Data and privacy
The workspace starts empty. It does not preload sample creator records. In local mode, workspace data is stored in the browser on the current device. Browser storage is not a cloud backup; use **Settings & backup** to export a copy. Clearing browser data can erase local work.

If you sign in to the live AppDeploy version, it can sync a workspace to your account. Keep backups of important work.

## Development
The production app is currently hosted on AppDeploy. The source tree is being documented here as the project repository is set up. Before building a release, confirm the checked-in code matches the current live version and run a clean production build.

## Android / Google Play
A Windows build helper is planned under `scripts/build-android.bat`. Publishing requires a unique Android application ID, a signed Android App Bundle (AAB), tested app behavior, privacy policy, store listing, and compliance with Google Play Billing policies for digital subscriptions. Do not commit signing keys, API keys, or payment secrets.

## Planned release checks
- [ ] Sync the complete current source into this repository
- [ ] Install dependencies from a clean checkout
- [ ] Pass TypeScript and production build checks
- [ ] Test mobile layout and accessibility / reduced motion
- [ ] Confirm account and workspace isolation
- [ ] Configure and test real billing server-side (never trust client-only payment state)
- [ ] Add privacy policy and support contact
- [ ] Configure Capacitor Android project and application ID
- [ ] Build and sign AAB, then test internal track

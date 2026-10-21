# Android and Google Play Release Checklist

This is a release checklist, not a claim that the app is already store-ready.

## Build preparation
- [ ] Confirm source code is complete and reproducible from a clean clone
- [ ] Install a supported Node.js LTS version and dependencies
- [ ] Configure Capacitor and Android Studio
- [ ] Choose a permanent unique application ID (for example, a domain you control in reverse-DNS form)
- [ ] Add app name, icon, splash screen, version code, and version name
- [ ] Test on a physical Android device and multiple screen sizes
- [ ] Verify keyboard navigation, contrast, touch targets, and reduced-motion preferences

## Security and privacy
- [ ] Publish a privacy policy that accurately describes local storage, account data, analytics, and any payment processing
- [ ] Never put Stripe secret keys, signing keys, or private API credentials in client code
- [ ] Verify subscriptions and entitlement changes on the backend
- [ ] Provide account/data deletion flows if accounts are supported and required
- [ ] Complete Google Play Data safety and content-rating declarations truthfully

## Payments
If CreatorKit sells digital features or subscriptions inside the Android app, review current Google Play Billing requirements before choosing the implementation. Do not assume a web Stripe checkout alone satisfies Play policy.

## Release
- [ ] Run production build and tests
- [ ] Generate a signed Android App Bundle (.aab)
- [ ] Keep signing credentials securely outside Git
- [ ] Test through the Play Console internal testing track
- [ ] Prepare screenshots, description, support email, privacy policy URL, and release notes

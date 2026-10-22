# Subscription verification setup

This backend scaffold uses Firebase Admin ID-token verification and Stripe's API. The server endpoints are GET /api/billing/status, POST /api/billing/checkout, and POST /api/stripe/webhook.

## Setup
1. Enable Firebase Authentication and configure Firebase Admin Application Default Credentials on the server.
2. Create a recurring USD $4.99/month Stripe Price and set STRIPE_PRO_PRICE_ID.
3. Set STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET as server-only environment secrets. Never expose them in VITE_ variables.
4. Deploy the server over HTTPS and configure Stripe webhooks for customer.subscription.created, customer.subscription.updated, customer.subscription.deleted, and invoice.payment_failed.
5. Configure real success/cancel URLs. Add Firebase sign-in to the client and pass its ID token as Authorization: Bearer <token>.
6. Gate Pro features only from the authenticated GET /api/billing/status response, never from localStorage or a client-supplied plan.

The checkout endpoint offers a 14-day trial without collecting a payment method upfront; if no payment method is added before trial end, Stripe cancels the subscription. Verify the trial and payment-method behavior in your Stripe account. This backend scaffold is not live until deployed and configured.

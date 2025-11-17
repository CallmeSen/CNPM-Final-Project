# Payment Service - Integration Tests

## Overview
Integration tests for Payment Service with real MongoDB database, Stripe test mode, Twilio sandbox, and email service integration.

---

## Environment Setup

### Test Configuration
```typescript
const testConfig = {
  mongoUri: process.env.MONGO_TEST_URI || 'mongodb://localhost:27017/payment-service-test',
  stripeSecretKey: process.env.STRIPE_TEST_SECRET_KEY,
  stripeWebhookSecret: process.env.STRIPE_TEST_WEBHOOK_SECRET,
  twilioAccountSid: process.env.TWILIO_TEST_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_TEST_AUTH_TOKEN,
  twilioPhone: process.env.TWILIO_TEST_PHONE,
  emailService: 'gmail',
  emailUser: process.env.TEST_EMAIL_USER,
  emailPass: process.env.TEST_EMAIL_PASS,
};
```

### Stripe Test Mode
- Use Stripe test API keys
- Use test card numbers (4242 4242 4242 4242)
- Use webhook signing secret from Stripe CLI

### Database Lifecycle
- **Before All**: Connect to test MongoDB, clear payments collection
- **Before Each**: Start transaction
- **After Each**: Rollback transaction
- **After All**: Drop test database, close connections

---

## API Endpoint Integration Tests

### Test Suite: POST /api/payment/create-intent

#### ✅ Test: Creates Stripe payment intent successfully
**Purpose**: End-to-end payment intent creation

**Setup**:
1. Create test order in order-service
2. Get valid customer email/phone

**Test Steps**:
```typescript
POST /api/payment/create-intent
Body: {
  orderId: 'ORDER123',
  userId: 'USER123',
  amount: 5000, // cents
  currency: 'usd',
  email: 'customer@example.com',
  phone: '+1234567890'
}
```

**Expected Response**:
```typescript
{
  paymentIntentId: 'pi_1234567890',
  clientSecret: 'pi_1234567890_secret_abcdefg',
  status: 'requires_payment_method',
  amount: 5000,
  currency: 'usd'
}
```

**Database Verification**:
```typescript
const payment = await Payment.findOne({ orderId: 'ORDER123' });
expect(payment).toBeDefined();
expect(payment.stripePaymentIntentId).toBe('pi_1234567890');
expect(payment.amount).toBe(5000);
expect(payment.status).toBe('Pending');
expect(payment.email).toBe('customer@example.com');
expect(payment.phone).toBe('+1234567890');
```

**Stripe Verification**:
```typescript
// Verify payment intent created in Stripe
const paymentIntent = await stripe.paymentIntents.retrieve('pi_1234567890');
expect(paymentIntent.amount).toBe(5000);
expect(paymentIntent.currency).toBe('usd');
expect(paymentIntent.metadata.orderId).toBe('ORDER123');
```

---

#### ❌ Test: Fails with invalid amount
**Test Cases**:
```typescript
// Negative amount
amount: -100 → 400 Bad Request

// Zero amount
amount: 0 → 400 Bad Request

// Amount too large
amount: 99999999 → 400 Bad Request (Stripe limit)
```

---

#### ❌ Test: Fails with invalid currency
**Setup**: Unsupported currency code

**Expected Status**: 400 Bad Request

**Expected Error**: "Currency 'xyz' is not supported"

---

### Test Suite: GET /api/payment/order/:orderId

#### ✅ Test: Retrieves payment by order ID
**Setup**:
1. Create payment for order

**Test Steps**:
```typescript
GET /api/payment/order/ORDER123
```

**Expected Response**:
```typescript
{
  payment: {
    _id: 'PAYMENT123',
    orderId: 'ORDER123',
    userId: 'USER123',
    amount: 5000,
    currency: 'usd',
    status: 'Pending',
    stripePaymentIntentId: 'pi_1234567890',
    email: 'customer@example.com',
    phone: '+1234567890',
    createdAt: '2024-01-15T10:00:00Z'
  }
}
```

---

#### ❌ Test: Returns 404 for non-existent order
**Expected Response**:
```json
{
  "statusCode": 404,
  "message": "Payment not found"
}
```

---

### Test Suite: POST /api/payment/webhook

#### ✅ Test: Processes payment_intent.succeeded webhook
**Purpose**: Stripe webhook event handling with signature verification

**Setup**:
1. Create payment intent
2. Generate webhook signature using Stripe CLI or SDK

**Test Steps**:
```typescript
// Construct webhook event
const event = {
  type: 'payment_intent.succeeded',
  data: {
    object: {
      id: 'pi_1234567890',
      amount: 5000,
      currency: 'usd',
      status: 'succeeded',
      metadata: {
        orderId: 'ORDER123'
      }
    }
  }
};

// Generate signature
const signature = stripe.webhooks.generateTestHeaderString({
  payload: JSON.stringify(event),
  secret: webhookSecret
});

// Send webhook
POST /api/payment/webhook
Headers: {
  'stripe-signature': signature
}
Body: event
```

**Expected Response**: 200 OK

**Database Verification**:
```typescript
const payment = await Payment.findOne({ 
  stripePaymentIntentId: 'pi_1234567890' 
});
expect(payment.status).toBe('Paid');
expect(payment.paidAt).toBeDefined();
```

**Order Service Integration**:
```typescript
// Verify order status updated
const order = await axios.get(
  `http://localhost:5005/api/orders/${payment.orderId}`
);
expect(order.data.paymentStatus).toBe('Paid');
```

**Notification Verification**:
```typescript
// Check email sent (mock or test inbox)
expect(mockEmailService.sendMail).toHaveBeenCalledWith(
  expect.objectContaining({
    to: 'customer@example.com',
    subject: expect.stringContaining('Payment Confirmation')
  })
);

// Check SMS sent (Twilio test mode)
const messages = await twilioClient.messages.list({ 
  to: '+1234567890' 
});
expect(messages).toHaveLength(1);
expect(messages[0].body).toContain('Payment successful');
```

---

#### ❌ Test: Rejects webhook with invalid signature
**Purpose**: Security - prevent fake webhooks

**Setup**: Send webhook with incorrect signature

**Expected Status**: 400 Bad Request

**Expected Error**: "Invalid signature"

**Security Assertions**:
```typescript
// Payment status NOT updated
const payment = await Payment.findOne({ orderId: 'ORDER123' });
expect(payment.status).toBe('Pending'); // unchanged

// No notifications sent
expect(mockEmailService.sendMail).not.toHaveBeenCalled();
expect(mockTwilioClient.messages.create).not.toHaveBeenCalled();
```

---

#### ✅ Test: Processes payment_intent.payment_failed webhook
**Expected Actions**:
1. Payment status → 'Failed'
2. Error details saved to database
3. Failure notification sent to customer
4. Order service notified

**Database Verification**:
```typescript
const payment = await Payment.findOne({ 
  stripePaymentIntentId: 'pi_1234567890' 
});
expect(payment.status).toBe('Failed');
expect(payment.failureReason).toBeDefined();
expect(payment.failureCode).toBe('card_declined');
```

**Email Verification**:
```typescript
expect(mockEmailService.sendMail).toHaveBeenCalledWith(
  expect.objectContaining({
    subject: expect.stringContaining('Payment Failed')
  })
);
```

---

#### ✅ Test: Handles duplicate webhook events (idempotency)
**Purpose**: Prevent duplicate processing

**Test Steps**:
1. Send payment_intent.succeeded webhook
2. Send same webhook again (Stripe retry)
3. Verify processed only once

**Expected Flow**:
```typescript
// First webhook
await sendWebhook(event);
const firstUpdate = await Payment.findOne({ orderId: 'ORDER123' });

// Duplicate webhook
await sendWebhook(event); // Same event ID
const secondUpdate = await Payment.findOne({ orderId: 'ORDER123' });

// Verify
expect(firstUpdate.updatedAt).toEqual(secondUpdate.updatedAt);
expect(mockEmailService.sendMail).toHaveBeenCalledTimes(1); // only once
```

**Implementation Note**: Use Stripe event ID for idempotency key

---

### Test Suite: POST /api/payment/refund

#### ✅ Test: Creates full refund
**Purpose**: Payment reversal

**Setup**:
1. Create and complete payment
2. Verify payment succeeded in Stripe

**Test Steps**:
```typescript
POST /api/payment/refund
Body: {
  paymentIntentId: 'pi_1234567890',
  amount: 5000 // full refund
}
```

**Expected Response**:
```typescript
{
  refundId: 're_1234567890',
  status: 'succeeded',
  amount: 5000,
  paymentIntentId: 'pi_1234567890'
}
```

**Database Verification**:
```typescript
const payment = await Payment.findOne({ 
  stripePaymentIntentId: 'pi_1234567890' 
});
expect(payment.status).toBe('Refunded');
expect(payment.refundId).toBe('re_1234567890');
expect(payment.refundedAt).toBeDefined();
```

**Stripe Verification**:
```typescript
const refunds = await stripe.refunds.list({
  payment_intent: 'pi_1234567890'
});
expect(refunds.data).toHaveLength(1);
expect(refunds.data[0].amount).toBe(5000);
expect(refunds.data[0].status).toBe('succeeded');
```

---

#### ✅ Test: Creates partial refund
**Test Cases**:
```typescript
// Full amount: $50.00
originalAmount: 5000

// Partial refunds
refund1: 2000 (40%) ✓
refund2: 1500 (30%) ✓
remaining: 1500 (30%)

// Total refunded < original
totalRefunded: 3500
expect(payment.status).toBe('PartiallyRefunded');
```

---

#### ❌ Test: Fails to refund already refunded payment
**Setup**: Payment already fully refunded

**Expected Status**: 400 Bad Request

**Expected Error**: "Payment already refunded"

---

#### ❌ Test: Fails to refund more than original amount
**Setup**:
```typescript
originalAmount: 5000
refundAmount: 6000
```

**Expected Status**: 400 Bad Request

**Expected Error**: "Refund amount exceeds payment amount"

---

## Stripe Test Card Integration

### Test Suite: Payment with Various Card Scenarios

#### ✅ Test: Successful payment with test card
**Card**: 4242 4242 4242 4242

**Expected**: Payment succeeds

---

#### ❌ Test: Declined card
**Card**: 4000 0000 0000 0002

**Expected**: payment_intent.payment_failed webhook

---

#### ❌ Test: Insufficient funds
**Card**: 4000 0000 0000 9995

**Expected Error**: "Your card has insufficient funds"

---

#### ❌ Test: Expired card
**Card**: 4000 0000 0000 0069

**Expected Error**: "Your card has expired"

---

#### ✅ Test: 3D Secure authentication
**Card**: 4000 0025 0000 3155

**Expected Flow**:
1. Payment requires authentication
2. Customer redirected to 3DS page
3. After authentication, payment succeeds

---

## Notification Integration Tests

### Test Suite: Email Notifications

#### ✅ Test: Payment confirmation email sent
**Purpose**: Customer receipt

**Setup**:
1. Configure test email service (Gmail/SendGrid test mode)
2. Create test email inbox

**Test Steps**:
1. Complete payment
2. Verify email sent

**Email Verification** (using test inbox):
```typescript
const emails = await testInbox.getEmails();
const confirmationEmail = emails.find(e => 
  e.to.includes('customer@example.com') &&
  e.subject.includes('Payment Confirmation')
);

expect(confirmationEmail).toBeDefined();
expect(confirmationEmail.html).toContain('ORDER123');
expect(confirmationEmail.html).toContain('$50.00');

// Check for PDF receipt attachment
expect(confirmationEmail.attachments).toHaveLength(1);
expect(confirmationEmail.attachments[0].filename).toBe('receipt.pdf');
```

---

#### ✅ Test: Payment failed email sent
**Expected Content**:
- Order ID
- Failure reason
- Retry instructions
- Customer support contact

---

### Test Suite: SMS Notifications (Twilio)

#### ✅ Test: Payment success SMS
**Setup**: Twilio test credentials

**Verification**:
```typescript
// Query Twilio for sent messages
const messages = await twilioClient.messages.list({
  to: '+1234567890',
  from: twilioTestPhone
});

expect(messages).toHaveLength(1);
expect(messages[0].body).toContain('Payment successful');
expect(messages[0].body).toContain('ORDER123');
expect(messages[0].status).toBe('delivered');
```

---

#### ❌ Test: SMS fails gracefully
**Purpose**: Payment succeeds even if SMS fails

**Setup**: Mock Twilio to throw error

**Expected**:
- Payment status = 'Paid' ✓
- SMS error logged ✓
- Email still sent ✓

---

## Microservice Integration Tests

### Test Suite: Integration with Order Service

#### ✅ Test: Payment success updates order status
**Purpose**: Cross-service state synchronization

**Test Steps**:
1. Create order via order-service
2. Create payment intent
3. Simulate successful payment (webhook)
4. Verify order service notified

**Order Service Verification**:
```typescript
const order = await axios.get(
  `http://localhost:5005/api/orders/ORDER123`
);
expect(order.data.paymentStatus).toBe('Paid');
expect(order.data.status).toBe('Preparing'); // status progressed
```

---

#### ✅ Test: Payment failure updates order
**Expected**:
- Order paymentStatus = 'Failed'
- Order status remains 'Pending'
- Customer notified

---

### Test Suite: Webhook Retry Handling

#### ✅ Test: Handles Stripe webhook retries
**Purpose**: Network resilience

**Scenario**: First webhook fails, Stripe retries

**Test Steps**:
1. Mock payment service to fail first time
2. Stripe sends webhook
3. Service returns 500
4. Stripe retries after delay
5. Service processes successfully

**Expected**: Payment eventually updated, notifications sent once

---

## Performance & Load Tests

### Test Suite: High Volume Payments

#### ✅ Test: Processes 100 concurrent payments
**Purpose**: Concurrent payment handling

**Test Steps**:
```typescript
const payments = Array.from({ length: 100 }, (_, i) => ({
  orderId: `ORDER${i}`,
  userId: `USER${i}`,
  amount: 5000,
  currency: 'usd',
  email: `customer${i}@example.com`,
  phone: `+123456789${i}`
}));

const results = await Promise.all(
  payments.map(p => createPaymentIntent(p))
);

// Verify all succeeded
expect(results.every(r => r.status === 200)).toBe(true);

// Verify in database
const dbPayments = await Payment.find({
  orderId: { $in: payments.map(p => p.orderId) }
});
expect(dbPayments).toHaveLength(100);

// Verify all in Stripe
for (const payment of dbPayments) {
  const stripeIntent = await stripe.paymentIntents.retrieve(
    payment.stripePaymentIntentId
  );
  expect(stripeIntent).toBeDefined();
}
```

---

#### ✅ Test: Webhook processing under load
**Setup**: Simulate 50 webhooks in 10 seconds

**Performance Metrics**:
```typescript
const startTime = Date.now();
// ... process webhooks ...
const endTime = Date.now();

expect(endTime - startTime).toBeLessThan(15000); // 15 sec max
```

---

## Currency & Localization Tests

### Test Suite: Multi-Currency Payments

#### ✅ Test: USD payment
**Expected**: Stripe amount in cents (5000 = $50.00)

---

#### ✅ Test: EUR payment
**Expected**: Stripe amount in cents (5000 = €50.00)

---

#### ✅ Test: JPY payment (zero-decimal currency)
**Expected**: Stripe amount NOT multiplied by 100 (5000 = ¥5000)

**Currency Handling**:
```typescript
function convertToStripeAmount(amount: number, currency: string): number {
  const zeroDecimalCurrencies = ['jpy', 'krw', 'clp'];
  if (zeroDecimalCurrencies.includes(currency.toLowerCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}
```

---

## Security Tests

### Test Suite: Payment Intent Security

#### ❌ Test: Cannot access another user's payment intent
**Setup**:
1. User A creates payment intent
2. User B attempts to retrieve it

**Expected**: 403 Forbidden or payment not found

---

#### ❌ Test: Cannot refund without authorization
**Setup**: Regular user attempts refund

**Expected**: 401 Unauthorized (only admins/system can refund)

---

## Testing Utilities

### Stripe Test Helpers
```typescript
// Create test payment intent
async function createTestPaymentIntent(overrides = {}) {
  return await stripe.paymentIntents.create({
    amount: 5000,
    currency: 'usd',
    payment_method_types: ['card'],
    ...overrides
  });
}

// Simulate webhook
async function sendWebhook(event: any) {
  const signature = stripe.webhooks.generateTestHeaderString({
    payload: JSON.stringify(event),
    secret: webhookSecret
  });
  
  return await request(app)
    .post('/api/payment/webhook')
    .set('stripe-signature', signature)
    .send(event);
}
```

---

## Running Integration Tests

```bash
# Start Stripe CLI for webhook forwarding
stripe listen --forward-to http://localhost:5004/api/payment/webhook

# Set test environment variables
export STRIPE_TEST_SECRET_KEY=sk_test_...
export STRIPE_TEST_WEBHOOK_SECRET=whsec_...
export TWILIO_TEST_ACCOUNT_SID=...
export TWILIO_TEST_AUTH_TOKEN=...

# Run tests
cd backend/payment-service
npm run test:e2e

# With coverage
npm run test:e2e:cov
```

---

## Test Coverage Targets

| Category | Target |
|----------|--------|
| Payment Intent | 95% |
| Webhooks | 100% |
| Refunds | 90% |
| Notifications | 85% |
| Error Handling | 100% |

---

## Best Practices

1. **Stripe Test Mode**: Always use test API keys, never production
2. **Webhook Signatures**: Always verify signatures in tests
3. **Idempotency**: Test duplicate webhook handling
4. **Notifications**: Test both email and SMS, handle failures gracefully
5. **Currency**: Test zero-decimal currencies separately
6. **Refunds**: Test partial and full refunds
7. **Security**: Test authorization for sensitive operations
8. **Cleanup**: Clean up Stripe test data after tests

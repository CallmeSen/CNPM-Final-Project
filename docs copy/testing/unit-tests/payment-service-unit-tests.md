# Payment Service - Unit Tests

## Overview
Unit tests for Payment Service with mocked Stripe SDK, Twilio, and email services for isolated payment processing logic testing.

---

## PaymentService Unit Tests

### Test Suite: createPayment

#### ✅ Test: Creates a new payment record
**Purpose**: Verify payment document creation

**Setup**:
- Mock PaymentModel constructor
- Mock save() method

**Test Steps**:
1. Call `createPayment(paymentData)`
2. Verify document created with correct data
3. Verify save() called

**Input Data**:
```typescript
{
  orderId: 'ORDER123',
  userId: 'USER123',
  amount: 100,
  currency: 'usd',
  status: 'Pending',
  email: 'test@example.com',
  phone: '+1234567890',
  stripePaymentIntentId: 'pi_123456',
  stripeClientSecret: 'secret_123'
}
```

**Expected Result**:
```typescript
{
  _id: 'payment-id',
  orderId: 'ORDER123',
  userId: 'USER123',
  amount: 100,
  currency: 'usd',
  status: 'Pending',
  email: 'test@example.com',
  stripePaymentIntentId: 'pi_123456',
  stripeClientSecret: 'secret_123'
}
```

**Assertions**:
- PaymentModel constructed with correct data
- save() called once
- Document returned with _id

---

### Test Suite: findByOrderId

#### ✅ Test: Finds a payment by orderId
**Purpose**: Query payment by order reference

**Setup**:
- Mock findOne() returns payment document

**Test Steps**:
1. Call `findByOrderId('ORDER123')`
2. Verify query parameters

**Expected Query**:
```typescript
{ orderId: 'ORDER123' }
```

**Assertions**:
- `findOne` called with orderId
- Payment document returned

---

#### ✅ Test: Returns null if payment not found
**Setup**:
- Mock findOne() returns null

**Expected Result**: `null`

**Assertions**:
- No exception thrown
- null returned gracefully

---

### Test Suite: findByPaymentIntentId

#### ✅ Test: Finds payment by Stripe payment intent ID
**Purpose**: Query by Stripe reference for webhook processing

**Setup**:
- Mock findOne().exec() returns payment

**Test Steps**:
1. Call `findByPaymentIntentId('pi_123456')`
2. Verify query

**Expected Query**:
```typescript
{ stripePaymentIntentId: 'pi_123456' }
```

**Assertions**:
- findOne() called with stripePaymentIntentId
- exec() called
- Payment returned

---

### Test Suite: updatePayment

#### ✅ Test: Updates a payment by ID
**Purpose**: Update payment status and metadata

**Setup**:
- Mock findByIdAndUpdate() returns updated payment

**Test Steps**:
1. Call `updatePayment('payment-id', { status: 'Paid' })`
2. Verify update operation

**Expected Parameters**:
```typescript
findByIdAndUpdate(
  'payment-id',
  { status: 'Paid' },
  { new: true }
)
```

**Assertions**:
- findByIdAndUpdate called with correct ID and updates
- { new: true } option used to return updated document
- Updated payment returned

---

### Test Suite: updatePaymentByOrderId

#### ✅ Test: Updates payment by order ID
**Purpose**: Update via order reference

**Setup**:
- Mock findOneAndUpdate().exec() returns updated payment

**Test Steps**:
1. Call `updatePaymentByOrderId('ORDER123', { status: 'Paid' })`
2. Verify query and update

**Expected Query**:
```typescript
findOneAndUpdate(
  { orderId: 'ORDER123' },
  { status: 'Paid' },
  { new: true }
)
```

**Assertions**:
- findOneAndUpdate called with orderId filter
- exec() called
- Updated payment returned

---

### Test Suite: deletePayment

#### ✅ Test: Deletes payment by ID
**Purpose**: Payment removal

**Setup**:
- Mock findByIdAndDelete() returns deleted payment

**Expected Result**:
```typescript
{
  message: 'Payment deleted successfully'
}
```

**Assertions**:
- findByIdAndDelete called with correct ID
- Confirmation message returned

---

#### ✅ Test: Returns null if payment not found
**Setup**:
- Mock findByIdAndDelete() returns null

**Expected Result**: `null`

---

## StripeService Unit Tests

### Test Suite: createPaymentIntent

#### ✅ Test: Creates Stripe payment intent
**Purpose**: Stripe API integration

**Setup**:
- Mock stripe.paymentIntents.create()

**Test Steps**:
1. Call `createPaymentIntent({ amount: 5000, currency: 'usd', orderId: 'ORDER123' })`
2. Verify Stripe API called

**Expected Stripe Parameters**:
```typescript
{
  amount: 5000, // cents
  currency: 'usd',
  metadata: {
    orderId: 'ORDER123'
  },
  automatic_payment_methods: {
    enabled: true
  }
}
```

**Expected Result**:
```typescript
{
  id: 'pi_123456',
  client_secret: 'pi_123456_secret_abc',
  status: 'requires_payment_method',
  amount: 5000,
  currency: 'usd'
}
```

**Assertions**:
- stripe.paymentIntents.create called with correct params
- Payment intent ID returned
- Client secret provided

---

#### ❌ Test: Handles Stripe API errors
**Purpose**: Error handling

**Setup**:
- Mock stripe.paymentIntents.create() throws error

**Test Steps**:
1. Stripe returns error (card declined, insufficient funds, etc.)
2. Verify error propagated with proper message

**Expected Error Types**:
- Card declined
- Insufficient funds
- Invalid card
- Network error

**Assertions**:
- Error caught and re-thrown
- Error message preserved

---

### Test Suite: confirmPayment

#### ✅ Test: Confirms payment intent
**Purpose**: Complete payment authorization

**Setup**:
- Mock stripe.paymentIntents.confirm()

**Test Steps**:
1. Call `confirmPayment('pi_123456', { payment_method: 'pm_card_visa' })`
2. Verify Stripe API called

**Expected Result**:
```typescript
{
  id: 'pi_123456',
  status: 'succeeded',
  amount: 5000,
  charges: { data: [...] }
}
```

**Assertions**:
- confirm() called with payment intent ID
- Payment method passed
- Success status returned

---

### Test Suite: refundPayment

#### ✅ Test: Creates refund
**Purpose**: Payment reversal

**Setup**:
- Mock stripe.refunds.create()

**Test Steps**:
1. Call `refundPayment('pi_123456', { amount: 5000 })`
2. Verify refund created

**Expected Result**:
```typescript
{
  id: 're_123456',
  payment_intent: 'pi_123456',
  amount: 5000,
  status: 'succeeded'
}
```

**Assertions**:
- refunds.create called
- Correct amount refunded
- Refund ID returned

---

#### ✅ Test: Handles partial refunds
**Test Cases**:
```typescript
// Full refund
original: 5000, refund: 5000 ✓

// Partial refund
original: 5000, refund: 2500 ✓

// Multiple partial refunds
refund 1: 2000, refund 2: 1000 (total original: 5000) ✓
```

---

## TwilioService Unit Tests

### Test Suite: sendSMS

#### ✅ Test: Sends SMS notification
**Purpose**: Customer notification via SMS

**Setup**:
- Mock twilioClient.messages.create()

**Test Steps**:
1. Call `sendSMS('+1234567890', 'Payment successful for ORDER123')`
2. Verify Twilio API called

**Expected Parameters**:
```typescript
{
  to: '+1234567890',
  from: process.env.TWILIO_PHONE_NUMBER,
  body: 'Payment successful for ORDER123'
}
```

**Expected Result**:
```typescript
{
  sid: 'SM123456789',
  status: 'sent',
  to: '+1234567890'
}
```

**Assertions**:
- messages.create called with correct params
- Message SID returned
- Status is 'sent' or 'queued'

---

#### ❌ Test: Handles invalid phone numbers
**Setup**:
- Mock Twilio throws validation error

**Expected Error**: Invalid phone number format

---

#### ❌ Test: Handles Twilio API errors
**Purpose**: Network/service failures

**Setup**:
- Mock Twilio throws error

**Expected Behavior**: Error logged, payment process continues

**Assertions**:
- Error caught
- Payment not rolled back due to SMS failure

---

## EmailService Unit Tests

### Test Suite: sendPaymentConfirmation

#### ✅ Test: Sends confirmation email
**Purpose**: Email receipt to customer

**Setup**:
- Mock nodemailer transporter.sendMail()

**Test Steps**:
1. Call `sendPaymentConfirmation(email, orderDetails)`
2. Verify email sent

**Expected Email**:
```typescript
{
  from: process.env.EMAIL_FROM,
  to: 'customer@example.com',
  subject: 'Payment Confirmation - ORDER123',
  html: '<html>...payment details...</html>',
  attachments: [{
    filename: 'receipt.pdf',
    content: pdfBuffer
  }]
}
```

**Assertions**:
- sendMail called with correct recipient
- Email contains order details
- Receipt attached (if applicable)

---

#### ❌ Test: Handles email delivery failures
**Setup**:
- Mock sendMail() rejects

**Expected Behavior**: Log error, don't fail payment

---

### Test Suite: sendPaymentFailedEmail

#### ✅ Test: Notifies customer of failed payment
**Purpose**: Error notification

**Expected Subject**: `Payment Failed - ORDER123`

**Expected Body**: Contains error reason and retry instructions

---

## WebhookController Unit Tests

### Test Suite: handleStripeWebhook

#### ✅ Test: Processes payment_intent.succeeded event
**Purpose**: Webhook event handling

**Setup**:
- Mock stripe.webhooks.constructEvent()
- Mock paymentService.updatePayment()

**Test Steps**:
1. Receive webhook POST with signature
2. Verify signature
3. Extract payment intent
4. Update payment status to 'Paid'
5. Send confirmation email/SMS

**Expected Flow**:
```
1. Verify webhook signature
2. Parse event data
3. Update payment in database
4. Send notifications
5. Return 200 OK
```

**Assertions**:
- Signature verified
- Payment status updated
- Notifications triggered
- Response status 200

---

#### ❌ Test: Rejects invalid signatures
**Purpose**: Security - prevent fake webhooks

**Setup**:
- Mock constructEvent() throws signature error

**Expected Response**: 400 Bad Request

**Assertions**:
- Payment NOT updated
- Error logged
- 400 status returned

---

#### ✅ Test: Handles payment_intent.payment_failed event
**Purpose**: Failed payment handling

**Expected Actions**:
- Update payment status to 'Failed'
- Send failure notification
- Log error details

---

#### ✅ Test: Ignores unhandled event types
**Purpose**: Filter relevant events

**Test Steps**:
1. Receive event type 'customer.created'
2. Verify ignored

**Expected**: Return 200 OK without processing

---

## Mock Strategy

### PaymentModel Mock
```typescript
const mockPaymentModel = {
  new: jest.fn().mockResolvedValue(mockPayment),
  find: jest.fn(),
  findOne: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findOneAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
  save: jest.fn(),
  exec: jest.fn(),
};
```

### Stripe Mock
```typescript
const mockStripe = {
  paymentIntents: {
    create: jest.fn(),
    confirm: jest.fn(),
    retrieve: jest.fn(),
  },
  refunds: {
    create: jest.fn(),
  },
  webhooks: {
    constructEvent: jest.fn(),
  },
};
```

### Twilio Mock
```typescript
const mockTwilio = {
  messages: {
    create: jest.fn().mockResolvedValue({
      sid: 'SM123',
      status: 'sent',
    }),
  },
};
```

---

## Test Coverage

| Module | Statements | Branches | Functions | Lines |
|--------|-----------|----------|-----------|-------|
| PaymentService | 85% | 75% | 90% | 85% |
| StripeService | 80% | 70% | 85% | 80% |
| TwilioService | 90% | 80% | 95% | 90% |
| EmailService | 85% | 75% | 90% | 85% |
| WebhookController | 95% | 85% | 100% | 95% |

---

## Running Tests

```bash
cd backend/payment-service
npm test -- payment.service.spec.ts

# Test specific suite
npm test -- stripe.service.spec.ts

# With coverage
npm test -- --coverage

# Watch mode
npm test -- --watch payment
```

---

## Best Practices

1. **External API Mocking**: Mock Stripe, Twilio, email - never call real APIs in unit tests
2. **Webhook Security**: Always test signature verification
3. **Idempotency**: Test duplicate webhook handling
4. **Currency**: Test amount conversions (dollars to cents)
5. **Async Operations**: Use async/await consistently
6. **Error Handling**: Test all failure scenarios
7. **Notification Failures**: Ensure payment succeeds even if notifications fail

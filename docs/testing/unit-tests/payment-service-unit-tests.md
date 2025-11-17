# Payment Service - Unit Tests Documentation

> **Lưu ý**: Tài liệu này được tạo dựa trên các test case thực tế trong Payment Service

## Test Files Covered

1. `backend/payment-service/src/payment/payment.service.spec.ts` - Payment data operations
2. `backend/payment-service/src/payment/stripe.service.spec.ts` - Stripe webhook handling
3. `backend/payment-service/src/payment/twilio.service.spec.ts` - SMS notifications
4. `backend/payment-service/src/payment/email.service.spec.ts` - Email notifications
5. `backend/payment-service/src/payment/payment.controller.spec.ts` - Payment controller
6. `backend/payment-service/src/payment/webhook.controller.spec.ts` - Webhook controller

---

## 1. Payment Service Tests (payment.service.spec.ts)

### Mock Setup
```typescript
paymentModel = Object.assign(jest.fn(), {
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  deleteOne: jest.fn(),
});
```

### ✅ Test: createPayment

**Purpose**: Tạo payment record mới

**Input**:
```typescript
{
  orderId: 'order-123',
  paymentIntentId: 'pi_123',
  amount: 5000,
  currency: 'usd',
  status: 'pending'
}
```

**Assertions**:
- `paymentModel` constructor được gọi với correct data
- `save()` được gọi
- Payment document returned

---

### ✅ Test: findByOrderId

**Purpose**: Tìm payment theo orderId

**Test Steps**:
1. Mock `find({ orderId: 'order-123' }).exec()` returns payments
2. Call `findByOrderId('order-123')`

**Assertions**:
- `find` được gọi với `{ orderId: 'order-123' }`
- Payments array returned

---

### ✅ Test: findByPaymentIntentId

**Purpose**: Tìm payment theo Stripe paymentIntentId

**Test Steps**:
1. Mock `findOne({ paymentIntentId: 'pi_123' }).exec()` returns payment
2. Call `findByPaymentIntentId('pi_123')`

**Assertions**:
- `findOne` được gọi với `{ paymentIntentId: 'pi_123' }`
- Payment document returned

---

### ✅ Test: updatePayment

**Purpose**: Update payment by ID

**Input**:
```typescript
{
  status: 'succeeded'
}
```

**Test Steps**:
1. Mock `findByIdAndUpdate` returns updated payment
2. Call `updatePayment('payment-id', { status: 'succeeded' })`

**Assertions**:
- `findByIdAndUpdate` được gọi với:
  - ID: 'payment-id'
  - Update data: `{ status: 'succeeded' }`
  - Options: `{ new: true }`

---

### ✅ Test: updatePaymentByOrderId

**Purpose**: Update payment by orderId

**Test Steps**:
1. Mock `findOne({ orderId })` returns payment
2. Mock `findByIdAndUpdate` returns updated payment
3. Call `updatePaymentByOrderId('order-123', updateData)`

**Assertions**:
- `findOne` được gọi first với orderId
- `findByIdAndUpdate` được gọi với payment._id

---

### ✅ Test: deleteByOrderId

**Purpose**: Delete payment by orderId

**Test Steps**:
1. Mock `deleteOne({ orderId })` returns `{ deletedCount: 1 }`
2. Call `deleteByOrderId('order-123')`

**Assertions**:
- `deleteOne` được gọi với `{ orderId: 'order-123' }`
- Returns `{ deletedCount: 1 }`

---

## 2. Stripe Service Tests (stripe.service.spec.ts)

### Mock Setup
```typescript
stripe = {
  webhooks: {
    constructEvent: jest.fn(),
  },
};

paymentService = {
  findByPaymentIntentId: jest.fn(),
  updatePayment: jest.fn(),
};

twilioService = {
  sendPaymentSMS: jest.fn(),
};

emailService = {
  sendPaymentReceipt: jest.fn(),
};
```

### ✅ Test: handleWebhook - payment_intent.succeeded

**Purpose**: Xử lý successful payment webhook

**Webhook Event**:
```typescript
{
  type: 'payment_intent.succeeded',
  data: {
    object: {
      id: 'pi_123',
      amount: 5000,
      metadata: {
        orderId: 'order-123',
        customerEmail: 'customer@example.com',
        customerPhone: '+1234567890',
      }
    }
  }
}
```

**Test Steps**:
1. Mock `constructEvent` returns event
2. Mock `findByPaymentIntentId` returns payment
3. Mock `updatePayment` succeeds
4. Mock SMS và email services
5. Call `handleWebhook(rawBody, signature)`

**Assertions**:
- `constructEvent` được gọi với (rawBody, signature, webhookSecret)
- `findByPaymentIntentId('pi_123')` được gọi
- `updatePayment` được gọi với:
  ```typescript
  {
    status: 'succeeded',
    paidAt: expect.any(Date)
  }
  ```
- `sendPaymentSMS` được gọi với (customerPhone, orderId, amount)
- `sendPaymentReceipt` được gọi với (customerEmail, orderId, amount)

---

### ✅ Test: handleWebhook - payment_intent.payment_failed

**Purpose**: Xử lý failed payment webhook

**Webhook Event**:
```typescript
{
  type: 'payment_intent.payment_failed',
  data: {
    object: {
      id: 'pi_456',
      amount: 3000,
      metadata: {
        orderId: 'order-456',
        customerEmail: 'fail@example.com',
        customerPhone: '+9876543210',
      }
    }
  }
}
```

**Assertions**:
- `updatePayment` được gọi với:
  ```typescript
  {
    status: 'failed',
    failedAt: expect.any(Date)
  }
  ```
- SMS sent với failure message
- Email sent với failure notification

---

### ❌ Test: handleWebhook - invalid signature throws error

**Setup**: Mock `constructEvent` throws error

**Expected**: Error propagated

---

### ❌ Test: handleWebhook - payment not found

**Setup**: 
- Mock `findByPaymentIntentId` returns null
- Valid webhook event

**Expected**: Early return, no update/notification

**Assertions**:
- `updatePayment` **NOT** called
- `sendPaymentSMS` **NOT** called
- `sendPaymentReceipt` **NOT** called

---

### ✅ Test: handleWebhook - SMS fails gracefully

**Setup**: Mock `sendPaymentSMS` throws error

**Expected**: Continue processing (log error but don't fail)

**Assertions**:
- `sendPaymentReceipt` still được gọi
- Webhook processing completes

---

### ✅ Test: handleWebhook - email fails gracefully

**Setup**: Mock `sendPaymentReceipt` throws error

**Expected**: Graceful handling

**Assertions**:
- `updatePayment` still succeeds
- Error logged

---

### ✅ Test: handleWebhook - no phone number skips SMS

**Webhook Event**:
```typescript
{
  data: {
    object: {
      metadata: {
        customerPhone: '', // empty string
        ...
      }
    }
  }
}
```

**Assertions**:
- `sendPaymentSMS` **NOT** called
- Email still sent

---

### ✅ Test: handleWebhook - no email skips email notification

**Webhook Event**:
```typescript
{
  data: {
    object: {
      metadata: {
        customerEmail: '', // empty
        ...
      }
    }
  }
}
```

**Assertions**:
- `sendPaymentReceipt` **NOT** called
- SMS still sent (if phone present)

---

## 3. Twilio Service Tests (twilio.service.spec.ts)

### Mock Setup
```typescript
twilioClient = {
  messages: {
    create: jest.fn(),
  },
};
```

### ✅ Test: sendPaymentSMS - successful send

**Input**:
```typescript
{
  phoneNumber: '+1234567890',
  orderId: 'order-123',
  amount: 5000
}
```

**Expected Message Body**:
```
Your payment of $50.00 for order order-123 was successful!
```

**Assertions**:
- `create` được gọi với:
  ```typescript
  {
    body: 'Your payment of $50.00 for order order-123 was successful!',
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+1234567890'
  }
  ```
- Message SID returned

---

### ✅ Test: sendPaymentSMS - empty phone number

**Input**: `phoneNumber: ''`

**Expected**: Early return, no SMS sent

**Assertions**:
- `create` **NOT** called

---

### ✅ Test: sendPaymentSMS - whitespace phone number

**Input**: `phoneNumber: '   '`

**Expected**: Early return

**Assertions**:
- `create` **NOT** called

---

### ✅ Test: sendPaymentSMS - null phone number

**Input**: `phoneNumber: null`

**Expected**: No error, no send

**Assertions**:
- `create` **NOT** called

---

### ❌ Test: sendPaymentSMS - Twilio API error

**Setup**: Mock `create` throws error

**Expected**: Error propagated

---

### ✅ Test: sendPaymentSMS - formats amount correctly

**Input**: `amount: 12345` (cents)

**Expected Message**: `$123.45`

**Assertions**:
- Message body contains formatted amount

---

### ✅ Test: sendPaymentSMS - handles failure message

**Input**: 
```typescript
{
  phoneNumber: '+1234567890',
  orderId: 'order-123',
  amount: 5000,
  status: 'failed'
}
```

**Expected Message**:
```
Your payment of $50.00 for order order-123 has failed. Please try again.
```

---

## 4. Email Service Tests (email.service.spec.ts)

### Mock Setup
```typescript
resend = {
  emails: {
    send: jest.fn(),
  },
};
```

### ✅ Test: sendPaymentReceipt - successful send

**Input**:
```typescript
{
  email: 'customer@example.com',
  orderId: 'order-123',
  amount: 5000
}
```

**Expected Email Data**:
```typescript
{
  from: 'noreply@fooddelivery.com',
  to: 'customer@example.com',
  subject: 'Payment Receipt - Order order-123',
  html: expect.stringContaining('$50.00') // formatted amount
}
```

**Assertions**:
- `send` được gọi với correct data
- HTML contains orderId và formatted amount
- Email ID returned

---

### ✅ Test: sendPaymentReceipt - HTML content includes order details

**Expected HTML**:
- Contains orderId
- Contains formatted amount
- Contains success message
- Proper HTML structure

---

### ❌ Test: sendPaymentReceipt - Resend API error

**Setup**: Mock `send` throws error

**Expected**: Error propagated

---

## Test Statistics

| Service | Test File | Total Tests | ✅ Pass | ❌ Fail Expected |
|---------|-----------|-------------|---------|------------------|
| Payment | payment.service.spec.ts | 8 | 8 | 0 |
| Stripe | stripe.service.spec.ts | 10 | 7 | 3 |
| Twilio | twilio.service.spec.ts | 7 | 6 | 1 |
| Email | email.service.spec.ts | 3 | 2 | 1 |
| **TOTAL** | | **28** | **23** | **5** |

---

## Running Tests

```bash
cd backend/payment-service

# All payment service tests
npm test

# Specific service
npm test -- payment.service.spec.ts
npm test -- stripe.service.spec.ts
npm test -- twilio.service.spec.ts
npm test -- email.service.spec.ts

# Watch mode
npm test -- --watch
```

---

## Key Testing Patterns

### 1. Stripe Webhook Flow
```
Webhook Event → constructEvent → Find Payment → Update Payment → Send SMS → Send Email
```

### 2. Error Handling
- **Invalid signature**: Throw error immediately
- **Payment not found**: Early return (no notifications)
- **SMS fails**: Log error, continue with email
- **Email fails**: Log error, payment still succeeds

### 3. Empty Field Handling
- Empty phone: Skip SMS
- Empty email: Skip email notification
- Null values: Graceful handling

### 4. Amount Formatting
- Stored in cents: `5000`
- Displayed: `$50.00`
- Formula: `(amount / 100).toFixed(2)`

### 5. Webhook Event Types
- `payment_intent.succeeded` → Update status 'succeeded', set paidAt
- `payment_intent.payment_failed` → Update status 'failed', set failedAt

### 6. Notification Messages
**Success SMS**:
```
Your payment of $XX.XX for order ORDER_ID was successful!
```

**Failure SMS**:
```
Your payment of $XX.XX for order ORDER_ID has failed. Please try again.
```

**Email Subject**:
```
Payment Receipt - Order ORDER_ID
```

---

## Environment Variables Required

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+1234567890

# Resend
RESEND_API_KEY=re_xxx
```

---

## Mock Best Practices

1. **Stripe constructEvent**: Always mock với valid event structure
2. **Twilio messages.create**: Mock với resolved value `{ sid: 'SMxxx' }`
3. **Resend emails.send**: Mock với resolved value `{ id: 'email-id' }`
4. **Payment Model**: Mock with chaining (find().exec())
5. **Error Scenarios**: Use `mockRejectedValue()` for async errors

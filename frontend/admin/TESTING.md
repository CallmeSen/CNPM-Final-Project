# Testing Documentation - Admin Frontend (Next.js)

## Overview

This admin frontend uses **Next.js 15** with a comprehensive testing setup using **Jest** and **React Testing Library**.

---

## Test Setup

### Dependencies

```json
{
  "@testing-library/react": "^16.1.0",
  "@testing-library/jest-dom": "^6.6.3",
  "@testing-library/user-event": "^14.5.2",
  "jest": "^29.7.0",
  "jest-environment-jsdom": "^29.7.0",
  "@types/jest": "^29.5.14"
}
```

### Configuration Files

#### `jest.config.js`
- Configured for Next.js using `next/jest`
- Uses `jsdom` test environment
- Module path aliases (`@/` → `src/`)
- Coverage collection from all source files

#### `jest.setup.js`
- Imports `@testing-library/jest-dom` for custom matchers
- Mocks Next.js navigation (`useRouter`, `usePathname`, `redirect`)
- Mocks `localStorage` with spy functions
- Mocks `global.fetch`
- Suppresses console errors during tests

---

## Running Tests

### Available Scripts

```bash
# Run tests in watch mode (development)
npm test

# Run tests in CI mode with coverage
npm run test:ci

# Run tests with coverage report
npm run test:coverage
```

### CI/CD Integration

Tests are automatically run in GitHub Actions CI/CD pipeline:

```yaml
- name: Run tests
  run: npm run test:ci
  env:
    CI: true
```

---

## Test Files Structure

```
src/
├── app/
│   ├── components/
│   │   ├── __tests__/
│   │   │   ├── ProtectedRoute.test.jsx
│   │   │   └── SuperAdminLogin.test.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SuperAdminLogin.jsx
│   ├── dashboard/
│   │   ├── __tests__/
│   │   │   └── page.test.jsx
│   │   └── page.tsx
│   └── login/
│       ├── __tests__/
│       │   └── page.test.jsx
│       └── page.tsx
```

---

## Current Test Coverage

### Test Suites: **4 passed, 4 total**
### Tests: **13 passed, 13 total**

### Coverage Summary

| File               | Statements | Branches | Functions | Lines |
|--------------------|------------|----------|-----------|-------|
| ProtectedRoute.jsx | 100%       | 87.5%    | 100%      | 100%  |
| SuperAdminLogin.jsx| 100%       | 94.73%   | 100%      | 100%  |
| dashboard/page.tsx | 100%       | 100%     | 100%      | 100%  |
| login/page.tsx     | 100%       | 100%     | 100%      | 100%  |

---

## Test Examples

### Component Test (SuperAdminLogin)

```javascript
it('should handle successful login', async () => {
  const user = userEvent.setup()
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({ token: 'fake-token', name: 'Admin User' }),
  })

  render(<SuperAdminLogin />)
  
  await user.type(screen.getByPlaceholderText('Email'), 'admin@test.com')
  await user.type(screen.getByPlaceholderText('Password'), 'password123')
  await user.click(screen.getByRole('button', { name: /login/i }))

  await waitFor(() => {
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token')
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })
})
```

### Protected Route Test

```javascript
it('should redirect to /login when no token exists', async () => {
  localStorage.getItem = jest.fn(() => null)

  render(
    <ProtectedRoute>
      <div>Protected Content</div>
    </ProtectedRoute>
  )

  await waitFor(() => {
    expect(mockReplace).toHaveBeenCalledWith('/login')
  })

  expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
})
```

---

## Mocking Patterns

### Next.js Router

```javascript
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

// In test setup
useRouter.mockReturnValue({
  push: mockPush,
  replace: mockReplace,
})
```

### LocalStorage

```javascript
// Already mocked in jest.setup.js
localStorage.getItem.mockReturnValue('fake-token')
localStorage.setItem.mockClear()
```

### Fetch API

```javascript
global.fetch.mockResolvedValueOnce({
  ok: true,
  json: async () => ({ data: 'mock data' }),
})
```

---

## Best Practices

### ✅ DO

- Use `userEvent` instead of `fireEvent` for better user simulation
- Use `waitFor` for async assertions
- Clear mocks in `beforeEach` to avoid test pollution
- Test user interactions, not implementation details
- Use semantic queries (`getByRole`, `getByLabelText`, etc.)

### ❌ DON'T

- Don't test Next.js internal behavior
- Don't rely on implementation details (CSS classes, component structure)
- Don't forget to await async operations
- Don't mock too much - test real component behavior when possible

---

## Adding New Tests

### Step 1: Create test file

```bash
# Create test file next to component
touch src/app/components/__tests__/NewComponent.test.jsx
```

### Step 2: Write test

```javascript
import { render, screen } from '@testing-library/react'
import NewComponent from '../NewComponent'

describe('NewComponent', () => {
  it('should render successfully', () => {
    render(<NewComponent />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

### Step 3: Run tests

```bash
npm test
```

---

## Debugging Tests

### Enable verbose output

```bash
npm test -- --verbose
```

### Run specific test file

```bash
npm test -- ProtectedRoute.test.jsx
```

### Debug in VS Code

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

---

## Troubleshooting

### Issue: "Cannot find module 'next/navigation'"

**Solution**: Make sure `next/navigation` is properly mocked in `jest.setup.js`

### Issue: "localStorage is not defined"

**Solution**: Check that `jest.setup.js` is properly configured in `jest.config.js`

### Issue: Tests timeout

**Solution**: Increase timeout in `waitFor`:

```javascript
await waitFor(() => {
  expect(something).toBeTruthy()
}, { timeout: 5000 })
```

---

## Future Improvements

- [ ] Add integration tests for full user flows
- [ ] Add E2E tests with Playwright/Cypress
- [ ] Increase coverage to 80%+
- [ ] Add visual regression tests
- [ ] Add performance tests
- [ ] Add accessibility tests

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Last Updated**: October 14, 2025  
**Test Framework**: Jest 29.7.0  
**Testing Library**: React Testing Library 16.1.0  
**Next.js Version**: 15.5.5



# Admin Frontend - Next.js 15

This is the **SuperAdmin Frontend** for Fastie.Saigon Food Delivery Platform, built with [Next.js 15](https://nextjs.org) using the App Router.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.5 with Turbopack
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Testing**: Jest + React Testing Library
- **UI Components**: React 19.1
- **Icons**: React Icons 5.5

---

## 📦 Getting Started

### Development

First, install dependencies:

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build

```bash
npm run build
npm start
```

---

## 🧪 Testing

This project includes a comprehensive testing setup with Jest and React Testing Library.

### Run Tests

```bash
# Run tests in watch mode
npm test

# Run tests in CI mode with coverage
npm run test:ci

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

- **Test Suites**: 4 passed
- **Tests**: 13 passed
- **Coverage**: 100% for tested components

See [TESTING.md](./TESTING.md) for detailed testing documentation.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── components/        # Shared components
│   │   ├── __tests__/    # Component tests
│   │   ├── ProtectedRoute.jsx
│   │   ├── SuperAdminLogin.jsx
│   │   └── ...
│   ├── dashboard/        # Dashboard page
│   ├── login/           # Login page
│   ├── register/        # Register page
│   ├── pages/           # Legacy page components
│   ├── styles/          # CSS styles
│   └── layout.tsx       # Root layout
└── lib/                 # Utilities
```

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests in watch mode |
| `npm run test:ci` | Run tests in CI mode |

---

## 🔐 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5002
```

---

## 🌐 Architecture

This admin app uses:

- **Next.js App Router** for routing
- **Server Components** by default
- **Client Components** (`"use client"`) for interactive UI
- **TypeScript** for type safety
- **Tailwind CSS** for styling

### Key Features

- SuperAdmin authentication
- Restaurant management (CRUD)
- Orders overview
- User management
- Delivery tracking
- Protected routes

---

## 🚢 CI/CD

Tests run automatically in GitHub Actions on:
- Push to `main` or `phase-1` branches
- Pull requests to `main` or `phase-1`

See `.github/workflows/frontend-ci.yml` for CI configuration.

---

## 📚 Documentation

- [TESTING.md](./TESTING.md) - Testing documentation
- [Next.js Docs](https://nextjs.org/docs) - Next.js documentation
- [Tailwind CSS](https://tailwindcss.com/docs) - Styling documentation

---

## 🔗 Related Projects

- **Frontend Client**: `/frontend/client` - Customer app
- **Frontend Restaurant**: `/frontend/restaurant` - Restaurant admin app
- **Backend Services**: `/backend/*` - Microservices

---

**Version**: 0.1.0  
**Port**: 3001  
**Last Updated**: October 14, 2025

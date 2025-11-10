import { render, screen } from '@testing-library/react'
import DashboardPage from '../page'

// Mock components
jest.mock('@/app/components/ProtectedRoute', () => {
  return function MockProtectedRoute({ children }) {
    return <div data-testid="protected-route">{children}</div>
  }
})

jest.mock('@/app/pages/SuperAdminDashboard', () => {
  return function MockSuperAdminDashboard() {
    return <div data-testid="super-admin-dashboard">Dashboard Mock</div>
  }
})

describe('DashboardPage', () => {
  it('should render dashboard wrapped in ProtectedRoute', () => {
    render(<DashboardPage />)
    
    expect(screen.getByTestId('protected-route')).toBeInTheDocument()
    expect(screen.getByTestId('super-admin-dashboard')).toBeInTheDocument()
    expect(screen.getByText('Dashboard Mock')).toBeInTheDocument()
  })
})



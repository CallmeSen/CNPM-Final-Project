import { render, screen } from '@testing-library/react'
import LoginPage from '../page'

// Mock the SuperAdminLogin component
jest.mock('@/app/components/SuperAdminLogin', () => {
  return function MockSuperAdminLogin() {
    return <div data-testid="super-admin-login">Super Admin Login Mock</div>
  }
})

describe('LoginPage', () => {
  it('should render SuperAdminLogin component', () => {
    render(<LoginPage />)
    
    expect(screen.getByTestId('super-admin-login')).toBeInTheDocument()
    expect(screen.getByText('Super Admin Login Mock')).toBeInTheDocument()
  })
})



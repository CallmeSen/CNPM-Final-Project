import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SuperAdminLogin from '../SuperAdminLogin'
import { useRouter } from 'next/navigation'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('SuperAdminLogin', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
    localStorage.getItem.mockClear()
    localStorage.setItem.mockClear()
    global.fetch = jest.fn()
    useRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
    })
  })

  it('should render login form', () => {
    render(<SuperAdminLogin />)
    
    expect(screen.getByText('Super Admin Login')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
  })

  it('should show validation errors for empty fields', async () => {
    const user = userEvent.setup()
    render(<SuperAdminLogin />)
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('Email is required')).toBeInTheDocument()
    expect(await screen.findByText('Password is required')).toBeInTheDocument()
  })

  it('should show validation error for invalid email', async () => {
    const user = userEvent.setup()
    render(<SuperAdminLogin />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    await user.type(emailInput, 'invalid-email')
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('Invalid email format')).toBeInTheDocument()
  })

  it('should show validation error for short password', async () => {
    const user = userEvent.setup()
    render(<SuperAdminLogin />)
    
    const passwordInput = screen.getByPlaceholderText('Password')
    await user.type(passwordInput, '123')
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('Password must be at least 6 characters')).toBeInTheDocument()
  })

  it('should handle successful login', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'fake-token', name: 'Admin User' }),
    })

    render(<SuperAdminLogin />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await user.type(emailInput, 'admin@test.com')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token')
      expect(localStorage.setItem).toHaveBeenCalledWith('superAdminName', 'Admin User')
      expect(mockPush).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('should handle login failure', async () => {
    const user = userEvent.setup()
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Invalid credentials' }),
    })

    render(<SuperAdminLogin />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await user.type(emailInput, 'admin@test.com')
    await user.type(passwordInput, 'wrongpassword')
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('Invalid credentials')).toBeInTheDocument()
  })

  it('should handle network error', async () => {
    const user = userEvent.setup()
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    render(<SuperAdminLogin />)
    
    const emailInput = screen.getByPlaceholderText('Email')
    const passwordInput = screen.getByPlaceholderText('Password')
    
    await user.type(emailInput, 'admin@test.com')
    await user.type(passwordInput, 'password123')
    
    const submitButton = screen.getByRole('button', { name: /login/i })
    await user.click(submitButton)

    expect(await screen.findByText('❌ Error during login')).toBeInTheDocument()
  })

  it('should navigate to register page when clicking register link', async () => {
    const user = userEvent.setup()
    render(<SuperAdminLogin />)
    
    const registerLink = screen.getByText('Register here')
    await user.click(registerLink)

    expect(mockPush).toHaveBeenCalledWith('/register')
  })
})


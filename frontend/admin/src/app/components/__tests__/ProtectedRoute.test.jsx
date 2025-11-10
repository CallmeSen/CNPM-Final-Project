import { render, screen, waitFor } from '@testing-library/react'
import ProtectedRoute from '../ProtectedRoute'
import { useRouter } from 'next/navigation'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ProtectedRoute', () => {
  let mockReplace

  beforeEach(() => {
    mockReplace = jest.fn()
    useRouter.mockReturnValue({
      replace: mockReplace,
      push: jest.fn(),
    })
    localStorage.clear()
    localStorage.getItem.mockClear()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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

  it('should render children when token exists', async () => {
    localStorage.getItem = jest.fn(() => 'fake-token')

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    // Wait for the component to update after useEffect
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    }, { timeout: 3000 })

    expect(mockReplace).not.toHaveBeenCalled()
  })

  it('should handle loading state correctly', async () => {
    localStorage.getItem = jest.fn(() => 'fake-token')

    const { container } = render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    // Wait for component to finish loading
    await waitFor(() => {
      expect(screen.getByText('Protected Content')).toBeInTheDocument()
    })
  })
})


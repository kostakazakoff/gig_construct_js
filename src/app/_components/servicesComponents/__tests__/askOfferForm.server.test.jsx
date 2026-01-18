import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AskOfferForm from '../askOfferForm'
import be from '@/app/_utils/Api'
import '@testing-library/jest-dom'

// Mock dependencies
jest.mock('@/app/_hooks/useLanguageContext', () => ({
  __esModule: true,
  default: () => ({ language: 'en' }),
}))

jest.mock('@/app/_utils/Api', () => ({
  __esModule: true,
  default: {
    post: jest.fn(),
  },
}))

jest.mock('@/app/_lib/api_paths', () => ({
  API_PATH: {
    INQUIRY: 'inquiry/',
  },
}))

const mockTranslated = {
  title: 'Request an Offer',
  firstName: 'First Name',
  lastName: 'Last Name',
  companyLabel: 'Company',
  phoneLabel: 'Phone',
  emailLabel: 'Email',
  messageLabel: 'Message',
  privacyPolicy: 'I agree to the',
  privacyPolicyLink: 'Privacy Policy',
  firstNamePlaceholder: 'John',
  lastNamePlaceholder: 'Doe',
  companyPlaceholder: 'Your Company',
  phonePlaceholder: '+1234567890',
  emailPlaceholder: 'john@example.com',
  messagePlaceholder: 'Your message...',
  hints: {
    first_name: 'Enter your first name',
    last_name: 'Enter your last name',
    company: 'Enter company name',
    phone: 'Enter phone number',
    email: 'Enter email address',
    message: 'Enter your message',
    agree: 'You must agree to continue',
  },
  errors: {
    first_name: 'First name is required',
    last_name: 'Last name is required',
    phone: 'Phone is required',
    email: 'Email is required',
    message: 'Message is required',
    agree: 'You must agree to privacy policy',
  },
}

describe('AskOfferForm - Server Communication', () => {
  const mockSetFormSubmitted = jest.fn()
  const mockSetFormErrored = jest.fn()

  const defaultProps = {
    serviceId: 'construction',
    translated: mockTranslated,
    setFormSubmitted: mockSetFormSubmitted,
    setFormErrored: mockSetFormErrored,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('submits form data successfully to server', async () => {
    const user = userEvent.setup()
    
    // Mock successful API response
    be.post.mockResolvedValue({
      data: {
        succeed: true,
        message: 'Form submitted successfully',
      },
    })

    render(<AskOfferForm {...defaultProps} />)

    // Fill out the form
    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test inquiry message')
    
    // Check privacy checkbox
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Wait for API call
    await waitFor(() => {
      expect(be.post).toHaveBeenCalledWith('inquiry/', expect.objectContaining({
        category: 'construction',
        first_name: 'John',
        phone: '+1234567890',
        email: 'john@example.com',
        message: 'Test inquiry message',
        language: 'en',
      }))
    })

    // Check that success callback was called
    await waitFor(() => {
      expect(mockSetFormSubmitted).toHaveBeenCalledWith(true)
    })
  })

  test('handles server error response with succeed: false', async () => {
    const user = userEvent.setup()
    
    // Mock error response from server
    be.post.mockResolvedValue({
      data: {
        succeed: false,
        message: 'Validation error occurred',
      },
    })

    render(<AskOfferForm {...defaultProps} />)

    // Fill out required fields
    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test message')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Wait for error callback
    await waitFor(() => {
      expect(mockSetFormErrored).toHaveBeenCalledWith('Validation error occurred')
    })

    await waitFor(() => {
      expect(mockSetFormSubmitted).toHaveBeenCalledWith(false)
    })
  })

  test('handles network error during submission', async () => {
    const user = userEvent.setup()
    
    // Mock network error
    be.post.mockRejectedValue({
      message: 'Network Error',
    })

    render(<AskOfferForm {...defaultProps} />)

    // Fill out required fields
    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test message')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Wait for error callback
    await waitFor(() => {
      expect(mockSetFormErrored).toHaveBeenCalledWith('Network Error')
    })

    await waitFor(() => {
      expect(mockSetFormSubmitted).toHaveBeenCalledWith(false)
    })
  })

  test('form becomes hidden after successful submission', async () => {
    const user = userEvent.setup()
    
    be.post.mockResolvedValue({
      data: {
        succeed: true,
        message: 'Success',
      },
    })

    const { container } = render(<AskOfferForm {...defaultProps} />)

    // Fill out form
    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test message')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    // Submit
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Form should become hidden
    await waitFor(() => {
      const formWrapper = container.firstChild
      expect(formWrapper).toHaveClass('opacity-0', 'hidden')
    })
  })

  test('sends all form fields including optional ones', async () => {
    const user = userEvent.setup()
    
    be.post.mockResolvedValue({
      data: { succeed: true },
    })

    render(<AskOfferForm {...defaultProps} />)

    // Fill out all fields including optional
    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Last Name/i), 'Doe')
    await user.type(screen.getByLabelText(/Company/i), 'Acme Corp')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@acme.com')
    await user.type(screen.getByLabelText(/Message/i), 'Detailed inquiry')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    // Submit
    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Verify all fields sent
    await waitFor(() => {
      expect(be.post).toHaveBeenCalledWith('inquiry/', expect.objectContaining({
        first_name: 'John',
        last_name: 'Doe',
        company: 'Acme Corp',
        phone: '+1234567890',
        email: 'john@acme.com',
        message: 'Detailed inquiry',
        category: 'construction',
        language: 'en',
      }))
    })
  })

  test('handles server error without message', async () => {
    const user = userEvent.setup()
    
    be.post.mockResolvedValue({
      data: {
        succeed: false,
        // No message provided
      },
    })

    render(<AskOfferForm {...defaultProps} />)

    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    // Should use default error message
    await waitFor(() => {
      expect(mockSetFormErrored).toHaveBeenCalledWith('An error occurred while processing your request')
    })
  })

  test('includes category in submitted data', async () => {
    const user = userEvent.setup()
    
    be.post.mockResolvedValue({
      data: { succeed: true },
    })

    const propsWithCategory = {
      ...defaultProps,
      serviceId: 'electrical-services',
    }

    render(<AskOfferForm {...propsWithCategory} />)

    await user.type(screen.getByLabelText(/First Name/i), 'John')
    await user.type(screen.getByLabelText(/Phone/i), '+1234567890')
    await user.type(screen.getByLabelText(/Email/i), 'john@example.com')
    await user.type(screen.getByLabelText(/Message/i), 'Test')
    
    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    await user.click(checkbox)

    const submitButton = screen.getByRole('button', { name: /Send/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(be.post).toHaveBeenCalledWith('inquiry/', expect.objectContaining({
        category: 'electrical-services',
      }))
    })
  })
})

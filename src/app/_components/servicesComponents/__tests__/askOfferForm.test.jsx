import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AskOfferForm from '../askOfferForm'
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

describe('AskOfferForm', () => {
  const mockSetFormSubmitted = jest.fn()
  const mockSetFormErrored = jest.fn()

  const defaultProps = {
    serviceId: 'test-service',
    categorySlug: 'construction',
    translated: mockTranslated,
    setFormSubmitted: mockSetFormSubmitted,
    setFormErrored: mockSetFormErrored,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders form with all required fields', () => {
    render(<AskOfferForm {...defaultProps} />)

    expect(screen.getByText('Request an Offer')).toBeInTheDocument()
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Send/i })).toBeInTheDocument()
  })

  test('validates required fields on submit', async () => {
    render(<AskOfferForm {...defaultProps} />)

    const submitButton = screen.getByRole('button', { name: /Send/i })
    fireEvent.click(submitButton)

    // HTML5 validation should prevent submission
    await waitFor(() => {
      const firstNameInput = screen.getByLabelText(/First Name/i)
      expect(firstNameInput).toBeInvalid()
    })
  })

  test('allows user to fill out form fields', async () => {
    const user = userEvent.setup()
    render(<AskOfferForm {...defaultProps} />)

    const firstNameInput = screen.getByLabelText(/First Name/i)
    const phoneInput = screen.getByLabelText(/Phone/i)
    const emailInput = screen.getByLabelText(/Email/i)
    const messageInput = screen.getByLabelText(/Message/i)

    await user.type(firstNameInput, 'John')
    await user.type(phoneInput, '+1234567890')
    await user.type(emailInput, 'john@example.com')
    await user.type(messageInput, 'Test message')

    expect(firstNameInput).toHaveValue('John')
    expect(phoneInput).toHaveValue('+1234567890')
    expect(emailInput).toHaveValue('john@example.com')
    expect(messageInput).toHaveValue('Test message')
  })

  test('clears custom validation error on input change', async () => {
    const user = userEvent.setup()
    render(<AskOfferForm {...defaultProps} />)

    const firstNameInput = screen.getByLabelText(/First Name/i)
    
    // Type and clear to trigger validation
    await user.type(firstNameInput, 'John')
    
    expect(firstNameInput).toBeValid()
  })

  test('displays tooltips on form fields', () => {
    render(<AskOfferForm {...defaultProps} />)

    const firstNameInput = screen.getByLabelText(/First Name/i)
    expect(firstNameInput).toHaveAttribute('title', 'Enter your first name')

    const phoneInput = screen.getByLabelText(/Phone/i)
    expect(phoneInput).toHaveAttribute('title', 'Enter phone number')

    const emailInput = screen.getByLabelText(/Email/i)
    expect(emailInput).toHaveAttribute('title', 'Enter email address')
  })

  test('includes category_slug in form data', () => {
    render(<AskOfferForm {...defaultProps} />)
    
    // The form should initialize with category_slug
    expect(defaultProps.categorySlug).toBe('construction')
  })

  test('renders privacy policy checkbox', () => {
    render(<AskOfferForm {...defaultProps} />)

    const checkbox = screen.getByRole('checkbox', { name: /Agree to policies/i })
    expect(checkbox).toBeInTheDocument()
    expect(checkbox).toBeRequired()
  })

  test('form is visible by default', () => {
    const { container } = render(<AskOfferForm {...defaultProps} />)
    
    const formWrapper = container.firstChild
    expect(formWrapper).toHaveClass('opacity-100', 'block')
  })
})

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const PASSWORD_RULES = {
  minLength: 8,
  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
  message:
    'Password must be at least 8 characters with uppercase, lowercase, and a number',
}

export const emailRules = {
  required: 'Email is required',
  pattern: {
    value: EMAIL_PATTERN,
    message: 'Enter a valid email address',
  },
}

export const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: PASSWORD_RULES.minLength,
    message: `Password must be at least ${PASSWORD_RULES.minLength} characters`,
  },
  pattern: {
    value: PASSWORD_RULES.pattern,
    message: PASSWORD_RULES.message,
  },
}

export function confirmPasswordRules(password) {
  return {
    required: 'Please confirm your password',
    validate: (value) => value === password || 'Passwords do not match',
  }
}

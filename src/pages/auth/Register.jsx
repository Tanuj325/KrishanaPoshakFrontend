import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { FiUserPlus } from 'react-icons/fi'
import AuthAlert from '../../components/auth/AuthAlert'
import AuthCard from '../../components/auth/AuthCard'
import FormField from '../../components/auth/FormField'
import PasswordInput from '../../components/auth/PasswordInput'
import { AUTH_ROUTES } from '../../config/auth'
import { useAuth } from '../../hooks/useAuth'
import {
  confirmPasswordRules,
  emailRules,
  passwordRules,
} from '../../utils/validation'

function Register() {
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
  })

  const password = watch('password')

  const onSubmit = async (values) => {
    setFormError('')
    setIsSubmitting(true)

    try {
      await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      navigate('/', { replace: true })
    } catch (error) {
      setFormError(error.message || 'Unable to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      eyebrow="Join Us"
      title="Create your account"
      description="Register to save your details, track orders, and shop with ease."
      footer={
        <>
          Already have an account?{' '}
          <Link to={AUTH_ROUTES.login} className="font-bold text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <AuthAlert message={formError} />

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="First Name"
            placeholder="Radha"
            required
            error={errors.firstName}
            registration={register('firstName', {
              required: 'First name is required',
              minLength: { value: 2, message: 'Enter at least 2 characters' },
            })}
          />
          <FormField
            id="lastName"
            label="Last Name"
            placeholder="Sharma"
            required
            error={errors.lastName}
            registration={register('lastName', {
              required: 'Last name is required',
              minLength: { value: 2, message: 'Enter at least 2 characters' },
            })}
          />
        </div>

        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="radha@example.com"
          required
          error={errors.email}
          registration={register('email', emailRules)}
        />

        <PasswordInput
          id="password"
          label="Password"
          placeholder="Create a strong password"
          required
          error={errors.password}
          registration={register('password', passwordRules)}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm Password"
          placeholder="Re-enter your password"
          required
          error={errors.confirmPassword}
          registration={register('confirmPassword', confirmPasswordRules(password))}
        />

        <label className="flex items-start gap-3 text-sm leading-6 text-muted">
          <input
            type="checkbox"
            className="mt-1 size-4 rounded border-border accent-primary"
            {...register('acceptTerms', {
              required: 'You must accept the terms to continue',
            })}
          />
          <span>
            I agree to the terms of service and privacy policy for devotional
            shopping on this platform.
          </span>
        </label>
        {errors.acceptTerms ? (
          <span className="-mt-3 text-xs font-semibold text-red-500">
            {errors.acceptTerms.message}
          </span>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            'Creating account...'
          ) : (
            <>
              <FiUserPlus className="size-5" />
              Create Account
            </>
          )}
        </button>
      </form>
    </AuthCard>
  )
}

export default Register

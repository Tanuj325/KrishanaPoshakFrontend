import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FiKey } from 'react-icons/fi'
import AuthAlert from '../../components/auth/AuthAlert'
import AuthCard from '../../components/auth/AuthCard'
import PasswordInput from '../../components/auth/PasswordInput'
import { AUTH_ROUTES } from '../../config/auth'
import { useAuth } from '../../hooks/useAuth'
import { confirmPasswordRules, passwordRules } from '../../utils/validation'

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const { resetPassword } = useAuth()
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  const password = watch('password')

  const onSubmit = async (values) => {
    if (!token) {
      setFormError('Reset token is missing. Please use the link from your email.')
      return
    }

    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      const response = await resetPassword({
        token,
        password: values.password,
      })
      setSuccessMessage(response.message)
      setTimeout(() => navigate(AUTH_ROUTES.login, { replace: true }), 1500)
    } catch (error) {
      setFormError(error.message || 'Unable to reset password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <AuthCard
        eyebrow="Invalid Link"
        title="Reset link expired"
        description="This password reset link is missing or invalid. Request a new one below."
        footer={
          <Link to={AUTH_ROUTES.forgotPassword} className="font-bold text-primary hover:underline">
            Request new reset link
          </Link>
        }
      >
        <AuthAlert message="No reset token found in the URL." />
      </AuthCard>
    )
  }

  return (
    <AuthCard
      eyebrow="Secure Reset"
      title="Create a new password"
      description="Choose a strong password to protect your devotional shopping account."
      footer={
        <>
          Back to{' '}
          <Link to={AUTH_ROUTES.login} className="font-bold text-primary hover:underline">
            sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <AuthAlert message={formError} />
        <AuthAlert type="success" message={successMessage} />

        <PasswordInput
          id="password"
          label="New Password"
          placeholder="Create a new password"
          required
          error={errors.password}
          registration={register('password', passwordRules)}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          required
          error={errors.confirmPassword}
          registration={register('confirmPassword', confirmPasswordRules(password))}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            'Updating password...'
          ) : (
            <>
              <FiKey className="size-5" />
              Reset Password
            </>
          )}
        </button>
      </form>
    </AuthCard>
  )
}

export default ResetPassword

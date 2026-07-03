import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { FiMail } from 'react-icons/fi'
import AuthAlert from '../../components/auth/AuthAlert'
import AuthCard from '../../components/auth/AuthCard'
import FormField from '../../components/auth/FormField'
import { AUTH_ROUTES, USE_DUMMY_AUTH } from '../../config/auth'
import { useAuth } from '../../hooks/useAuth'
import { emailRules } from '../../utils/validation'

function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [resetLink, setResetLink] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '' },
  })

  const onSubmit = async (values) => {
    setFormError('')
    setSuccessMessage('')
    setResetLink('')
    setIsSubmitting(true)

    try {
      const response = await forgotPassword({ email: values.email })
      setSuccessMessage(response.message)

      if (USE_DUMMY_AUTH && response.resetToken) {
        setResetLink(
          `${AUTH_ROUTES.resetPassword}?token=${encodeURIComponent(response.resetToken)}`,
        )
      }
    } catch (error) {
      setFormError(error.message || 'Unable to process your request.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      eyebrow="Account Recovery"
      title="Forgot your password?"
      description="Enter your email and we will send instructions to reset your password."
      footer={
        <>
          Remembered your password?{' '}
          <Link to={AUTH_ROUTES.login} className="font-bold text-primary hover:underline">
            Back to sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <AuthAlert message={formError} />
        <AuthAlert type="success" message={successMessage} />

        {resetLink ? (
          <div className="rounded-card border border-border bg-background p-4 text-xs leading-6 text-muted">
            <p className="font-bold text-ink">Dummy mode reset link</p>
            <p className="mt-2 break-all">
              <Link to={resetLink} className="text-primary">
                {window.location.origin}
                {resetLink}
              </Link>
            </p>
          </div>
        ) : null}

        <FormField
          id="email"
          label="Email Address"
          type="email"
          placeholder="radha@example.com"
          required
          error={errors.email}
          registration={register('email', emailRules)}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            'Sending instructions...'
          ) : (
            <>
              <FiMail className="size-5" />
              Send Reset Link
            </>
          )}
        </button>
      </form>
    </AuthCard>
  )
}

export default ForgotPassword

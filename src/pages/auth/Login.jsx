import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiLock, FiLogIn } from 'react-icons/fi'
import AuthAlert from '../../components/auth/AuthAlert'
import AuthCard from '../../components/auth/AuthCard'
import FormField from '../../components/auth/FormField'
import PasswordInput from '../../components/auth/PasswordInput'
import { AUTH_ROUTES } from '../../config/auth'
import { useAuth } from '../../hooks/useAuth'
import { emailRules, passwordRules } from '../../utils/validation'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, rememberedEmail } = useAuth()
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: rememberedEmail,
      password: '',
      rememberMe: Boolean(rememberedEmail),
    },
  })

  const onSubmit = async (values) => {
    setFormError('')
    setIsSubmitting(true)

    try {
      await login(values)
      const redirectTo = location.state?.from?.pathname || '/'
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setFormError(error.message || 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthCard
      eyebrow="Welcome Back"
      title="Sign in to your account"
      description="Access your orders, saved details, and a faster checkout experience."
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to={AUTH_ROUTES.register} className="font-bold text-primary hover:underline">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5">
        <AuthAlert message={formError} />

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
          required
          error={errors.password}
          registration={register('password', passwordRules)}
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
            <input
              type="checkbox"
              className="size-4 rounded border-border accent-primary"
              {...register('rememberMe')}
            />
            Remember me
          </label>
          <Link
            to={AUTH_ROUTES.forgotPassword}
            className="text-sm font-bold text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            'Signing in...'
          ) : (
            <>
              <FiLogIn className="size-5" />
              Sign In
            </>
          )}
        </button>

        <div className="rounded-card border border-border bg-background p-4 text-xs leading-6 text-muted">
          <p className="inline-flex items-center gap-2 font-bold text-ink">
            <FiLock className="size-3.5 text-primary" />
            Demo account
          </p>
          <p className="mt-2">
            Email: <span className="font-semibold text-ink">radha@example.com</span>
          </p>
          <p>
            Password: <span className="font-semibold text-ink">Password1</span>
          </p>
        </div>
      </form>
    </AuthCard>
  )
}

export default Login

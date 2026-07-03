import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { FiEye, FiEyeOff, FiLock, FiLogIn } from 'react-icons/fi'

import AuthCard from '../../components/auth/AuthCard'
import FormField from '../../components/auth/FormField'
import PasswordInput from '../../components/auth/PasswordInput'
import AuthAlert from '../../components/auth/AuthAlert'
import { useAdminAuth } from '../../context/AdminAuthContext/AdminAuthContext'

const DEMO_EMAIL = 'admin@example.com'
const DEMO_PASSWORD = 'Admin@123'

export default function AdminLogin() {
  const navigate = useNavigate()
  const location = useLocation()

  const { loginAsAdmin, rememberedEmail, isAuthenticated } = useAdminAuth()

  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
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
      await loginAsAdmin({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      })

      const redirectTo =
        location.state?.from?.pathname || '/admin/dashboard'

      navigate(redirectTo, { replace: true })
    } catch (err) {
      setFormError(err?.message || 'Unable to sign in. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Already logged in → Dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const password = watch('password')

  return (
    <AuthCard
      eyebrow="Admin Access"
      title="Sign in to admin"
      description="Manage products, orders and settings."
      footer={
        <div className="rounded-card border border-border bg-background p-4 text-xs leading-6 text-muted">
          <p className="inline-flex items-center gap-2 font-bold text-ink">
            <FiLock className="size-3.5 text-primary" />
            Demo credentials
          </p>

          <p className="mt-2">
            Email:{' '}
            <span className="font-semibold text-ink">
              {DEMO_EMAIL}
            </span>
          </p>

          <p>
            Password:{' '}
            <span className="font-semibold text-ink">
              {DEMO_PASSWORD}
            </span>
          </p>
        </div>
      }
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="grid gap-5"
      >
        <AuthAlert message={formError} />

        <FormField
          id="admin-email"
          label="Email"
          type="email"
          placeholder="admin@example.com"
          required
          error={errors.email}
          registration={register('email', {
            required: 'Email is required',
            pattern: {
              value: /.+@.+\..+/,
              message: 'Enter a valid email address',
            },
          })}
        />

        <label
          className="grid gap-2"
          htmlFor="admin-password"
        >
          <div className="relative">
            <PasswordInput
              id="admin-password"
              label="Password"
              required
              registration={register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters',
                },
              })}
              error={errors.password}
              showPassword={showPassword}
            />

            
          </div>

          {errors.password && (
            <span className="text-xs font-semibold text-red-500">
              {errors.password.message}
            </span>
          )}
        </label>

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
            to="#"
            className="text-sm font-bold text-primary hover:underline"
            onClick={(e) => e.preventDefault()}
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
              Login
            </>
          )}
        </button>

        <div className="text-xs text-muted">
          <span className="font-bold text-ink">
            Note:
          </span>{' '}
          JWT support is prepared—swap
          <code> loginAsAdmin </code>
          to call Spring Boot and store tokens.
        </div>
      </form>
    </AuthCard>
  )
}
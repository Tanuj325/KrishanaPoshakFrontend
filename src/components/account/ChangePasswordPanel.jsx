import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiKey } from 'react-icons/fi'
import AuthAlert from '../auth/AuthAlert'
import PasswordInput from '../auth/PasswordInput'
import {
  confirmPasswordRules,
  passwordRules,
} from '../../utils/validation'

function ChangePasswordPanel({ onSave, onCancel }) {
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const newPassword = watch('newPassword')

  const onSubmit = async (values) => {
    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      await onSave({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
      setSuccessMessage('Password changed successfully.')
      reset()
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-full bg-primary/10 text-primary">
          <FiKey className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-extrabold text-ink">Change Password</h2>
          <p className="mt-1 text-sm text-muted">
            Use a strong password with letters, numbers, and symbols.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5">
        <AuthAlert message={formError} />
        <AuthAlert type="success" message={successMessage} />

        <PasswordInput
          id="currentPassword"
          label="Current Password"
          required
          error={errors.currentPassword}
          registration={register('currentPassword', {
            required: 'Current password is required',
          })}
        />

        <PasswordInput
          id="newPassword"
          label="New Password"
          placeholder="Create a new password"
          required
          error={errors.newPassword}
          registration={register('newPassword', passwordRules)}
        />

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          placeholder="Re-enter your new password"
          required
          error={errors.confirmPassword}
          registration={register('confirmPassword', confirmPasswordRules(newPassword))}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Updating...' : 'Update Password'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default ChangePasswordPanel

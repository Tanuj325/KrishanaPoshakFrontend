import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiCamera } from 'react-icons/fi'
import AuthAlert from '../auth/AuthAlert'
import FormField from '../auth/FormField'
import { emailRules } from '../../utils/validation'

function EditProfilePanel({ user, onSave, onCancel }) {
  const fileInputRef = useRef(null)
  const [previewImage, setPreviewImage] = useState(user.profilePicture || '')
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    },
  })

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => setPreviewImage(String(reader.result))
    reader.readAsDataURL(file)
  }

  const onSubmit = async (values) => {
    setFormError('')
    setSuccessMessage('')
    setIsSubmitting(true)

    try {
      await onSave({
        ...values,
        profilePicture: previewImage,
      })
      setSuccessMessage('Profile updated successfully.')
    } catch (error) {
      setFormError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`

  return (
    <section className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6">
      <h2 className="text-xl font-extrabold text-ink">Edit Profile</h2>
      <p className="mt-1 text-sm text-muted">
        Update your photo and personal information.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-5">
        <AuthAlert message={formError} />
        <AuthAlert type="success" message={successMessage} />

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <div className="relative">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile preview"
                className="size-24 rounded-full border-4 border-secondary object-cover shadow-premium"
              />
            ) : (
              <span className="grid size-24 place-items-center rounded-full border-4 border-secondary bg-primary/10 text-3xl font-extrabold text-primary shadow-premium">
                {initials}
              </span>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 grid size-9 place-items-center rounded-full border border-border bg-secondary text-primary shadow-premium transition hover:border-primary"
              aria-label="Change profile picture"
            >
              <FiCamera className="size-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-ink">Profile Picture</p>
            <p className="mt-1 text-sm text-muted">
              Upload a JPG or PNG image. Recommended size 400×400px.
            </p>
            {previewImage ? (
              <button
                type="button"
                className="mt-3 text-sm font-bold text-primary hover:underline"
                onClick={() => setPreviewImage('')}
              >
                Remove photo
              </button>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="First Name"
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
          required
          error={errors.email}
          registration={register('email', emailRules)}
        />

        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          error={errors.phone}
          registration={register('phone', {
            pattern: {
              value: /^[\d\s+\-()]{10,}$/,
              message: 'Enter a valid phone number',
            },
          })}
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditProfilePanel

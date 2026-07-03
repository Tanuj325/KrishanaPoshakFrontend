import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AuthAlert from '../auth/AuthAlert'
import FormField from '../auth/FormField'
import { ADDRESS_LABELS } from '../../utils/addressStorage'

const emptyValues = {
  label: 'Home',
  name: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pinCode: '',
  country: 'India',
  isDefault: false,
}

function AddressForm({ address, onSubmit, onCancel, isSubmitting, formError }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: emptyValues,
  })

  useEffect(() => {
    reset(
      address
        ? {
            label: address.label,
            name: address.name,
            phone: address.phone,
            line1: address.line1,
            line2: address.line2 || '',
            city: address.city,
            state: address.state,
            pinCode: address.pinCode,
            country: address.country || 'India',
            isDefault: address.isDefault,
          }
        : emptyValues,
    )
  }, [address, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-4">
      <AuthAlert message={formError} />

      <label className="grid gap-2">
        <span className="text-sm font-bold text-ink">
          Address Label<span className="text-primary"> *</span>
        </span>
        <select
          className="h-12 w-full rounded-full border border-border bg-background px-4 text-sm font-medium text-ink outline-none transition focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
          {...register('label', { required: 'Label is required' })}
        >
          {ADDRESS_LABELS.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        {errors.label ? (
          <span className="text-xs font-semibold text-red-500">
            {errors.label.message}
          </span>
        ) : null}
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="name"
          label="Full Name"
          required
          error={errors.name}
          registration={register('name', { required: 'Name is required' })}
        />
        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          required
          error={errors.phone}
          registration={register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^[\d\s+\-()]{10,}$/,
              message: 'Enter a valid phone number',
            },
          })}
        />
      </div>

      <FormField
        id="line1"
        label="Address Line 1"
        placeholder="House number, street, area"
        required
        error={errors.line1}
        registration={register('line1', { required: 'Address is required' })}
      />

      <FormField
        id="line2"
        label="Address Line 2"
        placeholder="Landmark, apartment, floor (optional)"
        error={errors.line2}
        registration={register('line2')}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="city"
          label="City"
          required
          error={errors.city}
          registration={register('city', { required: 'City is required' })}
        />
        <FormField
          id="state"
          label="State"
          required
          error={errors.state}
          registration={register('state', { required: 'State is required' })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="pinCode"
          label="PIN Code"
          required
          error={errors.pinCode}
          registration={register('pinCode', {
            required: 'PIN code is required',
            pattern: {
              value: /^\d{6}$/,
              message: 'Enter a valid 6-digit PIN code',
            },
          })}
        />
        <FormField
          id="country"
          label="Country"
          required
          error={errors.country}
          registration={register('country', { required: 'Country is required' })}
        />
      </div>

      <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink">
        <input
          type="checkbox"
          className="size-4 rounded border-border accent-primary"
          {...register('isDefault')}
        />
        Set as default address
      </label>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? 'Saving...' : address ? 'Update Address' : 'Save Address'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default AddressForm

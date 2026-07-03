import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { createCoupon } from './couponsStorage'

function toNumber(v) {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isNaN(n) ? undefined : n
}

export default function AddCouponForm({ onCancel, onCreated }) {
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      code: '',
      discount: '',
      expiryDate: '',
      minPurchase: '',
      maxDiscount: '',
      status: 'Active',
    },
  })

  const onSubmit = async (values) => {
    setSubmitError('')
    setSubmitting(true)
    try {
      await createCoupon({
        code: values.code.trim().toUpperCase(),
        discount: toNumber(values.discount),
        expiryDate: values.expiryDate ? new Date(values.expiryDate).toISOString() : null,
        minPurchase: toNumber(values.minPurchase),
        maxDiscount: toNumber(values.maxDiscount),
        status: values.status,
        createdAt: new Date().toISOString(),
      })
      await onCreated?.()
    } catch (e) {
      setSubmitError(e?.message || 'Unable to create coupon')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-2">
      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Coupon Code</span>
        <input
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('code', { required: 'Coupon code is required' })}
          placeholder="e.g. RADHA10"
        />
        {errors.code ? <span className="text-xs font-semibold text-red-500">{errors.code.message}</span> : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Discount (%)</span>
        <input
          type="number"
          step="1"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('discount', { required: 'Discount is required' })}
        />
        {errors.discount ? (
          <span className="text-xs font-semibold text-red-500">{errors.discount.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Expiry Date</span>
        <input
          type="date"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('expiryDate', { required: 'Expiry date is required' })}
        />
        {errors.expiryDate ? (
          <span className="text-xs font-semibold text-red-500">{errors.expiryDate.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Minimum Purchase</span>
        <input
          type="number"
          step="0.01"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('minPurchase', { required: 'Minimum purchase is required' })}
        />
        {errors.minPurchase ? (
          <span className="text-xs font-semibold text-red-500">{errors.minPurchase.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Maximum Discount</span>
        <input
          type="number"
          step="0.01"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('maxDiscount', { required: 'Maximum discount is required' })}
        />
        {errors.maxDiscount ? (
          <span className="text-xs font-semibold text-red-500">{errors.maxDiscount.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Status</span>
        <select
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('status')}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </label>

      {submitError ? <div className="lg:col-span-2 text-sm font-semibold text-red-500">{submitError}</div> : null}

      <div className="flex flex-col gap-2 lg:col-span-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Coupon'}
        </button>
      </div>
    </form>
  )
}


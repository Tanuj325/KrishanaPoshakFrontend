import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUpload } from 'react-icons/fi'
import { getProductById, updateProduct } from '../../../services/productService'

function toNumber(v) {
  const n = typeof v === 'number' ? v : Number(v)
  return Number.isNaN(n) ? undefined : n
}

export default function EditProductForm({ productId, onCancel, onUpdated }) {
  const [loading, setLoading] = useState(true)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const [imageFile, setImageFile] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      price: '',
      discount: '',
      stock: '',
      status: 'Active',
      image: '',
    },
  })

  const imageLabel = useMemo(() => {
    if (imageFile) return imageFile.name
    return 'Current image (unchanged unless you upload)'
  }, [imageFile])

  useEffect(() => {
    let alive = true
    const load = async () => {
      setLoading(true)
      setSubmitError('')
      try {
        const p = await getProductById(productId)
        if (!alive) return
        reset({
          name: p?.name ?? p?.productName ?? '',
          category: p?.category ?? '',
          price: p?.priceValue ?? p?.price ?? '',
          discount: p?.discount ?? '',
          stock: p?.stock ?? p?.quantity ?? '',
          status: p?.status ?? 'Active',
          image: p?.image ?? '',
        })
      } catch (e) {
        if (!alive) return
        setSubmitError(e?.message || 'Unable to load product')
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
    }
  }, [productId, reset])

  const onSubmit = async (values) => {
    setSubmitError('')
    setSubmitting(true)
    try {
      let payload = {
        name: values.name,
        category: values.category,
        price: toNumber(values.price),
        discount: toNumber(values.discount),
        stock: toNumber(values.stock),
        status: values.status,
      }

      if (imageFile) {
        const base64 = await new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onerror = () => reject(new Error('Failed to read image'))
          reader.onload = () => resolve(String(reader.result))
          reader.readAsDataURL(imageFile)
        })
        payload = { ...payload, image: base64 }
      }

      await updateProduct(productId, payload)
      await onUpdated?.()
    } catch (e) {
      setSubmitError(e?.message || 'Unable to update product')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="rounded-3xl border border-border bg-background p-10 text-center text-sm font-bold text-muted">
        Loading...
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <div className="grid gap-2">
          <label className="text-xs font-bold text-muted">Product Image</label>
          <div className="flex items-center gap-3 rounded-3xl border border-border bg-background p-4">
            <FiUpload className="size-5 text-primary" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-bold text-ink truncate">{imageLabel}</div>
              <div className="text-xs font-semibold text-muted">Upload to replace image (optional)</div>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="block w-full text-sm"
            />
          </div>
        </div>
      </div>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Product Name</span>
        <input
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('name', { required: 'Product name is required' })}
        />
        {errors.name ? <span className="text-xs font-semibold text-red-500">{errors.name.message}</span> : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Category</span>
        <input
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('category', { required: 'Category is required' })}
        />
        {errors.category ? (
          <span className="text-xs font-semibold text-red-500">{errors.category.message}</span>
        ) : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Price</span>
        <input
          type="number"
          step="0.01"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('price', { required: 'Price is required' })}
        />
        {errors.price ? <span className="text-xs font-semibold text-red-500">{errors.price.message}</span> : null}
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Discount (%)</span>
        <input
          type="number"
          step="1"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('discount')}
        />
      </label>

      <label className="grid gap-2">
        <span className="text-xs font-bold text-muted">Stock</span>
        <input
          type="number"
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('stock', { required: 'Stock is required' })}
        />
        {errors.stock ? <span className="text-xs font-semibold text-red-500">{errors.stock.message}</span> : null}
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

      {submitError ? (
        <div className="lg:col-span-2 text-sm font-semibold text-red-500">{submitError}</div>
      ) : null}

      <div className="flex flex-col gap-2 lg:col-span-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}


import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUpload } from 'react-icons/fi'
import { createCategory } from '../../../services/categoryService'

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read image'))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })
}

export default function AddCategoryForm({ onCancel, onCreated }) {
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      status: 'Active',
    },
  })

  const imageLabel = useMemo(() => {
    if (!imageFile) return 'No file chosen'
    return imageFile.name
  }, [imageFile])

  const onSubmit = async (values) => {
    setSubmitError('')
    setSubmitting(true)

    try {
      let payload = {
        name: values.name,
        description: values.description,
        status: values.status,
      }

      if (imageFile) {
        payload = { ...payload, image: await toBase64(imageFile) }
      }

      await createCategory(payload)
      await onCreated?.()
    } catch (e) {
      setSubmitError(e?.message || 'Unable to create category')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-2">
      <div className="lg:col-span-2">
        <div className="grid gap-2">
          <label className="text-xs font-bold text-muted">Category Image</label>
          <div className="flex items-center gap-3 rounded-3xl border border-border bg-background p-4">
            <FiUpload className="size-5 text-primary" />
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-bold text-ink">{imageLabel}</div>
              <div className="text-xs font-semibold text-muted">Upload an image (optional)</div>
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
        <span className="text-xs font-bold text-muted">Category Name</span>
        <input
          className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('name', { required: 'Category name is required' })}
        />
        {errors.name ? <span className="text-xs font-semibold text-red-500">{errors.name.message}</span> : null}
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

      <label className="grid gap-2 lg:col-span-2">
        <span className="text-xs font-bold text-muted">Description</span>
        <textarea
          rows={4}
          className="rounded-3xl border border-border bg-background p-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
          {...register('description')}
        />
      </label>

      {submitError ? <div className="lg:col-span-2 text-sm font-semibold text-red-500">{submitError}</div> : null}

      <div className="flex flex-col gap-2 lg:col-span-2 sm:flex-row sm:justify-end">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={submitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Category'}
        </button>
      </div>
    </form>
  )
}


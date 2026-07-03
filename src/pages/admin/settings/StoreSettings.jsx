import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUpload } from 'react-icons/fi'
import { loadStoreSettings, saveStoreSettings } from './storeSettingsStorage'

function toDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.onload = () => resolve(String(reader.result))
    reader.readAsDataURL(file)
  })
}

export default function StoreSettings() {
  const defaultValues = useMemo(() => loadStoreSettings(), [])
  const [logoFile, setLogoFile] = useState(null)
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues,
  })

  const watchLogo = watch('storeLogo')

  const onSubmit = async (values) => {
    setSubmitError('')
    setSubmitting(true)
    try {
      let payload = {
        ...values,
        social: {
          facebook: values.socialFacebook,
          instagram: values.socialInstagram,
          youtube: values.socialYoutube,
          twitter: values.socialTwitter,
        },
      }

      delete payload.socialFacebook
      delete payload.socialInstagram
      delete payload.socialYoutube
      delete payload.socialTwitter

      if (logoFile) {
        const dataUrl = await toDataUrl(logoFile)
        payload.storeLogo = dataUrl
      }

      saveStoreSettings(payload)
    } catch (e) {
      setSubmitError(e?.message || 'Unable to save settings')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-sm font-extrabold text-ink">Store Settings</div>
            <div className="text-xs font-semibold text-muted">Update store branding and contact details.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <div className="grid gap-2">
              <span className="text-xs font-bold text-muted">Store Logo</span>
              <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {watchLogo ? (
                    <img
                      src={watchLogo}
                      alt="Store logo"
                      className="size-14 rounded-xl border border-border bg-background object-contain"
                    />
                  ) : (
                    <div className="flex size-14 items-center justify-center rounded-xl border border-border bg-background text-xs font-bold text-muted">
                      No logo
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-ink">Upload Store Logo</div>
                    <div className="text-xs font-semibold text-muted">Recommended: 512x512 PNG/JPG</div>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-3 rounded-3xl border border-border bg-background px-4 py-3">
                    <FiUpload className="size-5 text-primary" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Store Name</span>
            <input
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('storeName', { required: 'Store name is required' })}
            />
            {errors.storeName ? <span className="text-xs font-semibold text-red-500">{errors.storeName.message}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Owner Name</span>
            <input
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('ownerName', { required: 'Owner name is required' })}
            />
            {errors.ownerName ? <span className="text-xs font-semibold text-red-500">{errors.ownerName.message}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Email</span>
            <input
              type="email"
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email ? <span className="text-xs font-semibold text-red-500">{errors.email.message}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Phone Number</span>
            <input
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('phone', { required: 'Phone is required' })}
            />
            {errors.phone ? <span className="text-xs font-semibold text-red-500">{errors.phone.message}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">WhatsApp Number</span>
            <input
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('whatsappNumber', { required: 'WhatsApp number is required' })}
            />
            {errors.whatsappNumber ? (
              <span className="text-xs font-semibold text-red-500">{errors.whatsappNumber.message}</span>
            ) : null}
          </label>

          <label className="grid gap-2 lg:col-span-2">
            <span className="text-xs font-bold text-muted">Business Address</span>
            <textarea
              rows={4}
              className="rounded-3xl border border-border bg-background px-4 py-3 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('businessAddress', { required: 'Business address is required' })}
            />
            {errors.businessAddress ? (
              <span className="text-xs font-semibold text-red-500">{errors.businessAddress.message}</span>
            ) : null}
          </label>

          <div className="lg:col-span-2 rounded-3xl border border-border bg-background p-4">
            <div className="mb-3 text-xs font-bold text-muted">Social Media Links</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-xs font-semibold text-muted">Facebook</span>
                <input
                  className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  defaultValue={defaultValues.social.facebook}
                  {...register('socialFacebook')}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold text-muted">Instagram</span>
                <input
                  className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  defaultValue={defaultValues.social.instagram}
                  {...register('socialInstagram')}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold text-muted">YouTube</span>
                <input
                  className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  defaultValue={defaultValues.social.youtube}
                  {...register('socialYoutube')}
                />
              </label>

              <label className="grid gap-2">
                <span className="text-xs font-semibold text-muted">Twitter</span>
                <input
                  className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  defaultValue={defaultValues.social.twitter}
                  {...register('socialTwitter')}
                />
              </label>
            </div>
          </div>

          <label className="grid gap-2">
            <span className="text-xs font-bold text-muted">Store Theme</span>
            <select
              className="h-11 rounded-full border border-border bg-background px-4 text-sm font-semibold text-ink outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              {...register('theme')}
            >
              <option value="Light">Light</option>
              <option value="Dark">Dark</option>
            </select>
          </label>

          <div className="lg:col-span-2 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save'}
            </button>
          </div>

          {submitError ? <div className="lg:col-span-2 text-sm font-semibold text-red-500">{submitError}</div> : null}
        </form>
      </div>
    </div>
  )
}


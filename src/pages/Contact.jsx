import { useState } from 'react'
import {
  FiCheckCircle,
  FiClock,
  FiExternalLink,
  FiInstagram,
  FiMail,
  FiMap,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSend,
} from 'react-icons/fi'
import { APP_NAME } from '../utils/constants'

const CONTACT = {
  phone: '+91 98765 43210',
  phoneHref: 'tel:+919876543210',
  email: 'support@krishanaposhak.com',
  emailHref: 'mailto:support@krishanaposhak.com',
  whatsappHref:
    'https://wa.me/919876543210?text=Hello%2C%20I%20would%20like%20to%20get%20in%20touch%20with%20Krishana%20Poshak.',
  mapsHref:
    'https://www.google.com/maps/search/?api=1&query=Vrindavan%2C+Uttar+Pradesh%2C+India',
  address: {
    line1: 'Krishna Poshak Studio',
    line2: 'Near Banke Bihari Temple Road',
    city: 'Vrindavan, Mathura District',
    state: 'Uttar Pradesh - 281121',
    country: 'India',
  },
  hours: 'Mon – Sat, 9:00 AM – 7:00 PM',
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/',
    icon: FiInstagram,
  },
  {
    label: 'WhatsApp',
    href: 'https://wa.me/919876543210',
    icon: FiMessageCircle,
  },
  {
    label: 'Email',
    href: CONTACT.emailHref,
    icon: FiMail,
  },
]

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState(initialFormState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validate = () => {
    const nextErrors = {}

    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Subject is required'
    if (!form.message.trim()) nextErrors.message = 'Message is required'

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 700))
    setIsSubmitted(true)
    setIsSubmitting(false)
    setForm(initialFormState)
  }

  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="max-w-3xl">
          <span className="eyebrow">Get in Touch</span>
          <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
            Contact {APP_NAME}
          </h1>
          <p className="mt-3 text-muted">
            Have a question about an order, custom poshak, or bulk gifting? We are
            here to help with a warm and devotional shopping experience.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
          <div className="grid gap-6">
            <div className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] sm:p-6">
              <div className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                  <FiSend className="size-5" />
                </span>
                <div>
                  <h2 className="text-xl font-extrabold text-ink">
                    Send us a message
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    Fill out the form and our team will respond within 24 hours.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="mt-6 rounded-card border border-green-200 bg-green-50 p-5 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-600">
                    <FiCheckCircle className="size-6" />
                  </span>
                  <p className="mt-4 text-base font-extrabold text-ink">
                    Message sent successfully
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    Thank you for reaching out. We will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm mt-5"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="mt-6 grid gap-4">
                  <FormField
                    label="Full Name"
                    placeholder="Radha Sharma"
                    value={form.name}
                    onChange={(value) => updateField('name', value)}
                    error={errors.name}
                    required
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      label="Email Address"
                      type="email"
                      placeholder="radha@example.com"
                      value={form.email}
                      onChange={(value) => updateField('email', value)}
                      error={errors.email}
                      required
                    />
                    <FormField
                      label="Phone Number"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(value) => updateField('phone', value)}
                      error={errors.phone}
                    />
                  </div>
                  <FormField
                    label="Subject"
                    placeholder="Order enquiry, custom size, bulk order..."
                    value={form.subject}
                    onChange={(value) => updateField('subject', value)}
                    error={errors.subject}
                    required
                  />
                  <label className="grid gap-2">
                    <span className="text-sm font-bold text-ink">
                      Message<span className="text-primary"> *</span>
                    </span>
                    <textarea
                      rows="5"
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(event) => updateField('message', event.target.value)}
                      className={`w-full resize-none rounded-2xl border bg-background px-4 py-3 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-secondary focus:ring-4 focus:ring-primary/10 ${
                        errors.message
                          ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
                          : 'border-border focus:border-primary'
                      }`}
                    />
                    {errors.message ? (
                      <span className="text-xs font-semibold text-red-500">
                        {errors.message}
                      </span>
                    ) : null}
                  </label>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-lg w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-fit"
                  >
                    <FiSend className="size-5" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            <MapPlaceholder />
          </div>

          <aside className="grid gap-5 lg:sticky lg:top-28">
            <InfoCard
              icon={FiMapPin}
              title="Business Address"
              description="Visit our studio in the sacred town of Vrindavan."
            >
              <address className="not-italic text-sm leading-7 text-ink">
                <p className="font-extrabold">{CONTACT.address.line1}</p>
                <p className="mt-1 font-medium text-muted">
                  {CONTACT.address.line2}
                  <br />
                  {CONTACT.address.city}
                  <br />
                  {CONTACT.address.state}
                  <br />
                  {CONTACT.address.country}
                </p>
              </address>
              <a
                href={CONTACT.mapsHref}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-700"
              >
                Open in Google Maps
                <FiExternalLink className="size-4" />
              </a>
            </InfoCard>

            <InfoCard icon={FiPhone} title="Contact Details">
              <div className="grid gap-3">
                <ContactLink
                  href={CONTACT.phoneHref}
                  icon={FiPhone}
                  label={CONTACT.phone}
                />
                <ContactLink
                  href={CONTACT.emailHref}
                  icon={FiMail}
                  label={CONTACT.email}
                />
                <div className="flex items-start gap-3 rounded-card bg-background p-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
                    <FiClock className="size-4" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">
                      Business Hours
                    </p>
                    <p className="mt-1 text-sm font-semibold text-ink">
                      {CONTACT.hours}
                    </p>
                  </div>
                </div>
              </div>
            </InfoCard>

            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="btn btn-lg w-full border border-green-200 bg-green-50 text-green-700 shadow-[0_10px_26px_rgb(34_197_94_/_0.12)] transition hover:-translate-y-0.5 hover:border-green-300 hover:bg-green-100"
            >
              <FiMessageCircle className="size-5" />
              Chat on WhatsApp
            </a>

            <InfoCard icon={FiInstagram} title="Social Media">
              <p className="text-sm leading-6 text-muted">
                Follow us for new arrivals, festival collections, and styling
                inspiration.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.href.startsWith('http') ? 'noreferrer' : undefined
                      }
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 text-sm font-bold text-ink transition hover:border-primary hover:text-primary"
                      aria-label={item.label}
                    >
                      <Icon className="size-4" />
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </InfoCard>
          </aside>
        </div>
      </div>
    </section>
  )
}

function MapPlaceholder() {
  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-border bg-secondary shadow-premium">
      <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-primary/10 text-primary">
            <FiMap className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-ink">Find us on the map</h2>
            <p className="text-sm text-muted">Vrindavan, Uttar Pradesh</p>
          </div>
        </div>
        <a
          href={CONTACT.mapsHref}
          target="_blank"
          rel="noreferrer"
          className="btn btn-secondary btn-sm hidden sm:inline-flex"
        >
          View on Google Maps
          <FiExternalLink className="size-4" />
        </a>
      </div>

      <div className="relative grid min-h-[16rem] place-items-center bg-[linear-gradient(135deg,#fff8f0_0%,#f0dec8_100%)] sm:min-h-[20rem]">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgb(36 22 10 / 0.06) 1px, transparent 1px), linear-gradient(90deg, rgb(36 22 10 / 0.06) 1px, transparent 1px)',
            backgroundSize: '2.5rem 2.5rem',
          }}
        />
        <div className="relative z-10 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary shadow-premium">
            <FiMapPin className="size-7" />
          </span>
          <p className="mt-4 text-base font-extrabold text-ink">
            Google Map Placeholder
          </p>
          <p className="mx-auto mt-2 max-w-sm px-4 text-sm text-muted">
            Embed your Google Maps iframe here once your studio location is
            confirmed.
          </p>
          <a
            href={CONTACT.mapsHref}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary btn-sm mt-5 sm:hidden"
          >
            View on Google Maps
          </a>
        </div>
      </div>
    </div>
  )
}

function InfoCard({ icon: Icon, title, description, children }) {
  return (
    <div className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6">
      <div className="flex gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-extrabold text-ink">{title}</h2>
          {description ? (
            <p className="mt-1 text-sm leading-6 text-muted">{description}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  )
}

function ContactLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      className="group flex items-center gap-3 rounded-card border border-border bg-background p-3 transition hover:border-primary"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-secondary">
        <Icon className="size-4" />
      </span>
      <span className="text-sm font-semibold text-ink">{label}</span>
    </a>
  )
}

function FormField({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={`h-12 w-full rounded-full border bg-background px-4 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-secondary focus:ring-4 focus:ring-primary/10 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-border focus:border-primary'
        }`}
      />
      {error ? (
        <span className="text-xs font-semibold text-red-500">{error}</span>
      ) : null}
    </label>
  )
}

export default Contact

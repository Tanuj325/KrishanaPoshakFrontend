import { NavLink } from 'react-router-dom'
import {
  FiHeadphones,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
} from 'react-icons/fi'
import { APP_NAME } from '../utils/constants'

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

const supportLinks = [
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'Returns & Exchanges', path: '/returns' },
  { label: 'Size Guide', path: '/size-guide' },
  { label: 'FAQs', path: '/faqs' },
]

const contactItems = [
  {
    label: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: FiPhone,
  },
  {
    label: 'support@krishanaposhak.com',
    href: 'mailto:support@krishanaposhak.com',
    icon: FiMail,
  },
  {
    label: 'Vrindavan, Uttar Pradesh',
    href: '/contact',
    icon: FiMapPin,
  },
]

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
    href: 'mailto:support@krishanaposhak.com',
    icon: FiMail,
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-ink text-secondary">
      <div className="bg-[radial-gradient(circle_at_top_left,rgb(255_122_0_/_0.18),transparent_26rem)]">
        <div className="app-container py-12 sm:py-14 lg:py-16">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1fr_1.1fr]">
            <div className="max-w-md">
              <NavLink
                to="/"
                className="group inline-flex items-center gap-3"
                aria-label={`${APP_NAME} home`}
              >
                <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-extrabold text-secondary shadow-glow transition-transform duration-200 group-hover:scale-105">
                  KP
                </span>
                <span>
                  <span className="block text-lg font-extrabold leading-tight">
                    {APP_NAME}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Divine Attire
                  </span>
                </span>
              </NavLink>

              <p className="mt-5 text-sm leading-7 text-secondary/68">
                Premium spiritual poshak and devotional essentials crafted for
                grace, tradition, and everyday devotion.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        item.href.startsWith('http')
                          ? 'noreferrer'
                          : undefined
                      }
                      className="grid size-11 place-items-center rounded-full border border-secondary/12 bg-secondary/8 text-secondary transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      aria-label={item.label}
                    >
                      <Icon className="size-5" />
                    </a>
                  )
                })}
              </div>
            </div>

            <FooterGroup title="Quick Links">
              {quickLinks.map((item) => (
                <FooterNavLink key={item.path} to={item.path}>
                  {item.label}
                </FooterNavLink>
              ))}
            </FooterGroup>

            <FooterGroup title="Customer Support">
              {supportLinks.map((item) => (
                <FooterNavLink key={item.path} to={item.path}>
                  {item.label}
                </FooterNavLink>
              ))}
            </FooterGroup>

            <FooterGroup title="Contact">
              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-start gap-3 text-sm leading-6 text-secondary/70 transition duration-200 hover:text-accent"
                    >
                      <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-secondary/8 text-accent transition duration-200 group-hover:bg-accent group-hover:text-ink">
                        <Icon className="size-4" />
                      </span>
                      <span>{item.label}</span>
                    </a>
                  )
                })}
              </div>

              <div className="mt-6 rounded-card border border-secondary/10 bg-secondary/8 p-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-secondary">
                    <FiHeadphones className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-secondary">
                      Need assistance?
                    </p>
                    <p className="text-xs text-secondary/60">
                      We are happy to help with orders.
                    </p>
                  </div>
                </div>
              </div>
            </FooterGroup>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-secondary/10 pt-6 text-sm text-secondary/58 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Copyright {currentYear} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <NavLink className="transition hover:text-accent" to="/privacy">
                Privacy Policy
              </NavLink>
              <NavLink className="transition hover:text-accent" to="/terms">
                Terms of Service
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterGroup({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-accent">
        {title}
      </h2>
      <div className="mt-5 grid gap-3">{children}</div>
    </div>
  )
}

function FooterNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className="w-fit text-sm font-medium text-secondary/70 transition duration-200 hover:translate-x-1 hover:text-accent"
    >
      {children}
    </NavLink>
  )
}

export default Footer

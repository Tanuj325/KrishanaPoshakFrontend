import { NavLink } from 'react-router-dom'
import {
  FiHeart,
  FiMapPin,
  FiPackage,
  FiUser,
} from 'react-icons/fi'
import { PROTECTED_ROUTES } from '../../config/auth'

const accountLinks = [
  { label: 'Profile', path: PROTECTED_ROUTES.profile, icon: FiUser },
  { label: 'My Orders', path: PROTECTED_ROUTES.orders, icon: FiPackage },
  { label: 'Wishlist', path: PROTECTED_ROUTES.wishlist, icon: FiHeart },
  {
    label: 'Saved Addresses',
    path: PROTECTED_ROUTES.addresses,
    icon: FiMapPin,
  },
]

function AccountNav() {
  return (
    <nav className="rounded-[1.25rem] border border-border bg-secondary p-3 shadow-premium">
      <p className="px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] text-muted">
        My Account
      </p>
      <div className="mt-1 grid gap-1">
        {accountLinks.map((item) => {
          const Icon = item.icon

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition',
                  isActive
                    ? 'bg-primary text-secondary shadow-glow'
                    : 'text-ink hover:bg-background hover:text-primary',
                ].join(' ')
              }
            >
              <Icon className="size-4" />
              {item.label}
            </NavLink>
          )
        })}
      </div>
    </nav>
  )
}

export default AccountNav

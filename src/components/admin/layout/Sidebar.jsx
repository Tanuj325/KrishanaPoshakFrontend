import { NavLink } from 'react-router-dom'
import {
  FiBookOpen,
  FiBox,
  FiClipboard,
  FiGrid,
  FiHash,
  FiHelpCircle,
  FiHome,
  FiPackage,
  FiSettings,
  FiStar,
  FiTag,
  FiUsers,
} from 'react-icons/fi'
import { HiOutlineCreditCard } from 'react-icons/hi'

const sidebarItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: FiHome },
  { label: 'Products', to: '/admin/products', icon: FiPackage },
  { label: 'Categories', to: '/admin/categories', icon: FiGrid },
  { label: 'Orders', to: '/admin/orders', icon: FiClipboard },
  { label: 'Customers', to: '/admin/customers', icon: FiUsers },
  { label: 'Coupons', to: '/admin/coupons', icon: FiTag },
  { label: 'Reports', to: '/admin/reports', icon: FiBookOpen },
  { label: 'Settings', to: '/admin/settings', icon: FiSettings },
]

export default function Sidebar({ onNavigate }) {
  return (
    <nav className="h-full w-full px-3 py-4">
      <ul className="space-y-1">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => onNavigate?.()}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold',
                    'transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary ring-1 ring-primary/30'
                      : 'text-ink/80 hover:bg-secondary hover:text-ink',
                  ].join(' ')
                }
              >
                <Icon className="size-4" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          )
        })}

        <li className="pt-3">
          <div className="text-xs font-bold uppercase tracking-wider text-muted">Admin</div>
        </li>

        <li>
          <button
            type="button"
            onClick={() => onNavigate?.('logout')}
            className="group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold text-ink/80 hover:bg-secondary hover:text-ink"
          >
            <FiHelpCircle className="size-4" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  )
}


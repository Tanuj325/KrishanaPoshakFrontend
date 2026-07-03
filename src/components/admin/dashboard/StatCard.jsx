import { FiBox, FiShoppingBag, FiTruck, FiUsers, FiDollarSign } from 'react-icons/fi'

const iconMap = {
  products: FiBox,
  orders: FiShoppingBag,
  pending: FiTruck,
  delivered: FiTruck,
  customers: FiUsers,
  revenue: FiDollarSign,
}

export default function StatCard({ label, value, variant = 'neutral', iconKey }) {
  const Icon = iconMap[iconKey] || FiBox

  return (
    <div className="relative rounded-3xl border border-border bg-background p-5 shadow-sm">
      {/* Icon */}
      <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>

      {/* Content */}
      <div className="pr-20">
        <p className="text-sm font-bold text-muted">
          {label}
        </p>

        <h2
          className="mt-2 text-2xl font-extrabold text-ink leading-snug break-all"
          title={value}
        >
          {value}
        </h2>
      </div>
    </div>
  )
}


import { FiPackage } from 'react-icons/fi'
import EmptyStatePage from '../components/ui/EmptyStatePage'

function EmptyOrders() {
  return (
    <EmptyStatePage
      icon={<FiPackage className="size-7" />}
      title="No orders yet"
      description="Once you place an order, it will appear here with payment and delivery status."
      primaryAction={{
        to: '/shop',
        label: 'Start Shopping',
        icon: null,
      }}
    />
  )
}

export default EmptyOrders


import { FiShoppingBag } from 'react-icons/fi'
import EmptyStatePage from '../components/ui/EmptyStatePage'


function EmptyCart() {
  return (
    <EmptyStatePage
      icon={<FiShoppingBag className="size-7" />}
      title="Your cart is empty"
      description="Add your favourite poshak, jewellery, and puja essentials to begin your order."
      primaryAction={{
        to: '/shop',
        label: 'Continue Shopping',
        icon: null,
      }}
      secondaryAction={{
        to: '/',
        label: 'Back to Home',
        icon: null,
      }}
    />
  )
}

export default EmptyCart


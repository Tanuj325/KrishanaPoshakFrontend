import { FiHeart } from 'react-icons/fi'
import EmptyStatePage from '../components/ui/EmptyStatePage'

function EmptyWishlist() {
  return (
    <EmptyStatePage
      icon={<FiHeart className="size-7" />}
      title="Your wishlist is empty"
      description="Tap the heart icon on any product to save it here for your next festival or gifting moment."
      primaryAction={{
        to: '/shop',
        label: 'Browse Collection',
        icon: null,
      }}
    />
  )
}

export default EmptyWishlist


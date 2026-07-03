import { motion } from 'framer-motion'
import { useAppContext } from '../../hooks/useAppContext'

function WishlistButton({ product, className = '', showLabel = false }) {
  const { isInWishlist, toggleWishlist } = useAppContext()
  const saved = isInWishlist(product.id)
  const label = saved ? 'Remove from wishlist' : 'Add to wishlist'

  return (
    <motion.button
      type="button"
      onClick={() => toggleWishlist(product)}
      whileTap={{ scale: 0.96 }}
      animate={saved ? { scale: 1.05 } : { scale: 1 }}
      transition={{ duration: 0.15 }}
      className={className}
      aria-label={label}
      aria-pressed={saved}
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-4 transition ${saved ? 'fill-primary text-primary' : 'fill-none'}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {showLabel ? <span>{saved ? 'Saved' : 'Wishlist'}</span> : null}
    </motion.button>
  )
}

export default WishlistButton


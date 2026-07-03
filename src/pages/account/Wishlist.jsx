import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2 } from 'react-icons/fi'
import EmptyWishlist from '../EmptyWishlist'
import AccountNav from '../../components/account/AccountNav'
import WishlistItem from '../../components/wishlist/WishlistItem'
import { useAppContext } from '../../hooks/useAppContext'


function Wishlist() {
  const {
    wishlistItems,
    wishlistCount,
    removeFromWishlist,
    moveToCart,
    clearWishlist,
  } = useAppContext()
  const [movingId, setMovingId] = useState(null)

  const handleMoveToCart = async (productId) => {
    setMovingId(productId)
    moveToCart(productId)
    setMovingId(null)
  }

  const handleClearWishlist = () => {
    const confirmed = window.confirm('Remove all items from your wishlist?')
    if (confirmed) clearWishlist()
  }

  return (
    <motion.section
      className="section-padding"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="app-container">
        <motion.div
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
        >

          <div className="max-w-3xl">
            <span className="eyebrow">Saved Favourites</span>
            <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">Wishlist</h1>
            <p className="mt-3 text-muted">
              {wishlistCount > 0
                ? `${wishlistCount} saved item${wishlistCount === 1 ? '' : 's'} ready for your next order.`
                : 'Save your favourite poshak and devotional pieces for later.'}
            </p>
          </div>

          {wishlistCount > 0 ? (
            <button
              type="button"
              onClick={handleClearWishlist}
              className="btn btn-secondary w-fit border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
            >
              <FiTrash2 className="size-4" />
              Empty Wishlist
            </button>
          ) : null}
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[16rem_1fr] lg:items-start">

          <div className="lg:sticky lg:top-28">
            <AccountNav />
          </div>

          {wishlistCount === 0 ? (
            <EmptyWishlist />
          ) : (
            <div className="grid gap-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {wishlistItems.map((item) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 12, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.99 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <WishlistItem
                      item={item}
                      onMoveToCart={handleMoveToCart}
                      onRemove={removeFromWishlist}
                      isMoving={movingId === item.product.id}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )

}

export default Wishlist

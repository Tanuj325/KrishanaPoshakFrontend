import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiShoppingBag, FiTrash2, FiZap } from 'react-icons/fi'


const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`

function WishlistItem({ item, onMoveToCart, onRemove, isMoving = false }) {
  const { product } = item
  const isInStock = product.inStock ?? true
  const productPath = `/product/${product.id}`

  return (
    <motion.article
      layout
      className="rounded-[1.25rem] border border-border bg-secondary p-4 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] sm:p-5"
      initial={{ opacity: 0, y: 10, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">

        <NavLink
          to={productPath}
          className="overflow-hidden rounded-card bg-background"
        >
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square size-full object-cover transition duration-300 hover:scale-105"
          />
        </NavLink>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                {product.category}
              </p>
              <NavLink
                to={productPath}
                className="mt-2 block text-xl font-extrabold text-ink transition hover:text-primary"
              >
                {product.name}
              </NavLink>
              <p className="mt-2 text-sm font-semibold text-muted">
                Rating: {product.rating}
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-xl font-extrabold text-primary">
                {product.price || formatPrice(product.priceValue)}
              </p>
              {product.oldPrice ? (
                <p className="text-sm font-semibold text-muted line-through">
                  {product.oldPrice}
                </p>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <span
              className={[
                'w-fit rounded-full px-3 py-1 text-xs font-bold',
                isInStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700',
              ].join(' ')}
            >
              {product.stockStatus || (isInStock ? 'In Stock' : 'Out of Stock')}
            </span>

            <div className="flex flex-col gap-2 xs:flex-row">
              <motion.button
                type="button"
                disabled={!isInStock || isMoving}
                whileTap={{ scale: 0.96 }}
                onClick={() => onMoveToCart(product.id)}
                className="btn btn-primary btn-sm disabled:cursor-not-allowed disabled:opacity-55"
              >
                <FiShoppingBag className="size-4" />
                {isMoving ? 'Moving...' : 'Move to Cart'}
              </motion.button>
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.15 }}>
                <NavLink to={productPath} className="btn btn-secondary btn-sm">
                  <FiZap className="size-4" />
                  View
                </NavLink>
              </motion.div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => onRemove(product.id)}
                className="btn btn-secondary btn-sm border-red-200 text-red-600 hover:border-red-300 hover:bg-red-50"
              >
                <FiTrash2 className="size-4" />
                Remove
              </motion.button>

            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}


export default WishlistItem

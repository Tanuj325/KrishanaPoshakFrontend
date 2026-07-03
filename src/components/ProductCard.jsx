import { NavLink, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { FiShoppingBag, FiStar, FiZap } from 'react-icons/fi'
import WishlistButton from './wishlist/WishlistButton'
import { useAppContext } from '../hooks/useAppContext'

function ProductCard({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useAppContext()
  const shouldReduceMotion = useReducedMotion()

  const isInStock = product.inStock ?? true
  const stockLabel = product.stockStatus || (isInStock ? 'In Stock' : 'Out of Stock')
  const productPath = product.id ? `/product/${product.id}` : '/shop'
  const handleBuyNow = () => {
    addToCart(product)
    navigate('/cart')
  }

  return (
    <motion.article
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      whileHover={shouldReduceMotion ? undefined : { y: -4, boxShadow: '0 18px 55px rgba(36,22,10,0.12)' }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.99 }}
      className="card card-interactive group relative flex h-full flex-col overflow-hidden"
    >
      <NavLink
        to={productPath}
        className="relative block aspect-[4/5] overflow-hidden bg-background"
        aria-label={`View ${product.name}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="size-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badge ? (
            <span className="rounded-full bg-secondary/94 px-3 py-1 text-xs font-bold text-primary shadow-[0_8px_18px_rgb(36_22_10_/_0.08)]">
              {product.badge}
            </span>
          ) : null}
          {product.discount ? (
            <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary shadow-glow">
              {product.discount}
            </span>
          ) : null}
        </div>

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="btn btn-primary min-h-11 w-full">
            <FiShoppingBag className="size-4" />
            View Details
          </span>
        </div>
      </NavLink>

      <WishlistButton
        product={product}
        className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-secondary/94 text-ink shadow-[0_8px_18px_rgb(36_22_10_/_0.08)] transition duration-200 hover:-translate-y-0.5 hover:bg-primary hover:text-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {product.category}
          </p>
          {/* <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-2.5 py-1 text-sm font-bold text-ink">
            <FiStar className="size-4 fill-accent text-accent" />
            {product.rating}
          </span> */}
        </div>

        <NavLink
          to={productPath}
          className="mt-3 block text-lg font-bold leading-snug text-ink transition hover:text-primary"
        >
          {product.name}
        </NavLink>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-xl font-extrabold text-primary">
              {product.price}
            </span>
            {product.oldPrice ? (
              <span className="text-sm font-semibold text-muted line-through">
                {product.oldPrice}
              </span>
            ) : null}
          </div>

          <span
            className={[
              'rounded-full px-3 py-1 text-xs font-bold',
              isInStock
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700',
            ].join(' ')}
          >
            {stockLabel}
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={!isInStock}
            onClick={() => addToCart(product)}
            className="btn btn-secondary min-h-11 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-55"
          >
            <FiShoppingBag className="size-4" />
            Add
          </button>
          <button
            type="button"
            disabled={!isInStock}
            onClick={handleBuyNow}
            className="btn btn-primary min-h-11 px-4 text-sm disabled:cursor-not-allowed disabled:opacity-55"
          >
            <FiZap className="size-4" />
            Buy Now
          </button>
        </div>
      </div>
    </motion.article>
  )
}

export default ProductCard

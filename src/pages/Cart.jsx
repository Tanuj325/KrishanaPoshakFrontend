import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMinus, FiPlus, FiTrash2, FiTruck } from 'react-icons/fi'
import EmptyCart from './EmptyCart'
import { useAppContext } from '../hooks/useAppContext'


const formatPrice = (amount) => `Rs. ${amount.toLocaleString('en-IN')}`

function Cart() {
  const {
    cartItems,
    cartSubtotal,
    cartTotalItems,
    cartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useAppContext()

  const shipping = cartSubtotal === 0 || cartSubtotal >= 2000 ? 0 : 99
  // const total = cartSubtotal + shipping

  if (cartItems.length === 0) {
    return <EmptyCart />
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
          <div>
            <span className="eyebrow">Shopping Cart</span>
            <h1 className="mt-3 text-4xl font-extrabold text-ink sm:text-5xl">
              Review your order
            </h1>
            <p className="mt-3 text-muted">
              {cartTotalItems} item{cartTotalItems === 1 ? '' : 's'} ready for
              checkout.
            </p>
          </div>
          <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
            <NavLink to="/shop" className="btn btn-secondary w-fit">
              Continue Shopping
            </NavLink>
          </motion.div>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_24rem] lg:items-start">
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {cartItems.map((item) => (
                <motion.article
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, y: 12, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.99 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.25rem] border border-border bg-secondary p-4 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)]"
                >
                  <div className="grid gap-4 sm:grid-cols-[8rem_1fr]">
                    <NavLink
                      to={item.product.id ? `/product/${item.product.id}` : '/shop'}
                      className="overflow-hidden rounded-card bg-background"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="aspect-square size-full object-cover transition duration-300 hover:scale-105"
                      />
                    </NavLink>

                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                            {item.product.category}
                          </p>
                          <NavLink
                            to={
                              item.product.id ? `/product/${item.product.id}` : '/shop'
                            }
                            className="mt-2 block text-xl font-extrabold text-ink transition hover:text-primary"
                          >
                            {item.product.name}
                          </NavLink>
                          <p className="mt-2 text-sm font-semibold text-muted">
                            Size: {item.selectedSize}
                          </p>
                        </div>

                        <div className="text-left md:text-right">
                          <p className="text-xl font-extrabold text-primary">
                            {formatPrice(item.product.priceValue)}
                          </p>
                          {item.product.oldPrice ? (
                            <p className="text-sm font-semibold text-muted line-through">
                              {item.product.oldPrice}
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex h-11 w-fit items-center rounded-full border border-border bg-background">
                          <motion.button
                            type="button"
                            whileHover={{ color: 'var(--color-primary)' }}
                            whileTap={{ scale: 0.96 }}
                            className="grid size-11 place-items-center text-ink transition hover:text-primary"
                            onClick={() => decreaseQuantity(item.cartId)}
                            aria-label={`Decrease quantity for ${item.product.name}`}
                          >
                            <FiMinus className="size-4" />
                          </motion.button>
                          <span className="min-w-10 text-center text-sm font-extrabold text-ink">
                            {item.quantity}
                          </span>
                          <motion.button
                            type="button"
                            whileHover={{ color: 'var(--color-primary)' }}
                            whileTap={{ scale: 0.96 }}
                            className="grid size-11 place-items-center text-ink transition hover:text-primary"
                            onClick={() => increaseQuantity(item.cartId)}
                            aria-label={`Increase quantity for ${item.product.name}`}
                          >
                            <FiPlus className="size-4" />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <p className="text-base font-extrabold text-ink">
                            {formatPrice(item.product.priceValue * item.quantity)}
                          </p>
                          <motion.button
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            className="grid size-10 place-items-center rounded-full border border-border text-muted transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => removeFromCart(item.cartId)}
                            aria-label={`Remove ${item.product.name}`}
                          >
                            <FiTrash2 className="size-4" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          <motion.aside
            className="rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium lg:sticky lg:top-28"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <h2 className="text-2xl font-extrabold text-ink">Order Summary</h2>

            <div className="mt-6 space-y-4 border-y border-border py-5">
              <SummaryRow label="Subtotal" value={formatPrice(cartSubtotal)} />
              <SummaryRow
                label="Shipping"
                value={shipping === 0 ? 'Free' : formatPrice(shipping)}
              />
              <div className="rounded-card bg-background p-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-muted">
                  <FiTruck className="size-4 text-primary" />
                  Free shipping on orders above Rs. 2,000.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between gap-4">
              <span className="text-lg font-extrabold text-ink">Total</span>
              <span className="text-3xl font-extrabold text-primary">
                {formatPrice(cartTotal)}

              </span>
            </div>

            <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.2 }}>
              <NavLink
                to="/checkout"
                className="btn btn-primary btn-lg mt-6 w-full"
              >
                Checkout
              </NavLink>
            </motion.div>

            <p className="mt-4 text-center text-xs leading-6 text-muted">
              Taxes and final delivery details are calculated at checkout.
            </p>
          </motion.aside>
        </div>
      </div>
    </motion.section>
  )

}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 text-sm">
      <span className="font-semibold text-muted">{label}</span>
      <span className="font-extrabold text-ink">{value}</span>
    </div>
  )
}

export default Cart

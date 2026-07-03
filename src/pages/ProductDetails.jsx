import { useMemo, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import {
  FiChevronLeft,
  FiMinus,
  FiMessageCircle,
  FiPlus,
  FiShoppingBag,
  FiStar,
  FiTruck,
  FiZap,
} from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import WishlistButton from '../components/wishlist/WishlistButton'
import { detailedProducts } from '../data/products'
import { useAppContext } from '../hooks/useAppContext'

function ProductDetails() {
  const { productId } = useParams()
  const product = detailedProducts.find((item) => item.id === Number(productId))

  if (!product) {
    return (
      <section className="section-padding">
        <div className="app-container text-center">
          <h1 className="text-4xl font-extrabold text-ink">Product not found</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            The product you are looking for may have moved or is no longer
            available.
          </p>
          <NavLink to="/shop" className="btn btn-primary mt-8">
            Back to Shop
          </NavLink>
        </div>
      </section>
    )
  }

  return <ProductDetailsContent key={product.id} product={product} />
}

function ProductDetailsContent({ product }) {
  const navigate = useNavigate()
  const { addToCart } = useAppContext()
  const [selectedImage, setSelectedImage] = useState(product.gallery[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)

  const relatedProducts = useMemo(() => {
    const sameCategory = detailedProducts
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 3)

    if (sameCategory.length === 3) return sameCategory

    const fallbackProducts = detailedProducts
      .filter(
        (item) =>
          item.id !== product.id &&
          !sameCategory.some((relatedItem) => relatedItem.id === item.id),
      )
      .slice(0, 3 - sameCategory.length)

    return [...sameCategory, ...fallbackProducts]
  }, [product])

  const isInStock = product.inStock ?? true
  const whatsappMessage = encodeURIComponent(
    `Hello, I want to order ${product.name}. Size: ${selectedSize}. Quantity: ${quantity}.`,
  )
  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedSize)
    navigate('/cart')
  }

  return (
    <>
      <section className="section-padding">
        <div className="app-container">
          <NavLink
            to="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-primary transition hover:text-primary-700"
          >
            <FiChevronLeft className="size-4" />
            Back to Shop
          </NavLink>

          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="grid gap-4 lg:sticky lg:top-28">
              <div className="group overflow-hidden rounded-[1.25rem] border border-border bg-secondary shadow-premium">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="aspect-square size-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.gallery.map((image) => (
                  <button
                    key={image}
                    type="button"
                    className={[
                      'overflow-hidden rounded-card border bg-secondary transition duration-200',
                      selectedImage === image
                        ? 'border-primary shadow-glow'
                        : 'border-border hover:border-accent',
                    ].join(' ')}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt=""
                      className="aspect-square size-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-secondary">
                  {product.discount}
                </span>
                <span
                  className={[
                    'rounded-full px-3 py-1 text-xs font-bold',
                    isInStock
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700',
                  ].join(' ')}
                >
                  {product.stockStatus}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent/12 px-3 py-1 text-sm font-bold text-ink">
                  <FiStar className="size-4 fill-accent text-accent" />
                  {product.rating}
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-baseline gap-3">
                <span className="text-3xl font-extrabold text-primary">
                  {product.price}
                </span>
                {product.oldPrice ? (
                  <span className="text-lg font-semibold text-muted line-through">
                    {product.oldPrice}
                  </span>
                ) : null}
              </div>

              <p className="mt-6 text-base leading-8 text-muted">
                {product.description}
              </p>

              <div className="mt-7 grid gap-5 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    Material
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-ink">
                    {product.material}
                  </p>
                </div>
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    Delivery
                  </h2>
                  <p className="mt-2 inline-flex items-center gap-2 text-sm leading-7 text-ink">
                    <FiTruck className="size-4 text-primary" />
                    Ships safely across India
                  </p>
                </div>
              </div>

              <div className="mt-7">
                <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                  Available Sizes
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={[
                        'min-w-16 rounded-full border px-4 py-2 text-sm font-bold transition duration-200',
                        selectedSize === size
                          ? 'border-primary bg-primary text-secondary shadow-glow'
                          : 'border-border bg-background text-ink hover:border-accent hover:text-primary',
                      ].join(' ')}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
                    Quantity
                  </h2>
                  <div className="mt-3 inline-flex h-12 items-center rounded-full border border-border bg-background">
                    <button
                      type="button"
                      className="grid size-12 place-items-center text-ink transition hover:text-primary"
                      onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus className="size-4" />
                    </button>
                    <span className="min-w-10 text-center text-base font-extrabold text-ink">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="grid size-12 place-items-center text-ink transition hover:text-primary"
                      onClick={() => setQuantity((value) => Math.min(10, value + 1))}
                      aria-label="Increase quantity"
                    >
                      <FiPlus className="size-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={!isInStock}
                  onClick={handleAddToCart}
                  className="btn btn-secondary btn-lg disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <FiShoppingBag className="size-5" />
                  Add to Cart
                </button>
                <button
                  type="button"
                  disabled={!isInStock}
                  onClick={handleBuyNow}
                  className="btn btn-primary btn-lg disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <FiZap className="size-5" />
                  Buy Now
                </button>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-accent btn-lg"
                >
                  <FiMessageCircle className="size-5" />
                  WhatsApp Order
                </a>
                <WishlistButton
                  product={product}
                  showLabel
                  className="btn btn-ghost btn-lg inline-flex items-center gap-2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background/76">
        <div className="app-container">
          <SectionHeader
            eyebrow="Related Products"
            title="Complete the devotional look"
            description="Explore similar pieces from the same collection and category."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetails

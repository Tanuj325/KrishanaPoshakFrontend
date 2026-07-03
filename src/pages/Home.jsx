import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMail, FiShoppingBag, FiSun } from 'react-icons/fi'


import CategoryCard from '../components/CategoryCard'
import FeatureCard from '../components/FeatureCard'
import InstagramTile from '../components/InstagramTile'
import ProductCard from '../components/ProductCard'
import ReviewCard from '../components/ReviewCard'
import SectionHeader from '../components/SectionHeader'
import {
  bestSellers,
  categories,
  featuredProducts,
  instagramGallery,
  newArrivals,
  reviews,
  whyChooseUs,
} from '../data/home'
import { APP_NAME } from '../utils/constants'

function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ProductSection
        eyebrow="Featured Products"
        title="Sacred styles made for celebration"
        description="Explore premium poshak sets, jewellery, and devotional pieces selected for their detail, comfort, and festive grace."
        products={featuredProducts}
      />
      <ProductSection
        eyebrow="New Arrivals"
        title="Fresh additions for your mandir"
        description="Newly added spiritual essentials with rich colors, refined finishes, and joyful festive details."
        products={newArrivals}
        tinted
      />
      <ProductSection
        eyebrow="Best Sellers"
        title="Most loved by devotees"
        description="Customer favorites chosen for everyday seva, gifting, and special festival moments."
        products={bestSellers}
      />
      <WhyChooseUsSection />
      <ReviewsSection />
      <InstagramSection />
      <NewsletterSection />
      <CtaSection />
    </>
  )
}

function HeroSection() {
  return (
    <motion.section
      className="relative isolate overflow-hidden bg-premium"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="app-container grid min-h-[calc(100vh-5rem)] items-center gap-10 py-12 lg:grid-cols-[1fr_0.88fr] lg:py-16">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.span
            className="eyebrow inline-flex items-center gap-2"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <FiSun className="size-4" />
            Premium Divine Collection
          </motion.span>

          <motion.h1
            className="heading-display mt-5 text-balance"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Elegant poshak for sacred celebrations.
          </motion.h1>

          <motion.p
            className="body-large mt-6 max-w-2xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Discover handcrafted devotional attire, jewellery, and puja
            essentials designed with a refined spiritual aesthetic.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col gap-3 xs:flex-row"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <NavLink
              to="/shop"
              className="btn btn-primary btn-lg"
            >
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2"
              >
                Shop Collection
                <FiArrowRight className="size-5" />
              </motion.span>
            </NavLink>

            <NavLink to="/about" className="btn btn-secondary btn-lg">
              <motion.span
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2"
              >
                Our Craft
              </motion.span>
            </NavLink>
          </motion.div>

          <motion.div
            className="mt-10 grid max-w-xl grid-cols-3 gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {[
              ['500+', 'Designs'],
              ['4.9', 'Rating'],
              ['India', 'Delivery'],
            ].map(([value, label], idx) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 * idx }}
                className="rounded-card border border-border bg-secondary/76 p-4 shadow-[0_10px_26px_rgb(36_22_10_/_0.06)] backdrop-blur"
              >
                <p className="text-xl font-extrabold text-ink sm:text-2xl">
                  {value}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute -left-5 top-10 hidden rounded-card border border-border bg-secondary/88 p-4 shadow-premium backdrop-blur md:block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              Festival Ready
            </p>
            <p className="mt-1 text-lg font-extrabold text-ink">New drops</p>
          </motion.div>

          <motion.div
            className="overflow-hidden rounded-[1.5rem] border border-border bg-secondary shadow-premium"
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1100&q=90"
              alt="Premium festive textile collection"
              className="aspect-[4/5] size-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-5 right-4 rounded-card border border-border bg-secondary p-4 shadow-premium sm:right-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16 }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                whileHover={{ rotate: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 16 }}
                className="grid size-11 place-items-center rounded-full bg-primary text-secondary"
              >
                <FiShoppingBag className="size-5" />
              </motion.span>
              <div>
                <p className="text-sm font-bold text-ink">Curated Sets</p>
                <p className="text-xs text-muted">Attire, mukut, jewellery</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}


function CategoriesSection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <SectionHeader
          eyebrow="Shop by Category"
          title="Everything for graceful seva"
          description="Browse curated devotional collections for daily worship, festive dressing, and gifting."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductSection({ eyebrow, title, description, products, tinted = false }) {
  return (
    <section className={tinted ? 'section-padding bg-background/76' : 'section-padding'}>
      <div className="app-container">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow={eyebrow}
            title={title}
            description={description}
            align="left"
          />
          <NavLink to="/shop" className="btn btn-secondary w-fit">
            View All
            <FiArrowRight className="size-4" />
          </NavLink>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-ink text-secondary">
      <div className="app-container">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
              Premium quality with devotional care.
            </h2>
            <p className="mt-5 text-base leading-8 text-secondary/68">
              {APP_NAME} combines traditional inspiration with a polished modern
              ecommerce experience, making every purchase feel thoughtful and
              trustworthy.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {whyChooseUs.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ReviewsSection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <SectionHeader
          eyebrow="Customer Reviews"
          title="Loved by families and devotees"
          description="Thoughtful words from customers who chose our collection for seva, festivals, and gifting."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.name} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

function InstagramSection() {
  return (
    <section className="section-padding bg-background/76">
      <div className="app-container">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeader
            eyebrow="Instagram Gallery"
            title="Moments of devotion and beauty"
            description="Follow our latest festive styling, product drops, and customer moments."
            align="left"
          />
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost w-fit"
          >
            Follow Us
            <FiArrowRight className="size-4" />
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {instagramGallery.map((image, index) => (
            <InstagramTile key={image} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function NewsletterSection() {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="grid gap-8 rounded-[1.25rem] border border-border bg-secondary p-6 shadow-premium md:grid-cols-[0.9fr_1.1fr] md:items-center md:p-10">
          <div>
            <span className="eyebrow">Newsletter</span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
              Receive festive drops first.
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              Join our newsletter for new arrivals, festival edits, and special
              devotional collections.
            </p>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <span className="sr-only">Email address</span>
              <FiMail className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
              <input
                type="email"
                placeholder="Enter your email"
                className="h-14 w-full rounded-full border border-border bg-background pl-12 pr-5 text-sm font-medium text-ink outline-none transition focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
              />
            </label>
            <button type="submit" className="btn btn-primary btn-lg">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

function CtaSection() {
  return (
    <section className="pb-12 sm:pb-16">
      <div className="app-container">
        <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-ink px-6 py-12 shadow-premium sm:px-10 lg:px-14">
          <img
            src="https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?auto=format&fit=crop&w=1400&q=85"
            alt=""
            className="absolute inset-0 -z-10 size-full object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/88 to-ink/54" />
          <div className="max-w-2xl">
            <span className="eyebrow">Festival Edit</span>
            <h2 className="mt-3 text-4xl font-extrabold leading-tight text-secondary sm:text-5xl">
              Prepare your mandir for the next celebration.
            </h2>
            <p className="mt-5 text-base leading-8 text-secondary/70">
              Choose coordinated poshak sets, mukut, jewellery, and essentials
              designed to make every festive moment feel complete.
            </p>
            <NavLink to="/shop" className="btn btn-primary btn-lg mt-8">
              Explore Now
              <FiArrowRight className="size-5" />
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home

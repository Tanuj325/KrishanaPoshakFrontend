import { useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiFilter, FiSearch } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import SectionHeader from '../components/SectionHeader'
import NoSearchResults from './NoSearchResults'
import { productCategories, shopProducts } from '../data/products'

const PRODUCTS_PER_PAGE = 6
const MAX_PRICE = 3500

function colorToCss(color) {
  // Expecting simple color names; fallback to transparent.
  const map = {
    red: '#ef4444',
    pink: '#ec4899',
    blue: '#3b82f6',
    green: '#22c55e',
    yellow: '#facc15',
    gold: '#d4af37',
    cream: '#f5f0e6',
    white: '#ffffff',
    black: '#111827',
    purple: '#a855f7',
    lavender: '#c4b5fd',
    navy: '#0f172a',
    multicolor: '#f97316',
    khaki: '#b5a58c',
    gold1: '#d4af37',
  }

  return map[String(color).toLowerCase()] || 'transparent'
}

function Shop() {
  const [searchTerm, setSearchTerm] = useState('')

  const [selectedCategory, setSelectedCategory] = useState('All')
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE)
  const [availability, setAvailability] = useState('all')
  const [selectedSizes, setSelectedSizes] = useState([]) // multi-select
  const [selectedColors, setSelectedColors] = useState([]) // multi-select
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return shopProducts
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch)
        const matchesCategory =
          selectedCategory === 'All' || product.category === selectedCategory
        const matchesPrice = product.priceValue <= maxPrice
        const matchesAvailability =
          availability === 'all' ||
          (availability === 'in-stock' && product.inStock) ||
          (availability === 'out-of-stock' && !product.inStock)

        const matchesSizes =
          selectedSizes.length === 0 ||
          product.sizes?.some((size) => selectedSizes.includes(size))

        const matchesColors =
          selectedColors.length === 0 ||
          product.colors?.some((color) => selectedColors.includes(color))

        return (
          matchesSearch &&
          matchesCategory &&
          matchesPrice &&
          matchesAvailability &&
          matchesSizes &&
          matchesColors
        )
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.priceValue - b.priceValue
        if (sortBy === 'price-high') return b.priceValue - a.priceValue
        if (sortBy === 'rating') return Number(b.rating) - Number(a.rating)
        if (sortBy === 'newest') return b.id - a.id
        return a.id - b.id
      })
  }, [
    availability,
    maxPrice,
    searchTerm,
    selectedCategory,
    selectedSizes,
    selectedColors,
    sortBy,
  ])


  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const pageStart = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE
  const paginatedProducts = filteredProducts.slice(
    pageStart,
    pageStart + PRODUCTS_PER_PAGE,
  )

  const updateFilter = (callback) => {
    callback()
    setCurrentPage(1)
  }

  const resetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('All')
    setMaxPrice(MAX_PRICE)
    setAvailability('all')
    setSelectedSizes([])
    setSelectedColors([])
    setSortBy('featured')
    setCurrentPage(1)
  }


  return (
    <section className="section-padding">
      <div className="app-container">
        <SectionHeader
          eyebrow="Shop Collection"
          title="Browse premium devotional essentials"
          description="Search, filter, and sort handcrafted poshak, jewellery, and puja essentials for every sacred occasion."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="h-fit rounded-card border border-border bg-secondary p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.07)] lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="inline-flex items-center gap-2 text-lg font-extrabold text-ink">
                <FiFilter className="size-5 text-primary" />
                Filters
              </h2>
              <button
                type="button"
                className="text-sm font-bold text-primary transition hover:text-primary-700"
                onClick={resetFilters}
              >
                Reset
              </button>
            </div>

            <div className="mt-6 space-y-7">
              <FilterGroup title="Categories">
                <div className="grid gap-2">
                  {productCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className={[
                        'rounded-full border px-4 py-2 text-left text-sm font-semibold transition duration-200',
                        selectedCategory === category
                          ? 'border-primary bg-primary text-secondary shadow-glow'
                          : 'border-border bg-background text-ink hover:border-accent hover:text-primary',
                      ].join(' ')}
                      onClick={() =>
                        updateFilter(() => setSelectedCategory(category))
                      }
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </FilterGroup>

              <FilterGroup title="Price Range">
                <div>
                  <div className="flex items-center justify-between text-sm font-bold text-ink">
                    <span>Rs. 0</span>
                    <span>Rs. {maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="300"
                    max={MAX_PRICE}
                    step="100"
                    value={maxPrice}
                    onChange={(event) =>
                      updateFilter(() => setMaxPrice(Number(event.target.value)))
                    }
                    className="mt-4 h-2 w-full accent-primary"
                    aria-label="Maximum price"
                  />
                </div>
              </FilterGroup>

              <FilterGroup title="Sizes">
                <div className="grid gap-2">
                  {(() => {
                    const allSizes = Array.from(
                      new Set(shopProducts.flatMap((p) => p.sizes || [])),
                    )
                    allSizes.sort()

                    return allSizes.map((size) => {
                      const checked = selectedSizes.includes(size)
                      return (
                        <label
                          key={size}
                          className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink"
                        >
                          <input
                            type="checkbox"
                            value={size}
                            checked={checked}
                            onChange={() =>
                              updateFilter(() => {
                                setSelectedSizes((prev) =>
                                  prev.includes(size)
                                    ? prev.filter((s) => s !== size)
                                    : [...prev, size],
                                )
                              })
                            }
                            className="size-4 accent-primary"
                          />
                          {size}
                        </label>
                      )
                    })
                  })()}

                  {selectedSizes.length === 0 ? (
                    <button
                      type="button"
                      className="mt-2 text-xs font-bold text-muted underline underline-offset-4"
                      onClick={() => updateFilter(() => setSelectedSizes([]))}
                    >
                      Select sizes
                    </button>
                  ) : null}
                </div>
              </FilterGroup>

              <FilterGroup title="Colors">
                <div className="grid gap-2">
                  {(() => {
                    const allColors = Array.from(
                      new Set(shopProducts.flatMap((p) => p.colors || [])),
                    )
                    allColors.sort()

                    return allColors.map((color) => {
                      const checked = selectedColors.includes(color)
                      return (
                        <label
                          key={color}
                          className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink"
                        >
                          <input
                            type="checkbox"
                            value={color}
                            checked={checked}
                            onChange={() =>
                              updateFilter(() => {
                                setSelectedColors((prev) =>
                                  prev.includes(color)
                                    ? prev.filter((c) => c !== color)
                                    : [...prev, color],
                                )
                              })
                            }
                            className="size-4 accent-primary"
                          />

                          <span className="inline-flex items-center gap-2">
                            <span
                              aria-hidden="true"
                              className="inline-block size-3 rounded-full border border-border bg-background"
                              style={{ backgroundColor: colorToCss(color) }}
                            />
                            {color}
                          </span>
                        </label>
                      )
                    })
                  })()}
                </div>
              </FilterGroup>

              <FilterGroup title="Availability">
                <div className="grid gap-3">
                  {[
                    ['all', 'All Products'],
                    ['in-stock', 'In Stock'],
                    ['out-of-stock', 'Out of Stock'],
                  ].map(([value, label]) => (
                    <label
                      key={value}
                      className="flex cursor-pointer items-center gap-3 text-sm font-semibold text-ink"
                    >
                      <input
                        type="radio"
                        name="availability"
                        value={value}
                        checked={availability === value}
                        onChange={() =>
                          updateFilter(() => setAvailability(value))
                        }
                        className="size-4 accent-primary"
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </FilterGroup>

            </div>
          </aside>

          <div>
            <div className="rounded-card border border-border bg-secondary p-4 shadow-[0_14px_34px_rgb(36_22_10_/_0.06)]">
              <div className="grid gap-4 md:grid-cols-[1fr_13rem]">
                <label className="relative">
                  <span className="sr-only">Search products</span>
                  <FiSearch className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
                  <input
                    type="search"
                    value={searchTerm}
                    placeholder="Search by name or category..."
                    onChange={(event) =>
                      updateFilter(() => setSearchTerm(event.target.value))
                    }
                    className="h-12 w-full rounded-full border border-border bg-background pl-12 pr-4 text-sm font-medium text-ink outline-none transition focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
                  />
                </label>

                <label>
                  <span className="sr-only">Sort products</span>
                  <select
                    value={sortBy}
                    onChange={(event) =>
                      updateFilter(() => setSortBy(event.target.value))
                    }
                    className="h-12 w-full rounded-full border border-border bg-background px-4 text-sm font-bold text-ink outline-none transition focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
                  >
                    <option value="featured">Featured</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
                <p>
                  Showing{' '}
                  <span className="font-bold text-ink">
                    {paginatedProducts.length}
                  </span>{' '}
                  of{' '}
                  <span className="font-bold text-ink">
                    {filteredProducts.length}
                  </span>{' '}
                  products
                </p>
                <p>
                  Page {safeCurrentPage} of {totalPages}
                </p>
              </div>
            </div>

            {paginatedProducts.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <NoSearchResults />
            )}

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

function FilterGroup({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-extrabold uppercase tracking-[0.14em] text-accent">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  )
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft className="size-4" />
        Prev
      </button>

      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1

        return (
          <button
            key={page}
            type="button"
            className={[
              'grid size-10 place-items-center rounded-full text-sm font-extrabold transition duration-200',
              currentPage === page
                ? 'bg-primary text-secondary shadow-glow'
                : 'border border-border bg-secondary text-ink hover:border-accent hover:text-primary',
            ].join(' ')}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      })}

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
        <FiChevronRight className="size-4" />
      </button>
    </div>
  )
}

export default Shop

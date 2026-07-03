import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiLogIn, FiLogOut, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi'
import { AUTH_ROUTES } from '../config/auth'
import { useAppContext } from '../hooks/useAppContext'
import { useAuth } from '../hooks/useAuth'
import { APP_NAME } from '../utils/constants'

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

function Navbar() {
  const navigate = useNavigate()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const { cartTotalItems } = useAppContext()
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    closeDrawer()
    navigate('/')
  }

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isDrawerOpen])

  const closeDrawer = () => setIsDrawerOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-secondary/86 shadow-[0_10px_30px_rgb(36_22_10_/_0.06)] backdrop-blur-xl">
      <nav className="app-container flex h-20 items-center justify-between gap-5">
        <NavLink
          to="/"
          className="group flex min-w-0 items-center gap-3"
          aria-label={`${APP_NAME} home`}
          onClick={closeDrawer}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-extrabold text-secondary shadow-glow transition-transform duration-200 group-hover:scale-105">
            KP
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold leading-tight text-ink sm:text-lg">
              {APP_NAME}
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-accent xs:block">
              Divine Attire
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'relative py-2 text-sm font-semibold transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:rounded-full after:bg-primary after:transition-transform after:duration-200 hover:text-primary hover:after:scale-x-100',
                  isActive
                    ? 'text-primary after:scale-x-100'
                    : 'text-ink after:scale-x-0',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden flex-1 justify-end md:flex">
          <label className="relative w-full max-w-xs">
            <span className="sr-only">Search products</span>
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search poshak..."
              className="h-11 w-full rounded-full border border-border bg-background/70 pl-11 pr-4 text-sm font-medium text-ink outline-none transition duration-200 placeholder:text-muted/70 focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          {!isLoading && isAuthenticated ? (
            <div className="hidden items-center gap-2 sm:flex">
              <NavLink
                to="/profile"
                className="inline-flex max-w-[10rem] items-center gap-2 rounded-full border border-border bg-background px-3 py-2 text-sm font-semibold text-ink transition hover:border-primary hover:text-primary"
              >
                <FiUser className="size-4 text-primary" />
                <span className="truncate">{user?.firstName}</span>
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary btn-sm"
                aria-label="Sign out"
              >
                <FiLogOut className="size-4" />
                Sign Out
              </button>
            </div>
          ) : !isLoading ? (
            <NavLink
              to={AUTH_ROUTES.login}
              className="btn btn-secondary btn-sm hidden sm:inline-flex"
            >
              <FiLogIn className="size-4" />
              Sign In
            </NavLink>
          ) : null}

          <NavLink
            to="/cart"
            className="grid size-11 place-items-center rounded-full border border-border bg-secondary text-ink shadow-[0_8px_22px_rgb(36_22_10_/_0.07)] transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Open cart"
          >
            <span className="relative">
              <FiShoppingBag className="size-5" />
              <span className="absolute -right-2 -top-2 grid size-4 place-items-center rounded-full bg-primary text-[0.62rem] font-bold leading-none text-secondary">
                {cartTotalItems}
              </span>
            </span>
          </NavLink>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-border bg-secondary text-ink shadow-[0_8px_22px_rgb(36_22_10_/_0.07)] transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={isDrawerOpen}
            onClick={() => setIsDrawerOpen(true)}
          >
            <FiMenu className="size-5" />
          </button>
        </div>
      </nav>

      <div
        className={[
          'fixed inset-0 z-50 bg-ink/35 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      <aside
        className={[
          'fixed right-0 top-0 z-50 flex h-dvh w-[min(88vw,24rem)] flex-col border-l border-border bg-secondary shadow-[0_24px_70px_rgb(36_22_10_/_0.18)] transition-transform duration-300 lg:hidden',
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
        aria-label="Mobile navigation"
      >
        <div className="flex h-20 items-center justify-between border-b border-border px-5">
          <span className="text-base font-extrabold text-ink">{APP_NAME}</span>
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-border text-ink transition duration-200 hover:border-accent hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Close navigation menu"
            onClick={closeDrawer}
          >
            <FiX className="size-5" />
          </button>
        </div>

        <div className="space-y-5 px-5 py-6">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              placeholder="Search poshak..."
              className="h-12 w-full rounded-full border border-border bg-background pl-11 pr-4 text-sm font-medium text-ink outline-none transition duration-200 placeholder:text-muted/70 focus:border-primary focus:bg-secondary focus:ring-4 focus:ring-primary/10"
            />
          </label>

          <div className="grid gap-2">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-4 py-3 text-base font-semibold transition duration-200',
                    isActive
                      ? 'bg-primary text-secondary shadow-glow'
                      : 'text-ink hover:bg-background hover:text-primary',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {!isLoading && isAuthenticated ? (
            <div className="grid gap-2 border-t border-border pt-4">
              <p className="px-4 text-sm font-semibold text-muted">
                Signed in as{' '}
                <span className="font-extrabold text-ink">
                  {user?.firstName} {user?.lastName}
                </span>
              </p>
              <NavLink
                to="/profile"
                onClick={closeDrawer}
                className="btn btn-secondary w-full"
              >
                <FiUser className="size-4" />
                My Profile
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-secondary w-full"
              >
                <FiLogOut className="size-4" />
                Sign Out
              </button>
            </div>
          ) : !isLoading ? (
            <NavLink
              to={AUTH_ROUTES.login}
              onClick={closeDrawer}
              className="btn btn-primary w-full"
            >
              <FiLogIn className="size-4" />
              Sign In
            </NavLink>
          ) : null}
        </div>
      </aside>
    </header>
  )
}

export default Navbar

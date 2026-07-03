import { NavLink, Outlet } from 'react-router-dom'
import { FiSun } from 'react-icons/fi'
import { APP_NAME } from '../utils/constants'

function AuthLayout() {
  return (
    <div className="min-h-dvh bg-premium">
      <div className="grid min-h-dvh lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-ink lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(255_122_0_/_0.28),transparent_28rem)]" />
          <img
            src="https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85"
            alt=""
            className="absolute inset-0 size-full object-cover opacity-30"
          />
          <div className="relative flex h-full flex-col justify-between p-10 text-secondary">
            <NavLink to="/" className="inline-flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-lg font-extrabold text-secondary shadow-glow">
                KP
              </span>
              <span>
                <span className="block text-lg font-extrabold">{APP_NAME}</span>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Divine Attire
                </span>
              </span>
            </NavLink>

            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/15 bg-secondary/10 px-4 py-2 text-sm font-semibold text-accent">
                <FiSun className="size-4" />
                Devotional shopping, beautifully secure
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight text-secondary">
                Welcome back to sacred style
              </h1>
              <p className="mt-4 text-base leading-8 text-secondary/70">
                Sign in to track orders, save favourites, and enjoy a seamless
                checkout experience crafted for Krishna devotees.
              </p>
            </div>

            <p className="text-sm text-secondary/50">
              Crafted in Vrindavan with devotion and care.
            </p>
          </div>
        </aside>

        <div className="flex flex-col">
          <header className="flex items-center justify-between border-b border-border/70 bg-secondary/80 px-5 py-4 backdrop-blur lg:hidden">
            <NavLink to="/" className="inline-flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-extrabold text-secondary">
                KP
              </span>
              <span className="font-extrabold text-ink">{APP_NAME}</span>
            </NavLink>
            <NavLink to="/shop" className="text-sm font-bold text-primary">
              Continue Shopping
            </NavLink>
          </header>

          <main className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout

import { NavLink } from 'react-router-dom'
import { FiArrowRight, FiMapPin, FiPlus } from 'react-icons/fi'
import { PROTECTED_ROUTES } from '../../config/auth'
import { formatAddress } from '../../utils/addressStorage'

function SavedAddressesPreview({ addresses }) {
  return (
    <section className="rounded-[1.25rem] border border-border bg-secondary p-5 shadow-premium sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-ink">Saved Addresses</h2>
          <p className="mt-1 text-sm text-muted">
            Quick access to your delivery locations.
          </p>
        </div>
        <NavLink
          to={PROTECTED_ROUTES.addresses}
          className="btn btn-secondary btn-sm w-fit"
        >
          Manage All
          <FiArrowRight className="size-4" />
        </NavLink>
      </div>

      {addresses.length === 0 ? (
        <div className="mt-6 rounded-card border border-dashed border-border bg-background p-6 text-center">
          <span className="mx-auto grid size-12 place-items-center rounded-full bg-primary/10 text-primary">
            <FiMapPin className="size-5" />
          </span>
          <p className="mt-4 text-sm font-semibold text-ink">No saved addresses yet</p>
          <NavLink to={PROTECTED_ROUTES.addresses} className="btn btn-primary btn-sm mt-4">
            <FiPlus className="size-4" />
            Add Address
          </NavLink>
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {addresses.slice(0, 2).map((address) => (
            <article
              key={address.id}
              className="rounded-card border border-border bg-background p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-extrabold text-ink">{address.label}</p>
                {address.isDefault ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                    Default
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm font-semibold text-ink">{address.name}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{formatAddress(address)}</p>
              <p className="mt-2 text-sm text-muted">{address.phone}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default SavedAddressesPreview

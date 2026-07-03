import { FiSearch } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

function NoSearchResults({
  title = 'No search results',
  description = 'Try adjusting your search terms or filters.',
  to = '/shop',
}) {
  return (
    <div className="mt-6 rounded-card border border-border bg-secondary p-10 text-center shadow-[0_14px_34px_rgb(36_22_10_/_0.06)]">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
        <FiSearch className="size-7" />
      </span>
      <h2 className="mt-6 text-2xl font-extrabold text-ink">{title}</h2>
      <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>
      <NavLink to={to} className="btn btn-primary mt-6">
        Browse Collection
      </NavLink>
    </div>
  )
}

export default NoSearchResults


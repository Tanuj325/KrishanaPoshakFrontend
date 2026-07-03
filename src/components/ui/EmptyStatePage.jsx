import { NavLink } from 'react-router-dom'

function EmptyStatePage({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
}) {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-border bg-secondary p-8 text-center shadow-premium sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
            {icon}
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-ink">{title}</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            {primaryAction ? (
              primaryAction.to ? (
                <NavLink to={primaryAction.to} className="btn btn-primary btn-lg">
                  {primaryAction.icon ? primaryAction.icon : null}
                  {primaryAction.label}
                </NavLink>
              ) : (
                <button type="button" className="btn btn-primary btn-lg" onClick={primaryAction.onClick}>
                  {primaryAction.icon}
                  {primaryAction.label}
                </button>
              )
            ) : null}

            {secondaryAction ? (
              secondaryAction.to ? (
                <NavLink to={secondaryAction.to} className="btn btn-secondary btn-lg">
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </NavLink>
              ) : (
                <button type="button" className="btn btn-secondary btn-lg" onClick={secondaryAction.onClick}>
                  {secondaryAction.icon}
                  {secondaryAction.label}
                </button>
              )
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default EmptyStatePage


import { NavLink } from 'react-router-dom'

function ErrorPage({
  title = 'Something went wrong',
  description = 'Please try again or go back to safety.',
  retryLabel = 'Retry',
  homeTo = '/',
  onRetry,
  showHomeLink = true,
}) {
  return (
    <section className="section-padding">
      <div className="app-container">
        <div className="mx-auto max-w-2xl rounded-[1.25rem] border border-red-200 bg-secondary p-8 text-center shadow-premium sm:p-12">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-red-100 text-red-700">
            <span className="text-3xl font-extrabold">!</span>
          </span>
          <h1 className="mt-6 text-3xl font-extrabold text-ink">{title}</h1>
          <p className="mx-auto mt-3 max-w-md text-muted">{description}</p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={onRetry}
            >
              {retryLabel}
            </button>

            {showHomeLink ? (
              <NavLink to={homeTo} className="btn btn-secondary btn-lg">
                Go to Home
              </NavLink>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage


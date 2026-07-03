function AuthCard({ eyebrow, title, description, children, footer }) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-[1.5rem] border border-border bg-secondary p-6 shadow-premium sm:p-8">
        {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
        <h1 className="mt-3 text-3xl font-extrabold text-ink">{title}</h1>
        {description ? (
          <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
        ) : null}
        <div className="mt-8">{children}</div>
      </div>
      {footer ? <div className="mt-6 text-center text-sm text-muted">{footer}</div> : null}
    </div>
  )
}

export default AuthCard

function SkeletonLoader({
  className = '',
  variant = 'card',
  count = 1,
}) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  if (variant === 'line') {
    return (
      <div className={className}>
        {skeletons.map((i) => (
          <div
            key={i}
            className="h-4 w-full rounded bg-muted/60 animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (variant === 'grid') {
    return (
      <div className={className}>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {skeletons.map((i) => (
            <div
              key={i}
              className="h-[18rem] rounded-[1.25rem] bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      </div>
    )
  }

  // default: card
  return (
    <div className={className}>
      {skeletons.map((i) => (
        <div
          key={i}
          className="h-[20rem] rounded-[1.25rem] border border-border bg-background p-5 shadow-[0_14px_34px_rgb(36_22_10_/_0.05)] animate-pulse"
        >
          <div className="h-40 w-full rounded-card bg-muted/50" />
          <div className="mt-4 space-y-3">
            <div className="h-4 w-3/4 rounded bg-muted/60" />
            <div className="h-3 w-1/2 rounded bg-muted/60" />
            <div className="h-3 w-2/3 rounded bg-muted/60" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default SkeletonLoader



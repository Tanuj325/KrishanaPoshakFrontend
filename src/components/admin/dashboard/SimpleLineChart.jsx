function toPoints(series, width, height, padding) {
  const max = Math.max(...series)
  const min = Math.min(...series)
  const span = max - min || 1

  return series.map((v, i) => {
    const x = padding + (i * (width - padding * 2)) / (series.length - 1)
    const y = padding + (1 - (v - min) / span) * (height - padding * 2)
    return { x, y }
  })
}

export default function SimpleLineChart({ series = [], labels = [], height = 160, stroke = '#ff7a00' }) {
  const width = 520
  const padding = 18

  const points = toPoints(series, width, height, padding)
  const d = points
    .map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ')

  const last = points[points.length - 1]

  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full">
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0.2, 0.4, 0.6, 0.8].map((t) => {
          const y = padding + t * (height - padding * 2)
          return <line key={t} x1={padding} x2={width - padding} y1={y} y2={y} stroke="rgba(36,22,10,0.08)" strokeWidth="1" />
        })}

        {/* Area */}
        <path
          d={`${d} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`}
          fill="url(#areaGrad)"
        />

        {/* Line */}
        <path d={d} fill="none" stroke={stroke} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />

        {/* Last point */}
        {last ? (
          <g>
            <circle cx={last.x} cy={last.y} r="6" fill={stroke} />
            <circle cx={last.x} cy={last.y} r="10" fill={stroke} opacity="0.12" />
          </g>
        ) : null}
      </svg>

      {labels?.length ? (
        <div className="mt-3 flex justify-between text-[11px] font-bold text-muted">
          <span>{labels[0]}</span>
          <span>{labels[Math.floor(labels.length / 2)]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      ) : null}
    </div>
  )
}


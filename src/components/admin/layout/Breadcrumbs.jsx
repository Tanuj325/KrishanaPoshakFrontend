export default function Breadcrumbs({ items = [] }) {
  if (!items.length) return null

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm font-bold text-muted">
      {items.map((item, idx) => (
        <div key={item.label + idx} className="inline-flex items-center gap-2">
          {idx > 0 ? <span className="text-muted/60">/</span> : null}
          <span className={idx === items.length - 1 ? 'text-ink' : ''}>{item.label}</span>
        </div>
      ))}
    </div>
  )
}


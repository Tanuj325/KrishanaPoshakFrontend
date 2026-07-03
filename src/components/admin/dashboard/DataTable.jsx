export default function DataTable({
  title,
  columns,
  rows,
}) {
  return (
    <div className="rounded-3xl border border-border bg-background p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-extrabold text-ink">{title}</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] border-separate border-spacing-0">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="border-b border-border px-3 py-3 text-left text-xs font-bold text-muted">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={idx} className="hover:bg-secondary/40">
                {columns.map((c) => (
                  <td key={c.key} className="border-b border-border px-3 py-3 text-sm font-semibold text-ink/90">
                    {c.render ? c.render(r) : r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}


import { useMemo } from 'react'
import DataTable from '../../../components/admin/dashboard/DataTable'
import SimpleLineChart from '../../../components/admin/dashboard/SimpleLineChart'
import { adminReportsDummyData } from './adminReportsDummyData'

function fmtMoney(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString(undefined, { style: 'currency', currency: 'INR', maximumFractionDigits: 2 })
}

function fmtNumber(n) {
  const num = typeof n === 'number' ? n : Number(n)
  if (Number.isNaN(num)) return n
  return num.toLocaleString()
}

export default function ReportsManagement() {
  const d = adminReportsDummyData

  const revenueTableRows = useMemo(
    () => [
      { label: 'Today Revenue', value: fmtMoney(d.revenue.todayRevenue) },
      { label: 'Month Revenue', value: fmtMoney(d.revenue.monthRevenue) },
      { label: 'Total Revenue', value: fmtMoney(d.revenue.totalRevenue) },
      { label: 'Avg Order Value', value: fmtMoney(d.revenue.avgOrderValue) },
    ],
    [d],
  )

  const salesTableRows = useMemo(
    () => [
      { label: 'Total Orders', value: fmtNumber(d.sales.totalOrders) },
      { label: 'Delivered Orders', value: fmtNumber(d.sales.deliveredOrders) },
      { label: 'Pending Orders', value: fmtNumber(d.sales.pendingOrders) },
      { label: 'Conversion Rate', value: `${d.sales.conversionRate}%` },
    ],
    [d],
  )

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="text-xs font-bold text-muted">Revenue (Total)</div>
          <div className="mt-2 text-lg font-extrabold text-ink">{fmtMoney(d.revenue.totalRevenue)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="text-xs font-bold text-muted">Orders</div>
          <div className="mt-2 text-lg font-extrabold text-ink">{fmtNumber(d.sales.totalOrders)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="text-xs font-bold text-muted">Customer Growth</div>
          <div className="mt-2 text-lg font-extrabold text-ink">+{fmtNumber(d.customerGrowth.newCustomers)}</div>
        </div>
        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="text-xs font-bold text-muted">Churn Rate</div>
          <div className="mt-2 text-lg font-extrabold text-ink">{d.customerGrowth.churnRate}%</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DataTable
          title="Revenue Report"
          columns={[
            { key: 'label', label: 'Metric' },
            { key: 'value', label: 'Value' },
          ]}
          rows={revenueTableRows}
        />

        <DataTable
          title="Sales Report"
          columns={[
            { key: 'label', label: 'Metric' },
            { key: 'value', label: 'Value' },
          ]}
          rows={salesTableRows}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="mb-3 text-sm font-extrabold text-ink">Monthly Orders</div>
          <SimpleLineChart
            series={d.monthlyOrders.map((x) => x.value)}
            labels={d.monthlyOrders.map((x) => x.label)}
            stroke="#ff7a00"
            height={170}
          />
        </div>

        <div className="rounded-3xl border border-border bg-background p-5">
          <div className="mb-3 text-sm font-extrabold text-ink">Daily Orders</div>
          <SimpleLineChart
            series={d.dailyOrders.map((x) => x.value)}
            labels={d.dailyOrders.map((x) => x.label)}
            stroke="#d4af37"
            height={170}
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DataTable
          title="Top Selling Products"
          columns={[
            { key: 'name', label: 'Product' },
            { key: 'units', label: 'Units Sold', render: (r) => <span className="font-extrabold text-ink">{fmtNumber(r.units)}</span> },
          ]}
          rows={d.topSellingProducts}
        />

        <DataTable
          title="Top Categories"
          columns={[
            { key: 'name', label: 'Category' },
            { key: 'value', label: 'Sales', render: (r) => <span className="font-extrabold text-ink">{fmtNumber(r.value)}</span> },
          ]}
          rows={d.topCategories}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SimpleLineChart series={d.graphs.revenueSeries} labels={d.graphs.labels} stroke="#24160a" height={180} />
          <div className="mt-3 text-xs font-bold text-muted">Revenue Graph</div>
        </div>
        <div>
          <SimpleLineChart series={d.graphs.ordersSeries} labels={d.graphs.labels} stroke="#d4af37" height={180} />
          <div className="mt-3 text-xs font-bold text-muted">Orders Graph</div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-background p-5">
        <div className="text-sm font-extrabold text-ink">Product Sales Graph</div>
        <div className="mt-3">
          <SimpleLineChart series={d.graphs.productSalesSeries} labels={d.graphs.labels} stroke="#ff7a00" height={190} />
        </div>
      </div>
    </div>
  )
}


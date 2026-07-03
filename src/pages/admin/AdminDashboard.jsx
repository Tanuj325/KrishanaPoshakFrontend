import StatCard from '../../components/admin/dashboard/StatCard'
import SimpleLineChart from '../../components/admin/dashboard/SimpleLineChart'
import DataTable from '../../components/admin/dashboard/DataTable'
import { adminDashboardDummyData } from './dashboardData'

const fmtMoney = (n) => {
  if (typeof n !== 'number') return n
  return n.toLocaleString(undefined, {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  })
}

const fmtNumber = (n) => {
  if (typeof n !== 'number') return n
  return n.toLocaleString()
}

export default function AdminDashboard() {
  const { totals, charts, tables } = adminDashboardDummyData

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        }}
      >
        <StatCard
          label="Total Products"
          value={fmtNumber(totals.totalProducts)}
          iconKey="products"
        />

        <StatCard
          label="Total Orders"
          value={fmtNumber(totals.totalOrders)}
          iconKey="orders"
        />

        <StatCard
          label="Pending Orders"
          value={fmtNumber(totals.pendingOrders)}
          iconKey="pending"
        />

        <StatCard
          label="Delivered Orders"
          value={fmtNumber(totals.deliveredOrders)}
          iconKey="delivered"
        />

        <StatCard
          label="Total Customers"
          value={fmtNumber(totals.totalCustomers)}
          iconKey="customers"
        />

        <StatCard
          label="Total Revenue"
          value={fmtMoney(totals.totalRevenue)}
          iconKey="revenue"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
          <div className="mb-3 text-sm font-extrabold text-ink">
            Sales Chart
          </div>

          <SimpleLineChart
            series={charts.salesSeries}
            labels={charts.labels}
            stroke="#ff7a00"
          />
        </div>

        <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
          <div className="mb-3 text-sm font-extrabold text-ink">
            Orders Chart
          </div>

          <SimpleLineChart
            series={charts.ordersSeries}
            labels={charts.labels}
            stroke="#d4af37"
          />
        </div>

        <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
          <div className="mb-3 text-sm font-extrabold text-ink">
            Revenue Chart
          </div>

          <SimpleLineChart
            series={charts.revenueSeries}
            labels={charts.labels}
            stroke="#24160a"
          />
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div>
          <DataTable
            title="Low Stock Products"
            columns={[
              { key: 'name', label: 'Product' },
              { key: 'stock', label: 'Stock' },
              { key: 'supplier', label: 'Supplier' },
            ]}
            rows={tables.lowStockProducts}
          />
        </div>

        <div className="xl:col-span-2">
          <DataTable
            title="Recent Orders"
            columns={[
              { key: 'id', label: 'Order ID' },
              { key: 'customer', label: 'Customer' },
              {
                key: 'status',
                label: 'Status',
                render: (r) => (
                  <span
                    className={
                      r.status === 'Delivered'
                        ? 'rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary'
                        : 'rounded-full bg-secondary px-3 py-1 text-xs font-extrabold text-ink'
                    }
                  >
                    {r.status}
                  </span>
                ),
              },
              {
                key: 'amount',
                label: 'Amount',
                render: (r) => fmtMoney(r.amount),
              },
              { key: 'date', label: 'Date' },
            ]}
            rows={tables.recentOrders}
          />

          <div className="mt-4">
            <DataTable
              title="Latest Customers"
              columns={[
                { key: 'name', label: 'Name' },
                { key: 'email', label: 'Email' },
                { key: 'joined', label: 'Joined' },
              ]}
              rows={tables.latestCustomers}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
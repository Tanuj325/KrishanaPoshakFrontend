export const adminDashboardDummyData = {
  totals: {
    totalProducts: 1240,
    totalOrders: 532,
    pendingOrders: 71,
    deliveredOrders: 430,
    totalCustomers: 298,
    totalRevenue: 189722,
  },
  charts: {
    salesSeries: [12, 18, 14, 26, 30, 28, 42, 39, 46, 44, 51, 58],
    ordersSeries: [9, 12, 10, 18, 21, 19, 26, 24, 30, 27, 34, 38],
    revenueSeries: [8, 10, 9, 15, 18, 17, 22, 20, 25, 23, 28, 31],
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  tables: {
    recentOrders: [
      { id: 'ORD-10021', customer: 'Rahul Sharma', status: 'Pending', amount: 129.99, date: '2026-06-22' },
      { id: 'ORD-10020', customer: 'Neha Patel', status: 'Delivered', amount: 249.5, date: '2026-06-21' },
      { id: 'ORD-10019', customer: 'Amit Verma', status: 'Delivered', amount: 89.0, date: '2026-06-19' },
      { id: 'ORD-10018', customer: 'Sonia Khan', status: 'Pending', amount: 159.75, date: '2026-06-18' },
    ],
    latestCustomers: [
      { name: 'Manoj Kumar', email: 'manoj.kumar@example.com', joined: '2026-06-20' },
      { name: 'Priya Singh', email: 'priya.singh@example.com', joined: '2026-06-19' },
      { name: 'Vikas Yadav', email: 'vikas.yadav@example.com', joined: '2026-06-17' },
    ],
    lowStockProducts: [
      { name: 'Cotton Kurti - Blue', sku: 'SKU-KUR-014', stock: 6, supplier: 'Krishana Weaves' },
      { name: 'Embroidered Dupatta', sku: 'SKU-DUP-021', stock: 9, supplier: 'Chanderi House' },
      { name: 'Silk Saree - Maroon', sku: 'SKU-SAR-009', stock: 4, supplier: 'Tanuj Textiles' },
    ],
  },
}


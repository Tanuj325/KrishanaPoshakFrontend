export const adminReportsDummyData = {
  revenue: {
    totalRevenue: 184523.75,
    todayRevenue: 6420.5,
    monthRevenue: 42890.0,
    avgOrderValue: 142.35,
  },
  sales: {
    totalOrders: 532,
    deliveredOrders: 430,
    pendingOrders: 71,
    conversionRate: 3.42,
  },
  monthlyOrders: [
    { label: 'Jan', value: 48 },
    { label: 'Feb', value: 52 },
    { label: 'Mar', value: 61 },
    { label: 'Apr', value: 58 },
    { label: 'May', value: 73 },
    { label: 'Jun', value: 79 },
  ],
  dailyOrders: [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 18 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 22 },
    { label: 'Fri', value: 26 },
    { label: 'Sat', value: 31 },
    { label: 'Sun', value: 24 },
  ],
  topSellingProducts: [
    { name: 'Cotton Kurti - Blue', units: 420 },
    { name: 'Embroidered Dupatta', units: 365 },
    { name: 'Silk Saree - Maroon', units: 310 },
    { name: 'Festival Lehenga', units: 287 },
  ],
  topCategories: [
    { name: 'Womens', value: 212 },
    { name: 'Mens', value: 118 },
    { name: 'Kids', value: 74 },
  ],
  customerGrowth: {
    totalCustomers: 298,
    newCustomers: 26,
    churnRate: 1.8,
  },
  graphs: {
    revenueSeries: [8, 10, 9, 15, 18, 17, 22, 20, 25, 23, 28, 31],
    ordersSeries: [9, 12, 10, 18, 21, 19, 26, 24, 30, 27, 34, 38],
    productSalesSeries: [30, 34, 28, 41, 44, 39, 52, 48, 55, 53, 60, 66],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
}


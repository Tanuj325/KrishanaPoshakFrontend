import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import GuestRoute from '../components/auth/GuestRoute'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import { AUTH_ROUTES } from '../config/auth'
import { withAuthProtection } from './withAuthProtection'
import SkeletonLoader from '../components/ui/SkeletonLoader'
import ErrorPage from '../components/ui/ErrorPage'

function RouteSuspense({ children }) {
  return (
    <Suspense
      fallback={
        <div className="section-padding">
          <div className="app-container">
            <SkeletonLoader variant="grid" count={3} />
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  )
}

function NotFoundSuspense() {
  return (
    <Suspense
      fallback={
        <div className="section-padding">
          <div className="app-container">
            <SkeletonLoader variant="card" count={1} />
          </div>
        </div>
      }
    >
      <NotFound />
    </Suspense>
  )
}

const Home = lazy(() => import('../pages/Home'))

const Shop = lazy(() => import('../pages/Shop'))
const Cart = lazy(() => import('../pages/Cart'))
const Checkout = lazy(() => import('../pages/Checkout'))
const Wishlist = lazy(() => import('../pages/account/Wishlist'))
const Profile = lazy(() => import('../pages/account/Profile'))
const MyOrders = lazy(() => import('../pages/account/MyOrders'))
const OrderDetails = lazy(() => import('../pages/account/OrderDetails'))
const SavedAddresses = lazy(() => import('../pages/account/SavedAddresses'))
const ProductDetails = lazy(() => import('../pages/ProductDetails'))
const About = lazy(() => import('../pages/About'))
const Contact = lazy(() => import('../pages/Contact'))
const NotFound = lazy(() => import('../pages/NotFound'))

const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))

import { AdminAuthProvider } from '../context/AdminAuthContext/AdminAuthContext'
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import AdminRoutes from './AdminRoutes/AdminRoutes'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RouteSuspense>
        <MainLayout />
      </RouteSuspense>
    ),
    errorElement: (
      <ErrorPage
        title="Something went wrong"
        description="We couldn’t load this page. Please try again."
        retryLabel="Back to Home"
        homeTo="/"
      />
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'cart',
        element: withAuthProtection(<Cart />),
      },
      {
        path: 'checkout',
        element: withAuthProtection(<Checkout />),
      },
      {
        path: 'wishlist',
        element: withAuthProtection(<Wishlist />),
      },
      {
        path: 'profile',
        element: withAuthProtection(<Profile />),
      },
      {
        path: 'orders',
        element: withAuthProtection(<MyOrders />),
      },
      {
        path: 'orders/:orderId',
        element: withAuthProtection(<OrderDetails />),
      },
      {
        path: 'addresses',
        element: withAuthProtection(<SavedAddresses />),
      },
      {
        path: 'product/:productId',
        element: <ProductDetails />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: (
          <Suspense
            fallback={
              <div className="section-padding">
                <div className="app-container">
                  <SkeletonLoader variant="card" count={1} />
                </div>
              </div>
            }
          >
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/admin',
    element: (
      <RouteSuspense>
        <AdminAuthProvider>
          <AdminLayout />
        </AdminAuthProvider>
      </RouteSuspense>
    ),
    errorElement: (
      <ErrorPage
        title="Admin error"
        description="We couldn’t load the requested admin page."
        retryLabel="Back to Admin"
        homeTo="/admin"
      />
    ),
    children: AdminRoutes(),
  },
  {
    path: '/auth',
    element: (
      <RouteSuspense>
        <AuthLayout />
      </RouteSuspense>
    ),
    errorElement: (
      <ErrorPage
        title="Authentication error"
        description="We couldn’t load the requested authentication page."
        retryLabel="Back to Login"
        homeTo={AUTH_ROUTES.login}
      />
    ),
    children: [
      {
        index: true,
        element: <Navigate to={AUTH_ROUTES.login} replace />,
      },
      {
        path: 'login',
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: 'reset-password',
        element: <ResetPassword />,
      },
    ],
  },
])

export default router


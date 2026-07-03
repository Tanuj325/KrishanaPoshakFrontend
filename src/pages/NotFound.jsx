import ErrorPage from '../components/ui/ErrorPage'

function NotFound() {
  return (
    <ErrorPage
      title="Page not found"
      description="The page you’re looking for doesn’t exist or has been moved."
      retryLabel="Go Back"
      homeTo="/"
      onRetry={() => window.history.back()}
    />
  )
}

export default NotFound

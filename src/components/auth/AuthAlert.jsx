function AuthAlert({ type = 'error', message }) {
  if (!message) return null

  const styles =
    type === 'success'
      ? 'border-green-200 bg-green-50 text-green-700'
      : 'border-red-200 bg-red-50 text-red-600'

  return (
    <div
      className={`rounded-card border px-4 py-3 text-sm font-semibold leading-6 ${styles}`}
      role="alert"
    >
      {message}
    </div>
  )
}

export default AuthAlert

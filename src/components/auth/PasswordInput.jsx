import { useState } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

function PasswordInput({
  id,
  label,
  placeholder = 'Enter your password',
  error,
  required = false,
  registration,
}) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <div className="relative">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`h-12 w-full rounded-full border bg-background px-4 pr-12 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-secondary focus:ring-4 focus:ring-primary/10 ${
            error
              ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
              : 'border-border focus:border-primary'
          }`}
          {...registration}
        />
        <button
          type="button"
          className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-muted transition hover:text-primary"
          onClick={() => setIsVisible((value) => !value)}
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <FiEyeOff className="size-4" /> : <FiEye className="size-4" />}
        </button>
      </div>
      {error ? (
        <span className="text-xs font-semibold text-red-500">{error.message}</span>
      ) : null}
    </label>
  )
}

export default PasswordInput

function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  required = false,
  registration,
}) {
  return (
    <label className="grid gap-2" htmlFor={id}>
      <span className="text-sm font-bold text-ink">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`h-12 w-full rounded-full border bg-background px-4 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:bg-secondary focus:ring-4 focus:ring-primary/10 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-100'
            : 'border-border focus:border-primary'
        }`}
        {...registration}
      />
      {error ? (
        <span className="text-xs font-semibold text-red-500">{error.message}</span>
      ) : null}
    </label>
  )
}

export default FormField

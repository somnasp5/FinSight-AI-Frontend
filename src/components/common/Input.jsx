import { forwardRef } from 'react'

// Generic text input, built to work directly with react-hook-form's register().
// Usage: <Input label="Email" error={errors.email?.message} {...register('email')} />
const Input = forwardRef(function Input(
  { label, type = 'text', error, id, ...rest },
  ref
) {
  const inputId = id || rest.name

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-graystone-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        ref={ref}
        className={`rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-graystone-400 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error ? 'border-danger' : 'border-sand-300'
        }`}
        {...rest}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  )
})

export default Input

import LoadingSpinner from './LoadingSpinner.jsx'

const variantClasses = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 disabled:bg-primary-300',
  secondary:
    'bg-sand-100 text-ink hover:bg-sand-200 disabled:text-graystone-400',
  outline:
    'border border-sand-300 text-ink hover:bg-sand-50 disabled:text-graystone-400',
}

// Generic button used everywhere in the app so styling stays consistent.
// variant: 'primary' | 'secondary' | 'outline'
function Button({
  children,
  type = 'button',
  variant = 'primary',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading && <LoadingSpinner size={16} className="text-current" />}
      {children}
    </button>
  )
}

export default Button

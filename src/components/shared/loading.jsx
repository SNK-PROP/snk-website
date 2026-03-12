import React from 'react'

export function Spinner({ className = '', variant = 'primary', size = 'default' }) {
  const sizeClasses = {
    sm: 'spinner-sm',
    default: '',
    lg: 'spinner-lg'
  }

  const variantClasses = variant === 'gold' ? 'spinner-gold' : 'spinner-primary'

  return (
    <div className={`${sizeClasses[size]} ${variantClasses} ${className}`}></div>
  )
}

export function ButtonLoading({ children, className = '', ...props }) {
  return (
    <button
      className={`btn-loading ${className}`}
      {...props}
    >
      <div className="spinner spinner-sm mr-2"></div>
      <span>Loading...</span>
    </button>
  )
}

export function LoadingDots({ className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      <span className="pulse-dot"></span>
      <span className="pulse-dot"></span>
      <span className="pulse-dot"></span>
    </div>
  )
}

export function LoadingSkeleton({ className = '' }) {
  return (
    <div className={`loading-skeleton ${className}`}></div>
  )
}

export function FormInput({ label, required = false, className = '', ...props }) {
  return (
    <div className={`form-input ${className}`}>
      {label && (
        <label className={`form-label ${required ? 'text-foreground' : 'text-muted-foreground'} mb-2 block`}>
          {label} {required && <span className="text-destructive">*</span>}
        </label>
      )}
      <input
        className="w-full px-3 py-2 border border-input rounded-md focus:outline-none focus:border-ring transition-all"
        {...props}
      />
    </div>
  )
}
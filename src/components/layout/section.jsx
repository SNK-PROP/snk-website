import * as React from "react"
import { cn } from "@/lib/utils"

const Section = React.forwardRef(({
  className,
  size = 'md',
  padding = 'normal',
  children,
  ...props
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'section-padding-sm',
    normal: 'section-padding',
    lg: 'section-padding-lg',
  }

  return (
    <section
      ref={ref}
      className={cn(
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
})
Section.displayName = "Section"

const SectionContent = React.forwardRef(({
  className,
  size = 'md',
  centered = false,
  children,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'max-w-3xl',
    md: 'max-w-4xl',
    lg: 'max-w-5xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
  }

  return (
    <div
      ref={ref}
      className={cn(
        centered ? 'mx-auto' : '',
        centered && size ? sizeClasses[size] : '',
        "px-4 sm:px-6 lg:px-8",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
SectionContent.displayName = "SectionContent"

export { Section, SectionContent }
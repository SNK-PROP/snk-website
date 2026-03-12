import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Spacing Utility Components
 *
 * These components provide consistent spacing following an 8pt grid system.
 * All spacing values are multiples of 8px (0.5rem).
 *
 * Usage:
 * <Spacing size={8} />  // 32px (8 * 4px)
 * <Spacing size={12} /> // 48px (12 * 4px)
 */

const Spacing = React.forwardRef(({
  size,
  direction = 'vertical',
  className,
  ...props
}, ref) => {
  const spacingClass = direction === 'vertical' ? 'h' : 'w'

  return (
    <div
      ref={ref}
      className={cn(
        spacingClass === 'h' ? 'h' : 'w',
        size && `${spacingClass}-${size}`,
        className
      )}
      {...props}
    />
  )
})
Spacing.displayName = "Spacing"

/**
 * Component Padding Component
 *
 * Quick component for adding consistent padding.
 *
 * Usage:
 * <ComponentPadding size="md">Content</ComponentPadding>
 */

const ComponentPadding = React.forwardRef(({
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8',
    '2xl': 'p-10',
  }

  return (
    <div
      ref={ref}
      className={cn(
        paddingClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ComponentPadding.displayName = "ComponentPadding"

/**
 * Container with Max Width
 *
 * Container with built-in max-width for content readability.
 *
 * Usage:
 * <MaxWidthContainer size="lg">Content</MaxWidthContainer>
 */

const MaxWidthContainer = React.forwardRef(({
  size = 'md',
  className,
  children,
  ...props
}, ref) => {
  const maxWidthClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '2xl': 'max-w-screen-2xl',
    '7xl': 'max-w-7xl',
  }

  return (
    <div
      ref={ref}
      className={cn(
        maxWidthClasses[size],
        'mx-auto px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
MaxWidthContainer.displayName = "MaxWidthContainer"

/**
 * Responsive Grid Component
 *
 * Grid system with responsive breakpoints and consistent spacing.
 *
 * Usage:
 * <ResponsiveGrid cols={3} gap={6}>...</ResponsiveGrid>
 */

const ResponsiveGrid = React.forwardRef(({
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 6,
  className,
  children,
  ...props
}, ref) => {
  const getGridClasses = () => {
    const classes = ['grid']

    // Add responsive columns
    if (typeof cols === 'object') {
      Object.entries(cols).forEach(([breakpoint, colCount]) => {
        if (breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl') {
          classes.push(`${breakpoint}:grid-cols-${colCount}`)
        } else {
          classes.push(`grid-cols-${colCount}`)
        }
      })
    } else {
      classes.push(`grid-cols-${cols}`)
    }

    // Add gap
    classes.push(`gap-${gap}`)

    return classes.join(' ')
  }

  return (
    <div
      ref={ref}
      className={cn(
        getGridClasses(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ResponsiveGrid.displayName = "ResponsiveGrid"

export {
  Spacing,
  ComponentPadding,
  MaxWidthContainer,
  ResponsiveGrid
}
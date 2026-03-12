import * as React from "react"
import { cn } from "@/lib/utils"

const Grid = React.forwardRef(({
  className,
  cols,
  gap,
  responsive = false,
  children,
  ...props
}, ref) => {
  const getGridClasses = () => {
    const classes = []

    if (cols) {
      if (typeof cols === 'object') {
        // Responsive columns: { sm: 1, md: 2, lg: 3 }
        Object.entries(cols).forEach(([breakpoint, count]) => {
          if (breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl') {
            classes.push(`${breakpoint}:grid-cols-${count}`)
          } else {
            classes.push(`grid-cols-${count}`)
          }
        })
      } else {
        classes.push(`grid-cols-${cols}`)
      }
    }

    if (gap) {
      if (typeof gap === 'object') {
        // Responsive gap
        Object.entries(gap).forEach(([breakpoint, size]) => {
          if (breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl') {
            classes.push(`${breakpoint}:gap-${size}`)
          } else {
            classes.push(`gap-${size}`)
          }
        })
      } else {
        classes.push(`gap-${gap}`)
      }
    }

    if (responsive) {
      classes.push('grid')
    }

    return classes.join(' ')
  }

  return (
    <div
      ref={ref}
      className={cn(
        responsive ? 'grid' : '',
        getGridClasses(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Grid.displayName = "Grid"

const GridItem = React.forwardRef(({
  className,
  colSpan,
  rowSpan,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        colSpan && `col-span-${colSpan}`,
        rowSpan && `row-span-${rowSpan}`,
        className
      )}
      {...props}
    />
  )
})
GridItem.displayName = "GridItem"

export { Grid, GridItem }
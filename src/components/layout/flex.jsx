import * as React from "react"
import { cn } from "@/lib/utils"

const Flex = React.forwardRef(({
  className,
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = 'nowrap',
  gap,
  responsive = false,
  children,
  ...props
}, ref) => {
  const directionClasses = {
    row: 'flex-row',
    'row-reverse': 'flex-row-reverse',
    column: 'flex-col',
    'column-reverse': 'flex-col-reverse',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
    baseline: 'items-baseline',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const wrapClasses = {
    nowrap: 'flex-nowrap',
    wrap: 'flex-wrap',
    'wrap-reverse': 'flex-wrap-reverse',
  }

  const getGapClasses = () => {
    if (!gap) return ''
    if (typeof gap === 'object') {
      return Object.entries(gap).map(([breakpoint, size]) => {
        if (breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'lg' || breakpoint === 'xl') {
          return `${breakpoint}:gap-${size}`
        }
        return `gap-${size}`
      }).join(' ')
    }
    return `gap-${gap}`
  }

  return (
    <div
      ref={ref}
      className={cn(
        'flex',
        directionClasses[direction],
        alignClasses[align],
        justifyClasses[justify],
        wrapClasses[wrap],
        responsive && getGapClasses(),
        gap && !responsive && `gap-${gap}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Flex.displayName = "Flex"

const FlexItem = React.forwardRef(({
  className,
  grow,
  shrink,
  basis,
  alignSelf,
  order,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        grow === 0 && 'flex-grow-0',
        grow && `flex-grow`,
        shrink === 0 && 'flex-shrink-0',
        shrink && `flex-shrink`,
        basis && `flex-basis-${basis}`,
        alignSelf && `self-${alignSelf}`,
        order && `order-${order}`,
        className
      )}
      {...props}
    />
  )
})
FlexItem.displayName = "FlexItem"

export { Flex, FlexItem }
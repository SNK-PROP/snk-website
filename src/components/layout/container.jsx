import * as React from "react"
import { cn } from "@/lib/utils"

const Container = React.forwardRef(({
  className,
  size = 'md',
  fluid = false,
  children,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
  }

  return (
    <div
      ref={ref}
      className={cn(
        fluid ? 'container-fluid' : sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Container.displayName = "Container"

const ContainerInner = React.forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "container px-4 sm:px-6 lg:px-8 mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
ContainerInner.displayName = "ContainerInner"

export { Container, ContainerInner }
"use client"

import React from 'react'

export const DisplayText = ({ children, className = '', variant = 'display-1', ...props }) => {
  return (
    <h1 className={`text-display ${variant} ${className}`} {...props}>
      {children}
    </h1>
  )
}

export const HeadlineText = ({ children, className = '', level = 2, ...props }) => {
  const HeadingTag = `h${level}`
  return (
    <HeadingTag className={`text-headline heading-${level} ${className}`} {...props}>
      {children}
    </HeadingTag>
  )
}

export const TitleText = ({ children, className = '', ...props }) => {
  return (
    <span className={`text-title ${className}`} {...props}>
      {children}
    </span>
  )
}

export const SubtitleText = ({ children, className = '', ...props }) => {
  return (
    <span className={`text-subtitle ${className}`} {...props}>
      {children}
    </span>
  )
}

export const LabelText = ({ children, className = '', ...props }) => {
  return (
    <span className={`text-label ${className}`} {...props}>
      {children}
    </span>
  )
}

export const BodyText = ({ children, className = '', variant = 'body-1', ...props }) => {
  return (
    <p className={`body ${variant} ${className}`} {...props}>
      {children}
    </p>
  )
}

export const StatsText = ({ children, className = '', variant = 'stats-1', ...props }) => {
  return (
    <div className={`stats ${variant} ${className}`} {...props}>
      {children}
    </div>
  )
}

export const PriceText = ({ children, className = '', variant = 'price-1', ...props }) => {
  return (
    <span className={`price ${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}

export const AddressText = ({ children, className = '', variant = 'address-1', ...props }) => {
  return (
    <span className={`address ${variant} ${className}`} {...props}>
      {children}
    </span>
  )
}
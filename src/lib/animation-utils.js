// Animation utility functions
export const getAnimationDelay = (index, baseDelay = 100) => {
  return `${index * baseDelay}ms`
}

export const getAnimationDelayClass = (index, baseDelay = 100) => {
  const delay = index * baseDelay
  if (delay === 100) return 'animation-delay-100'
  if (delay === 200) return 'animation-delay-200'
  if (delay === 300) return 'animation-delay-300'
  if (delay === 400) return 'animation-delay-400'
  if (delay === 500) return 'animation-delay-500'
  return ''
}

export const getAnimationDelayStyle = (index, baseDelay = 100) => {
  return {
    animationDelay: `${index * baseDelay}ms`
  }
}

// Animation duration helpers
export const getAnimationDuration = (duration) => {
  if (duration === 'fast') return 'animation-duration-200'
  if (duration === 'normal') return 'animation-duration-300'
  if (duration === 'slow') return 'animation-duration-500'
  if (duration === 'slower') return 'animation-duration-700'
  return ''
}

// Animation easing helpers
export const getAnimationEasing = (easing) => {
  if (easing === 'ease-in') return 'ease-in'
  if (easing === 'ease-out') return 'ease-out'
  if (easing === 'ease-in-out') return 'ease-in-out'
  return ''
}

// Staggered animation classes
export const getStaggerClass = (columns) => {
  if (columns === 3) return 'animate-stagger-3'
  if (columns === 4) return 'animate-stagger-4'
  return 'animate-stagger-2'
}

// Common animation presets
export const animationPresets = {
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',
  float: 'animate-float',
  floatSlow: 'animate-float-slow',
  pulse: 'animate-pulse',
  pulseSlow: 'animate-pulse-slow',
  bounce: 'animate-bounce',
  bounceSubtle: 'bounce-subtle',
  rotate: 'animate-spin',
  rotateSubtle: 'rotate-subtle',
  shimmer: 'shimmer-loading'
}

// Button animation variants
export const buttonAnimations = {
  default: 'transform transition-all duration-200 hover:scale-105',
  subtle: 'transform transition-all duration-300 hover:scale-102 hover:translate-y-0.5',
  bounce: 'transform transition-all duration-200 hover:scale-105 hover:-translate-y-1',
  glow: 'transform transition-all duration-300 hover:scale-105 hover:shadow-glow',
  pulse: 'transform transition-all duration-300 hover:scale-105 pulse-subtle'
}

// Card animation variants
export const cardAnimations = {
  default: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-2',
  lift: 'transition-all duration-500 hover:shadow-xl hover:-translate-y-4',
  subtle: 'transition-all duration-300 hover:shadow hover:scale-102',
  bounce: 'transition-all duration-300 hover:shadow-lg hover:-translate-y-2 hover:scale-102',
  glow: 'transition-all duration-300 hover:shadow-glow hover:shadow-xl'
}
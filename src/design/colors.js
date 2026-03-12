/**
 * Centralized Color Management System
 * All colors should be imported from this file to ensure consistency
 *
 * Usage:
 * import { colors } from '@/design/colors';
 *
 * or
 * import { brand, semantic, gradients } from '@/design/colors';
 */

// Brand Colors - Single Source of Truth
export const brand = {
  // Primary Brand Colors
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e3a8a',
    900: '#1e293b'
  },

  gold: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f'
  },

  // Brand Color Aliases for Consistency
  primary: '#1e3a8a',
  primaryLight: '#3b82f6',
  secondary: '#d97706',
  secondaryLight: '#f59e0b',
  dark: '#1e293b',
  white: '#ffffff'
};

// Semantic Color System
export const semantic = {
  // Light Mode Colors
  light: {
    background: '#ffffff',
    foreground: '#111827',
    card: '#ffffff',
    cardForeground: '#111827',
    muted: '#f9fafb',
    mutedForeground: '#6b7280',
    accent: '#f3f4f6',
    accentForeground: '#111827',
    border: '#e5e7eb',
    input: '#e5e7eb',
    ring: '#3b82f6',

    // Status Colors
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  },

  // Dark Mode Colors
  dark: {
    background: '#0f172a',
    foreground: '#f9fafb',
    card: '#1e293b',
    cardForeground: '#f9fafb',
    muted: '#1f2937',
    mutedForeground: '#d1d5db',
    accent: '#374151',
    accentForeground: '#f9fafb',
    border: '#374151',
    input: '#374151',
    ring: '#60a5fa',

    // Status Colors (consistent across themes)
    success: '#34d399',
    warning: '#fbbf24',
    error: '#f87171',
    info: '#60a5fa'
  }
};

// Gradients
export const gradients = {
  // Hero/Background Gradients
  primary: 'linear-gradient(135deg, var(--brand-primary) 0%, #3730a3 100%)',
  blueToGold: 'linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%)',
  goldToBlue: 'linear-gradient(135deg, var(--brand-secondary) 0%, var(--brand-primary) 100%)',

  // Subtle Gradients
  subtleBlue: 'linear-gradient(135deg, rgba(30, 58, 138, 0.05), rgba(217, 119, 6, 0.05))',
  subtleGold: 'linear-gradient(135deg, rgba(217, 119, 6, 0.05), rgba(30, 58, 138, 0.05))',
  subtleBackground: 'linear-gradient(135deg, rgba(30, 58, 138, 0.02), rgba(217, 119, 6, 0.02))',

  // Animated Gradients
  animated: {
    blueGold: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary), var(--brand-primary))',
    floating: 'linear-gradient(45deg, transparent, rgba(217, 119, 6, 0.1), transparent)'
  }
};

// Shadow Colors
export const shadows = {
  // Color-based shadows
  blue: {
    sm: '0 1px 2px 0 rgba(59, 130, 246, 0.05)',
    md: '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
    lg: '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
    xl: '0 20px 25px -5px rgba(59, 130, 246, 0.1), 0 10px 10px -5px rgba(59, 130, 246, 0.04)'
  },

  gold: {
    sm: '0 1px 2px 0 rgba(217, 119, 6, 0.05)',
    md: '0 4px 6px -1px rgba(217, 119, 6, 0.1), 0 2px 4px -1px rgba(217, 119, 6, 0.06)',
    lg: '0 10px 15px -3px rgba(217, 119, 6, 0.1), 0 4px 6px -2px rgba(217, 119, 6, 0.05)',
    xl: '0 20px 25px -5px rgba(217, 119, 6, 0.1), 0 10px 10px -5px rgba(217, 119, 6, 0.04)'
  }
};

// Opacity Helpers
export const opacity = {
  brand: {
    blue: {
      10: 'rgba(30, 58, 138, 0.1)',
      20: 'rgba(30, 58, 138, 0.2)',
      30: 'rgba(30, 58, 138, 0.3)',
      50: 'rgba(30, 58, 138, 0.5)',
      70: 'rgba(30, 58, 138, 0.7)',
      90: 'rgba(30, 58, 138, 0.9)'
    },
    gold: {
      10: 'rgba(217, 119, 6, 0.1)',
      20: 'rgba(217, 119, 6, 0.2)',
      30: 'rgba(217, 119, 6, 0.3)',
      50: 'rgba(217, 119, 6, 0.5)',
      70: 'rgba(217, 119, 6, 0.7)',
      90: 'rgba(217, 119, 6, 0.9)'
    }
  }
};

// Complete Export
export const colors = {
  brand,
  semantic,
  gradients,
  shadows,
  opacity
};

// CSS Variable Mapping
export const cssVariables = {
  // Brand Colors
  '--brand-blue': brand.primary,
  '--brand-gold': brand.secondary,
  '--brand-gold-light': brand.secondaryLight,
  '--brand-dark': brand.dark,
  '--brand-white': brand.white,

  // Semantic Colors
  '--background': semantic.light.background,
  '--foreground': semantic.light.foreground,
  '--card': semantic.light.card,
  '--card-foreground': semantic.light.cardForeground,
  '--muted': semantic.light.muted,
  '--muted-foreground': semantic.light.mutedForeground,
  '--accent': semantic.light.accent,
  '--accent-foreground': semantic.light.accentForeground,
  '--border': semantic.light.border,
  '--input': semantic.light.input,
  '--ring': semantic.light.ring,

  // Status Colors
  '--success': semantic.light.success,
  '--warning': semantic.light.warning,
  '--error': semantic.light.error,
  '--info': semantic.light.info
};

// Dark Mode CSS Variables
export const cssVariablesDark = {
  // Brand Colors (Dark mode variants)
  '--brand-blue': brand.primaryLight,
  '--brand-gold': brand.secondaryLight,
  '--brand-gold-light': brand.gold[300],
  '--brand-dark': brand.white,
  '--brand-white': brand.white,

  // Semantic Colors (Dark mode)
  '--background': semantic.dark.background,
  '--foreground': semantic.dark.foreground,
  '--card': semantic.dark.card,
  '--card-foreground': semantic.dark.cardForeground,
  '--muted': semantic.dark.muted,
  '--muted-foreground': semantic.dark.mutedForeground,
  '--accent': semantic.dark.accent,
  '--accent-foreground': semantic.dark.accentForeground,
  '--border': semantic.dark.border,
  '--input': semantic.dark.input,
  '--ring': semantic.dark.ring,

  // Status Colors (Dark mode)
  '--success': semantic.dark.success,
  '--warning': semantic.dark.warning,
  '--error': semantic.dark.error,
  '--info': semantic.dark.info
};

// Theme Detection
export const isDarkMode = (element = document.documentElement) => {
  return element.classList.contains('dark');
};

// Get CSS Variables for current theme
export const getCurrentThemeVars = () => {
  return isDarkMode() ? cssVariablesDark : cssVariables;
};
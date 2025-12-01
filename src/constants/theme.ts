/**
 * Theme Constants
 * Centralized theme configuration for colors, spacing, and animations
 */

export const COLORS = {
  // Primary colors
  primary: '#1B2A4E',
  primaryLight: '#2d3748',
  primaryDark: '#0F1A33',
  
  // Secondary/Accent colors
  secondary: '#E6B37C',
  secondaryDark: '#D4A164',
  
  // Neutral colors
  white: '#FFFFFF',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
} as const;

export const SPACING = {
  section: {
    py: 'py-24',
    px: 'px-4',
  },
  container: {
    base: 'container mx-auto px-4 md:px-8',
  },
} as const;

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
  },
  easing: {
    smooth: [0.33, 1, 0.68, 1] as const,
    easeOut: 'easeOut' as const,
  },
} as const;

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const SCROLL_THRESHOLD = 50;

export const NAVBAR_HEIGHT = {
  scrolled: 'py-3',
  default: 'py-6',
} as const;

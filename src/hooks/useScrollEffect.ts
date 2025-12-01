/**
 * useScrollEffect Hook
 * Detects when user has scrolled past a threshold
 */

import { useState, useEffect } from 'react';

export interface UseScrollEffectOptions {
  threshold?: number;
}

/**
 * Custom hook to detect scroll position
 * @param threshold - Scroll position threshold in pixels (default: 50)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrollEffect(threshold: number = 50): boolean {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    // Call once on mount to set initial state
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolled;
}

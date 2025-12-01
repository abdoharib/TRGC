/**
 * useMousePosition Hook
 * Tracks mouse position for parallax effects
 */

import { useState, useCallback } from 'react';
import type { MousePosition } from '../types/components';

export interface UseMousePositionOptions {
  sensitivity?: number;
}

/**
 * Custom hook to track mouse position for parallax effects
 * @param sensitivity - Movement sensitivity multiplier (default: 0.05)
 * @returns Object with mouse position and handler function
 */
export function useMousePosition(sensitivity: number = 0.05) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * sensitivity;
      const moveY = (clientY - window.innerHeight / 2) * sensitivity;
      setMousePosition({ x: moveX, y: moveY });
    },
    [sensitivity]
  );

  return { mousePosition, handleMouseMove };
}

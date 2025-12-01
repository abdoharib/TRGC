/**
 * Component Types
 * Comprehensive TypeScript types for all components
 */

import { ReactNode } from 'react';

// ==================== Common Types ====================

export interface BaseComponentProps {
  className?: string;
}

export interface MousePosition {
  x: number;
  y: number;
}

// ==================== Navigation Types ====================

export interface NavbarProps extends BaseComponentProps {
  // Currently no additional props, but prepared for future extension
}

// ==================== Hero Section Types ====================

export interface HeroSectionProps extends BaseComponentProps {
  // Currently no additional props
}

// ==================== About Section Types ====================

export interface AboutSectionProps extends BaseComponentProps {
  // Currently no additional props
}

export interface AboutFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

// ==================== GRC Section Types ====================

export interface GRCSectionProps extends BaseComponentProps {
  // Currently no additional props
}

export interface GRCExplorerProps extends BaseComponentProps {
  // Currently no additional props
}

export interface LayerMeshUserData {
  originalY: number;
  offsetFactor: number;
  id: string;
}

export type LayerType = 'solid' | 'wireframe' | 'glass';

export interface LayerConfig {
  name: string;
  color: number;
  yPos: number;
  type?: LayerType;
}

// ==================== Goals Section Types ====================

export interface GoalsSectionProps extends BaseComponentProps {
  // Currently no additional props
}

export interface GoalItemProps {
  icon: ReactNode;
  text: string;
  delay: number;
}

export interface Goal {
  icon: ReactNode;
  title: string;
  desc: string;
}

// ==================== Services Section Types ====================

export interface ServicesSectionProps extends BaseComponentProps {
  // Currently no additional props
}

export interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  delay: number;
}

export interface Service {
  number: string;
  title: string;
  desc: string;
}

// ==================== Footer Types ====================

export interface FooterProps extends BaseComponentProps {
  // Currently no additional props
}

// ==================== Animation Types ====================

export interface MotionVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: Record<string, unknown>;
}

export interface ParallaxConfig {
  sensitivity: number;
  maxOffset: number;
}

// ==================== Three.js Types ====================

export interface ThreeJSConfig {
  cameraPosition?: [number, number, number];
  fogDensity?: number;
  minDistance?: number;
  maxDistance?: number;
  enableShadows?: boolean;
}

export interface ThreeJSScene {
  cleanup: () => void;
}

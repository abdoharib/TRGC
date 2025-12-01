import React from 'react';
import { AlThabetLanding } from './Component';

// Tailwind config for the component
window.tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B2A4E', // Deep Navy from the images
          light: '#2C406E',
          dark: '#0F1A33'
        },
        secondary: {
          DEFAULT: '#E6B37C', // Gold/Beige from the images
          light: '#F0CFA8',
          dark: '#C69258'
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        sans: ['Cairo', 'Tajawal', 'sans-serif'],
        serif: ['Amiri', 'serif']
      }
    }
  }
};

export default function App() {
  return (
    <div className="w-full min-h-screen bg-white text-right" dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&family=Tajawal:wght@300;400;500;700;800&display=swap');
        
        body {
          font-family: 'Tajawal', sans-serif;
        }
      `}</style>
      <AlThabetLanding />
    </div>
  );
}
/**
 * Navbar Component
 * Main navigation bar with scroll effect and mobile menu
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScrollEffect } from '../../hooks/useScrollEffect';
import { NAV_LINKS } from '../../constants/navigation';
import { SCROLL_THRESHOLD } from '../../constants/theme';
import { getImageKitUrl } from '../../constants/portfolio';
import type { NavbarProps } from '../../types/components';

export const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
    const isScrolled = useScrollEffect(SCROLL_THRESHOLD);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 !bg-primary transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-3'
                } ${className}`}
        >
            <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
                {/* Logo Area */}
                <div className="flex items-center gap-3 relative">
                    {/* Logo when not scrolled (white version) */}
                    <img
                        src={getImageKitUrl('logo-white.png', 'logo')}
                        alt="الثابت للزخارف"
                        className={`h-12 md:h-14 w-auto transition-opacity duration-500 absolute ${isScrolled ? 'opacity-0' : 'opacity-100 brightness-0 invert'
                            }`}
                    />
                    {/* Logo when scrolled (color version) */}
                    <img
                        src={getImageKitUrl('logo-color.png', 'logo')}
                        alt="الثابت للزخارف"
                        className={`h-12 md:h-14 w-auto transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`text-base font-medium transition-colors duration-300 hover:text-secondary ${isScrolled ? 'text-primary' : 'text-white/90'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        className="bg-secondary hover:bg-secondary-dark text-white px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95"
                    >
                        اتصل بنا
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-secondary p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                    aria-expanded={isMobileMenuOpen}
                >
                    {isMobileMenuOpen ? (
                        <X size={32} />
                    ) : (
                        <Menu size={32} className={isScrolled ? 'text-primary' : 'text-white'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white text-xl font-medium py-2 border-b border-white/10 hover:text-secondary transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="bg-secondary text-white text-center py-3 rounded-lg font-bold mt-4"
                            >
                                اتصل بنا
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

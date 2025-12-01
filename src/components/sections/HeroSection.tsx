/**
 * Hero Section Component
 * Main landing hero section with parallax effects
 */

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Clock, ArrowLeft } from 'lucide-react';
import { useMousePosition } from '../../hooks/useMousePosition';
import { ANIMATION } from '../../constants/theme';
import type { HeroSectionProps } from '../../types/components';

export const HeroSection: React.FC<HeroSectionProps> = ({ className = '' }) => {
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 100]);
    const { mousePosition, handleMouseMove } = useMousePosition(0.05);

    return (
        <section
            id="hero"
            className={`relative h-screen w-full overflow-hidden flex items-center bg-[#0F1A33] ${className}`}
            onMouseMove={handleMouseMove}
        >
            {/* Abstract Architectural Background Pattern */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
                <svg width="100%" height="100%" className="absolute inset-0">
                    <defs>
                        <pattern id="islamic-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M30 0L60 30L30 60L0 30L30 0Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-secondary" />
                            <circle cx="30" cy="30" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary-light" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#islamic-pattern)" />
                </svg>
            </div>

            {/* Giant Background Typography */}
            <div
                className="absolute right-[-10%] top-1/4 text-[25vw] font-black text-white/[0.03] leading-none select-none pointer-events-none whitespace-nowrap"
                style={{ fontFamily: 'Cairo, sans-serif' }}
            >
                الثابت
            </div>

            {/* Main Content Container - Split Layout */}
            <div className="container mx-auto px-4 md:px-8 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 h-full items-center">

                {/* Right Content (Text) */}
                <motion.div
                    className="lg:col-span-7 text-center lg:text-right order-2 lg:order-1 pt-12 md:pt-16 lg:pt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-8 leading-[1.1]">
                        <span className="block overflow-hidden py-2">
                            <motion.span
                                className="block text-5xl"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3, ease: ANIMATION.easing.smooth }}
                            >
                                إبداع في
                            </motion.span>
                        </span>
                        <span className="block overflow-hidden py-2 text-transparent bg-clip-text bg-gradient-to-r from-secondary via-[#F0CFA8] to-secondary">
                            <motion.span
                                className="block"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: ANIMATION.easing.smooth }}
                            >
                                التفاصيل المعمارية
                            </motion.span>
                        </span>
                    </h1>

                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-6 md:mb-10 leading-relaxed font-light"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        نحول الخرسانة إلى تحف فنية. شركة الثابت تقدم أحدث حلول الـ GRC لتكسية الواجهات الخارجية والديكورات الداخلية بمتانة تدوم وعمران يلهم.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-3 md:gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <a href="#projects" className="group relative px-7 py-3.5 md:px-8 md:py-4 bg-secondary text-white text-base md:text-base font-bold rounded-none overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(230,179,124,0.4)]">
                            <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
                            <span className="relative flex items-center gap-2">
                                اطلب استشارة مجانية
                                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            </span>
                        </a>
                        <a href="#about" className="px-7 py-3.5 md:px-8 md:py-4 border border-white/20 text-white text-base md:text-base font-bold hover:bg-white/5 transition-all flex items-center gap-2">
                            <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 flex items-center justify-center text-xs">
                                <Clock size={14} />
                            </span>
                            تعرف علينا
                        </a>
                    </motion.div>
                </motion.div>

                {/* Left Content (Visual/Image) */}
                <div className="lg:col-span-5 relative h-full hidden lg:flex items-center justify-center order-1 lg:order-2">
                    {/* Main visual element - Floating Panels */}
                    <motion.div
                        className="relative w-full aspect-[4/5] max-w-md mx-auto"
                        style={{ x: mousePosition.x * -1, y: mousePosition.y * -1 }}
                    >
                        {/* Back Panel */}
                        <motion.div
                            className="absolute top-0 right-0 w-4/5 h-3/4 bg-gradient-to-bl from-primary-light to-primary-dark rounded-tr-[80px] rounded-bl-[20px] z-10 border border-white/10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2664&auto=format&fit=crop"
                                alt="Detail"
                                className="w-full h-full object-cover opacity-60 mix-blend-overlay rounded-tr-[80px] rounded-bl-[20px]"
                            />
                        </motion.div>

                        {/* Front Panel */}
                        <motion.div
                            className="absolute bottom-0 left-0 w-4/5 h-3/4 bg-white rounded-tl-[20px] rounded-br-[80px] z-20 overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            style={{ x: mousePosition.x * 2, y: mousePosition.y * 2 }}
                        >
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                                alt="Worker"
                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6 text-white">
                                <div className="font-bold text-xl mb-1">دقة في التنفيذ</div>
                                <div className="text-sm text-gray-300">معايير جودة عالمية</div>
                            </div>
                        </motion.div>

                        {/* Decorative Floating Elements */}
                        <motion.div
                            className="absolute top-[20%] left-[-10%] w-20 h-20 bg-secondary rounded-full z-30 flex items-center justify-center shadow-xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
                            style={{ y }}
                        >
                            <Award className="text-white w-10 h-10" />
                        </motion.div>

                        <motion.div
                            className="absolute bottom-[10%] right-[-5%] bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl z-30 max-w-[150px]"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1 }}
                        >
                            <div className="flex text-secondary mb-1">★★★★★</div>
                            <div className="text-xs text-white font-medium">ثقة أكثر من 50 مؤسسة حكومية وخاصة</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-8 z-30 hidden md:flex items-center gap-4 rotate-90 origin-left translate-y-8">
                <span className="text-white/50 text-sm tracking-widest uppercase">Scroll Down</span>
                <div className="w-16 h-[1px] bg-white/20 overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-secondary"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                </div>
            </div>
        </section>
    );
};

/**
 * Portfolio Section Component
 * Showcases company work with ImageKit-optimized images in a Swiper slider
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { PORTFOLIO_ITEMS, getImageKitUrl } from '../../constants/portfolio';
import type { PortfolioSectionProps } from '../../types/components';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ className = '' }) => {
    return (
        <section id="portfolio" className={`py-24 bg-gradient-to-b from-gray-50 to-white ${className}`}>
            <div className="container mx-auto px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4">معرض أعمالنا</h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        نفخر بمشاريعنا المتميزة التي تعكس جودتنا وخبرتنا في مجال الديكور المعماري
                    </p>
                </motion.div>

                {/* Portfolio Slider */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="relative"
                >
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 25,
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                        dir="rtl"
                        className="portfolio-swiper pb-12"
                    >
                        {PORTFOLIO_ITEMS.map((item) => (
                            <SwiperSlide key={item.id}>
                                <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                                    {/* Image Container */}
                                    <div className="relative h-80 overflow-hidden">
                                        <img
                                            src={getImageKitUrl(item.imagePath, 'fullsize')}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                            loading="lazy"
                                        />
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Category Badge */}
                                        <div className="absolute top-4 right-4 bg-secondary px-4 py-2 rounded-full">
                                            <span className="text-white font-semibold text-sm">{item.category}</span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 relative">
                                        <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Decorative element */}
                                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-secondary/10 rounded-tl-full transform translate-x-10 translate-y-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button
                        className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-secondary text-primary hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 -translate-x-6 lg:translate-x-0"
                        aria-label="Previous slide"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <button
                        className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-secondary text-primary hover:text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 translate-x-6 lg:translate-x-0"
                        aria-label="Next slide"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </motion.div>

                {/* Custom Swiper Pagination Styles */}
                <style>{`
          .portfolio-swiper .swiper-pagination-bullet {
            background: #1B2A4E;
            opacity: 0.3;
            width: 10px;
            height: 10px;
            transition: all 0.3s ease;
          }
          
          .portfolio-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            background: #E6B37C;
            transform: scale(1.3);
          }
          
          .portfolio-swiper .swiper-pagination {
            bottom: 0;
          }
        `}</style>
            </div>
        </section>
    );
};

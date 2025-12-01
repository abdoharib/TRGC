/**
 * Services Section Component
 * Company services and offerings
 */

import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES } from '../../constants/services';
import type { ServicesSectionProps } from '../../types/components';

export const ServicesSection: React.FC<ServicesSectionProps> = ({ className = '' }) => {
    return (
        <section id="services" className={`py-24 bg-white ${className}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-5xl font-bold text-primary mb-4">خدماتنا</h2>
                    <p className="text-xl text-gray-600">
                        تقدم شركة الثابت منظومة خدمات متكاملة في مجال الجي آر سي
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {SERVICES.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="flex gap-6 group"
                        >
                            <div className="flex-shrink-0">
                                <span className="text-6xl font-black text-gray-200 group-hover:text-secondary transition-colors duration-300">
                                    {service.number}
                                </span>
                            </div>
                            <div className="pt-4">
                                <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors relative inline-block">
                                    {service.title}
                                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-secondary group-hover:w-full transition-all duration-300"></span>
                                </h3>
                                <p className="text-gray-600 leading-relaxed text-lg">
                                    {service.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

/**
 * GRC Section Component
 * Section showcasing GRC material and its properties
 */

import React from 'react';
import { motion } from 'framer-motion';
import { GRCExplorer } from '../grc/GRCExplorer';
import { GRC_FEATURES } from '../../constants/goals';
import type { GRCSectionProps } from '../../types/components';

export const GRCSection: React.FC<GRCSectionProps> = ({ className = '' }) => {
    return (
        <section id="grc" className={`py-24 bg-neutral-50 relative overflow-hidden ${className}`}>
            {/* Background pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#1B2A4E 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            ></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-primary mb-4">
                        ما هو الـ <span className="text-secondary">GRC</span> ؟
                    </h2>
                    <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="col-span-1"
                    >
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-gray-700 mb-8">
                            الجي آر سي هو مادة معمارية متطورة تتميز بالمرونة والمتانة وقابلية التشكيل، مما يجعلها خياراً مثالياً للواجهات الحديثة والكلاسيكية.
                        </p>

                        <div className="space-y-6">
                            {GRC_FEATURES.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.2 }}
                                    className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100"
                                >
                                    <div className="bg-secondary/20 w-10 h-10 rounded-full flex items-center justify-center text-secondary font-bold flex-shrink-0">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-primary text-lg">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative min-h-[500px] col-span-2"
                    >
                        <GRCExplorer />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

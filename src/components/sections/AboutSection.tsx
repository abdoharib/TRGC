/**
 * About Section Component
 * Company introduction and features
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';
import type { AboutSectionProps } from '../../types/components';

export const AboutSection: React.FC<AboutSectionProps> = ({ className = '' }) => {
    return (
        <section id="about" className={`py-24 bg-white overflow-hidden ${className}`}>
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white aspect-[4/3]">
                            <img
                                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop"
                                alt="Worker on Dome"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
                        </div>
                        {/* Decorative Element */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full -z-10 blur-3xl" />
                        <div className="absolute -top-10 -left-10 w-60 h-60 bg-primary/5 rounded-full -z-10 blur-3xl" />

                        {/* Floating Card */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="absolute -bottom-8 left-8 bg-white p-6 rounded-xl shadow-xl border-r-4 border-secondary max-w-xs hidden md:block"
                        >
                            <div className="text-4xl font-bold text-primary mb-1">+15</div>
                            <div className="text-gray-600 font-medium">عاماً من الخبرة والتميز في تنفيذ المشاريع</div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2"
                    >
                        <div className="inline-block mb-4 px-4 py-1 bg-secondary/10 text-secondary font-bold rounded-full border border-secondary/20">
                            من نحن
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            من هم <span className="text-secondary relative inline-block">
                                الثابت
                                <svg className="absolute w-full h-3 -bottom-1 right-0 text-secondary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                                </svg>
                            </span> ؟
                        </h2>
                        <h3 className="text-2xl text-gray-700 mb-6 font-medium">
                            نحن رواد صناعة الجي آر سي في ليبيا
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg mb-6">
                            تعد شركة الثابت إحدى الشركات البارزة في مجال تنفيذ وصناعة أعمال الجي آر سي، حيث تقدم حلولاً مبتكرة تجمع بين الفخامة والمتانة والدقة.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg mb-8">
                            يمتلك فريق الشركة خبرات واسعة وخط إنتاج متخصص يمكنها من تصميم وتنفيذ واجهات راقية ومسطحات معمارية متقنة تلائم احتياجات الشركات والمؤسسات والجهات الحكومية.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                                    <Award size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg mb-1">جودة عالية</h4>
                                    <p className="text-sm text-gray-500">نلتزم بأعلى معايير الجودة في التنفيذ</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                                    <CheckCircle2 size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary text-lg mb-1">دقة في المواعيد</h4>
                                    <p className="text-sm text-gray-500">الالتزام التام بالجداول الزمنية للمشاريع</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

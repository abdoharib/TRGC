/**
 * Goals Section Component
 * Company goals and objectives
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Target, Building2, Clock, Compass, Hammer } from 'lucide-react';
import type { GoalsSectionProps } from '../../types/components';

const GOALS = [
    {
        icon: <Target size={40} />,
        title: "تعزيز المكانة",
        desc: "تعزيز مكانة الشركة كشريك موثوق لتنفيذ مشاريع الجي آر سي للمؤسسات والجهات الحكومية."
    },
    {
        icon: <Building2 size={40} />,
        title: "حلول معمارية",
        desc: "تقديم حلول معمارية تجمع بين الطابع الجمالي الفاخر والمتانة العالية."
    },
    {
        icon: <Clock size={40} />,
        title: "الالتزام والجودة",
        desc: "الالتزام بالجودة والمواعيد كعنصر أساسي في كل مشروع نقوم بتنفيذه."
    },
    {
        icon: <Compass size={40} />,
        title: "توسيع النطاق",
        desc: "توسيع نطاق المشاريع لتشمل المباني الإدارية والواجهات الكبرى والأعمال التطويرية."
    },
    {
        icon: <Hammer size={40} />,
        title: "دعم العمران",
        desc: "دعم قطاع البناء بحلول حديثة ترتقي بالمشهد العمراني في ليبيا."
    }
];

export const GoalsSection: React.FC<GoalsSectionProps> = ({ className = '' }) => {
    return (
        <section id="goals" className={`py-24 bg-primary text-white relative overflow-hidden ${className}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="container mx-auto px-4 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
                        <Target className="text-secondary w-8 h-8" />
                    </div>
                    <h2 className="text-5xl font-bold mb-6">أهدافنا</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                        نسعى دائماً لتحقيق التميز من خلال مجموعة من الأهداف الاستراتيجية التي تضع عملاءنا في المقام الأول
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {GOALS.map((goal, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/10 p-8 rounded-2xl transition-all group hover:-translate-y-2"
                        >
                            <div className="mb-6 text-secondary group-hover:text-white transition-colors transform group-hover:scale-110 duration-300 origin-right">
                                {goal.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-white">{goal.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                                {goal.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

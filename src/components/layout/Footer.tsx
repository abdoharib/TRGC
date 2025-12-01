/**
 * Footer Component
 * Site footer with contact information and links
 */

import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';
import { FOOTER_LINKS, CONTACT_INFO } from '../../constants/navigation';
import type { FooterProps } from '../../types/components';

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
    return (
        <footer id="contact" className={`bg-primary-dark text-white pt-20 pb-10 ${className}`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                                <Building2 className="text-primary w-8 h-8" />
                            </div>
                            <div className="font-bold text-3xl tracking-tighter">
                                <span className="text-secondary">الثابت</span>{' '}
                                <span className="text-white">للزخارف</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-md mb-8">
                            شريكك الأمثل في عالم الديكورات المعمارية والجي آر سي. نجمع بين الفن والهندسة لنخلق
                            واجهات تخلد في الذاكرة.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Links */}
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="فيسبوك"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-secondary flex items-center justify-center transition-colors cursor-pointer"
                                aria-label="انستغرام"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.468 2.373c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-secondary">روابط سريعة</h3>
                        <ul className="space-y-4">
                            {FOOTER_LINKS.quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-gray-300 hover:text-white hover:translate-x-[-5px] transition-all inline-block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 text-secondary">تواصل معنا</h3>
                        <ul className="space-y-4 text-gray-300">
                            <li className="flex items-start gap-3">
                                <MapPin className="text-secondary flex-shrink-0 mt-1" size={20} />
                                <span>{CONTACT_INFO.location}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="text-secondary flex-shrink-0" size={20} />
                                <span dir="ltr">{CONTACT_INFO.phone}</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="text-secondary flex-shrink-0" size={20} />
                                <span>{CONTACT_INFO.email}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
                    <p>
                        © {new Date().getFullYear()} شركة الثابت للزخارف المعمارية. جميع الحقوق محفوظة.
                    </p>
                </div>
            </div>
        </footer>
    );
};

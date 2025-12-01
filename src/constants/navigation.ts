/**
 * Navigation Constants
 * Navigation links and menu structure
 */

export interface NavLink {
  name: string;
  href: string;
}

export const NAV_LINKS: NavLink[] = [
  { name: 'الرئيسية', href: '#hero' },
  { name: 'من نحن', href: '#about' },
  { name: 'عن GRC', href: '#grc' },
  { name: 'أهدافنا', href: '#goals' },
  { name: 'خدماتنا', href: '#services' },
] as const;

export const FOOTER_LINKS = {
  quickLinks: [
    { name: 'الرئيسية', href: '#' },
    { name: 'من نحن', href: '#about' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'مشاريعنا', href: '#projects' },
  ],
} as const;

export const CONTACT_INFO = {
  location: 'ليبيا - طرابلس - المقر الرئيسي',
  phone: '+218 91 123 4567',
  email: 'info@althabet.ly',
} as const;

export const SOCIAL_LINKS = {
  facebook: '#',
  instagram: '#',
} as const;

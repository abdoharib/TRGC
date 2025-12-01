/**
 * Portfolio Constants
 * Portfolio items with ImageKit integration
 */

export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imagePath: string; // ImageKit path or filename
}

/**
 * ImageKit Configuration
 * Replace with your actual ImageKit URL endpoint
 */
export const IMAGEKIT_CONFIG = {
  urlEndpoint: 'https://ik.imagekit.io/n5mdgw1g4', // Update with your ImageKit endpoint
  transformations: {
    thumbnail: 'tr=w-400,h-300,fo-auto,q-80',
    fullsize: 'tr=w-1200,h-900,fo-auto,q-90',
    logo: 'tr=h-100,q-100', // Height based, maintain aspect ratio
  },
};

/**
 * Helper function to generate ImageKit URL
 */
export const getImageKitUrl = (imagePath: string, transformation: 'thumbnail' | 'fullsize' | 'logo' = 'thumbnail'): string => {
  const { urlEndpoint, transformations } = IMAGEKIT_CONFIG;
  return `${urlEndpoint}/${imagePath}?${transformations[transformation]}`;
};

/**
 * Portfolio Items
 * Add your actual portfolio items here with ImageKit image paths
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: '1',
    title: 'مشروع واجهة فيلا سكنية',
    category: 'واجهات',
    description: 'تصميم وتنفيذ واجهة فيلا سكنية بتقنية GRC الحديثة',
    imagePath: '1000002939_compressed.jpg',
  },
  {
    id: '2',
    title: 'مبنى تجاري - طرابلس',
    category: 'مباني تجارية',
    description: 'تشطيب خارجي لمبنى تجاري متعدد الطوابق',
    imagePath: '1000004358_compressed.jpg',
  },
  {
    id: '3',
    title: 'مسجد النور',
    category: 'مساجد',
    description: 'واجهات وديكورات داخلية بتقنية GRC',
    imagePath: '1000002588_compressed.jpg',
  },
  {
    id: '4',
    title: 'فيلا سكنية - بنغازي',
    category: 'واجهات',
    description: 'تصميم كلاسيكي بلمسة عصرية',
    imagePath: '1000004357_compressed.jpg',
  },
  {
    id: '5',
    title: 'مركز ثقافي',
    category: 'منشآت عامة',
    description: 'واجهات وزخارف معمارية مميزة',
    imagePath: '1000049000_compressed.jpg',
  },
  {
    id: '6',
    title: 'قصر الأفراح',
    category: 'قاعات',
    description: 'ديكورات داخلية وخارجية فاخرة',
    imagePath: '1000004275_compressed.jpg',
  },
];

/**
 * Goals and GRC Layer Data
 * Company goals and GRC material specifications
 */

import { ReactNode } from 'react';

export interface Goal {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface GRCLayerData {
  title: string;
  material: string;
  function: string;
  char: string;
}

export type GRCLayerName = 'finishing' | 'filling' | 'mesh' | 'gfcr';

export const GRC_LAYER_DATA: Record<GRCLayerName, GRCLayerData> = {
  finishing: {
    title: "الطبقة النهائية (Finishing)",
    material: "دهان بولي يوريثين / طلاء معماري",
    function: "جمالية وحماية (أشعة الشمس/الرطوبة)",
    char: "سطح أملس غير مسامي"
  },
  filling: {
    title: "طبقة الملء (Filling)",
    material: "معجون إيبوكسي / مونة راتنجية",
    function: "تسوية السطح والتنغيم",
    char: "ملء الفراغات وسهولة الصنفرة"
  },
  mesh: {
    title: "شبكة التسليح (Mesh)",
    material: "ألياف زجاجية مقاومة للقلويات",
    function: "التثبيت الميكانيكي والدعم",
    char: "هيكل شبكي خفيف الوزن"
  },
  gfcr: {
    title: "الخرسانة المسلحة (GFCR)",
    material: "خرسانة مدعمة بالألياف الزجاجية",
    function: "الركيزة الهيكلية الأساسية",
    char: "قوة شد عالية ومقاومة للحريق"
  }
} as const;

export const GRC_FEATURES = [
  {
    title: "مقاومة العوامل الجوية",
    desc: "تحمل عالي للرطوبة والحرارة والرياح"
  },
  {
    title: "خفة الوزن",
    desc: "أخف وزناً من الخرسانة التقليدية مما يقلل الحمل على المبنى"
  },
  {
    title: "مرونة التصميم",
    desc: "إمكانية تشكيل أي تصميم معماري مهما كان معقداً"
  },
] as const;

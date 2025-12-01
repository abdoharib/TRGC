/**
 * Services Data
 * Service offerings and descriptions
 */

export interface Service {
  number: string;
  title: string;
  desc: string;
}

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "التصميم",
    desc: "ابتكار نماذج معمارية فاخرة وعصرية تلائم الطابع العام للمشروع، مع مراعاة أدق التفاصيل الجمالية والهندسية."
  },
  {
    number: "02",
    title: "التصنيع",
    desc: "خط إنتاج متخصص يضمن أعلى درجات الدقة باستخدام مواد عالية الجودة وتقنيات حديثة لضمان متانة المنتج."
  },
  {
    number: "03",
    title: "التنفيذ والتركيب",
    desc: "فريق متمرس قادر على تنفيذ المشاريع الكبيرة والمعقدة بمعايير عالمية وفي أوقات قياسية."
  },
  {
    number: "04",
    title: "الإشراف",
    desc: "متابعة دقيقة لكافة مراحل المشروع لضمان تطابق التنفيذ مع التصاميم والمواصفات المعتمدة."
  }
] as const;

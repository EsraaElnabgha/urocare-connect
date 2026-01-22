import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FileText, Users, Award, Microscope } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const caseStudies = [
  {
    id: 1,
    titleEn: 'Complex Kidney Stone Removal',
    titleAr: 'إزالة حصوات الكلى المعقدة',
    descriptionEn: 'Successful treatment of a 2.5cm kidney stone using advanced laser technology with minimal recovery time.',
    descriptionAr: 'علاج ناجح لحصوة كلوية بحجم 2.5 سم باستخدام تقنية الليزر المتقدمة مع أقل وقت للتعافي.',
    category: 'Kidney Stones',
    outcome: 'Success',
    icon: Microscope,
  },
  {
    id: 2,
    titleEn: 'Prostate Cancer Early Detection',
    titleAr: 'الكشف المبكر عن سرطان البروستاتا',
    descriptionEn: 'Early-stage prostate cancer detected through regular screening, treated successfully with minimally invasive surgery.',
    descriptionAr: 'تم اكتشاف سرطان البروستاتا في مرحلة مبكرة من خلال الفحص الدوري وتم علاجه بنجاح بالجراحة طفيفة التوغل.',
    category: 'Oncology',
    outcome: 'Full Recovery',
    icon: FileText,
  },
  {
    id: 3,
    titleEn: 'Male Infertility Treatment',
    titleAr: 'علاج العقم عند الرجال',
    descriptionEn: 'Comprehensive fertility treatment resulting in successful conception after 2 years of infertility.',
    descriptionAr: 'علاج شامل للخصوبة أدى إلى حمل ناجح بعد عامين من العقم.',
    category: 'Andrology',
    outcome: 'Success',
    icon: Users,
  },
  {
    id: 4,
    titleEn: 'Robotic Prostatectomy',
    titleAr: 'استئصال البروستاتا الروبوتي',
    descriptionEn: 'State-of-the-art robotic surgery for prostate removal with excellent post-operative outcomes.',
    descriptionAr: 'جراحة روبوتية متطورة لاستئصال البروستاتا مع نتائج ممتازة بعد العملية.',
    category: 'Surgery',
    outcome: 'Excellent',
    icon: Award,
  },
];

const CaseStudiesSection = () => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  return (
    <section id="case-studies" className="section-padding bg-secondary/30">
      <div className="container-medical">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {t('nav.caseStudies')}
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4',
            isRTL && 'font-arabic'
          )}>
            {isRTL ? 'حالات سريرية ناجحة' : 'Successful Case Studies'}
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            isRTL && 'font-arabic'
          )}>
            {isRTL 
              ? 'نعرض بعض الحالات الناجحة التي تم علاجها في عيادتنا'
              : 'Showcasing successful cases treated at our clinic'}
          </p>
        </motion.div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={caseStudy.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="medical-card group"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="p-4 rounded-xl bg-primary/10 text-primary shrink-0 group-hover:scale-110 transition-transform">
                  <caseStudy.icon className="h-8 w-8" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  {/* Category & Outcome */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-medium">
                      {caseStudy.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs font-medium">
                      {caseStudy.outcome}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className={cn(
                    'text-xl font-semibold text-foreground mb-2',
                    isRTL && 'font-arabic'
                  )}>
                    {language === 'ar' ? caseStudy.titleAr : caseStudy.titleEn}
                  </h3>
                  
                  {/* Description */}
                  <p className={cn(
                    'text-muted-foreground',
                    isRTL && 'font-arabic'
                  )}>
                    {language === 'ar' ? caseStudy.descriptionAr : caseStudy.descriptionEn}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button size="lg" className="btn-primary">
            {isRTL ? 'عرض المزيد من الحالات' : 'View More Cases'}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;

import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Stethoscope, Syringe, Activity, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const services = [
  {
    key: 'consultation',
    icon: Stethoscope,
    color: 'bg-primary/10 text-primary',
  },
  {
    key: 'surgery',
    icon: Syringe,
    color: 'bg-accent/10 text-accent',
  },
  {
    key: 'diagnostics',
    icon: Activity,
    color: 'bg-medical-blue/10 text-medical-blue',
  },
  {
    key: 'treatment',
    icon: ClipboardList,
    color: 'bg-medical-green/10 text-medical-green',
  },
];

const ServicesSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="section-padding bg-secondary/30">
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
            {t('services.title')}
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4',
            isRTL && 'font-arabic'
          )}>
            {t('services.subtitle')}
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            isRTL && 'font-arabic'
          )}>
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.key}
              variants={itemVariants}
              className="medical-card group cursor-pointer"
            >
              <div className={cn(
                'w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110',
                service.color
              )}>
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className={cn(
                'text-xl font-semibold text-foreground mb-2',
                isRTL && 'font-arabic'
              )}>
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className={cn(
                'text-muted-foreground',
                isRTL && 'font-arabic'
              )}>
                {t(`services.items.${service.key}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

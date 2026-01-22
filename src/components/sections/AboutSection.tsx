import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Users, Heart, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import doctorPortrait from '@/assets/doctor-portrait.jpg';

const AboutSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const stats = [
    { icon: Award, value: '20+', label: t('about.experience'), color: 'text-primary' },
    { icon: Users, value: '5000+', label: t('about.patients'), color: 'text-accent' },
    { icon: Heart, value: '3000+', label: t('about.surgeries'), color: 'text-medical-green' },
    { icon: BookOpen, value: '15+', label: t('about.awards'), color: 'text-medical-blue' },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="container-medical">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={doctorPortrait} 
                alt="Doctor Portrait" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
            </div>
            
            {/* Experience Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, type: 'spring' }}
              className={cn(
                'absolute -bottom-6 medical-card p-6 shadow-glow',
                isRTL ? '-left-6' : '-right-6'
              )}
            >
              <div className="text-4xl font-bold text-primary">20+</div>
              <div className={cn('text-sm text-muted-foreground', isRTL && 'font-arabic')}>
                {t('about.experience')}
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t('about.title')}
            </span>
            <h2 className={cn(
              'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6',
              isRTL && 'font-arabic'
            )}>
              {t('about.subtitle')}
            </h2>
            <p className={cn(
              'text-lg text-muted-foreground mb-8',
              isRTL && 'font-arabic'
            )}>
              {t('about.description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50"
                >
                  <div className={cn('p-3 rounded-lg bg-background', stat.color)}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className={cn('text-sm text-muted-foreground', isRTL && 'font-arabic')}>
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

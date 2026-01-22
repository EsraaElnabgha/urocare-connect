import { useTranslation } from 'react-i18next';
import { motion, Easing } from 'framer-motion';
import { Calendar, MessageCircle, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import doctorPortrait from '@/assets/doctor-portrait.jpg';

const HeroSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const easeOut: Easing = [0.25, 0.46, 0.45, 0.94];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-16 md:pt-20"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container-medical section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={cn('text-center lg:text-start', isRTL && 'lg:text-end')}
          >
            <motion.span
              variants={itemVariants}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              {t('hero.greeting')}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className={cn(
                'text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4',
                isRTL && 'font-arabic'
              )}
            >
              <span className="text-gradient">{t('hero.title')}</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className={cn(
                'text-xl sm:text-2xl text-primary font-semibold mb-4',
                isRTL && 'font-arabic'
              )}
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.p
              variants={itemVariants}
              className={cn(
                'text-lg text-muted-foreground max-w-xl mb-8',
                !isRTL ? 'lg:mr-auto' : 'lg:ml-auto',
                'mx-auto lg:mx-0',
                isRTL && 'font-arabic'
              )}
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="btn-primary text-base gap-2 group"
              >
                <Calendar className="h-5 w-5 transition-transform group-hover:scale-110" />
                {t('hero.bookAppointment')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary/30 hover:bg-primary/5 text-foreground"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
                {t('hero.contactWhatsApp')}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: '20+', label: t('about.experience') },
                { value: '5000+', label: t('about.patients') },
                { value: '3000+', label: t('about.surgeries') },
                { value: '15+', label: t('about.awards') },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary">{stat.value}</div>
                  <div className={cn('text-sm text-muted-foreground', isRTL && 'font-arabic')}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Doctor Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-3xl scale-75" />
              
              {/* Image Container */}
              <div className="relative w-80 h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img 
                  src={doctorPortrait} 
                  alt="Doctor Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 medical-card p-4"
              >
                <div className="text-2xl">🏥</div>
                <div className="text-xs text-muted-foreground mt-1">24/7 Care</div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -left-4 medical-card p-4"
              >
                <div className="text-2xl">⭐</div>
                <div className="text-xs text-muted-foreground mt-1">Top Rated</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

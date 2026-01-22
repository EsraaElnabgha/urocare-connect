import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const faqKeys = ['q1', 'q2', 'q3', 'q4', 'q5'];

const FAQSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <section id="faq" className="section-padding bg-secondary/30">
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
            {t('faq.subtitle')}
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4',
            isRTL && 'font-arabic'
          )}>
            {t('faq.title')}
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            isRTL && 'font-arabic'
          )}>
            {t('faq.description')}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem
                  value={key}
                  className="medical-card border-none px-6"
                >
                  <AccordionTrigger className={cn(
                    'text-left hover:no-underline text-foreground font-semibold',
                    isRTL && 'font-arabic text-right'
                  )}>
                    {t(`faq.items.${key}.question`)}
                  </AccordionTrigger>
                  <AccordionContent className={cn(
                    'text-muted-foreground',
                    isRTL && 'font-arabic text-right'
                  )}>
                    {t(`faq.items.${key}.answer`)}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

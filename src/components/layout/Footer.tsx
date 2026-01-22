import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import SocialIcons from './SocialIcons';

const quickLinks = [
  { key: 'home', href: '#home' },
  { key: 'about', href: '#about' },
  { key: 'tools', href: '#services' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container-medical section-padding pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">U</span>
              </div>
              <span className={cn('font-bold text-lg', isRTL && 'font-arabic')}>
                {isRTL ? 'عيادة المسالك' : 'Urology Clinic'}
              </span>
            </div>
            <p className={cn('text-background/70 mb-4', isRTL && 'font-arabic')}>
              {isRTL 
                ? 'نقدم أفضل رعاية صحية في مجال المسالك البولية'
                : 'Providing the best healthcare in urology'}
            </p>
            <SocialIcons className="[&_a]:text-background/70 [&_a:hover]:text-primary" />
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className={cn('text-lg font-semibold mb-4', isRTL && 'font-arabic')}>
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className={cn(
                      'text-background/70 hover:text-primary transition-colors',
                      isRTL && 'font-arabic'
                    )}
                  >
                    {t(`nav.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className={cn('text-lg font-semibold mb-4', isRTL && 'font-arabic')}>
              {t('footer.contactInfo')}
            </h3>
            <ul className="space-y-2 text-background/70">
              <li>
                <span className={isRTL ? 'font-arabic' : ''}>
                  {isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}
                </span>
              </li>
              <li dir="ltr">+966 12 345 6789</li>
              <li>info@urologyclinic.com</li>
            </ul>
          </motion.div>

          {/* Follow Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className={cn('text-lg font-semibold mb-4', isRTL && 'font-arabic')}>
              {t('footer.followUs')}
            </h3>
            <p className={cn('text-background/70 mb-4', isRTL && 'font-arabic')}>
              {isRTL 
                ? 'تابعنا على منصات التواصل الاجتماعي'
                : 'Follow us on social media'}
            </p>
            <SocialIcons size="lg" className="[&_a]:text-background/70 [&_a:hover]:text-primary" />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className={cn('text-background/70 text-sm', isRTL && 'font-arabic')}>
              © {currentYear} Urology Clinic. {t('footer.rights')}
            </p>
            <div className="flex gap-6">
              <a href="#" className={cn('text-background/70 hover:text-primary text-sm transition-colors', isRTL && 'font-arabic')}>
                {t('footer.privacy')}
              </a>
              <a href="#" className={cn('text-background/70 hover:text-primary text-sm transition-colors', isRTL && 'font-arabic')}>
                {t('footer.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

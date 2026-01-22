import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import SocialIcons from './SocialIcons';

const navItems = [
  { key: 'home', href: '#home' },
  { key: 'caseStudies', href: '#case-studies' },
  { key: 'about', href: '#about' },
  { key: 'tools', href: '#services' },
  { key: 'blogs', href: '#blogs' },
  { key: 'faq', href: '#faq' },
  { key: 'contact', href: '#contact' },
];

const Navbar = () => {
  const { t } = useTranslation();
  const { language, setLanguage, isRTL } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md border-b border-border'
          : 'bg-transparent'
      )}
    >
      <div className="container-medical">
        <div className="flex items-center justify-between h-16 md:h-20 px-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">U</span>
            </div>
            <span className={cn(
              "font-bold text-lg text-foreground hidden sm:block",
              isRTL && "font-arabic"
            )}>
              {isRTL ? 'عيادة المسالك' : 'Urology Clinic'}
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors rounded-lg hover:bg-primary/5",
                  isRTL && "font-arabic"
                )}
              >
                {t(`nav.${item.key}`)}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2">
            {/* Social Icons - Desktop Only */}
            <div className="hidden xl:flex">
              <SocialIcons size="sm" />
            </div>

            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="relative"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center">
                {language === 'en' ? 'ع' : 'EN'}
              </span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="container-medical py-4 px-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.key}
                    href={item.href}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "px-4 py-3 text-base font-medium text-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-colors",
                      isRTL && "font-arabic text-right"
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </motion.a>
                ))}
                <div className="pt-4 border-t border-border mt-2">
                  <SocialIcons />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const contactSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().trim().min(8, 'Please enter a valid phone number').max(20),
  address: z.string().trim().min(2, 'Please enter your address').max(200),
  message: z.string().trim().max(1000).optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactSection = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    mobile: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to database via REST API (avoids TypeScript issues with unsynced types)
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/booking_requests`,
        {
          method: 'POST',
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify({
            full_name: formData.fullName,
            mobile: formData.mobile,
            address: formData.address,
            message: formData.message || null,
          }),
        }
      );

      if (res.ok) {
        toast({
          title: isRTL ? 'تم الإرسال بنجاح' : 'Message Sent!',
          description: isRTL 
            ? 'سنتواصل معك قريباً' 
            : 'We will get back to you soon.',
        });
        setFormData({ fullName: '', mobile: '', address: '', message: '' });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'فشل في الإرسال. حاول مرة أخرى.' : 'Failed to submit. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openMaps = () => {
    // Replace with actual clinic coordinates
    const lat = 24.7136;
    const lng = 46.6753;
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
  };

  return (
    <section id="contact" className="section-padding">
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
            {t('contact.subtitle')}
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4',
            isRTL && 'font-arabic'
          )}>
            {t('contact.title')}
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            isRTL && 'font-arabic'
          )}>
            {t('contact.description')}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="medical-card space-y-6">
              <div>
                <label className={cn(
                  'block text-sm font-medium text-foreground mb-2',
                  isRTL && 'font-arabic text-right'
                )}>
                  {t('contact.form.fullName')}
                </label>
                <Input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={cn(errors.fullName && 'border-destructive')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.fullName && (
                  <p className="text-sm text-destructive mt-1">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className={cn(
                  'block text-sm font-medium text-foreground mb-2',
                  isRTL && 'font-arabic text-right'
                )}>
                  {t('contact.form.mobile')}
                </label>
                <Input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={cn(errors.mobile && 'border-destructive')}
                  dir="ltr"
                />
                {errors.mobile && (
                  <p className="text-sm text-destructive mt-1">{errors.mobile}</p>
                )}
              </div>

              <div>
                <label className={cn(
                  'block text-sm font-medium text-foreground mb-2',
                  isRTL && 'font-arabic text-right'
                )}>
                  {t('contact.form.address')}
                </label>
                <Input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={cn(errors.address && 'border-destructive')}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
                {errors.address && (
                  <p className="text-sm text-destructive mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <label className={cn(
                  'block text-sm font-medium text-foreground mb-2',
                  isRTL && 'font-arabic text-right'
                )}>
                  {t('contact.form.message')}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  dir={isRTL ? 'rtl' : 'ltr'}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-primary gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {t('contact.form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    {t('contact.form.submit')}
                  </>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Location Card */}
            <div 
              className="medical-card cursor-pointer group"
              onClick={openMaps}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={cn(
                    'text-lg font-semibold text-foreground mb-1',
                    isRTL && 'font-arabic'
                  )}>
                    {t('contact.location')}
                  </h3>
                  <p className="text-muted-foreground">
                    Riyadh, Saudi Arabia
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="medical-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-accent/10 text-accent">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={cn(
                    'text-lg font-semibold text-foreground mb-1',
                    isRTL && 'font-arabic'
                  )}>
                    {t('contact.phone')}
                  </h3>
                  <p className="text-muted-foreground" dir="ltr">
                    +966 12 345 6789
                  </p>
                </div>
              </div>
            </div>

            {/* Working Hours Card */}
            <div className="medical-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-medical-green/10 text-medical-green">
                  <Clock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={cn(
                    'text-lg font-semibold text-foreground mb-1',
                    isRTL && 'font-arabic'
                  )}>
                    {t('contact.workingHours')}
                  </h3>
                  <p className="text-muted-foreground">
                    {isRTL ? 'السبت - الخميس: 9 ص - 9 م' : 'Sat - Thu: 9 AM - 9 PM'}
                  </p>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div 
              className="medical-card h-48 cursor-pointer group overflow-hidden"
              onClick={openMaps}
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center relative">
                <div className="text-6xl">🗺️</div>
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors flex items-center justify-center">
                  <span className={cn(
                    'opacity-0 group-hover:opacity-100 transition-opacity text-primary font-medium',
                    isRTL && 'font-arabic'
                  )}>
                    {t('contact.location')}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

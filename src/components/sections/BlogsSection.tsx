import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Play, Calendar, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const blogPosts = [
  {
    id: 1,
    titleEn: 'Understanding Kidney Stones: Prevention & Treatment',
    titleAr: 'فهم حصوات الكلى: الوقاية والعلاج',
    excerptEn: 'Learn about the causes, symptoms, and modern treatment options for kidney stones.',
    excerptAr: 'تعرف على أسباب وأعراض وخيارات العلاج الحديثة لحصوات الكلى.',
    category: 'Education',
    date: '2024-01-15',
    image: '🔬',
  },
  {
    id: 2,
    titleEn: 'Prostate Health: What Every Man Should Know',
    titleAr: 'صحة البروستاتا: ما يجب أن يعرفه كل رجل',
    excerptEn: 'Essential information about prostate health, screening, and when to see a doctor.',
    excerptAr: 'معلومات أساسية حول صحة البروستاتا والفحص ومتى يجب زيارة الطبيب.',
    category: 'Men\'s Health',
    date: '2024-01-10',
    image: '💪',
  },
  {
    id: 3,
    titleEn: 'Advances in Minimally Invasive Urology Surgery',
    titleAr: 'التطورات في جراحة المسالك البولية طفيفة التوغل',
    excerptEn: 'Discover the latest surgical techniques that reduce recovery time.',
    excerptAr: 'اكتشف أحدث التقنيات الجراحية التي تقلل من وقت التعافي.',
    category: 'Surgery',
    date: '2024-01-05',
    image: '🏥',
  },
];

const videos = [
  {
    id: 1,
    titleEn: 'Medical Conference: Latest in Urology',
    titleAr: 'المؤتمر الطبي: أحدث ما في المسالك البولية',
    thumbnail: '🎬',
    duration: '45:30',
  },
  {
    id: 2,
    titleEn: 'Patient Education: Preparing for Surgery',
    titleAr: 'تثقيف المريض: التحضير للجراحة',
    thumbnail: '📹',
    duration: '12:15',
  },
];

const BlogsSection = () => {
  const { t } = useTranslation();
  const { isRTL, language } = useLanguage();

  return (
    <section id="blogs" className="section-padding">
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
            {isRTL ? 'المدونة والوسائط' : 'Blog & Media'}
          </span>
          <h2 className={cn(
            'text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4',
            isRTL && 'font-arabic'
          )}>
            {isRTL ? 'أحدث المقالات والفيديوهات' : 'Latest Articles & Videos'}
          </h2>
          <p className={cn(
            'text-lg text-muted-foreground max-w-2xl mx-auto',
            isRTL && 'font-arabic'
          )}>
            {isRTL 
              ? 'محتوى تعليمي طبي لمساعدتك على فهم صحتك بشكل أفضل'
              : 'Educational medical content to help you better understand your health'}
          </p>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="medical-card group cursor-pointer"
            >
              {/* Image/Icon */}
              <div className="w-full h-48 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform">
                <span className="text-6xl">{post.image}</span>
              </div>
              
              {/* Category & Date */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {post.category}
                </span>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                </span>
              </div>
              
              {/* Title */}
              <h3 className={cn(
                'text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors',
                isRTL && 'font-arabic'
              )}>
                {language === 'ar' ? post.titleAr : post.titleEn}
              </h3>
              
              {/* Excerpt */}
              <p className={cn(
                'text-muted-foreground text-sm line-clamp-2 mb-4',
                isRTL && 'font-arabic'
              )}>
                {language === 'ar' ? post.excerptAr : post.excerptEn}
              </p>
              
              {/* Read More */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 text-primary hover:text-primary/80 p-0"
              >
                {isRTL ? 'اقرأ المزيد' : 'Read More'}
                <ExternalLink className="h-4 w-4" />
              </Button>
            </motion.article>
          ))}
        </div>

        {/* Videos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className={cn(
            'text-2xl font-bold text-foreground mb-8 text-center',
            isRTL && 'font-arabic'
          )}>
            {isRTL ? 'فيديوهات تعليمية' : 'Educational Videos'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="medical-card group cursor-pointer"
              >
                {/* Video Thumbnail */}
                <div className="relative w-full aspect-video rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 overflow-hidden">
                  <span className="text-6xl">{video.thumbnail}</span>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                      <Play className="h-8 w-8 text-primary-foreground ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-foreground/80 text-background text-xs font-medium">
                    {video.duration}
                  </div>
                </div>
                
                {/* Title */}
                <h4 className={cn(
                  'text-lg font-semibold text-foreground group-hover:text-primary transition-colors',
                  isRTL && 'font-arabic'
                )}>
                  {language === 'ar' ? video.titleAr : video.titleEn}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogsSection;

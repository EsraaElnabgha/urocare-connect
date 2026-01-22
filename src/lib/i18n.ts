import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        caseStudies: "Case Studies",
        about: "About Doctor",
        tools: "Tools",
        blogs: "Blogs",
        faq: "FAQ",
        contact: "Contact Us",
      },
      hero: {
        greeting: "Welcome to",
        clinicName: "Dr. Ahmed's Urology Clinic",
        title: "Expert Urology Care",
        subtitle: "Consultant Urologist & Andrology Specialist",
        description: "Providing exceptional urological care with advanced treatments and personalized patient attention. Your health is our priority.",
        bookAppointment: "Book Appointment",
        contactWhatsApp: "Contact via WhatsApp",
      },
      services: {
        title: "Our Services",
        subtitle: "Comprehensive Urological Care",
        description: "We offer a wide range of urological services with the latest medical technologies",
        items: {
          consultation: {
            title: "General Consultation",
            description: "Comprehensive urological examinations and consultations",
          },
          surgery: {
            title: "Surgical Procedures",
            description: "Advanced minimally invasive surgical techniques",
          },
          diagnostics: {
            title: "Diagnostic Services",
            description: "State-of-the-art diagnostic equipment and testing",
          },
          treatment: {
            title: "Treatment Plans",
            description: "Personalized treatment plans for optimal results",
          },
        },
      },
      about: {
        title: "About the Doctor",
        subtitle: "Years of Excellence in Urology",
        description: "With over 20 years of experience in urology, our doctor is dedicated to providing the highest quality care.",
        experience: "Years Experience",
        patients: "Happy Patients",
        surgeries: "Successful Surgeries",
        awards: "Medical Awards",
      },
      contact: {
        title: "Book an Appointment",
        subtitle: "Get in Touch",
        description: "Fill out the form below and we'll get back to you as soon as possible",
        form: {
          fullName: "Full Name",
          mobile: "Mobile Number",
          address: "Address",
          message: "Message (Optional)",
          submit: "Send Message",
          submitting: "Sending...",
        },
        location: "View Clinic Location",
        workingHours: "Working Hours",
        phone: "Phone Number",
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Common Questions",
        description: "Find answers to commonly asked questions about our services",
        items: {
          q1: {
            question: "What conditions do you treat?",
            answer: "We treat a wide range of urological conditions including kidney stones, prostate issues, urinary tract infections, male infertility, and more.",
          },
          q2: {
            question: "How do I book an appointment?",
            answer: "You can book an appointment through our website form, by calling our clinic directly, or via WhatsApp.",
          },
          q3: {
            question: "What should I bring to my first visit?",
            answer: "Please bring your ID, any previous medical records, test results, and a list of current medications.",
          },
          q4: {
            question: "Do you accept insurance?",
            answer: "Yes, we accept most major insurance providers. Please contact us to verify your specific insurance coverage.",
          },
          q5: {
            question: "What are the clinic working hours?",
            answer: "We are open Saturday to Thursday from 9 AM to 9 PM. Friday is by appointment only.",
          },
        },
      },
      footer: {
        rights: "All rights reserved",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        quickLinks: "Quick Links",
        contactInfo: "Contact Info",
        followUs: "Follow Us",
      },
    },
  },
  ar: {
    translation: {
      nav: {
        home: "الرئيسية",
        caseStudies: "حالات سريرية",
        about: "عن الطبيب",
        tools: "الأدوات",
        blogs: "المدونة",
        faq: "الأسئلة الشائعة",
        contact: "تواصل معنا",
      },
      hero: {
        greeting: "مرحباً بكم في",
        clinicName: "عيادة د. أحمد للمسالك البولية",
        title: "رعاية متخصصة في المسالك البولية",
        subtitle: "استشاري المسالك البولية وأمراض الذكورة",
        description: "نقدم رعاية استثنائية في المسالك البولية بأحدث العلاجات واهتمام شخصي بكل مريض. صحتكم أولويتنا.",
        bookAppointment: "احجز موعد",
        contactWhatsApp: "تواصل عبر واتساب",
      },
      services: {
        title: "خدماتنا",
        subtitle: "رعاية شاملة للمسالك البولية",
        description: "نقدم مجموعة واسعة من خدمات المسالك البولية بأحدث التقنيات الطبية",
        items: {
          consultation: {
            title: "الاستشارات العامة",
            description: "فحوصات واستشارات شاملة للمسالك البولية",
          },
          surgery: {
            title: "العمليات الجراحية",
            description: "تقنيات جراحية متقدمة طفيفة التوغل",
          },
          diagnostics: {
            title: "خدمات التشخيص",
            description: "أحدث أجهزة التشخيص والفحوصات",
          },
          treatment: {
            title: "خطط العلاج",
            description: "خطط علاجية مخصصة لأفضل النتائج",
          },
        },
      },
      about: {
        title: "عن الطبيب",
        subtitle: "سنوات من التميز في المسالك البولية",
        description: "مع أكثر من 20 عاماً من الخبرة في المسالك البولية، نلتزم بتقديم أعلى جودة من الرعاية الصحية.",
        experience: "سنوات الخبرة",
        patients: "مريض سعيد",
        surgeries: "عملية ناجحة",
        awards: "جوائز طبية",
      },
      contact: {
        title: "احجز موعد",
        subtitle: "تواصل معنا",
        description: "املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن",
        form: {
          fullName: "الاسم الكامل",
          mobile: "رقم الجوال",
          address: "العنوان",
          message: "الرسالة (اختياري)",
          submit: "إرسال الرسالة",
          submitting: "جاري الإرسال...",
        },
        location: "عرض موقع العيادة",
        workingHours: "ساعات العمل",
        phone: "رقم الهاتف",
      },
      faq: {
        title: "الأسئلة الشائعة",
        subtitle: "أسئلة متكررة",
        description: "اعثر على إجابات للأسئلة الشائعة حول خدماتنا",
        items: {
          q1: {
            question: "ما هي الحالات التي تعالجونها؟",
            answer: "نعالج مجموعة واسعة من حالات المسالك البولية بما في ذلك حصوات الكلى ومشاكل البروستاتا والتهابات المسالك البولية والعقم عند الرجال وغيرها.",
          },
          q2: {
            question: "كيف أحجز موعداً؟",
            answer: "يمكنك حجز موعد من خلال نموذج موقعنا أو بالاتصال المباشر بالعيادة أو عبر الواتساب.",
          },
          q3: {
            question: "ماذا يجب أن أحضر في زيارتي الأولى؟",
            answer: "يرجى إحضار هويتك وأي سجلات طبية سابقة ونتائج الفحوصات وقائمة بالأدوية الحالية.",
          },
          q4: {
            question: "هل تقبلون التأمين الصحي؟",
            answer: "نعم، نقبل معظم شركات التأمين الكبرى. يرجى التواصل معنا للتحقق من تغطية التأمين الخاصة بك.",
          },
          q5: {
            question: "ما هي ساعات عمل العيادة؟",
            answer: "نحن مفتوحون من السبت إلى الخميس من 9 صباحاً إلى 9 مساءً. الجمعة بموعد مسبق فقط.",
          },
        },
      },
      footer: {
        rights: "جميع الحقوق محفوظة",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة",
        quickLinks: "روابط سريعة",
        contactInfo: "معلومات التواصل",
        followUs: "تابعنا",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;

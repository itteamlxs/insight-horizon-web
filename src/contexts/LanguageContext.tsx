
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.home': 'Home',
    'header.about': 'About',
    'header.transparency': 'Transparency',
    'header.admin': 'Admin Dashboard',
    'header.welcome': 'Welcome',
    'header.logout': 'Logout',
    'header.adminLogin': 'Admin Login',
    
    // Hero Section
    'hero.transform': 'Transform Your Business with',
    'hero.getStarted': 'Get Started',
    'hero.learnMore': 'Learn More',
    
    // Features
    'features.title': 'Why Choose Our Solutions?',
    'features.subtitle': 'We provide enterprise-grade technology solutions that scale with your business needs',
    'features.security': 'Enterprise Security',
    'features.securityDesc': 'Bank-level security with end-to-end encryption and compliance with industry standards',
    'features.fast': 'Lightning Fast',
    'features.fastDesc': 'Optimized performance with 99.9% uptime guarantee and global CDN distribution',
    'features.support': '24/7 Support',
    'features.supportDesc': 'Round-the-clock expert support with dedicated account managers for enterprise clients',
    
    // Testimonials
    'testimonials.title': 'What Our Clients Say',
    'testimonials.subtitle': 'Hear from businesses that have transformed their operations with our solutions',
    
    // News
    'news.title': 'Latest News & Updates',
    'news.subtitle': 'Stay informed with our latest announcements, press releases, and company news',
    'news.readMore': 'Read more',
    
    // Pricing
    'pricing.title': 'Choose Your Plan',
    'pricing.subtitle': 'Flexible pricing options to match your business needs and growth trajectory',
    'pricing.month': '/month',
    'pricing.getStarted': 'Get Started',
    'pricing.mostPopular': 'Most Popular',
    
    // About
    'about.title': 'About',
    'about.subtitle': 'Leading the future of technology with innovative solutions and cutting-edge infrastructure that empowers businesses to thrive in the digital age.',
    'about.mission': 'Our Mission',
    'about.vision': 'Our Vision',
    'about.story': 'Our Story',
    'about.values': 'Our Values',
    'about.excellence': 'Excellence',
    'about.collaboration': 'Collaboration',
    'about.innovation': 'Innovation',
    
    // Footer
    'footer.contactInfo': 'Contact Info',
    'footer.quickLinks': 'Quick Links',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.security': 'Security',
    'footer.rights': 'All rights reserved',
  },
  es: {
    // Header
    'header.home': 'Inicio',
    'header.about': 'Acerca de',
    'header.transparency': 'Transparencia',
    'header.admin': 'Panel de Admin',
    'header.welcome': 'Bienvenido',
    'header.logout': 'Cerrar Sesión',
    'header.adminLogin': 'Acceso Admin',
    
    // Hero Section
    'hero.transform': 'Transforma tu Negocio con',
    'hero.getStarted': 'Comenzar',
    'hero.learnMore': 'Saber Más',
    
    // Features
    'features.title': '¿Por qué elegir nuestras soluciones?',
    'features.subtitle': 'Proporcionamos soluciones tecnológicas de nivel empresarial que escalan con las necesidades de tu negocio',
    'features.security': 'Seguridad Empresarial',
    'features.securityDesc': 'Seguridad a nivel bancario con cifrado de extremo a extremo y cumplimiento de estándares de la industria',
    'features.fast': 'Ultra Rápido',
    'features.fastDesc': 'Rendimiento optimizado con garantía de 99.9% de tiempo activo y distribución CDN global',
    'features.support': 'Soporte 24/7',
    'features.supportDesc': 'Soporte experto las 24 horas con gerentes de cuenta dedicados para clientes empresariales',
    
    // Testimonials
    'testimonials.title': 'Lo que dicen nuestros clientes',
    'testimonials.subtitle': 'Escucha de empresas que han transformado sus operaciones con nuestras soluciones',
    
    // News
    'news.title': 'Últimas Noticias y Actualizaciones',
    'news.subtitle': 'Mantente informado con nuestros últimos anuncios, comunicados de prensa y noticias de la empresa',
    'news.readMore': 'Leer más',
    
    // Pricing
    'pricing.title': 'Elige tu Plan',
    'pricing.subtitle': 'Opciones de precios flexibles para adaptarse a las necesidades y trayectoria de crecimiento de tu negocio',
    'pricing.month': '/mes',
    'pricing.getStarted': 'Comenzar',
    'pricing.mostPopular': 'Más Popular',
    
    // About
    'about.title': 'Acerca de',
    'about.subtitle': 'Liderando el futuro de la tecnología con soluciones innovadoras e infraestructura de vanguardia que permite a las empresas prosperar en la era digital.',
    'about.mission': 'Nuestra Misión',
    'about.vision': 'Nuestra Visión',
    'about.story': 'Nuestra Historia',
    'about.values': 'Nuestros Valores',
    'about.excellence': 'Excelencia',
    'about.collaboration': 'Colaboración',
    'about.innovation': 'Innovación',
    
    // Footer
    'footer.contactInfo': 'Información de Contacto',
    'footer.quickLinks': 'Enlaces Rápidos',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos de Servicio',
    'footer.security': 'Seguridad',
    'footer.rights': 'Todos los derechos reservados',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

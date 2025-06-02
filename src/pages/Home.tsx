
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';
import ArticleModal from '@/components/ui/article-modal';
import ContactForm from '@/components/ui/contact-form';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import NewsSection from '@/components/sections/NewsSection';

const Home = () => {
  const { getAllPosts } = usePosts();
  const [selectedArticle, setSelectedArticle] = React.useState<Post | null>(null);
  const [isArticleModalOpen, setIsArticleModalOpen] = React.useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<string>('');

  // Get video background from localStorage
  const [videoBackground, setVideoBackground] = React.useState({
    videoUrl: '',
    enabled: false
  });

  // Get pricing plans from localStorage (now with editable features)
  const [pricingPlans, setPricingPlans] = React.useState([
    {
      id: '1',
      name: 'Starter',
      price: 99,
      description: 'Perfect for small businesses',
      features: ['5 GB Storage', '24/7 Support', 'Basic Security', 'Email Integration'],
      highlighted: false
    },
    {
      id: '2',
      name: 'Professional',
      price: 299,
      description: 'Ideal for growing companies',
      features: ['50 GB Storage', 'Priority Support', 'Advanced Security', 'API Access', 'Custom Integrations'],
      highlighted: true
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 699,
      description: 'For large organizations',
      features: ['Unlimited Storage', 'Dedicated Support', 'Enterprise Security', 'Full API Access', 'Custom Development', 'SLA Guarantee'],
      highlighted: false
    }
  ]);

  // Company settings
  const [companySettings, setCompanySettings] = React.useState({
    companyName: 'TechCorp Solutions',
    description: 'Leading technology and infrastructure solutions provider'
  });

  // Testimonials data
  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc.',
      content: 'TechCorp transformed our infrastructure completely. Their solutions are reliable and their support team is exceptional.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'Global Enterprises',
      content: 'We have been using their services for 3 years. The uptime and performance have exceeded our expectations.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      company: 'StartupHub',
      content: 'As a growing startup, their scalable solutions have grown with us. Highly recommend their professional plan.',
      rating: 5
    }
  ];

  React.useEffect(() => {
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      setCompanySettings(JSON.parse(savedSettings));
    }

    const savedVideoUrl = localStorage.getItem('videoBackground');
    const savedVideoEnabled = localStorage.getItem('videoBackgroundEnabled') === 'true';
    if (savedVideoUrl || savedVideoEnabled) {
      setVideoBackground({
        videoUrl: savedVideoUrl || '',
        enabled: savedVideoEnabled
      });
    }

    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }
  }, []);

  const publicPosts = getAllPosts().filter(post => post.isPublic).slice(0, 3);

  const scrollToPricing = () => {
    const pricingSection = document.getElementById('pricing-section');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = (planName: string) => {
    setSelectedPlan(planName);
    setIsContactFormOpen(true);
  };

  const handleArticleClick = (article: Post) => {
    setSelectedArticle(article);
    setIsArticleModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      <HeroSection 
        videoBackground={videoBackground}
        companySettings={companySettings}
        onGetStarted={scrollToPricing}
      />

      <FeaturesSection />

      <PricingSection 
        pricingPlans={pricingPlans}
        onGetStarted={handleGetStarted}
      />

      <TestimonialsSection testimonials={testimonials} />

      <NewsSection 
        publicPosts={publicPosts}
        onArticleClick={handleArticleClick}
      />

      <ArticleModal 
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        article={selectedArticle}
      />

      <ContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        selectedPlan={selectedPlan}
      />

      <Footer />
    </div>
  );
};

export default Home;

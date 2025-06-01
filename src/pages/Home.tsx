
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Shield, Zap, Users, Star, Calendar } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';
import ArticleModal from '@/components/ui/article-modal';
import ContactForm from '@/components/ui/contact-form';

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

  // Get gallery items from localStorage
  const [galleryItems, setGalleryItems] = React.useState([
    {
      id: '1',
      title: 'Data Center Infrastructure',
      description: 'State-of-the-art server facilities',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      category: 'Infrastructure'
    },
    {
      id: '2',
      title: 'Cloud Security Solutions',
      description: 'Advanced cybersecurity implementations',
      imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&w=800&q=80',
      category: 'Security'
    },
    {
      id: '3',
      title: 'Network Operations Center',
      description: '24/7 monitoring and support',
      imageUrl: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=800&q=80',
      category: 'Operations'
    },
    {
      id: '4',
      title: 'Mobile Application Development',
      description: 'Custom mobile solutions',
      imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80',
      category: 'Development'
    },
    {
      id: '5',
      title: 'AI & Machine Learning',
      description: 'Cutting-edge AI implementations',
      imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
      category: 'AI'
    },
    {
      id: '6',
      title: 'Enterprise Solutions',
      description: 'Scalable business applications',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      category: 'Enterprise'
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

  // Helper function to convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${match[1]}`;
    }
    return url; // Return original URL if not YouTube
  };

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
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        {/* Video Background */}
        {videoBackground.enabled && videoBackground.videoUrl && (
          <div className="absolute inset-0 z-0">
            <iframe
              src={getYouTubeEmbedUrl(videoBackground.videoUrl)}
              className="w-full h-full object-cover"
              allow="autoplay; fullscreen"
              style={{ 
                transform: 'scale(1.1)',
                filter: 'brightness(0.7)'
              }}
            />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Transform Your Business with 
              <span className="text-blue-200"> {companySettings.companyName}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {companySettings.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
                onClick={scrollToPricing}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-blue-600"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Solutions?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide enterprise-grade technology solutions that scale with your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Enterprise Security</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Bank-level security with end-to-end encryption and compliance with industry standards
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">Lightning Fast</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized performance with 99.9% uptime guarantee and global CDN distribution
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700">
              <CardContent className="p-6">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 dark:text-white">24/7 Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Round-the-clock expert support with dedicated account managers for enterprise clients
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Flexible pricing options to match your business needs and growth trajectory
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.highlighted ? 'border-blue-500 border-2 dark:border-blue-400' : 'dark:bg-gray-800 dark:border-gray-700'}`}>
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold dark:text-white">{plan.name}</CardTitle>
                  <CardDescription className="dark:text-gray-300">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                    onClick={() => handleGetStarted(plan.name)}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Hear from businesses that have transformed their operations with our solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="dark:bg-gray-900 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News & Updates Section */}
      {publicPosts.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Latest News & Updates
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Stay informed with our latest announcements, press releases, and company news
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {publicPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700"
                  onClick={() => handleArticleClick(post)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary">
                        {post.type.replace('_', ' ').toUpperCase()}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 dark:text-white">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                      {post.content.length > 150 
                        ? `${post.content.substring(0, 150)}...` 
                        : post.content
                      }
                    </p>
                    <div className="mt-4">
                      <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Read more →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

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

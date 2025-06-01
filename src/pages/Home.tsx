
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Star, Award, Users, Zap } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { usePosts } from '@/hooks/usePosts';
import PublicPostCard from '@/components/PublicPostCard';

const Home = () => {
  const { getPublicPosts } = usePosts();
  const publicPosts = getPublicPosts();

  // Load dynamic content from localStorage
  const [companyName, setCompanyName] = useState('TechCorp Solutions');
  const [companyDescription, setCompanyDescription] = useState('Leading technology and infrastructure solutions provider');
  const [videoBackground, setVideoBackground] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [pricingPlans, setPricingPlans] = useState([
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

  useEffect(() => {
    // Load company settings
    const savedCompanySettings = localStorage.getItem('companySettings');
    if (savedCompanySettings) {
      const settings = JSON.parse(savedCompanySettings);
      setCompanyName(settings.companyName);
      setCompanyDescription(settings.description);
    }

    // Load video settings
    const savedVideoUrl = localStorage.getItem('videoBackground');
    const savedVideoEnabled = localStorage.getItem('videoBackgroundEnabled') === 'true';
    setVideoBackground(savedVideoUrl || '');
    setVideoEnabled(savedVideoEnabled);

    // Load pricing plans
    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }
  }, []);

  // Function to convert YouTube URL to embed URL
  const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return '';
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    if (match && match[2].length === 11) {
      return `https://www.youtube.com/embed/${match[2]}?autoplay=1&mute=1&loop=1&playlist=${match[2]}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`;
    }
    
    return url; // Return original URL if not YouTube
  };

  const renderVideoBackground = () => {
    if (!videoEnabled || !videoBackground) return null;

    const embedUrl = getYouTubeEmbedUrl(videoBackground);

    if (embedUrl.includes('youtube.com/embed/')) {
      return (
        <div className="youtube-video-container absolute inset-0 z-0">
          <iframe
            className="youtube-video-panoramic"
            src={embedUrl}
            title="Background Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    } else {
      return (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={videoBackground} type="video/mp4" />
        </video>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {renderVideoBackground()}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {companyName}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 animate-fade-in">
            {companyDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="learn-more-btn text-lg px-8 py-3">
              Learn More
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900">
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide cutting-edge solutions that drive business growth and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center dark:text-gray-300">
                  Experience unparalleled speed and performance with our optimized infrastructure.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">Award Winning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center dark:text-gray-300">
                  Recognized industry leader with multiple awards for excellence and innovation.
                </CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="dark:text-white">24/7 Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center dark:text-gray-300">
                  Round-the-clock expert support to ensure your business never stops running.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 dark:text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the plan that fits your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.highlighted ? 'ring-2 ring-blue-600 scale-105' : ''} dark:bg-gray-700 dark:border-gray-600`}>
                {plan.highlighted && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl dark:text-white">{plan.name}</CardTitle>
                  <div className="text-4xl font-bold text-blue-600 my-4">
                    ${plan.price}<span className="text-lg text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <CardDescription className="dark:text-gray-300">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      {publicPosts.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 dark:text-white">Latest News</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Stay updated with our latest announcements and press releases
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicPosts.slice(0, 6).map((post) => (
                <PublicPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust us with their business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-blue-600">
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;


import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PublicPostCard from '@/components/PublicPostCard';
import ParticlesBackground from '@/components/ParticlesBackground';
import { usePosts } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Server, Lock, Zap, Check } from 'lucide-react';

const Home = () => {
  const { getPublicPosts, loading } = usePosts();
  const publicPosts = getPublicPosts();

  // Get pricing plans from localStorage
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

  React.useEffect(() => {
    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }

    const savedGallery = localStorage.getItem('galleryItems');
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      {/* Hero Section with Particles */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-gray-900 dark:via-blue-900 dark:to-gray-900 text-white py-20 overflow-hidden">
        <ParticlesBackground className="absolute inset-0 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Secure Infrastructure Solutions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Building the future of technology with enterprise-grade security, 
              scalable infrastructure, and innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-gray-800 px-8 py-3">
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
              Why Choose TechCorp?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We provide cutting-edge technology solutions with an unwavering focus on security and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Enterprise Security</h3>
              <p className="text-gray-600 dark:text-gray-300">Military-grade encryption and security protocols</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Server className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Scalable Infrastructure</h3>
              <p className="text-gray-600 dark:text-gray-300">Auto-scaling solutions that grow with your business</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Data Protection</h3>
              <p className="text-gray-600 dark:text-gray-300">Advanced backup and disaster recovery systems</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 dark:bg-orange-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 dark:text-white">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">Optimized performance with global CDN</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Plan
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Select the perfect plan for your business needs. All plans include our core features with varying levels of support and resources.
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
                        <Check className="h-5 w-5 text-green-500" />
                        <span className="dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={plan.highlighted ? 'default' : 'outline'}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Work Gallery
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore our portfolio of successful projects and innovative solutions across various technology domains.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.slice(0, 6).map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-lg transition-shadow dark:bg-gray-900 dark:border-gray-700">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Latest News & Updates
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Stay informed with our latest press releases and company announcements
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicPosts.map(post => (
                <PublicPostCard key={post.id} post={post} />
              ))}
            </div>
          )}
          
          {publicPosts.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No public posts available at this time.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

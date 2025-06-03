
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Users, Target, Award, Globe } from 'lucide-react';

const About = () => {
  const [companyName, setCompanyName] = React.useState<string>('TechCorp Solutions');

  React.useEffect(() => {
    const settings = localStorage.getItem('companySettings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setCompanyName(parsedSettings.companyName || 'TechCorp Solutions');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            About {companyName}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Leading the future of technology with innovative solutions and cutting-edge infrastructure 
            that empowers businesses to thrive in the digital age.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <Target className="h-12 w-12 text-blue-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Mission</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To deliver innovative technology solutions that transform businesses and create lasting value. 
              We are committed to excellence, integrity, and continuous improvement in everything we do.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
            <Globe className="h-12 w-12 text-cyan-600 mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Our Vision</h2>
            <p className="text-gray-600 dark:text-gray-300">
              To be the global leader in technology infrastructure, enabling organizations worldwide 
              to achieve their digital transformation goals through secure, scalable, and sustainable solutions.
            </p>
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Story</h2>
          <div className="prose max-w-none text-gray-600 dark:text-gray-300">
            <p className="mb-4">
              Founded in 2015, {companyName} began as a small team of passionate technologists with a vision 
              to revolutionize how businesses approach technology infrastructure. What started as a startup 
              in Silicon Valley has grown into a global company serving Fortune 500 clients worldwide.
            </p>
            <p className="mb-4">
              Over the years, we have consistently pushed the boundaries of what's possible in cloud computing, 
              cybersecurity, and digital transformation. Our commitment to innovation has led to numerous 
              industry awards and recognition from leading technology publications.
            </p>
            <p>
              Today, we continue to lead the industry with cutting-edge solutions that help our clients 
              stay ahead of the curve in an ever-evolving digital landscape. Our team of experts is 
              dedicated to delivering excellence and building long-term partnerships with our clients.
            </p>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">1000+</div>
            <div className="text-gray-600 dark:text-gray-300">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-300">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-600 mb-2">99.9%</div>
            <div className="text-gray-600 dark:text-gray-300">Uptime Guarantee</div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We strive for excellence in every project, delivering solutions that exceed expectations 
                and set new industry standards.
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-cyan-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in the power of teamwork and collaboration, both within our organization 
                and with our valued clients and partners.
              </p>
            </div>
            <div className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Innovation is at the heart of everything we do. We continuously explore new technologies 
                and methodologies to stay ahead of the curve.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;

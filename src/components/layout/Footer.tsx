
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const [companyName, setCompanyName] = React.useState<string>('TechCorp Solutions');

  React.useEffect(() => {
    const settings = localStorage.getItem('companySettings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setCompanyName(parsedSettings.companyName || 'TechCorp Solutions');
    }
  }, []);

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {companyName}
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Leading technology and infrastructure solutions provider, delivering innovative 
              and secure systems for the digital age.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                Twitter
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                GitHub
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@techcorp.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Silicon Valley, CA</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2 text-gray-300">
              <a href="/privacy" className="block hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="block hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              <a href="/security" className="block hover:text-blue-400 transition-colors">
                Security
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

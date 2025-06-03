
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LogOut } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSelector from '@/components/LanguageSelector';

const Header = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [companyName, setCompanyName] = React.useState<string>('TechCorp Solutions');
  const [companyLogo, setCompanyLogo] = React.useState<string>('');

  React.useEffect(() => {
    const settings = localStorage.getItem('companySettings');
    if (settings) {
      const parsedSettings = JSON.parse(settings);
      setCompanyName(parsedSettings.companyName || 'TechCorp Solutions');
      setCompanyLogo(parsedSettings.logoUrl || '');
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 dark:bg-slate-950 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            {companyLogo && (
              <img 
                src={companyLogo} 
                alt={`${companyName} Logo`}
                className="h-10 w-auto object-contain"
              />
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {companyName}
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400 transition-colors duration-300">
              {t('header.home')}
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors duration-300">
              {t('header.about')}
            </Link>
            <Link to="/transparency" className="hover:text-blue-400 transition-colors duration-300">
              {t('header.transparency')}
            </Link>
            {user && (
              <Link to="/admin" className="hover:text-blue-400 transition-colors duration-300">
                {t('header.admin')}
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  {t('header.welcome')}, {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="border-2 border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm transition-all duration-300"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('header.logout')}
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-2 border-white/50 text-white hover:bg-white/20 hover:border-white/70 backdrop-blur-sm transition-all duration-300"
                >
                  {t('header.adminLogin')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

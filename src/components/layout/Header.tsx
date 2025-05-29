
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, Shield } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [companyLogo, setCompanyLogo] = React.useState<string | null>(null);

  React.useEffect(() => {
    const logo = localStorage.getItem('companyLogo');
    setCompanyLogo(logo);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-slate-900 dark:bg-slate-950 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            {companyLogo ? (
              <img 
                src={companyLogo} 
                alt="Company Logo" 
                className="h-8 w-auto max-w-32 object-contain"
              />
            ) : (
              <Shield className="h-8 w-8 text-blue-400" />
            )}
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              TechCorp Solutions
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/pricing" className="hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link to="/gallery" className="hover:text-blue-400 transition-colors">
              Gallery
            </Link>
            <Link to="/transparency" className="hover:text-blue-400 transition-colors">
              Transparency
            </Link>
            {user && (
              <Link to="/admin" className="hover:text-blue-400 transition-colors">
                Admin Dashboard
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300">
                  Welcome, {user.email}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-white border-gray-600 hover:bg-gray-800"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="outline" size="sm" className="text-white border-gray-600 hover:bg-gray-800">
                  Admin Login
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

import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, Sprout, FileText, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import LanguageSelector from '../LanguageSelector';

interface NavbarProps {
  variant?: 'landing' | 'dashboard';
}

const Navbar: React.FC<NavbarProps> = ({ variant = 'landing' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, currentUser, userType, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const isDashboard = variant === 'dashboard';
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  const navLinkClasses = (path: string) => `
    px-3 py-2 text-sm font-medium rounded-full transition-colors
    ${isActivePath(path) 
      ? 'bg-primary-100 text-primary-800' 
      : 'text-gray-700 hover:bg-gray-100'}
  `;
  
  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-farming fixed w-full top-0 z-40 border-b border-primary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3" onClick={closeMenu}>
              <div className="w-10 h-10 bg-farming-gradient rounded-full flex items-center justify-center shadow-lg">
                <Sprout className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold bg-farming-gradient bg-clip-text text-transparent">Jai Kisaan</span>
                <span className="text-xs text-primary-600">Empowering Farmers</span>
              </div>
            </Link>
            
            {isDashboard && (
              <div className="hidden md:flex md:ml-8 md:space-x-2">
                <Link to={`/${userType}/dashboard`} className={navLinkClasses(`/${userType}/dashboard`)}>
                  Dashboard
                </Link>
                <Link to={`/${userType}/market-prices`} className={navLinkClasses(`/${userType}/market-prices`)}>
                  Market Prices
                </Link>
                {userType === 'farmer' && (
                  <>
                    <Link to="/farmer/schemes" className={navLinkClasses('/farmer/schemes')}>
                      <span className="flex items-center gap-1">
                        <FileText size={16} />
                        Govt. Schemes
                      </span>
                    </Link>
                    <Link to="/farmer/crop-calendar" className={navLinkClasses('/farmer/crop-calendar')}>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        Crop Calendar
                      </span>
                    </Link>
                  </>
                )}
                {userType === 'broker' && (
                  <Link to="/broker/farmers" className={navLinkClasses('/broker/farmers')}>
                    Farmers Network
                  </Link>
                )}
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 hover:scale-110"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {isAuthenticated ? (
              <div className="hidden md:flex items-center">
                <div className="flex items-center gap-3">
                  <Link 
                    to={`/${userType}/profile`}
                    className="flex items-center gap-2 p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 hover:scale-110"
                  >
                    <User size={20} />
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 hover:scale-110"
                    aria-label="Log out"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => navigate('/farmer/login')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Farmer Sign In
                </Button>
                <Button 
                  variant="text"
                  size="sm"
                  onClick={() => navigate('/broker/login')}
                  className="hover:scale-105 transition-transform duration-300"
                >
                  Broker Sign In
                </Button>
              </div>
            )}
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-all duration-300 hover:scale-110"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary-100">
          {isDashboard ? (
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link 
                to={`/${userType}/dashboard`}
                className={`block px-3 py-2 rounded-lg transition-all duration-300 ${isActivePath(`/${userType}/dashboard`) ? 'bg-primary-100 text-primary-800 shadow-sm' : 'text-gray-700 hover:bg-primary-50'}`}
                onClick={closeMenu}
              >
                Dashboard
              </Link>
              <Link 
                to={`/${userType}/market-prices`}
                className={`block px-3 py-2 rounded-lg transition-all duration-300 ${isActivePath(`/${userType}/market-prices`) ? 'bg-primary-100 text-primary-800 shadow-sm' : 'text-gray-700 hover:bg-primary-50'}`}
                onClick={closeMenu}
              >
                Market Prices
              </Link>
              {userType === 'farmer' && (
                <>
                  <Link 
                    to="/farmer/schemes"
                    className={`block px-3 py-2 rounded-md ${isActivePath('/farmer/schemes') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-2">
                      <FileText size={16} />
                      Govt. Schemes
                    </span>
                  </Link>
                  <Link 
                    to="/farmer/crop-calendar"
                    className={`block px-3 py-2 rounded-md ${isActivePath('/farmer/crop-calendar') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                    onClick={closeMenu}
                  >
                    <span className="flex items-center gap-2">
                      <Calendar size={16} />
                      Crop Calendar
                    </span>
                  </Link>
                </>
              )}
              {userType === 'broker' && (
                <Link 
                  to="/broker/farmers"
                  className={`block px-3 py-2 rounded-md ${isActivePath('/broker/farmers') ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  Farmers Network
                </Link>
              )}
              <Link 
                to={`/${userType}/profile`}
                className={`block px-3 py-2 rounded-md ${isActivePath(`/${userType}/profile`) ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                onClick={closeMenu}
              >
                My Profile
              </Link>
            </div>
          ) : (
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a 
                href="#features"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Features
              </a>
              <a 
                href="#about"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={closeMenu}
              >
                About
              </a>
              <a 
                href="#contact"
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={closeMenu}
              >
                Contact
              </a>
            </div>
          )}
          
          {isAuthenticated ? (
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="px-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{currentUser?.location}</div>
                </div>
              </div>
              <div className="mt-3 px-2">
                <button
                  onClick={() => {
                    handleLogout();
                    closeMenu();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-gray-200 px-4 py-4 space-y-2">
              <Button
                variant="text"
                fullWidth
                onClick={() => {
                  navigate('/farmer/login');
                  closeMenu();
                }}
              >
                Farmer Sign In
              </Button>
              <Button
                variant="text"
                fullWidth
                onClick={() => {
                  navigate('/broker/login');
                  closeMenu();
                }}
              >
                Broker Sign In
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
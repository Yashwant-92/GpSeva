import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('mr'); // mr = Marathi, en = English
  const location = useLocation();

  const navItems = [
    { name: 'मुख्यपृष्ठ', nameEn: 'Home', path: '/' },
    { name: 'वैशिष्ट्ये', nameEn: 'Features', path: '/#features' },
    { name: 'सेवा', nameEn: 'Services', path: '/services' },
    { name: 'डेमो', nameEn: 'Demo', path: '/#demo' },
    { name: 'किंमत', nameEn: 'Pricing', path: '/#pricing' },
    { name: 'संपर्क', nameEn: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path.includes('#')) {
      return location.pathname === '/' && location.hash === path.split('/')[1];
    }
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
  {/* Logo */}
  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center">
    <div
      className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl tracking-wide"
      style={{
        background: "radial-gradient(circle at top left, #f59e0b, #22c55e)",
      }}
    >
      GP
    </div>
  </div>

  {/* Text */}
  <div>
    <h1 className="text-xl lg:text-2xl font-bold text-green-700">
      GPSEVA
    </h1>
    <p className="text-xs text-gray-500 marathi-text">
      डिजिटल ग्रामपंचायत सेवा
    </p>
  </div>
</Link>


          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`font-medium transition-colors duration-200 marathi-text ${
                  isActive(item.path)
                    ? 'text-green-700'
                    : 'text-gray-600 hover:text-green-600'
                }`}
              >
                {language === 'mr' ? item.name : item.nameEn}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
              className="hidden sm:flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              <Globe size={16} />
              <span>{language === 'mr' ? 'EN' : 'मराठी'}</span>
            </button>

            {/* Login Button */}
            {/* <Link
              to="/login"
              className="px-4 py-2 text-orange-600 border-2 border-orange-500 rounded-lg font-medium hover:bg-orange-50 transition-colors text-sm lg:text-base marathi-text"
            >
              {language === 'mr' ? 'लॉगिन' : 'Login'}
            </Link> */}

            {/* Register Button */}
            <Link
              to="/register"
               className="px-4 py-2 rounded-lg font-medium text-white
             bg-gradient-to-r from-orange-400 to-green-500
             hover:from-orange-500 hover:to-green-600
             transition-all text-sm lg:text-base marathi-text"
            >
              {language === 'mr' ? 'नोंदणी करा' : 'Register'}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-green-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-colors marathi-text ${
                    isActive(item.path)
                      ? 'bg-green-50 text-green-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {language === 'mr' ? item.name : item.nameEn}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 pt-4 border-t border-gray-100 mt-2">
                <button
                  onClick={() => setLanguage(language === 'mr' ? 'en' : 'mr')}
                  className="flex items-center gap-2 text-gray-600"
                >
                  <Globe size={18} />
                  <span>{language === 'mr' ? 'English' : 'मराठी'}</span>
                </button>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium marathi-text"
                >
                  {language === 'mr' ? 'नोंदणी करा' : 'Register'}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

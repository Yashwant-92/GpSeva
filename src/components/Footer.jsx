import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ExternalLink, 
  ArrowUp
} from 'lucide-react';

import { useEffect, useState } from "react";


const Footer = () => {
  const quickLinks = [
    { name: 'आमच्याबद्दल', nameEn: 'About Us', path: '/about' },
    { name: 'सेवा', nameEn: 'Services', path: '/services' },
    { name: 'संपर्क', nameEn: 'Contact', path: '/contact' },
    { name: 'नोंदणी करा', nameEn: 'Register', path: '/register' },
    { name: 'गोपनीयता धोरण', nameEn: 'Privacy Policy', path: '/privacy' },
    { name: 'अटी व नियम', nameEn: 'Terms & Conditions', path: '/terms' },
  ];

  const services = [
    { name: 'वेबसाईट डिझाईन', nameEn: 'Website Design', path: '/services' },
    { name: 'वेबसाईट डेव्हलपमेंट', nameEn: 'Web Development', path: '/services' },
    { name: 'होस्टिंग सेवा', nameEn: 'Hosting Service', path: '/services' },
    { name: 'डोमेन नोंदणी', nameEn: 'Domain Registration', path: '/services' },
    { name: 'तांत्रिक सपोर्ट', nameEn: 'Technical Support', path: '/services' },
  ];


const [showScrollTop, setShowScrollTop] = useState(false);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // scrolling down
    if (currentScrollY > lastScrollY && currentScrollY > 300) {
      setShowScrollTop(true);
    }

    // scrolling up
    if (currentScrollY < lastScrollY) {
      setShowScrollTop(false);
    }

    setLastScrollY(currentScrollY);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [lastScrollY]);

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

  

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-lg">
                GP
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">GPSEVA</h3>
                <p className="text-xs text-gray-400 marathi-text">डिजिटल ग्रामपंचायत</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4 marathi-text">
              आपल्या ग्रामपंचायतीला डिजिटल बनवा. आधुनिक तंत्रज्ञानासह सर्व सेवा ऑनलाइन.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 marathi-text">दुवे</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors marathi-text"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 marathi-text">आमच्या सेवा</h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <Link 
                    to={service.path}
                    className="text-sm text-gray-400 hover:text-green-400 transition-colors marathi-text"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 marathi-text">संपर्क माहिती</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-orange-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-white">GPSEVA Pvt. Ltd.</p>
                  <p className="text-sm text-gray-400">Maharashtra, India</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-orange-400 flex-shrink-0" />
                <a href="tel:9XXXXXXXXX" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  9XXXXXXXXX
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-orange-400 flex-shrink-0" />
                <a href="mailto:info@gpseva.in" className="text-sm text-gray-400 hover:text-green-400 transition-colors">
                  info@gpseva.in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 GPSEVA Digital Portal. सर्व हक्क सुरक्षित.
              <br />
               Made with <span className="text-red-500">❤</span> in India | Digital India Initiative
            </p>
   
            {/* <p className="text-sm text-gray-400">
             
            </p> */}

          </div>
        </div>
      </div>
            {/* Scroll To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50
                     w-12 h-12 rounded-full
                     flex items-center justify-center
                     text-white
                     bg-gradient-to-r from-orange-400 to-green-500
                     hover:from-orange-500 hover:to-green-600
                     shadow-lg hover:shadow-xl
                     transition-all"
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>
      )}

    </footer>
  );
};

export default Footer;

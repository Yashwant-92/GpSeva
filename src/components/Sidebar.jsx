import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Award, 
  MessageSquare, 
  User, 
  LogOut,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { logout } = useAuth();

  const menuItems = [
    { 
      icon: LayoutDashboard, 
      label: 'डॅशबोर्ड', 
      labelEn: 'Dashboard', 
      path: '/dashboard' 
    },
    { 
      icon: FileText, 
      label: 'माझे अर्ज', 
      labelEn: 'My Applications', 
      path: '/dashboard/applications' 
    },
    { 
      icon: CreditCard, 
      label: 'पेमेंट्स', 
      labelEn: 'Payments', 
      path: '/dashboard/payments' 
    },
    { 
      icon: Award, 
      label: 'प्रमाणपत्रे', 
      labelEn: 'Certificates', 
      path: '/dashboard/certificates' 
    },
    { 
      icon: MessageSquare, 
      label: 'तक्रारी', 
      labelEn: 'Complaints', 
      path: '/dashboard/complaints' 
    },
    { 
      icon: User, 
      label: 'प्रोफाइल', 
      labelEn: 'Profile', 
      path: '/dashboard/profile' 
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-white border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
              GP
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-700">GPSEVA</h1>
              <p className="text-xs text-gray-500 marathi-text">डिजिटल ग्रामपंचायत</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200
                  ${active 
                    ? 'bg-green-50 text-green-700 border-l-4 border-green-600 -ml-1 pl-5' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                  }
                `}
              >
                <Icon size={20} />
                <span className="marathi-text">{item.label}</span>
                {active && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium marathi-text">लॉगआउट</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

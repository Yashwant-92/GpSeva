import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Menu, Bell, Calendar, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';
import DashboardHome from './dashboard/DashboardHome';
import Applications from './dashboard/Applications';
import Payments from './dashboard/Payments';
import Certificates from './dashboard/Certificates';
import Complaints from './dashboard/Complaints';
import Profile from './dashboard/Profile';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const today = new Date().toLocaleDateString('mr-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
              >
                <Menu size={24} />
              </button>
              <div className="hidden sm:block">
                <h1 className="text-lg font-semibold text-gray-800 marathi-text">
                  नमस्कार, {user?.name || 'नागरिक'}
                </h1>
                <p className="text-sm text-gray-500 marathi-text">{user?.village || 'ग्रामपंचायत'}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-4 py-2">
                <Search size={18} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="शोधा..."
                  className="bg-transparent border-none outline-none ml-2 w-48 text-sm"
                />
              </div>

              {/* Date */}
              <div className="hidden lg:flex items-center gap-2 text-gray-600 text-sm">
                <Calendar size={18} />
                <span className="marathi-text">{today}</span>
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Avatar */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="applications" element={<Applications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="certificates" element={<Certificates />} />
            <Route path="complaints" element={<Complaints />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

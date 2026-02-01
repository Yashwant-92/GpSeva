import { Link } from 'react-router-dom';
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  XCircle, 
  ArrowRight,
  Plus,
  TrendingUp,
  Eye
} from 'lucide-react';
import DashboardCard from '../../components/DashboardCard';
import { services } from '../../data/services';

const DashboardHome = () => {
  const stats = [
    { title: 'एकूण अर्ज', value: 12, icon: FileText, color: 'blue', trend: 'up', trendValue: 15 },
    { title: 'मंजूर', value: 8, icon: CheckCircle, color: 'green', trend: 'up', trendValue: 25 },
    { title: 'प्रलंबित', value: 3, icon: Clock, color: 'yellow' },
    { title: 'नाकारलेले', value: 1, icon: XCircle, color: 'red' },
  ];

  const recentApplications = [
    {
      id: 'APP001',
      service: 'जन्म प्रमाणपत्र',
      date: '15 जानेवारी 2026',
      status: 'approved',
      statusText: 'मंजूर'
    },
    {
      id: 'APP002',
      service: 'उत्पन्न प्रमाणपत्र',
      date: '12 जानेवारी 2026',
      status: 'pending',
      statusText: 'प्रलंबित'
    },
    {
      id: 'APP003',
      service: 'रहिवासी दाखला',
      date: '10 जानेवारी 2026',
      status: 'processing',
      statusText: 'प्रक्रियेत'
    },
    {
      id: 'APP004',
      service: 'जात प्रमाणपत्र',
      date: '05 जानेवारी 2026',
      status: 'approved',
      statusText: 'मंजूर'
    },
    {
      id: 'APP005',
      service: 'दुकान परवाना',
      date: '01 जानेवारी 2026',
      status: 'rejected',
      statusText: 'नाकारले'
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      approved: 'badge-approved',
      pending: 'badge-pending',
      processing: 'badge-processing',
      rejected: 'badge-rejected'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <DashboardCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 marathi-text">अलीकडील अर्ज</h2>
            <Link 
              to="/dashboard/applications"
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
            >
              <span className="marathi-text">सर्व पहा</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="px-6 py-4 text-left marathi-text">अर्ज क्रमांक</th>
                  <th className="px-6 py-4 text-left marathi-text">सेवा</th>
                  <th className="px-6 py-4 text-left marathi-text">तारीख</th>
                  <th className="px-6 py-4 text-left marathi-text">स्थिती</th>
                  <th className="px-6 py-4 text-center marathi-text">कृती</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((app) => (
                  <tr key={app.id} className="table-row">
                    <td className="px-6 py-4 font-medium text-gray-800">{app.id}</td>
                    <td className="px-6 py-4 text-gray-600 marathi-text">{app.service}</td>
                    <td className="px-6 py-4 text-gray-500 text-sm marathi-text">{app.date}</td>
                    <td className="px-6 py-4">
                      <span className={`badge ${getStatusBadge(app.status)} marathi-text`}>
                        {app.statusText}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Apply */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 marathi-text">त्वरित अर्ज</h2>
            <Link 
              to="/services"
              className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center gap-1"
            >
              <span className="marathi-text">सर्व</span>
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="space-y-3">
            {services.slice(0, 6).map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.id}
                  to={`/apply/${service.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center`}>
                    <Icon size={20} className="text-green-600" />
                  </div>
                  <span className="flex-1 text-gray-700 font-medium text-sm marathi-text">{service.title}</span>
                  <Plus size={18} className="text-gray-400 group-hover:text-green-600 transition-colors" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={24} />
              <h3 className="text-lg font-semibold marathi-text">तुमची प्रगती</h3>
            </div>
            <p className="text-green-100 marathi-text">
              या महिन्यात तुम्ही 5 अर्ज पूर्ण केले आहेत. सर्व सेवा वेळेवर मिळवण्यासाठी आम्ही इथे आहोत!
            </p>
          </div>
          <Link 
            to="/services"
            className="px-6 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center gap-2"
          >
            <span className="marathi-text">नवीन अर्ज करा</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

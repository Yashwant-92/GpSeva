import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Search, 
  Filter, 
  Eye, 
  Download,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';

const Applications = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const applications = [
    { id: 'APP001', service: 'जन्म प्रमाणपत्र', date: '15 जानेवारी 2026', status: 'approved', statusText: 'मंजूर' },
    { id: 'APP002', service: 'उत्पन्न प्रमाणपत्र', date: '12 जानेवारी 2026', status: 'pending', statusText: 'प्रलंबित' },
    { id: 'APP003', service: 'रहिवासी दाखला', date: '10 जानेवारी 2026', status: 'processing', statusText: 'प्रक्रियेत' },
    { id: 'APP004', service: 'जात प्रमाणपत्र', date: '05 जानेवारी 2026', status: 'approved', statusText: 'मंजूर' },
    { id: 'APP005', service: 'दुकान परवाना', date: '01 जानेवारी 2026', status: 'rejected', statusText: 'नाकारले' },
    { id: 'APP006', service: 'मृत्यू प्रमाणपत्र', date: '28 डिसेंबर 2025', status: 'approved', statusText: 'मंजूर' },
    { id: 'APP007', service: 'पाणी कनेक्शन', date: '25 डिसेंबर 2025', status: 'approved', statusText: 'मंजूर' },
    { id: 'APP008', service: 'कर भरणा', date: '20 डिसेंबर 2025', status: 'approved', statusText: 'मंजूर' },
  ];

  const filterOptions = [
    { value: 'all', label: 'सर्व' },
    { value: 'approved', label: 'मंजूर' },
    { value: 'pending', label: 'प्रलंबित' },
    { value: 'processing', label: 'प्रक्रियेत' },
    { value: 'rejected', label: 'नाकारले' },
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

  const filteredApplications = applications.filter(app => {
    if (filter !== 'all' && app.status !== filter) return false;
    if (searchQuery && !app.service.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 marathi-text">माझे अर्ज</h1>
          <p className="text-gray-500 marathi-text">तुमच्या सर्व अर्जांची स्थिती पहा</p>
        </div>
        <Link
          to="/services"
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="marathi-text">नवीन अर्ज</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="सेवा शोधा..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none"
            />
          </div>
          
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors marathi-text ${
                  filter === option.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-4 text-left marathi-text">अर्ज क्रमांक</th>
                <th className="px-6 py-4 text-left marathi-text">सेवा</th>
                <th className="px-6 py-4 text-left marathi-text">अर्ज तारीख</th>
                <th className="px-6 py-4 text-left marathi-text">स्थिती</th>
                <th className="px-6 py-4 text-center marathi-text">कृती</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <FileText size={20} className="text-green-600" />
                      </div>
                      <span className="font-medium text-gray-800">{app.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 marathi-text">{app.service}</td>
                  <td className="px-6 py-4 text-gray-500 marathi-text">{app.date}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${getStatusBadge(app.status)} marathi-text`}>
                      {app.statusText}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      {app.status === 'approved' && (
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Download size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 marathi-text">
            {filteredApplications.length} पैकी 1-{Math.min(10, filteredApplications.length)} दर्शवित आहे
          </p>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium">1</button>
            <button className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg text-sm font-medium">2</button>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;

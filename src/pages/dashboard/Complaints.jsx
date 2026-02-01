import { useState } from 'react';
import { MessageSquare, Plus, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const Complaints = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: ''
  });

  const complaints = [
    { 
      id: 'GRV001', 
      subject: 'रस्त्यावरील खड्डे', 
      category: 'रस्ते',
      date: '20 जानेवारी 2026', 
      status: 'resolved',
      statusText: 'निराकरण'
    },
    { 
      id: 'GRV002', 
      subject: 'पाणी पुरवठा अनियमित', 
      category: 'पाणी',
      date: '15 जानेवारी 2026', 
      status: 'processing',
      statusText: 'प्रक्रियेत'
    },
    { 
      id: 'GRV003', 
      subject: 'स्ट्रीट लाईट बंद', 
      category: 'वीज',
      date: '10 जानेवारी 2026', 
      status: 'pending',
      statusText: 'प्रलंबित'
    },
  ];

  const categories = [
    'रस्ते', 'पाणी', 'वीज', 'स्वच्छता', 'आरोग्य', 'इतर'
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'processing':
        return <Clock size={20} className="text-blue-600" />;
      default:
        return <AlertCircle size={20} className="text-yellow-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      resolved: 'badge-approved',
      processing: 'badge-processing',
      pending: 'badge-pending'
    };
    return badges[status] || 'badge-pending';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 marathi-text">तक्रारी</h1>
          <p className="text-gray-500 marathi-text">तुमच्या तक्रारी नोंदवा आणि ट्रॅक करा</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary inline-flex items-center gap-2"
        >
          <Plus size={18} />
          <span className="marathi-text">नवीन तक्रार</span>
        </button>
      </div>

      {/* New Complaint Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 animate-fade-in">
          <h2 className="text-lg font-semibold text-gray-800 mb-6 marathi-text">नवीन तक्रार नोंदवा</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">विभाग *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="input-field"
              >
                <option value="">विभाग निवडा</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">विषय *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="तक्रारीचा विषय"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">तपशील *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="तक्रारीचा सविस्तर तपशील..."
                rows={4}
                className="input-field resize-none"
              />
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                <span className="marathi-text">रद्द करा</span>
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
              >
                <Send size={18} />
                <span className="marathi-text">तक्रार पाठवा</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Complaints List */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-4 text-left marathi-text">तक्रार क्रमांक</th>
                <th className="px-6 py-4 text-left marathi-text">विषय</th>
                <th className="px-6 py-4 text-left marathi-text">विभाग</th>
                <th className="px-6 py-4 text-left marathi-text">तारीख</th>
                <th className="px-6 py-4 text-left marathi-text">स्थिती</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint) => (
                <tr key={complaint.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <MessageSquare size={20} className="text-orange-600" />
                      </div>
                      <span className="font-medium text-gray-800">{complaint.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700 marathi-text">{complaint.subject}</td>
                  <td className="px-6 py-4 text-gray-500 marathi-text">{complaint.category}</td>
                  <td className="px-6 py-4 text-gray-500 marathi-text">{complaint.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(complaint.status)}
                      <span className={`badge ${getStatusBadge(complaint.status)} marathi-text`}>
                        {complaint.statusText}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Complaints;

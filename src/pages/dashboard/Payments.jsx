import { CreditCard, CheckCircle, Clock, IndianRupee, Download } from 'lucide-react';

const Payments = () => {
  const payments = [
    { id: 'PAY001', service: 'जन्म प्रमाणपत्र', amount: 50, date: '15 जानेवारी 2026', status: 'success' },
    { id: 'PAY002', service: 'उत्पन्न प्रमाणपत्र', amount: 100, date: '12 जानेवारी 2026', status: 'success' },
    { id: 'PAY003', service: 'कर भरणा', amount: 2500, date: '10 जानेवारी 2026', status: 'success' },
    { id: 'PAY004', service: 'दुकान परवाना', amount: 500, date: '05 जानेवारी 2026', status: 'pending' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 marathi-text">पेमेंट्स</h1>
        <p className="text-gray-500 marathi-text">तुमच्या सर्व पेमेंट्सचा इतिहास</p>
      </div>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <IndianRupee size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">₹3,150</p>
              <p className="text-sm text-gray-500 marathi-text">एकूण पेमेंट</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">3</p>
              <p className="text-sm text-gray-500 marathi-text">यशस्वी पेमेंट</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <Clock size={24} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">1</p>
              <p className="text-sm text-gray-500 marathi-text">प्रलंबित</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="px-6 py-4 text-left marathi-text">व्यवहार ID</th>
                <th className="px-6 py-4 text-left marathi-text">सेवा</th>
                <th className="px-6 py-4 text-left marathi-text">रक्कम</th>
                <th className="px-6 py-4 text-left marathi-text">तारीख</th>
                <th className="px-6 py-4 text-left marathi-text">स्थिती</th>
                <th className="px-6 py-4 text-center marathi-text">पावती</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id} className="table-row">
                  <td className="px-6 py-4 font-medium text-gray-800">{payment.id}</td>
                  <td className="px-6 py-4 text-gray-700 marathi-text">{payment.service}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">₹{payment.amount}</td>
                  <td className="px-6 py-4 text-gray-500 marathi-text">{payment.date}</td>
                  <td className="px-6 py-4">
                    <span className={`badge ${payment.status === 'success' ? 'badge-approved' : 'badge-pending'} marathi-text`}>
                      {payment.status === 'success' ? 'यशस्वी' : 'प्रलंबित'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {payment.status === 'success' && (
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                    )}
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

export default Payments;

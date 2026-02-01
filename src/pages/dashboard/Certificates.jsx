import { Award, Download, Eye, Calendar } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    { id: 'CERT001', name: 'जन्म प्रमाणपत्र', issuedDate: '20 जानेवारी 2026', validUntil: 'जीवनभर', downloadCount: 2 },
    { id: 'CERT002', name: 'जात प्रमाणपत्र', issuedDate: '10 जानेवारी 2026', validUntil: '10 जानेवारी 2029', downloadCount: 1 },
    { id: 'CERT003', name: 'मृत्यू प्रमाणपत्र', issuedDate: '05 जानेवारी 2026', validUntil: 'जीवनभर', downloadCount: 3 },
    { id: 'CERT004', name: 'उत्पन्न प्रमाणपत्र', issuedDate: '28 डिसेंबर 2025', validUntil: '28 डिसेंबर 2026', downloadCount: 5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 marathi-text">प्रमाणपत्रे</h1>
        <p className="text-gray-500 marathi-text">तुमची सर्व जारी केलेली प्रमाणपत्रे</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
          <Award size={32} className="mb-3" />
          <p className="text-3xl font-bold">{certificates.length}</p>
          <p className="text-green-100 marathi-text">एकूण प्रमाणपत्रे</p>
        </div>
      </div>

      {/* Certificates Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-4">
              <div className="flex items-center justify-between">
                <Award size={32} className="text-white" />
                <span className="text-green-100 text-sm">{cert.id}</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 marathi-text">{cert.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 marathi-text">जारी तारीख:</span>
                  <span className="text-gray-700 marathi-text">{cert.issuedDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 marathi-text">वैध पर्यंत:</span>
                  <span className="text-gray-700 marathi-text">{cert.validUntil}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 marathi-text">डाउनलोड:</span>
                  <span className="text-gray-700">{cert.downloadCount} वेळा</span>
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                  <Eye size={18} />
                  <span className="marathi-text">पहा</span>
                </button>
                <button className="flex-1 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Download size={18} />
                  <span className="marathi-text">डाउनलोड</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;

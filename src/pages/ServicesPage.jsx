import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid, List, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const ServicesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <section className="bg-gradient-to-b from-green-50 to-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
              सेवा
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">ग्रामपंचायत</span>{' '}
              <span className="text-green-600 marathi-text">डिजिटल सेवा</span>
            </h1>
            <p className="text-gray-600 marathi-text mb-8">
              सर्व प्रमाणपत्रे आणि सेवा आता तुमच्या मोबाईलवर। आवश्यक सेवा निवडा आणि ऑनलाइन अर्ज करा।
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="सेवा शोधा..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-200 focus:border-green-500 outline-none shadow-sm"
                />
              </div>
              <div className="flex items-center gap-2 bg-white rounded-xl border border-gray-200 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-800">{filteredServices.length}</span>{' '}
              <span className="marathi-text">सेवा उपलब्ध</span>
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} compact />
              ))}
            </div>
          )}

          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 marathi-text">कोणतीही सेवा सापडली नाही</h3>
              <p className="text-gray-500 marathi-text">कृपया वेगळा शोध शब्द वापरून पहा</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-white">
              <h2 className="text-2xl font-bold mb-2 marathi-text">मदत हवी आहे?</h2>
              <p className="text-green-100 marathi-text">
                आमची टीम तुम्हाला मदत करण्यासाठी तयार आहे। आम्हाला संपर्क करा।
              </p>
            </div>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white text-green-700 rounded-xl font-semibold hover:bg-green-50 transition-colors flex items-center gap-2"
            >
              <span className="marathi-text">संपर्क करा</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;

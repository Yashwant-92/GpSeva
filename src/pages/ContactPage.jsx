import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('संदेश पाठवला!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <section className="bg-gradient-to-b from-green-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
              संपर्क
            </span>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">आम्हाला</span>{' '}
              <span className="text-green-600 marathi-text">संपर्क करा</span>
            </h1>
            <p className="text-gray-600 marathi-text">
              कोणतीही चौकशी किंवा मदतीसाठी आम्हाला संपर्क करा। आम्ही तुम्हाला मदत करण्यासाठी तयार आहोत।
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Phone size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 marathi-text">फोन</h3>
                    <p className="text-gray-600">9XXXXXXXXX</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 marathi-text">ईमेल</h3>
                    <p className="text-gray-600">info@gpseva.in</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <MapPin size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 marathi-text">पत्ता</h3>
                    <p className="text-gray-600">Maharashtra, India</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-100">
                <div className="flex items-center gap-3 mb-3">
                  <Clock size={20} className="text-yellow-600" />
                  <h3 className="font-semibold text-gray-800 marathi-text">कार्याचे तास</h3>
                </div>
                <p className="text-gray-600 marathi-text">सोमवार - शनिवार: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600 marathi-text">रविवार: बंद</p>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 marathi-text">संदेश पाठवा</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">नाव *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="तुमचे नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ईमेल *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">मोबाईल नंबर</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10 अंकी मोबाईल नंबर"
                      className="input-field"
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">विषय *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="विषय"
                      className="input-field"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">संदेश *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="तुमचा संदेश इथे लिहा..."
                    rows={5}
                    className="input-field resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  <span className="marathi-text">संदेश पाठवा</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;

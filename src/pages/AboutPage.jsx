import { Link } from 'react-router-dom';
import { CheckCircle, Users, Globe, Award, ArrowRight } from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  const features = [
    'सर्व प्रमाणपत्रे ऑनलाइन उपलब्ध',
    'सुरक्षित आणि विश्वसनीय प्लॅटफॉर्म',
    '24/7 सेवा उपलब्धता',
    'तांत्रिक सहाय्य आणि मार्गदर्शन',
    'शासकीय मार्गदर्शक तत्त्वांनुसार',
    'पारदर्शक प्रक्रिया'
  ];

  const stats = [
    { value: '500+', label: 'ग्रामपंचायती जोडल्या', icon: Users },
    { value: '50,000+', label: 'नागरिक सेवित', icon: Globe },
    { value: '98%', label: 'समाधान दर', icon: Award },
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      <section className="bg-gradient-to-b from-green-50 to-white py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
              आमच्याबद्दल
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
              <span className="text-green-600">GPSEVA</span>{' '}
              <span className="marathi-text">म्हणजे काय?</span>
            </h1>
            <p className="text-xl text-gray-600 marathi-text">
              GPSEVA हे महाराष्ट्रातील ग्रामपंचायतींना डिजिटल बनवण्यासाठी समर्पित एक आधुनिक प्लॅटफॉर्म आहे।
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6 marathi-text">
                आमचे <span className="text-orange-500">ध्येय</span>
              </h2>
              <p className="text-gray-600 mb-6 marathi-text leading-relaxed">
                प्रत्येक ग्रामपंचायतीला आधुनिक तंत्रज्ञानाचा फायदा मिळवून देणे आणि 
                ग्रामस्थांना सर्व सेवा सहजपणे उपलब्ध करून देणे हे आमचे ध्येय आहे।
              </p>
              <p className="text-gray-600 mb-8 marathi-text leading-relaxed">
                मुख्यमंत्री समृद्ध पंचायतराज अभियानांतर्गत शासनाने प्रत्येक ग्रामपंचायतीने 
                स्वतःची वेबसाईट तयार करण्याचे निर्देश दिले आहेत। GPSEVA या गरजेची पूर्तता करते।
              </p>
              
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600 flex-shrink-0" />
                    <span className="text-gray-700 marathi-text">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&q=80"
                alt="Digital India"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6">
                <p className="text-3xl font-bold text-green-600">2019</p>
                <p className="text-gray-600 marathi-text">पासून सेवा देत आहोत</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} />
                  </div>
                  <p className="text-4xl font-bold mb-2">{stat.value}</p>
                  <p className="text-green-100 marathi-text">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 marathi-text">
            तुमच्या ग्रामपंचायतीला जोडा
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto marathi-text">
            आजच नोंदणी करा आणि तुमच्या ग्रामपंचायतीला डिजिटल बनवा।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary inline-flex items-center gap-2">
              <span className="marathi-text">नोंदणी करा</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
              <span className="marathi-text">संपर्क करा</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;

import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Clock, 
  FileText, 
  Users,
  CheckCircle,
  Building,
  Smartphone,
  Award,
  Phone,
  Mail,
  Eye,
  MapPin
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const HomePage = () => {
  const features = [
    {
      icon: Building,
      number: 1,
      title: 'आकर्षक वेबसाईट डिझाईन',
      titleEn: 'Attractive Website Design',
      description: 'आधुनिक आणि व्यावसायिक डिझाईन',
      color: 'bg-orange-100'
    },
    {
      icon: Users,
      number: 2,
      title: 'स्वतंत्र एडमिन पॅनल',
      titleEn: 'Independent Admin Panel',
      description: 'प्रत्येक ग्रामपंचायतीसाठी माहिती भरण्या-बदलण्यासाठी स्वतंत्र एडमिन पॅनल',
      color: 'bg-green-100'
    },
    {
      icon: Globe,
      number: 3,
      title: 'ऑफिशियल सब डोमेन नेम',
      titleEn: 'Official Sub Domain Name',
      description: 'गावाचे नाव समाविष्ट असलेले / तुमच्या आवडीनुसार निवडता येईल असे ऑफिशियल सब डोमेन',
      color: 'bg-blue-100'
    },
    {
      icon: Zap,
      number: 4,
      title: 'त्वरित वेबसाईट लाईव्ह',
      titleEn: 'Quick Website Live',
      description: 'पेमेंट confirmation नंतर त्वरित वेबसाईट लाईव्ह',
      color: 'bg-yellow-100'
    },
    {
      icon: FileText,
      number: 5,
      title: 'शासकीय मार्गदर्शक सूचना',
      titleEn: 'Government Guidelines',
      description: 'ग्रामविकास विभागाच्या मार्गदर्शक सूचनानुसार रचना',
      color: 'bg-purple-100'
    },
    {
      icon: Shield,
      number: 6,
      title: 'तांत्रिक Support',
      titleEn: 'Technical Support',
      description: 'आवश्यक तांत्रिक Support व मार्गदर्शन',
      color: 'bg-cyan-100'
    },
  ];

  const stats = [
    { value: '157+', label: 'ग्रामपंचायती', labelEn: 'Gram Panchayats' },
    { value: '42,000+', label: 'नागरिक जोडलेले', labelEn: 'Citizens Connected' },
    { value: '98%', label: 'समाधान', labelEn: 'Satisfaction' },
  ];

  const steps = [
    {
      number: 1,
      icon: Users,
      title: 'वापरकर्ता नोंदणी',
      description: 'ग्रामपंचायत माहिती भरा'
    },
    {
      number: 2,
      icon: FileText,
      title: 'दस्तऐवज अपलोड',
      description: 'आवश्यक कागदपत्रे अपलोड करा'
    },
    {
      number: 3,
      icon: Award,
      title: 'पेमेंट',
      description: 'पेमेंट पूर्ण करा आणि वेबसाईट लाइव्ह मिळवा'
    },
  ];

  const demoWebsites = [
    {
      id: 1,
      name: 'जातेगाव ग्रामपंचायत',
      nameEn: 'Jotibav Gram Panchayat',
      color: 'orange',
      colorCode: 'ORANGE',
      district: 'talasani-gpseva.in',
      image: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80',
      bgGradient: 'from-orange-500 to-orange-600'
    },
    {
      id: 2,
      name: 'बालापूर ग्रामपंचायत',
      nameEn: 'Balapur Gram Panchayat',
      color: 'हिरवा',
      colorCode: 'GREEN',
      district: 'balapur-gpseva.in',
      image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=800&q=80',
      bgGradient: 'from-green-500 to-green-600'
    },
    {
      id: 3,
      name: 'शामवाडी ग्रामपंचायत',
      nameEn: 'Ramdari Gram Panchayat',
      color: 'निळा',
      colorCode: 'BLUE',
      district: 'shamardi-gpseva.in',
      image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80',
      bgGradient: 'from-blue-500 to-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="gradient-hero py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                <span className="text-orange-500">GPSEVA</span>
                <br />
                <span className="text-orange-400 marathi-text">डिजिटल</span>
                <br />
                <span className="text-green-600 marathi-text">ग्रामपंचायत</span>
                <br />
                <span className="text-gray-800 marathi-text">सेवा पोर्टल</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6 marathi-text">
                तुमच्या ग्रामपंचायतीची स्वतःची वेबसाईट बनवा
              </p>

              <div className="flex items-center gap-2 text-green-600 mb-6">
                <Globe size={20} />
                <span className="font-medium">gpseva.in</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Zap size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 marathi-text">त्वरित सेटअप</p>
                    <p className="text-sm text-gray-500 marathi-text">24 तासांत लाईव्ह</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Shield size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 marathi-text">सुरक्षित</p>
                    <p className="text-sm text-gray-500">100% सुरक्षित</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Primary Button – Previous Gradient */}
                <Link
                  to="/register"
                  className="flex items-center justify-center gap-2 marathi-text px-6 py-3 rounded-lg font-semibold text-white transition-all
                             bg-gradient-to-r from-orange-400 to-green-500 hover:from-orange-500 hover:to-green-600"
                >
                  आता नोंदणी करा
                  <ArrowRight size={18} />
                </Link>

                {/* Secondary Button – White BG, Orange Border & Text */}
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-2 marathi-text px-6 py-3 rounded-lg font-semibold
                             bg-white text-orange-500 border border-orange-500
                             hover:bg-orange-50 transition-all"
                >
                  डेमो पहा
                </Link>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 mt-10">
                {stats.map((stat, index) => {
                  let colorClass = "text-orange-500"; // default

                  if (stat.value === "42,000+") {
                    colorClass = "text-green-600";
                  } else if (stat.value === "98%") {
                    colorClass = "text-blue-600"; // rgb(37 99 235)
                  }

                  return (
                    <div key={index} className="text-center">
                      <p className={`text-2xl lg:text-3xl font-bold ${colorClass}`}>
                        {stat.value}
                      </p>
                      <p className="text-sm text-gray-600 marathi-text">
                        {stat.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-slide-in-right">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80"
                  alt="Indian Village"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white marathi-text">डिजिटल भारत</h3>
                  <p className="text-green-100 marathi-text">आपल्या गावाला डिजिटल बनवा</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Globe size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">24/7</p>
                    <p className="text-sm text-gray-500 marathi-text">ऑनलाइन सेवा</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
              वैशिष्ट्ये
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">ग्रामपंचायत वेबसाईटची</span>{' '}
              <span className="text-orange-500 marathi-text">वैशिष्ट्ये:</span>
            </h2>
            <p className="text-gray-600 marathi-text max-w-2xl mx-auto">
              आधुनिक तंत्रज्ञानासह सर्व आवश्यक सुविधा
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group service-card bg-white rounded-2xl p-6 border border-gray-100
                             transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                    <div className="bg-gradient-to-r from-orange-400 to-green-500 p-3 rounded-lg">
                      <Icon size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold text-green-600">
                      {feature.number}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800 marathi-text">
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-gray-500 text-sm marathi-text mb-4">
                    {feature.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full w-0 bg-gradient-to-r from-orange-400 to-green-500
                                 transition-all duration-500 group-hover:w-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 lg:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
              सेवा
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">ग्रामपंचायत</span>{' '}
              <span className="text-green-600 marathi-text">डिजिटल सेवा</span>
            </h2>
            <p className="text-gray-600 marathi-text max-w-2xl mx-auto">
              सर्व प्रमाणपत्रे आणि सेवा आता तुमच्या मोबाईलवर
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.slice(0, 9).map((service, index) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/services" className="btn-primary inline-flex items-center gap-2 marathi-text">
              सर्व सेवा पहा
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>


      {/* Demo Websites Section - NEW */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 marathi-text">
              डेमो
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">ग्रामपंचायत</span>{' '}
              <span className="text-blue-600 marathi-text">वेबसाईट डेमो</span>
            </h2>
            <p className="text-gray-600 marathi-text max-w-2xl mx-auto">
              आम्ही तयार केलेल्या काही वेबसाईट पहा
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {demoWebsites.map((website, index) => (
              <div
                key={website.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={website.image}
                    alt={website.nameEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${website.bgGradient} opacity-60`} />
                  
                  {/* Color Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold flex items-center gap-2">
                      <span className="marathi-text">रंग:</span>
                      <span className="marathi-text">{website.color}</span>
                      <span className="text-gray-400">({website.colorCode})</span>
                    </span>
                  </div>

                  {/* Demo Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold marathi-text shadow-lg">
                      डेमो
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 marathi-text">
                    {website.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <Globe size={16} className="text-blue-600" />
                    <span className="text-sm font-medium">{website.district}</span>
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 group">
                    <Eye size={18} />
                    <span className="marathi-text">Live Preview</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Box */}
       {/* Additional Info Box - Centered Version */}
<div className="max-w-4xl mx-auto">
  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
    <div className="text-center mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-2 marathi-text">
        आम्ही तयार केलेल्या ग्रामपंचायत वेबसाईट:
      </h3>
      {/* <p className="text-gray-600 marathi-text max-w-2xl mx-auto">
        आमची सर्व अत्यंत सुंदर आणि कस्टम डिझाइन ग्रामपंचायत वेबसाईट व्यवस्थापनासाठी स्वतंत्र एडमिन पॅनल वापरता येतो.
      </p> */}
    </div>

   

    {/* Color Selection Dropdown Illustration */}
<div className="bg-white rounded-xl p-6 shadow-sm max-w-md mx-auto">
  <div className="relative mb-4">
    <select className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-lg appearance-none cursor-pointer hover:border-blue-400 transition-colors marathi-text">
      <option value="">ग्रामपंचायत निवडा</option>
      <option value="jotibav">जातेगाव ग्रामपंचायत</option>
      <option value="balapur">बालापूर ग्रामपंचायत</option>
      <option value="ramdari">शामवाडी ग्रामपंचायत</option>
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
  <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors marathi-text">
    शोधा
  </button>
</div>
  </div>
</div>
        </div>
      </section>


      {/* Why Choose Us Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4 marathi-text">
                का आवश्यक?
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                <span className="marathi-text">ग्रामपंचायत वेबसाईट</span><br />
                <span className="text-orange-500 marathi-text">कशासाठी?</span>
              </h2>

              <div className="space-y-4">
                {[
                  'तुमची ग्रामपंचायत फक्त गावापुरती मर्यादित न राहता ती जागतिक व्यासपीठावर येते.',
                  'वेबसाईटच्या माध्यमातून तुमचे ग्रामस्थ ग्रामपंचायतीशी कोठूनही जोडले जाऊ शकतात.',
                  'तुम्ही करत असलेल्या कार्याचे व्यवस्थित सादरीकरण होते.',
                  'ग्रामपंचायतीच्या सेवा, योजना, उपक्रम, बातम्या, सूचना ग्रामस्थांना सहजरीतीने उपलब्ध होतात.',
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle size={18} className="text-green-600" />
                    </div>
                    <p className="text-gray-700 marathi-text">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=800&q=80"
                  alt="Gram Panchayat Meeting"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold text-green-500">98%</p>
                    <p className="text-sm text-gray-600 marathi-text">समाधान दर</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-orange-500">500+</p>
                    <p className="text-sm text-gray-600 marathi-text">सक्रिय ग्रामपंचायती</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
<section
  id="process"
  className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white"
>
  <div className="container mx-auto px-4">
    <div className="text-center mb-12">
      <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-4 marathi-text">
        नोंदणी प्रक्रिया
      </span>
      <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
        <span className="text-orange-500 marathi-text">नोंदणी</span>{' '}
        <span className="marathi-text">पूर्ण करा फक्त 3 चरणांत</span>
      </h2>
      <p className="text-gray-600 marathi-text">सोपी आणि जलद प्रक्रिया</p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={index}
            className="group relative text-center bg-white rounded-2xl p-6
                       border border-gray-200
                       transition-all duration-300
                       hover:border-green-500 hover:shadow-lg"
          >
            {/* Icon Box */}
            <div className="inline-block relative mb-6">
              <div
                className="w-20 h-20 rounded-2xl bg-green-50
                           flex items-center justify-center mx-auto
                           transition-colors duration-300
                           group-hover:bg-green-100"
              >
                <Icon
                  size={36}
                  className="text-green-600"
                />
              </div>

              {/* Step Number */}
              <div
                className="absolute -top-3 -right-3 w-8 h-8 rounded-full
                           bg-green-600 text-white
                           flex items-center justify-center
                           font-bold text-sm"
              >
                {step.number}
              </div>
            </div>

            {/* Text */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2 marathi-text">
              {step.title}
            </h3>
            <p className="text-gray-500 marathi-text">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  </div>
</section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4 marathi-text">
              किंमत
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">ऑफर</span>{' '}
              <span className="text-blue-600 marathi-text">किंमत</span>
            </h2>
            <p className="text-gray-600 marathi-text">परवडणारी किंमत आणि उत्तम सेवा</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* One Year Plan */}
            <div className="card border-2 border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center marathi-text">एक वर्ष</h3>
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">₹</span>
                <span className="text-5xl font-bold text-gray-800">9,499</span>
                <p className="text-sm text-gray-500 mt-2">18% GST सह</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['पूर्ण वेबसाईट', 'एडमिन पॅनल', 'तांत्रिक सपोर्ट', '1 वर्ष होस्टिंग'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="text-gray-700 marathi-text">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
  {/* Button 1 – Black */}
  <button
    className="w-full py-4 bg-black text-white rounded-xl font-semibold
               hover:bg-gray-900 transition-colors marathi-text"
  >
    आता नोंदणी करा
  </button>

  {/* Button 2 – Gradient */}
  
</div>

            </div>

            {/* Two Year Plan */}
            <div className="card border-2 border-orange-400 p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                ⭐ लोकप्रिय
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center marathi-text">दोन वर्षे</h3>
              <div className="text-center mb-6">
                <span className="text-sm text-gray-500">₹</span>
                <span className="text-5xl font-bold text-gray-800">16,499</span>
                <p className="text-sm text-gray-500 mt-2">18% GST सह</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['पूर्ण वेबसाईट', 'एडमिन पॅनल', 'तांत्रिक सपोर्ट', '2 वर्षे होस्टिंग', 'मोफत अपडेट्स'].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle size={20} className="text-green-600" />
                    <span className="text-gray-700 marathi-text">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all marathi-text">
                आता नोंदणी करा
              </button>
            </div>
          </div>

          <p className="text-center text-gray-500 mt-8 text-sm marathi-text">
            * सर्व किंमती 18% GST सह | पेमेंट confirmation नंतर त्वरित वेबसाईट लाईव्ह
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 lg:py-24 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text--700 rounded-full text-sm font-medium mb-4 marathi-text">
              संपर्क
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              <span className="marathi-text">आम्हाला</span>{' '}
              <span className="text-blue-600 marathi-text">संपर्क करा</span>
            </h2>
            <p className="text-gray-600 marathi-text">कोणतीही चौकशीसाठी आम्हाला संपर्क करा</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-6 marathi-text">संपर्क माहिती</h3>
              <div className="space-y-4">


                    <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
        <MapPin size={24} className="text-green-600" />
      </div>
      <div>
        <p className="font-medium text-gray-800 marathi-text mb-1">पत्ता</p>
        <p className="text-gray-700 font-medium">AgroZone Technology Pvt. Ltd.</p>
        <p className="text-gray-600">Shegaon, Maharashtra, India</p>
      </div>
    </div>

    
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                    <Phone size={24} className="text-orange-600" />
                  </div>


                  
                  <div>
                    <p className="font-medium text-gray-800 marathi-text">फोन</p>
                    <p className="text-gray-600">9XXXXXXXXX</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Mail size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 marathi-text">ईमेल</p>
                    <p className="text-gray-600">info@gpseva.in</p>
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                  <h4 className="font-semibold text-gray-800 mb-2 marathi-text">कार्याचे तास</h4>
                  <p className="text-gray-600 marathi-text">सोमवार - शनिवार: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600 marathi-text">रविवार: बंद</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 marathi-text">संदेश पाठवा</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ईमेल *</label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">मोबाईल नंबर</label>
                  <input
                    type="tel"
                    placeholder="10 अंकी मोबाईल नंबर"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">विषय *</label>
                  <input
                    type="text"
                    placeholder="विषय"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">संदेश *</label>
                  <textarea
                    rows={4}
                    placeholder="तुमचा संदेश इथे लिहा..."
                    className="input-field resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-2"
                >
                  <span className="marathi-text">संदेश पाठवा</span>
                  <ArrowRight size={18} />
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

export default HomePage;
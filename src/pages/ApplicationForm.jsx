import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight, 
  User, 
  MapPin, 
  FileText, 
  Upload,
  Check,
  Loader2,
  IndianRupee,
  Clock
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getServiceById } from '../data/services';

const ApplicationForm = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    motherName: '',
    dob: '',
    gender: '',
    mobile: '',
    email: '',
    aadhar: '',
    village: '',
    taluka: '',
    district: '',
    pincode: '',
    address: '',
    documents: []
  });

  useEffect(() => {
    const foundService = getServiceById(serviceId);
    if (foundService) {
      setService(foundService);
    } else {
      navigate('/services');
    }
  }, [serviceId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, documents: [...prev.documents, ...files] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (!service) return null;

  const Icon = service.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <Header />

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="marathi-text">सर्व सेवा</span>
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center`}>
              <Icon size={32} className="text-green-600" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 marathi-text">{service.title}</h1>
              <p className="text-gray-500 marathi-text">{service.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                <IndianRupee size={18} className="text-green-600" />
                <span className="font-semibold text-green-700">₹{service.fee}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-lg">
                <Clock size={18} className="text-orange-600" />
                <span className="font-semibold text-orange-700 marathi-text">{service.processingTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${((step - 1) / 3) * 100}%` }}
              />
            </div>
            {[
              { num: 1, label: 'वैयक्तिक माहिती', icon: User },
              { num: 2, label: 'पत्ता', icon: MapPin },
              { num: 3, label: 'दस्तऐवज', icon: FileText },
              { num: 4, label: 'पूर्ण', icon: Check }
            ].map((s) => {
              const StepIcon = s.icon;
              return (
                <div key={s.num} className="relative flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step > s.num 
                      ? 'bg-green-500 text-white' 
                      : step === s.num 
                        ? 'bg-green-600 text-white ring-4 ring-green-100' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step > s.num ? <Check size={20} /> : <StepIcon size={20} />}
                  </div>
                  <span className={`text-xs mt-2 marathi-text text-center w-20 ${
                    step >= s.num ? 'text-green-600 font-medium' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
            {step === 1 && (
              <div className="animate-fade-in space-y-6">
                <div className="form-section-title">
                  <div className="form-section-number">1</div>
                  <h2 className="marathi-text">वैयक्तिक माहिती</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">पूर्ण नाव *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="तुमचे पूर्ण नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">वडिलांचे नाव *</label>
                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="वडिलांचे पूर्ण नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">आईचे नाव *</label>
                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder="आईचे पूर्ण नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">जन्मतारीख *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">लिंग *</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">निवडा</option>
                      <option value="male">पुरुष</option>
                      <option value="female">स्त्री</option>
                      <option value="other">इतर</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10 अंकी मोबाईल नंबर"
                      className="input-field"
                      maxLength={10}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ईमेल</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">आधार नंबर *</label>
                    <input
                      type="text"
                      name="aadhar"
                      value={formData.aadhar}
                      onChange={handleChange}
                      placeholder="12 अंकी आधार नंबर"
                      className="input-field"
                      maxLength={12}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in space-y-6">
                <div className="form-section-title">
                  <div className="form-section-number">2</div>
                  <h2 className="marathi-text">पत्ता माहिती</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">गाव *</label>
                    <input
                      type="text"
                      name="village"
                      value={formData.village}
                      onChange={handleChange}
                      placeholder="गावाचे नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">तालुका *</label>
                    <input
                      type="text"
                      name="taluka"
                      value={formData.taluka}
                      onChange={handleChange}
                      placeholder="तालुक्याचे नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">जिल्हा *</label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="जिल्ह्याचे नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">पिन कोड *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="6 अंकी पिन कोड"
                      className="input-field"
                      maxLength={6}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">संपूर्ण पत्ता *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="घर नंबर, रस्ता, लँडमार्क..."
                      rows={3}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in space-y-6">
                <div className="form-section-title">
                  <div className="form-section-number">3</div>
                  <h2 className="marathi-text">दस्तऐवज अपलोड</h2>
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Upload size={28} className="text-green-600" />
                    </div>
                    <p className="text-gray-700 font-medium marathi-text">फाईल्स अपलोड करण्यासाठी क्लिक करा</p>
                    <p className="text-sm text-gray-500 mt-2">PDF, JPG, PNG (Max 5MB प्रत्येक)</p>
                  </label>
                </div>

                {formData.documents.length > 0 && (
                  <div className="space-y-3">
                    <p className="font-medium text-gray-700 marathi-text">अपलोड केलेल्या फाईल्स:</p>
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FileText size={20} className="text-green-600" />
                        <span className="flex-1 text-gray-700">{file.name}</span>
                        <span className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 text-sm marathi-text">
                    <strong>आवश्यक कागदपत्रे:</strong> आधार कार्ड, रेशन कार्ड, पासपोर्ट साइज फोटो, संबंधित पुरावे
                  </p>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 marathi-text">
                  अर्ज यशस्वीरित्या सबमिट झाला!
                </h2>
                <p className="text-gray-600 mb-2 marathi-text">तुमचा अर्ज क्रमांक:</p>
                <p className="text-2xl font-bold text-green-600 mb-6">APP{Date.now().toString().slice(-6)}</p>
                <p className="text-gray-500 mb-8 marathi-text">
                  अर्जाची स्थिती तपासण्यासाठी डॅशबोर्डवर जा।
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/dashboard" className="btn-primary inline-flex items-center gap-2">
                    <span className="marathi-text">डॅशबोर्डवर जा</span>
                    <ArrowRight size={18} />
                  </Link>
                  <Link to="/services" className="btn-secondary inline-flex items-center gap-2">
                    <span className="marathi-text">अधिक सेवा पहा</span>
                  </Link>
                </div>
              </div>
            )}

            {step < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 font-medium"
                  >
                    <ArrowLeft size={18} />
                    <span className="marathi-text">मागे</span>
                  </button>
                )}
                {step < 3 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step + 1)}
                    className="btn-primary ml-auto flex items-center gap-2"
                  >
                    <span className="marathi-text">पुढे</span>
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary ml-auto flex items-center gap-2"
                  >
                    {loading ? (
                      <Loader2 size={20} className="animate-spin" />
                    ) : (
                      <>
                        <span className="marathi-text">अर्ज सबमिट करा</span>
                        <Check size={18} />
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ApplicationForm;

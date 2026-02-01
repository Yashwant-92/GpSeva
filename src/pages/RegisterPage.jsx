import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Phone, Mail, MapPin, ArrowRight, ArrowLeft, Check, Loader2 } from 'lucide-react';
import DashboardHome from './Dashboard/DashboardHome';
import DocumentUploadPage from '../components/DocumentUploadPageComplete';


const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    gramPanchayatName: '',
    taluka: '',
    district: '',
    population: '',
    address: '',
    sarpanchName: '',
    sarpanchMobile: '',
    gramSevakName: '',
    gramSevakMobile: '',
    email: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    colorTheme: 'green'
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log("Saved:", data);

    navigate("/documents");
  } catch (error) {
    console.error(error);
    alert("नोंदणी अयशस्वी झाली");
  } finally {
    setLoading(false);
  }
};

  const colorThemes = [
    { id: 'orange', name: 'नारिंगी', color: 'bg-orange-500' },
    { id: 'green', name: 'हिरवी', color: 'bg-green-500' },
    { id: 'blue', name: 'निळी', color: 'bg-blue-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold">
                GP
              </div>
              <div>
                <h1 className="text-xl font-bold text-green-700">GPSEVA</h1>
                <p className="text-xs text-gray-500 marathi-text">डिजिटल ग्रामपंचायत सेवा</p>
              </div>
            </Link>
            
            <Link  to="/" className="px-4 py-2 rounded-lg font-medium text-white
             bg-gradient-to-r from-orange-400 to-green-500
             hover:from-orange-500 hover:to-green-600
             transition-all text-sm lg:text-base marathi-text">
              ← मुख्यपृष्ठ
            </Link>


            
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 marathi-text">
            ग्रामपंचायत <span className="text-orange-500">नोंदणी करा</span>
          </h1>
          <p className="text-gray-600 mt-2 marathi-text">
            आपल्या ग्रामपंचायतीसाठी वेबसाईट बनवण्यासाठी खालील माहिती भरा
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-1 bg-gray-200">
              <div 
                className="h-full bg-green-500 transition-all duration-500"
                style={{ width: `${((step - 1) / 4) * 100}%` }}
              />
            </div>
            {[
              { num: 1, label: 'ग्रामपंचायत माहिती' },
              { num: 2, label: 'पदाधिकारी माहिती' },
              { num: 3, label: 'बँक तपशील' },
              { num: 4, label: 'थीम निवडा' },
              { num: 5, label: 'पूर्ण' }
            ].map((s) => (
              <div key={s.num} className="relative flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  step > s.num 
                    ? 'bg-green-500 text-white' 
                    : step === s.num 
                      ? 'bg-green-600 text-white ring-4 ring-green-100' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? <Check size={20} /> : s.num}
                </div>
                <span className={`text-xs mt-2 marathi-text text-center w-20 ${
                  step >= s.num ? 'text-green-600 font-medium' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Step 1: Gram Panchayat Info */}
            {step === 1 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">1</div>
                  <h2 className="text-xl font-semibold text-gray-800 marathi-text">ग्रामपंचायत माहिती</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ग्रामपंचायतचे नाव *</label>
                    <input
                      type="text"
                      name="gramPanchayatName"
                      value={formData.gramPanchayatName}
                      onChange={handleChange}
                      placeholder="उदा. बालापूर ग्रामपंचायत"
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
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">लोकसंख्या *</label>
                    <input
                      type="number"
                      name="population"
                      value={formData.population}
                      onChange={handleChange}
                      placeholder="उदा. 5000"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">पत्ता *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="संपूर्ण पत्ता"
                      rows={3}
                      className="input-field resize-none"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Official Info */}
            {step === 2 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">2</div>
                  <h2 className="text-xl font-semibold text-gray-800 marathi-text">पदाधिकारी माहिती</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">सरपंचाचे नाव *</label>
                    <input
                      type="text"
                      name="sarpanchName"
                      value={formData.sarpanchName}
                      onChange={handleChange}
                      placeholder="सरपंचाचे पूर्ण नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">सरपंच मोबाईल *</label>
                    <input
                      type="tel"
                      name="sarpanchMobile"
                      value={formData.sarpanchMobile}
                      onChange={handleChange}
                      placeholder="10 अंकी मोबाईल नंबर"
                      className="input-field"
                      maxLength={10}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ग्रामसेवकाचे नाव *</label>
                    <input
                      type="text"
                      name="gramSevakName"
                      value={formData.gramSevakName}
                      onChange={handleChange}
                      placeholder="ग्रामसेवकाचे पूर्ण नाव"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ग्रामसेवक मोबाईल *</label>
                    <input
                      type="tel"
                      name="gramSevakMobile"
                      value={formData.gramSevakMobile}
                      onChange={handleChange}
                      placeholder="10 अंकी मोबाईल नंबर"
                      className="input-field"
                      maxLength={10}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ईमेल अड्रेस *</label>
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
              </div>
            )}

            {/* Step 3: Bank Details */}
            {step === 3 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">3</div>
                  <h2 className="text-xl font-semibold text-gray-800 marathi-text">बँक तपशील</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">बँकेचे नाव *</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleChange}
                      placeholder="उदा. State Bank of India"
                      className="input-field"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">खाते क्रमांक *</label>
                    <input
                      type="text"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      placeholder="खाते क्रमांक"
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">IFSC कोड *</label>
                    <input
                      type="text"
                      name="ifscCode"
                      value={formData.ifscCode}
                      onChange={handleChange}
                      placeholder="उदा. SBIN0001234"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Color Theme */}
            {step === 4 && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">4</div>
                  <h2 className="text-xl font-semibold text-gray-800 marathi-text">कलर थीम निवडा</h2>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  {colorThemes.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, colorTheme: theme.id }))}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        formData.colorTheme === theme.id
                          ? 'border-green-500 bg-green-50 ring-4 ring-green-100'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full ${theme.color} mx-auto mb-4`} />
                      <p className="font-medium text-gray-800 marathi-text">{theme.name}</p>
                    </button>
                  ))}
                </div>

                {/* <div className="mt-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">
                    दस्तऐवज अपलोड (PDF, JPG, PNG)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                    <input type="file" className="hidden" id="document-upload" accept=".pdf,.jpg,.jpeg,.png" />
                    <label htmlFor="document-upload" className="cursor-pointer">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <ArrowRight size={24} className="text-green-600 rotate-[-90deg]" />
                      </div>
                      <p className="text-gray-600 marathi-text">कागदपत्रे अपलोड करण्यासाठी क्लिक करा</p>
                      <p className="text-sm text-gray-400 mt-2">आवश्यक कागदपत्रे (PDF, JPG, PNG)</p>
                    </label>
                  </div>
                </div> */}
              </div>
            )}

            {/* Step 5: Complete */}
            {step === 5 && (
              <div className="animate-fade-in text-center py-8">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <Check size={40} className="text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 marathi-text">
                  नोंदणी जवळपास पूर्ण!
                </h2>
                <p className="text-gray-600 marathi-text mb-8">
                  पेमेंट पूर्ण केल्यानंतर तुमची वेबसाईट 24 तासांत लाईव्ह होईल.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span className="marathi-text">नोंदणी पूर्ण करा</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 5 && (
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
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="btn-primary ml-auto flex items-center gap-2"
                >
                  <span className="marathi-text">पुढे</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

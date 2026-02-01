import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, ArrowRight, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('कृपया 10 अंकी मोबाईल नंबर प्रविष्ट करा');
      return;
    }
    setLoading(true);
    setError('');
    
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('कृपया 6 अंकी OTP प्रविष्ट करा');
      return;
    }
    
    setLoading(true);
    setError('');

    setTimeout(() => {
      login({
        id: '1',
        name: 'राजेश पाटील',
        mobile: mobile,
        village: 'बालापूर ग्रामपंचायत'
      });
      setLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 to-green-800 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 border-4 border-white rounded-full" />
          <div className="absolute bottom-20 right-10 w-60 h-60 border-4 border-white rounded-full" />
          <div className="absolute top-1/2 left-1/3 w-32 h-32 border-4 border-white rounded-full" />
        </div>
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm">
              GP
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">GPSEVA</h1>
              <p className="text-green-200 text-sm marathi-text">डिजिटल ग्रामपंचायत सेवा</p>
            </div>
          </Link>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4 marathi-text">
            आपल्या गावाच्या सर्व सेवा एका क्लिकवर
          </h2>
          <p className="text-green-100 text-lg marathi-text">
            जन्म प्रमाणपत्र, मृत्यू प्रमाणपत्र, कर भरणा आणि इतर सर्व सेवा आता ऑनलाइन
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">500+</p>
            <p className="text-green-200 text-sm marathi-text">ग्रामपंचायती</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">50K+</p>
            <p className="text-green-200 text-sm marathi-text">नागरिक</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">98%</p>
            <p className="text-green-200 text-sm marathi-text">समाधान</p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Header for Small Screens */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-bold text-xl">
                GP
              </div>
              <div>
                <h1 className="text-2xl font-bold text-green-700">GPSEVA</h1>
                <p className="text-gray-500 text-sm marathi-text">डिजिटल ग्रामपंचायत सेवा</p>
              </div>
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Phone size={28} className="text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 marathi-text">
                {step === 1 ? 'लॉगिन करा' : 'OTP सत्यापित करा'}
              </h2>
              <p className="text-gray-500 mt-2 marathi-text">
                {step === 1 
                  ? 'आपला मोबाईल नंबर प्रविष्ट करा'
                  : `${mobile} वर पाठवलेला OTP प्रविष्ट करा`
                }
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center marathi-text">
                {error}
              </div>
            )}

         {step === 1 ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3 marathi-text">
                      मोबाईल नंबर *
                    </label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                        <span className="text-gray-500 font-medium">+91</span>
                        <div className="w-px h-6 bg-gray-300" />
                      </div>
                      <input
                        type="tel"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="10 अंकी मोबाईल नंबर"
                        className="w-full pl-20 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl focus:border-orange-400 focus:ring-4 focus:ring-orange-100 outline-none transition-all text-lg font-medium"
                        maxLength={10}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || mobile.length !== 10}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span className="marathi-text">OTP पाठवा</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4 text-center marathi-text">
                    6 अंकी OTP प्रविष्ट करा
                  </label>
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        value={digit}
                        onChange={(e) => handleOTPChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
                        maxLength={1}
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span className="marathi-text">सत्यापित करा</span>
                      <CheckCircle size={18} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      setOtp(['', '', '', '', '', '']);
                    }}
                    className="text-green-600 hover:text-green-700 text-sm font-medium marathi-text"
                  >
                    नंबर बदला
                  </button>
                  <span className="mx-2 text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={handleSendOTP}
                    className="text-green-600 hover:text-green-700 text-sm font-medium marathi-text"
                  >
                    OTP पुन्हा पाठवा
                  </button>
                </div>
              </form>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-gray-500 text-sm marathi-text">
                खाते नाही?{' '}
                <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                  नोंदणी करा
                </Link>
              </p>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-6 flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Shield size={16} className="text-green-600" />
            <span className="marathi-text">सुरक्षित आणि एनक्रिप्टेड कनेक्शन</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

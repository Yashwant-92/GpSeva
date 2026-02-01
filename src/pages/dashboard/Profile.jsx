import { useState } from 'react';
import { User, Phone, Mail, MapPin, Save, Camera, Shield, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'राजेश पाटील',
    mobile: user?.mobile || '9876543210',
    email: 'rajesh@example.com',
    address: 'बालापूर, तालुका शेगाव, जिल्हा बुलढाणा',
    village: user?.village || 'बालापूर ग्रामपंचायत',
    aadhar: '**** **** 1234'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 marathi-text">प्रोफाइल</h1>
        <p className="text-gray-500 marathi-text">तुमची वैयक्तिक माहिती व्यवस्थापित करा</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-3xl font-bold">
                {formData.name.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors">
                <Camera size={16} />
              </button>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mt-4 marathi-text">{formData.name}</h2>
            <p className="text-gray-500 marathi-text">{formData.village}</p>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-700 marathi-text">सत्यापित नागरिक</p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={18} />
              <span>{formData.mobile}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Mail size={18} />
              <span>{formData.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={18} />
              <span className="marathi-text">{formData.village}</span>
            </div>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800 marathi-text">वैयक्तिक माहिती</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isEditing 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isEditing ? 'रद्द करा' : 'संपादित करा'}
            </button>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">पूर्ण नाव</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">मोबाईल नंबर</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">ईमेल</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">आधार नंबर</label>
                <input
                  type="text"
                  name="aadhar"
                  value={formData.aadhar}
                  disabled
                  className="input-field disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2 marathi-text">पत्ता</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows={3}
                  className="input-field disabled:bg-gray-50 disabled:text-gray-500 resize-none"
                />
              </div>
            </div>

            {isEditing && (
              <button
                type="submit"
                className="btn-primary flex items-center gap-2"
              >
                <Save size={18} />
                <span className="marathi-text">बदल जतन करा</span>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Settings */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 marathi-text">सूचना सेटिंग्ज</h3>
              <p className="text-sm text-gray-500 marathi-text">SMS आणि ईमेल सूचना</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 marathi-text">SMS सूचना</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 marathi-text">ईमेल सूचना</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-gray-700 marathi-text">अर्ज अपडेट्स</span>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600 rounded" />
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Shield size={20} className="text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 marathi-text">सुरक्षा</h3>
              <p className="text-sm text-gray-500 marathi-text">खाते सुरक्षा सेटिंग्ज</p>
            </div>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-800 marathi-text">मोबाईल नंबर बदला</p>
              <p className="text-sm text-gray-500">+91 98765*****</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <p className="font-medium text-gray-800 marathi-text">लॉगिन इतिहास</p>
              <p className="text-sm text-gray-500 marathi-text">शेवटचा लॉगिन: आज, 10:30 AM</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ServicesPage from './pages/ServicesPage';
import ApplicationForm from './pages/ApplicationForm';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import DocumentUploadPageComplete from './components/DocumentUploadPageComplete';
import PaymentPage from './components/PaymentPage';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/apply/:serviceId" element={<ApplicationForm />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/documents" element={<DocumentUploadPageComplete />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

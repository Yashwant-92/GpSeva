import { 
  Baby, 
 Files, 
  Users, 
  Home, 
  Droplets, 
  Store,
  FileCheck,
  MessageSquare,
  FileText,
  IndianRupee,
  Award
} from 'lucide-react';

export const services = [
  {
    id: 'birth-certificate',
    icon: Baby,
    title: 'जन्म प्रमाणपत्र',
    titleEn: 'Birth Certificate',
    description: 'ऑनलाइन जन्म प्रमाणपत्र अर्ज आणि डाउनलोड',
    descriptionEn: 'Online birth certificate application and download',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 50,
    processingTime: '7-10 दिवस'
  },
  {
    id: 'death-certificate',
    icon: Files,
    title: 'मृत्यू प्रमाणपत्र',
    titleEn: 'Death Certificate',
    description: 'ऑनलाइन मृत्यू प्रमाणपत्र अर्ज आणि डाउनलोड',
    descriptionEn: 'Online death certificate application and download',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 50,
    processingTime: '7-10 दिवस'
  },
  {
    id: 'caste-certificate',
    icon: Award,
    title: 'जात प्रमाणपत्र',
    titleEn: 'Caste Certificate',
    description: 'जात प्रमाणपत्र अर्ज व सत्यापन',
    descriptionEn: 'Caste certificate application and verification',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 100,
    processingTime: '15-20 दिवस'
  },
  {
    id: 'income-certificate',
    icon: IndianRupee,
    title: 'उत्पन्न प्रमाणपत्र',
    titleEn: 'Income Certificate',
    description: 'उत्पन्न प्रमाणपत्र अर्ज सेवा',
    descriptionEn: 'Income certificate application service',
   cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 100,
    processingTime: '10-15 दिवस'
  },
  {
    id: 'domicile-certificate',
    icon: Home,
    title: 'रहिवासी दाखला',
    titleEn: 'Domicile Certificate',
    description: 'रहिवासी प्रमाणपत्र ऑनलाइन अर्ज',
    descriptionEn: 'Domicile certificate online application',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 100,
    processingTime: '10-15 दिवस'
  },
  {
    id: 'property-tax',
    icon: FileText,
    title: 'कर भरणा',
    titleEn: 'Property Tax',
    description: 'ऑनलाइन मालमत्ता कर भरणा',
    descriptionEn: 'Online property tax payment',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 0,
    processingTime: 'तात्काळ'
  },
  {
    id: 'water-bill',
    icon: Droplets,
    title: 'पाणी पुरवठा',
    titleEn: 'Water Bill',
    description: 'पाणी कनेक्शन व बिल भरणा',
    descriptionEn: 'Water connection and bill payment',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 0,
    processingTime: 'तात्काळ'
  },
  {
    id: 'scheme-application',
    icon: FileCheck,
    title: 'योजना अर्ज',
    titleEn: 'Scheme Application',
    description: 'विविध शासकीय योजनांसाठी ऑनलाइन अर्ज',
    descriptionEn: 'Online application for various government schemes',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 0,
    processingTime: '15-30 दिवस'
  },
  {
    id: 'grievance',
    icon: MessageSquare,
    title: 'तक्रार नोंद',
    titleEn: 'Grievance',
    description: 'ग्रामपंचायत तक्रार नोंदणी आणि ट्रॅकिंग',
    descriptionEn: 'Gram Panchayat grievance registration and tracking',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 0,
    processingTime: '7-15 दिवस'
  },
  {
    id: 'shop-license',
    icon: Store,
    title: 'दुकान परवाना',
    titleEn: 'Shop License',
    description: 'व्यापार परवाना नोंदणी व नूतनीकरण',
    descriptionEn: 'Business license registration and renewal',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 500,
    processingTime: '15-20 दिवस'
  },
  {
    id: 'marriage-certificate',
    icon: Users,
    title: 'विवाह प्रमाणपत्र',
    titleEn: 'Marriage Certificate',
    description: 'विवाह नोंदणी प्रमाणपत्र अर्ज',
    descriptionEn: 'Marriage registration certificate application',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 100,
    processingTime: '15-20 दिवस'
  },
  {
    id: 'noc',
    icon: FileCheck,
    title: 'ना-हरकत प्रमाणपत्र',
    titleEn: 'NOC',
    description: 'विविध कारणांसाठी ना-हरकत प्रमाणपत्र',
    descriptionEn: 'No Objection Certificate for various purposes',
    cardBg: 'bg-green-50',
    iconStyle: 'gradient',
    fee: 200,
    processingTime: '10-15 दिवस'
  },
];

export const getServiceById = (id) => {
  return services.find(service => service.id === id);
};

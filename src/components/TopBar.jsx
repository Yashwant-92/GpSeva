import { Phone, Mail } from "lucide-react";

const TopBar = () => {
  return (
    <div className="w-full">
      {/* Tricolor Contact Bar */}
      <div className="bg-gradient-to-r from-orange-400 via-white to-green-500 text-gray-800 text-sm">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2">

          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <a
              href="tel:+917823895996"
              className="flex items-center gap-2 hover:text-green-700 transition-colors"
            >
              <Phone size={14} />
              <span>+91 7823895996</span>
            </a>

            <a
              href="mailto:info@agrozonetechnology.com"
              className="flex items-center gap-2 hover:text-green-700 transition-colors"
            >
              <Mail size={14} />
              <span>info@agrozonetechnology.com</span>
            </a>
          </div>

          {/* Right: Initiative Text */}
          <div className="mt-2 sm:mt-0 font-medium text-green-800">
            Digital India Initiative
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;

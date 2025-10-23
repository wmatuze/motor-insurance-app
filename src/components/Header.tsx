import React from 'react';
import { Shield, Phone, Mail } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-display">InsureQuick</h1>
              <p className="text-xs text-gray-500">Powered by Hobbiton</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+260123456789" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition">
              <Phone size={16} />
              <span>+260 957 182 071</span>
            </a>
            <a href="mailto:support@insurequick.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600 transition">
              <Mail size={16} />
              <span>support@insurequick.com</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
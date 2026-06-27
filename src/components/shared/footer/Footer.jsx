import React from 'react';
import { FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#1B4332] text-white py-16 px-6 md:px-12 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Title & Dec */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">KeenKeeper</h2>
        <p className="text-white max-w-xl text-sm md:text-base mb-10 leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>

        {/* Social Links */}
        <div className="mb-16">
          <span className="block text-sm font-medium mb-5">Social Links</span>
          <div className="flex justify-center gap-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Copyright & Policy Links */}
        <div className="w-full border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white">
          <div>
            <p>© 2026 KeenKeeper. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-white hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
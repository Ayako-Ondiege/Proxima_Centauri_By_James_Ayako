// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#f1f3f5] text-gray-700 border-t border-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-center md:text-left">
          &copy; {currentYear} <span className="font-semibold text-green-600">Proxima Centauri</span>. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-4 mt-4 md:mt-0 text-sm justify-center md:justify-end">
          <Link to="/help" className="text-gray-600 hover:text-green-600 transition">Help</Link>
          <Link to="/reminders" className="text-gray-600 hover:text-green-600 transition">Reminders</Link>
          <Link to="/signup" className="text-gray-600 hover:text-green-600 transition">Sign Up</Link>
          <Link to="/login" className="text-gray-600 hover:text-green-600 transition">Login</Link>
        </div>
      </div>
    </footer>
  );
}


export default Footer;
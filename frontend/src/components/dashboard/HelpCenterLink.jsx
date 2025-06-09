// src/components/dashboard/HelpCenterLink.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function HelpCenterLink() {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
      <p className="text-gray-600 mb-2">Visit our help center for guides, FAQs, and contact info.</p>
      <Link to="/help" className="text-blue-600 hover:underline">
        Go to Help Center
      </Link>
    </div>
  );
}
// src/components/dashboard/FinancialOverview.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FinancialOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/finance/overview')
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch financial overview:', err);
        setError('Failed to load financial overview');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-gray-500 text-sm">Loading financial overview...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-xl shadow p-4 text-red-600 text-sm">
        {error || 'No data available.'}
      </div>
    );
  }

  const { savings = 0, interest = 0, loans = 0 } = data;

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Financial Overview</h2>
      <ul className="text-sm text-gray-700 space-y-2">
        <li>
          <strong>Total Savings:</strong> KES {savings.toLocaleString('en-KE')}
        </li>
        <li>
          <strong>Interest Earned:</strong> KES {interest.toLocaleString('en-KE')}
        </li>
        <li>
          <strong>Outstanding Loans:</strong> KES {loans.toLocaleString('en-KE')}
        </li>
      </ul>
    </div>
  );
}
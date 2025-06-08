import React, { useEffect, useState } from 'react';
import { getSavings, addSavings } from '../api';

function Savings() {
  const [savings, setSavings] = useState([]);
  const [form, setForm] = useState({
    user_id: '',
    group_id: '',
    amount: '',
    interest: '',
    dividends: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavings = async () => {
      try {
        const data = await getSavings();
        setSavings(data);
      } catch (err) {
        console.error('Failed to load savings:', err);
        setError('Could not fetch savings records.');
      } finally {
        setLoading(false);
      }
    };

    fetchSavings();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await addSavings(form);
      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      setSavings((prev) => [...prev, result]);
      setForm({ user_id: '', group_id: '', amount: '', interest: '', dividends: '' });
    } catch (err) {
      console.error('Error adding saving:', err);
      setError('Failed to add savings record.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-green-700">Savings Management</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-8">
          {['user_id', 'group_id', 'amount', 'interest', 'dividends'].map((field) => (
            <input
              key={field}
              name={field}
              type={field === 'amount' || field === 'interest' || field === 'dividends' ? 'number' : 'text'}
              placeholder={field.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              value={form[field]}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
              required
            />
          ))}

          <button
            type="submit"
            disabled={submitting}
            className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
              submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {submitting ? 'Saving...' : 'Add Saving'}
          </button>
        </form>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="text-gray-500">Loading savings...</p>
        ) : savings.length > 0 ? (
          <div className="overflow-auto">
            <table className="min-w-full table-auto border text-sm">
              <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="p-2 border">User</th>
                  <th className="p-2 border">Group</th>
                  <th className="p-2 border">Amount</th>
                  <th className="p-2 border">Interest</th>
                  <th className="p-2 border">Dividends</th>
                </tr>
              </thead>
              <tbody>
                {savings.map((s, i) => (
                  <tr key={i} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{s.user}</td>
                    <td className="p-2 border">{s.group}</td>
                    <td className="p-2 border">{s.amount}</td>
                    <td className="p-2 border">{s.interest}</td>
                    <td className="p-2 border">{s.dividends}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No savings records found.</p>
        )}
      </div>
    </div>
  );
}

export default Savings;
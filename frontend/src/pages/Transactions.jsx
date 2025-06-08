// src/pages/Transactions.jsx
import React, { useEffect, useState } from 'react';
import { getTransactions, addTransaction } from '../api';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    user_id: '',
    group_id: '',
    amount: '',
    type: 'credit',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (err) {
        console.error('Error loading transactions:', err);
        setMessage('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addTransaction(form);
      const data = await res.json();
      if (res.ok) {
        setTransactions([...transactions, data]);
        setMessage('✅ Transaction added successfully');
        setForm({
          user_id: '',
          group_id: '',
          amount: '',
          type: 'credit',
          description: ''
        });
      } else {
        setMessage(`❌ ${data.error || 'Failed to add transaction'}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Group Transactions</h2>

      {message && (
        <div
          className={`mb-4 text-sm ${
            message.startsWith('✅') ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="user_id"
          value={form.user_id}
          onChange={handleChange}
          placeholder="User ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="group_id"
          value={form.group_id}
          onChange={handleChange}
          placeholder="Group ID"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="credit">Credit</option>
          <option value="debit">Debit</option>
        </select>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="w-full p-2 border rounded"
          rows="2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Add Transaction
        </button>
      </form>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <table className="w-full text-sm border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Group</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Type</th>
              <th className="p-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index} className="text-center border-t">
                <td className="p-2 border">{tx.user}</td>
                <td className="p-2 border">{tx.group}</td>
                <td className="p-2 border">{tx.amount}</td>
                <td className="p-2 border capitalize">{tx.type}</td>
                <td className="p-2 border">{tx.description || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
}

export default Transactions;
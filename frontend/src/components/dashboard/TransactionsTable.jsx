// src/components/dashboard/TransactionsTable.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('/api/transactions/recent')
      .then(res => setTransactions(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(tx => (
            <tr key={tx.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{new Date(tx.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">{tx.type}</td>
              <td className="px-4 py-2">KES {tx.amount.toLocaleString()}</td>
              <td className="px-4 py-2">{tx.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
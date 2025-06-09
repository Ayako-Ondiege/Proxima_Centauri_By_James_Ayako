// src/components/dashboard/ReminderWidget.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ReminderWidget() {
  const [reminders, setReminders] = useState([]);

  useEffect(() => {
    axios.get('/api/reminders')
      .then(res => setReminders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Reminders</h2>
      <ul className="text-sm text-gray-700 space-y-1">
        {reminders.map(r => (
          <li key={r.id}>• {r.message}</li>
        ))}
      </ul>
    </div>
  );
}
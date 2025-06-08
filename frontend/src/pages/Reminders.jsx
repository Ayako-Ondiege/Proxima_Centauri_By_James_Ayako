import React, { useEffect, useState } from 'react';
import { getReminders } from '../api';

function Reminders() {
  const [reminders, setReminders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReminders = async () => {
      const result = await getReminders();
      if (result.error) {
        setError(result.error);
      } else {
        setReminders(result);
      }
    };

    loadReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-700 mb-4">Reminders</h1>

        {error ? (
          <div className="text-red-600 bg-red-100 p-4 rounded mb-4">
            Failed to load reminders: {error}
          </div>
        ) : reminders.length === 0 ? (
          <p className="text-gray-500">No reminders available at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {reminders.map((reminder) => (
              <li key={reminder.id} className="border p-4 rounded-lg shadow-sm bg-gray-100">
                <h2 className="font-semibold text-lg text-gray-800">{reminder.title}</h2>
                <p className="text-gray-700 mt-1">{reminder.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reminders;
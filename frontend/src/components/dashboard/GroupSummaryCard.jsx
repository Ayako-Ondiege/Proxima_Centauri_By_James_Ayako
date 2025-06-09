// src/components/dashboard/GroupSummaryCard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function GroupSummaryCard() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/groups/summary')
      .then(res => {
        const data = res.data;
        if (Array.isArray(data)) {
          setGroups(data);
        } else {
          console.warn('Expected array, got:', data);
          setGroups([]);
        }
      })
      .catch(err => {
        console.error('Error fetching group summary:', err);
        setError('Failed to load group summary.');
        setGroups([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-2">Group Summary</h2>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        groups.length === 0 ? (
          <p className="text-gray-500">No groups available.</p>
        ) : (
          groups.map(group => (
            <div key={group.id} className="mb-3 border-b pb-2">
              <p className="font-medium text-blue-600">{group.name}</p>
              <p className="text-sm text-gray-600">Members: {group.member_count}</p>
            </div>
          ))
        )
      )}
    </div>
  );
}
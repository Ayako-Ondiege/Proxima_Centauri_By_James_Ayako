// src/components/dashboard/MemberManager.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MemberManager() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    axios.get('/api/members')
      .then(res => setMembers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Group Members</h2>
      <ul className="space-y-3">
        {members.map(member => (
          <li key={member.id} className="p-3 border rounded-lg flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{member.name}</p>
              <p className="text-sm text-gray-500">Role: {member.role}</p>
            </div>
            <div className="space-x-2">
              <button className="text-sm text-blue-600 hover:underline">Edit</button>
              <button className="text-sm text-red-600 hover:underline">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
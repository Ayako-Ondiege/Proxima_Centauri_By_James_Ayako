import React, { useEffect, useState } from 'react';
import { getGroups, createGroup } from '../api';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [form, setForm] = useState({ name: '', user_id: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const data = await getGroups();
      setGroups(data);
    } catch (err) {
      console.error('Failed to fetch groups:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.user_id) return;

    try {
      await createGroup(form);
      setForm({ name: '', user_id: '' });
      fetchGroups();
    } catch (err) {
      console.error('Failed to create group:', err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create a Group</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10 bg-white p-6 rounded-lg shadow-md border">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Group Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter group name"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>
        <div>
          <label htmlFor="user_id" className="block text-sm font-medium text-gray-700">Admin User ID</label>
          <input
            type="text"
            name="user_id"
            value={form.user_id}
            onChange={handleChange}
            placeholder="Enter user ID"
            className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition"
        >
          Create Group
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-4 text-gray-800">All Groups</h2>
      {loading ? (
        <p className="text-gray-500">Loading groups...</p>
      ) : (
        <ul className="space-y-4">
          {groups.length === 0 ? (
            <p className="text-gray-500 italic">No groups created yet.</p>
          ) : (
            groups.map((group) => (
              <li key={group.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">{group.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Members: {Array.isArray(group.members) && group.members.length > 0 ? group.members.join(', ') : 'None'}
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default Groups;
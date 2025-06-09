// src/pages/Dashboard.jsx
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import GroupSummaryCard from '@/components/dashboard/GroupSummaryCard';
import FinancialOverview from '@/components/dashboard/FinancialOverview';
import TransactionsTable from '@/components/dashboard/TransactionsTable';
import MemberManager from '@/components/dashboard/MemberManager';
import ReminderWidget from '@/components/dashboard/ReminderWidget';
import HelpCenterLink from '@/components/dashboard/HelpCenterLink';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens/session
    localStorage.removeItem('token');
    navigate('/login');
  };

  const linkClass = (path) =>
    `block font-medium px-2 py-1 rounded ${
      location.pathname === path ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:text-blue-600'
    }`;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6 hidden md:flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Proxima</h2>
          <nav className="space-y-2">
            <Link to="/dashboard" className={linkClass('/dashboard')}>Dashboard</Link>
            <Link to="/groups" className={linkClass('/groups')}>Groups</Link>
            <Link to="/transactions" className={linkClass('/transactions')}>Transactions</Link>
            <Link to="/savings" className={linkClass('/savings')}>Savings</Link>
            <Link to="/reminders" className={linkClass('/reminders')}>Reminders</Link>
            <Link to="/help" className={linkClass('/help')}>Help Center</Link>
          </nav>
        </div>
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <GroupSummaryCard />
          <FinancialOverview />
          <ReminderWidget />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TransactionsTable />
          <MemberManager />
        </div>
        <HelpCenterLink />
      </main>
    </div>
  );
}
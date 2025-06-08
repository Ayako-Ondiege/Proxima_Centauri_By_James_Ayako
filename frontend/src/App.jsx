// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Groups from './pages/Groups';
import Transactions from './pages/Transactions';
import Savings from './pages/Savings';
import Help from './pages/Help';
import Reminders from './pages/Reminders';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/help" element={<Help />} />
            <Route path="/reminders" element={<Reminders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
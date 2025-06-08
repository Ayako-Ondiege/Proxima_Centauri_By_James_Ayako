// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    borderBottom: '1px solid var(--border-color)',
    backgroundColor: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 10
  }}>
    <Link to="/" style={{ fontWeight: 'bold', color: 'var(--primary-green)', fontSize: '1.5rem' }}>
      Proxima
    </Link>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <Link to="/groups">Groups</Link>
      <Link to="/savings">Savings</Link>
      <Link to="/help">Help</Link>
      <Link to="/login">Login</Link>
    </div>
  </nav>
);

export default Navbar;
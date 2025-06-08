// src/api.js
const API_BASE = 'http://127.0.0.1:5000/api';

const jsonHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to handle fetch with error catch
const fetchData = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error at ${url}:`, error);
    return { error: error.message };
  }
};

// AUTH
export const signupUser = (user) =>
  fetch(`${API_BASE}/signup`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(user),
  });

export const loginUser = (credentials) =>
  fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(credentials),
  });

// GROUPS
export const getGroups = () => fetchData(`${API_BASE}/groups`);
export const createGroup = (group) =>
  fetch(`${API_BASE}/groups`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(group),
  });

// TRANSACTIONS`
export const getTransactions = () => fetchData(`${API_BASE}/transactions`);
export const addTransaction = (tx) =>
  fetch(`${API_BASE}/transactions`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(tx),
  });

// SAVINGS
export const getSavings = () => fetchData(`${API_BASE}/savings`);
export const addSavings = (s) =>
  fetch(`${API_BASE}/savings`, {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(s),
  });

// HELP (FAQs)
export const getHelp = () => fetchData(`${API_BASE}/help`);

// REMINDERS
export const getReminders = () => fetchData(`${API_BASE}/reminders`);
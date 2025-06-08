import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12 text-center">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Proxima Centauri</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          A smart, secure platform to help you manage group savings, track transactions, and stay on top of your financial goals — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition"
          >
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
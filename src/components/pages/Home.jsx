import React from 'react';
import DecorativeImages from '../DecorativeImages';

const Home = ({ user }) => {
  const isAdmin = user?.role === 'admin';
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative">
        <DecorativeImages type="header" />
        <div className="text-center relative z-10 py-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 drop-shadow-lg">
            Welcome to Student Management System
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Manage your students efficiently with our comprehensive platform
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md">
            <span className="text-lg">{isAdmin ? '👨‍💼' : '👨‍🎓'}</span>
            <span className="font-semibold text-gray-800">
              Logged in as: <span className="capitalize">{user?.username}</span> ({user?.role})
            </span>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-2">
          <div className="text-4xl mb-4 text-center">👥</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Students List
          </h3>
          <p className="text-gray-600 text-center">
            View and manage all student records with full CRUD operations
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-2">
          <div className="text-4xl mb-4 text-center">📋</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Attendance Details
          </h3>
          <p className="text-gray-600 text-center">
            Track and monitor student attendance records
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-2">
          <div className="text-4xl mb-4 text-center">💰</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Student Fees
          </h3>
          <p className="text-gray-600 text-center">
            Manage fee payments and financial records
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow transform hover:-translate-y-2">
          <div className="text-4xl mb-4 text-center">📊</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
            Reports & Analytics
          </h3>
          <p className="text-gray-600 text-center">
            Generate reports and view analytics
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Quick Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">📚</div>
            <div className="text-lg font-semibold">Total Students</div>
            <div className="text-3xl font-bold mt-2">Manage All</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">✅</div>
            <div className="text-lg font-semibold">Attendance Tracking</div>
            <div className="text-3xl font-bold mt-2">Real-time</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">💳</div>
            <div className="text-lg font-semibold">Fee Management</div>
            <div className="text-3xl font-bold mt-2">Automated</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


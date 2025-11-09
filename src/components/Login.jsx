import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userType, setUserType] = useState('admin'); // 'admin' or 'student'

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Admin credentials
    if (userType === 'admin') {
      if (username === 'vicky' && password === 'vickyvji') {
        onLogin({ username, role: 'admin' });
        return;
      } else {
        setError('Invalid admin credentials');
        return;
      }
    }

    // Student login (any username/password for demo, or you can add specific student credentials)
    if (userType === 'student') {
      if (username && password) {
        onLogin({ username, role: 'student' });
        return;
      } else {
        setError('Please enter username and password');
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Management System</h1>
          <p className="text-gray-600">Please login to continue</p>
        </div>

        {/* User Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Login As
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setUserType('admin');
                setError('');
                setUsername('');
                setPassword('');
              }}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                userType === 'admin'
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👨‍💼 Admin
            </button>
            <button
              type="button"
              onClick={() => {
                setUserType('student');
                setError('');
                setUsername('');
                setPassword('');
              }}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                userType === 'student'
                  ? 'bg-blue-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              👨‍🎓 Student
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={userType === 'admin' ? 'Enter admin username' : 'Enter your username'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={userType === 'admin' ? 'Enter admin password' : 'Enter your password'}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          {userType === 'admin' ? (
            <p>Admin users have full access to all features</p>
          ) : (
            <p>Student users can only view information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;


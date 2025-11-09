import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Navigation from './components/Navigation';
import Home from './components/pages/Home';
import StudentsListPage from './components/pages/StudentsListPage';
import AttendanceDetails from './components/pages/AttendanceDetails';
import StudentFees from './components/pages/StudentFees';

function App() {
  const [user, setUser] = useState(null);
  const [activePage, setActivePage] = useState('home');

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setActivePage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setActivePage('home');
  };

  const handleNavigate = (page) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home user={user} />;
      case 'students':
        return <StudentsListPage user={user} />;
      case 'attendance':
        return <AttendanceDetails user={user} />;
      case 'fees':
        return <StudentFees user={user} />;
      default:
        return <Home user={user} />;
    }
  };

  // Show login page if user is not logged in
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 decorative-bg">
      {/* Navigation Menu */}
      <Navigation activePage={activePage} onNavigate={handleNavigate} user={user} onLogout={handleLogout} />
      
      {/* Page Content */}
      <div className="container mx-auto px-4 py-8">
        {renderPage()}
      </div>
    </div>
  );
}

export default App;


import React from 'react';

const Navigation = ({ activePage, onNavigate, user, onLogout }) => {
  const menuItems = [
    { id: 'home', label: 'HOME', icon: '🏠' },
    { id: 'students', label: 'STUDENTS LIST', icon: '👥' },
    { id: 'attendance', label: 'STUDENT ATTENDANCE DETAILS', icon: '📋' },
    { id: 'fees', label: 'STUDENT FEES', icon: '💰' },
  ];

  return (
    <nav className="bg-white shadow-lg mb-8 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎓</span>
            <span className="text-xl font-bold text-gray-800">Student Management</span>
          </div>

          {/* Menu Items and User Info */}
          <div className="flex items-center gap-4">
            {/* Menu Items */}
            <div className="flex gap-1 md:gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 md:px-4 py-2 rounded-md text-sm md:text-base font-medium transition-all duration-300 flex items-center gap-2 ${
                    activePage === item.id
                      ? 'bg-blue-600 text-white shadow-md transform scale-105'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden">{item.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* User Info and Logout */}
            <div className="flex items-center gap-3 border-l border-gray-300 pl-4">
              <div className="text-right hidden md:block">
                <div className="text-sm font-semibold text-gray-800">
                  {user?.username}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {user?.role}
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                user?.role === 'admin' 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {user?.role === 'admin' ? '👨‍💼' : '👨‍🎓'}
              </div>
              <button
                onClick={onLogout}
                className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm font-medium flex items-center gap-2"
                title="Logout"
              >
                <span>🚪</span>
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;


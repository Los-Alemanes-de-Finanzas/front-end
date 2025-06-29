'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  userName?: string;
  userInitial?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  userName = "Usuario", 
  userInitial = "U",
  onLogout 
}) => {
  const router = useRouter();

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior
      router.push('/');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-teal-500">BonoPlan</h1>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative group">
              {/* User Avatar */}
              <button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {userInitial}
                </div>
              </button>

              {/* Dropdown Menu (optional) */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  {userName}
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
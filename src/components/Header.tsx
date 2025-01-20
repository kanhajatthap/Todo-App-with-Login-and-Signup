import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LogIn, LogOut, UserPlus, User } from 'lucide-react';
import { login, logout, signup } from '../store/authSlice';
import { clearUserTodos } from '../store/todoSlice';
import type { RootState } from '../store/store';
import AuthModal from './AuthModal';

export default function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const handleLogin = (data: { usernameOrEmail: string; password: string }) => {
    dispatch(login(data));
  };

  const handleSignup = (data: { username: string; email: string; password: string; avatar?: string }) => {
    dispatch(signup(data));
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserTodos());
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">Todo App</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={user.avatar}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-medium text-gray-700">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsSignupOpen(true)}
                  className="flex items-center gap-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <UserPlus size={20} />
                  Sign Up
                </button>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-2 border border-purple-500 text-purple-500 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <LogIn size={20} />
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        type="login"
        onSubmit={handleLogin}
      />

      <AuthModal
        isOpen={isSignupOpen}
        onClose={() => setIsSignupOpen(false)}
        type="signup"
        onSubmit={handleSignup}
      />
    </header>
  );
}
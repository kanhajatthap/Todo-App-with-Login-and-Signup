import React, { useState } from 'react';
import { X, Upload, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'login' | 'signup';
  onSubmit: (data: any) => void;
}

export default function AuthModal({ isOpen, onClose, type, onSubmit }: AuthModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: '',
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (type === 'signup') {
      if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
        setError('Username, email, and password are required');
        return;
      }
      if (!formData.email.includes('@')) {
        setError('Please enter a valid email address');
        return;
      }
    } else {
      if (!formData.username.trim() || !formData.password.trim()) {
        setError('Username/email and password are required');
        return;
      }
    }

    onSubmit(type === 'login' 
      ? { 
          usernameOrEmail: formData.username, 
          password: formData.password 
        }
      : formData
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {type === 'login' ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="mb-4 flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {type === 'login' ? 'Username or Email' : 'Username'}
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {type === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Avatar URL (optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter image URL or leave empty for default"
                />
                <div className="flex-shrink-0">
                  <Upload size={20} className="text-gray-400 mt-2" />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
}
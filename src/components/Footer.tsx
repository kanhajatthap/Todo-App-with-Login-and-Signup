import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white shadow-md mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-gray-600 flex items-center justify-center gap-2">
          Designed by Kanha Jatthap with
          <Heart size={16} className="text-red-500 fill-current" />
        </p>
      </div>
    </footer>
  );
}
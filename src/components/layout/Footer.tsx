'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Logo and company info */}
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <Image
              src="/Zemnay White Tech.png"
              alt="Zemenay Tech Solutions Logo"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
            <div className="text-gray-400">
              <p className="text-sm font-medium">Zemenay Tech Solutions</p>
              <p className="text-xs">Content Management System</p>
            </div>
          </div>

          {/* Right side - Copyright and links */}
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
            <span>&copy; 2024 Zemenay Tech Solutions. All rights reserved.</span>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-red-400 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-red-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

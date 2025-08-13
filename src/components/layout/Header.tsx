'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  Plus
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Posts', href: '/admin/posts', icon: FileText },
  { name: 'Add New Post', href: '/admin/posts/new', icon: Plus },
];

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="bg-black shadow-sm border-b border-gray-800">
      {/* Top Header Bar */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              onClick={onMenuClick}
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Image
                src="/Zemenay Logo Red.png"
                alt="Zemenay Tech Solutions Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <h1 className="text-xl font-bold text-white font-zemenay">
                Zemenay Tech Solutions
              </h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="bg-black p-1 rounded-full text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="h-6 w-6" />
            </button>
            
            {/* User Info and Logout */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-300">{user?.email}</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 hover:bg-gray-800"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Bar */}
      <div className="border-t border-gray-800">
        <div className="px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href || 
                (item.href === '/admin/posts' && pathname?.startsWith('/admin/posts'));
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    isActive
                      ? 'border-red-500 text-red-500'
                      : 'border-transparent text-gray-300 hover:text-red-400 hover:border-red-400'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-2 flex-shrink-0 h-4 w-4 transition-colors',
                      isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-red-400'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { 
  X,
  LayoutDashboard, 
  FileText, 
  Plus
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Posts', href: '/admin/posts', icon: FileText },
  { name: 'Add New Post', href: '/admin/posts/new', icon: Plus },
];

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={onClose}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-black">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={onClose}
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/Zemenay Logo Red.png"
                    alt="Zemenay Tech Solutions Logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <h1 className="text-lg font-bold text-white font-zemenay">
                    Zemenay Tech Solutions
                  </h1>
                </div>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href === '/admin/posts' && pathname?.startsWith('/admin/posts'));
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                        isActive
                          ? 'bg-red-600 text-white'
                          : 'text-gray-300 hover:bg-red-600 hover:text-white'
                      )}
                    >
                      <item.icon
                        className="mr-3 flex-shrink-0 h-5 w-5"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
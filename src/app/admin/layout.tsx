'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import MobileSidebar from '@/components/layout/MobileSidebar';
import Footer from '@/components/layout/Footer';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';
import { initializeSamplePosts } from '@/lib/posts';
import { AuthProvider } from '@/contexts/AuthContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Initialize sample posts
    initializeSamplePosts();
  }, []);

  return (
    <AuthProvider>
      <ProtectedRoute>
        <div className="min-h-screen bg-black flex flex-col">
          <MobileSidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
          <Footer />
          <Toaster />
        </div>
      </ProtectedRoute>
    </AuthProvider>
  );
}

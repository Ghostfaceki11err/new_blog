'use client';

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <p className="text-gray-300">Manage user accounts and permissions</p>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-lg shadow p-8 text-center">
        <h2 className="text-xl font-semibold text-white mb-4">
          User Management Coming Soon
        </h2>
        <p className="text-gray-300">
          This feature is under development. Check back soon for user management capabilities.
        </p>
      </div>
    </div>
  );
}
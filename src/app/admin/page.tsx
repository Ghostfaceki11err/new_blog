'use client';

import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/posts';
import { Post } from '@/types/post';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Eye, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const publishedPosts = posts.filter(post => post.status === 'published');
  const draftPosts = posts.filter(post => post.status === 'draft');
  const recentPosts = posts.slice(0, 5);

  const stats = [
    {
      title: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: 'text-red-500',
      bgColor: 'bg-red-900',
    },
    {
      title: 'Published',
      value: publishedPosts.length,
      icon: Eye,
      color: 'text-red-500',
      bgColor: 'bg-red-900',
    },
    {
      title: 'Drafts',
      value: draftPosts.length,
      icon: TrendingUp,
      color: 'text-red-500',
      bgColor: 'bg-red-900',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Posts</h2>
          <p className="text-gray-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-zemenay">Admin Dashboard</h1>
        <p className="text-gray-300 text-lg">Welcome to Zemenay Tech Solutions CMS</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{stat.title}</p>
                  <p className="text-2xl font-semibold text-white">{stat.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Recent Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white truncate">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge
                    variant={post.status === 'published' ? 'default' : 'secondary'}
                    className={
                      post.status === 'published'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }
                  >
                    {post.status}
                  </Badge>
                </div>
              ))}
              {recentPosts.length === 0 && (
                <p className="text-gray-400 text-center py-4">No posts yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/posts/new"
                className="block p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <h3 className="font-medium">Create New Post</h3>
                <p className="text-red-100 text-sm">Write and publish a new article</p>
              </a>
              <a
                href="/admin/posts"
                className="block p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors border border-gray-700"
              >
                <h3 className="font-medium">Manage Posts</h3>
                <p className="text-gray-300 text-sm">View, edit, and manage all posts</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">All systems operational</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">Database connected</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">Content cache active</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

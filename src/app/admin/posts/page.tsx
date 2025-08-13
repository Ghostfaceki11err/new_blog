'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPosts, deletePost } from '@/lib/posts';
import { Post } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PostCard from '@/components/posts/PostCard';
import DeleteDialog from '@/components/posts/DeleteDialog';
import { Plus, Search, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    postId: number;
    postTitle: string;
  }>({
    isOpen: false,
    postId: 0,
    postTitle: '',
  });
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = posts.filter(
        post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [searchTerm, posts]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('Loading posts...');
      const allPosts = await getAllPosts();
      console.log('Posts loaded:', allPosts);
      setPosts(allPosts);
      setFilteredPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      toast.error('Failed to load posts');
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (post: Post) => {
    setDeleteDialog({
      isOpen: true,
      postId: post.id,
      postTitle: post.title,
    });
  };

  const handleDelete = (id: number) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      handleDeleteClick(post);
    }
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      const success = await deletePost(deleteDialog.postId);
      if (success) {
        await loadPosts();
        toast.success('Post deleted successfully');
      } else {
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
      setDeleteDialog({ isOpen: false, postId: 0, postTitle: '' });
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">All Posts</h1>
          <p className="text-gray-300">Manage your blog posts</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link href="/admin/posts/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Post
            </Link>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
        />
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <FileText className="h-full w-full" />
          </div>
          <h3 className="mt-2 text-sm font-semibold text-white">No posts</h3>
          <p className="mt-1 text-sm text-gray-400">
            {searchTerm ? 'No posts match your search.' : 'Get started by creating a new post.'}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <Button asChild className="bg-red-600 hover:bg-red-700">
                <Link href="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Post
                </Link>
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={deleteDialog.isOpen}
        onClose={() => setDeleteDialog({ isOpen: false, postId: 0, postTitle: '' })}
        onConfirm={handleDeleteConfirm}
        title={deleteDialog.postTitle}
        isLoading={isDeleting}
      />
    </div>
  );
}

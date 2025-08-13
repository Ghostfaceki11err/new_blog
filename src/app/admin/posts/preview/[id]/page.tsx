'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById } from '@/lib/posts';
import { Post } from '@/types/post';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Edit, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

interface PreviewPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminPreviewPostPage({ params }: PreviewPostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const loadParams = async () => {
      const resolvedParams = await params;
      setPostId(resolvedParams.id);
    };
    loadParams();
  }, [params]);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      
      try {
        const foundPost = await getPostById(parseInt(postId));
        if (foundPost) {
          setPost(foundPost);
        } else {
          toast.error('Post not found');
          router.push('/admin/posts');
        }
      } catch (error) {
        console.error('Error loading post:', error);
        toast.error('Failed to load post');
        router.push('/admin/posts');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [postId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  const lastUpdated = formatDistanceToNow(new Date(post.updated_at), {
    addSuffix: true,
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center text-gray-300 hover:text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href={`/admin/posts/edit/${post.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Post
          </Link>
        </Button>
      </div>

      {/* Post Preview */}
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-8">
          {/* Post Status Badge */}
          <div className="mb-4">
            <Badge
              variant={post.status === 'published' ? 'default' : 'secondary'}
              className={
                post.status === 'published'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }
            >
              {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
            </Badge>
          </div>

          {/* Post Title */}
          <h1 className="text-3xl font-bold text-white mb-4">
            {post.title}
          </h1>

          {/* Post Meta */}
          <div className="flex items-center text-gray-400 text-sm mb-6 space-x-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              Created {formattedDate}
            </div>
            <div>
              Last updated: {new Date(post.updated_at).toLocaleDateString()}
            </div>
          </div>

          {/* Post Excerpt */}
          {post.excerpt && (
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h3 className="text-sm font-medium text-white mb-2">Excerpt</h3>
              <p className="text-gray-300 italic">{post.excerpt}</p>
            </div>
          )}

          {/* Post Content */}
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-200 leading-relaxed">
              {post.content}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="mt-6 flex justify-center space-x-4">
        <Button variant="outline" onClick={() => router.push('/admin/posts')} className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
          View All Posts
        </Button>
        <Button asChild className="bg-red-600 hover:bg-red-700">
          <Link href={`/admin/posts/edit/${post.id}`}>
            Edit This Post
          </Link>
        </Button>
      </div>
    </div>
  );
}

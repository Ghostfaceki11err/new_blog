'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPostById, updatePost } from '@/lib/posts';
import { Post, PostFormData } from '@/types/post';
import PostForm from '@/components/posts/PostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface EditPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AdminEditPostPage({ params }: EditPostPageProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSubmit = async (data: PostFormData) => {
    if (!post) return;
    
    setIsSubmitting(true);
    try {
      const updatedPost = await updatePost(post.id, data);
      if (updatedPost) {
        toast.success('Post updated successfully');
        router.push('/admin/posts');
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Failed to update post');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Edit Post</h1>
        <p className="text-gray-300">Update your blog post</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm
            post={post}
            onSubmit={handleSubmit}
            isLoading={isSubmitting}
            submitLabel="Update Post"
          />
        </CardContent>
      </Card>
    </div>
  );
}

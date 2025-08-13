'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/lib/posts';
import { PostFormData } from '@/types/post';
import PostForm from '@/components/posts/PostForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function NewPostPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: PostFormData) => {
    setIsLoading(true);
    try {
      const newPost = createPost(data);
      toast.success('Post created successfully');
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add New Post</h1>
        <p className="text-gray-300">Create a new blog post for your website</p>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Post Details</CardTitle>
        </CardHeader>
        <CardContent>
          <PostForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            submitLabel="Create Post"
          />
        </CardContent>
      </Card>
    </div>
  );
}
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PostFormData, Post } from '@/types/post';
import { Loader2 } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(300, 'Excerpt must be less than 300 characters'),
  status: z.enum(['draft', 'published']),
});

interface PostFormProps {
  post?: Post;
  onSubmit: (data: PostFormData) => Promise<void>;
  isLoading?: boolean;
  submitLabel?: string;
}

export default function PostForm({ post, onSubmit, isLoading = false, submitLabel = 'Create Post' }: PostFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || '',
      content: post?.content || '',
      excerpt: post?.excerpt || '',
      status: post?.status || 'draft',
    },
  });

  const statusValue = watch('status');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-sm font-medium text-white">
          Title *
        </Label>
        <Input
          id="title"
          type="text"
          className="mt-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          {...register('title')}
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p id="title-error" className="mt-1 text-sm text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="excerpt" className="text-sm font-medium text-white">
          Excerpt
        </Label>
        <Textarea
          id="excerpt"
          rows={3}
          className="mt-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          placeholder="Brief description of the post..."
          {...register('excerpt')}
          aria-invalid={errors.excerpt ? 'true' : 'false'}
          aria-describedby={errors.excerpt ? 'excerpt-error' : undefined}
        />
        {errors.excerpt && (
          <p id="excerpt-error" className="mt-1 text-sm text-red-500">
            {errors.excerpt.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="content" className="text-sm font-medium text-white">
          Content *
        </Label>
        <Textarea
          id="content"
          rows={12}
          className="mt-1 bg-gray-900 border-gray-700 text-white placeholder-gray-400"
          placeholder="Write your post content here..."
          {...register('content')}
          aria-invalid={errors.content ? 'true' : 'false'}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && (
          <p id="content-error" className="mt-1 text-sm text-red-500">
            {errors.content.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="status" className="text-sm font-medium text-white">
          Status
        </Label>
        <Select
          value={statusValue}
          onValueChange={(value: 'draft' | 'published') => setValue('status', value)}
        >
          <SelectTrigger className="mt-1 bg-gray-900 border-gray-700 text-white">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent className="bg-gray-900 border-gray-700">
            <SelectItem value="draft" className="text-white hover:bg-gray-800">Draft</SelectItem>
            <SelectItem value="published" className="text-white hover:bg-gray-800">Published</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          disabled={isLoading}
          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
'use client';

import Link from 'next/link';
import { Post } from '@/types/post';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Edit, Trash2, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onDelete: (id: number) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
  });

  return (
    <Card className="hover:shadow-lg transition-shadow bg-gray-900 border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              {post.title}
            </h3>
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
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 text-sm mb-4 overflow-hidden" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
        }}>
          {post.excerpt || post.content.substring(0, 150) + '...'}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-gray-400">
            Created {formattedDate}
          </p>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link href={`/admin/posts/preview/${post.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-gray-300 hover:text-white hover:bg-gray-800">
              <Link href={`/admin/posts/edit/${post.id}`}>
                <Edit className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(post.id)}
              className="text-red-500 hover:text-red-400 hover:bg-red-900"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
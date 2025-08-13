export interface Post {
  id: number; // Changed from string to number since it's int8 in Supabase
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
  slug: string;
  author: string;
  created_at: string;
  updated_at: string;
}

export interface PostFormData {
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published';
}
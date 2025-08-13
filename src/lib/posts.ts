import { Post, PostFormData } from '@/types/post';

// Local storage key for posts
const POSTS_STORAGE_KEY = 'zemenay_posts';

// Sample posts for demonstration
const samplePosts: Post[] = [
  {
    id: 1,
    title: 'Welcome to Zemenay Tech Solutions',
    content: 'We are excited to launch our new website and showcase our cutting-edge technology solutions. Our team has been working tirelessly to bring you the best in web development, mobile applications, and digital transformation services.',
    excerpt: 'Launching our new website with cutting-edge technology solutions.',
    status: 'published',
    slug: 'welcome-to-zemenay-tech-solutions',
    author: 'Admin',
    created_at: '2024-01-15T10:00:00.000Z',
    updated_at: '2024-01-15T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'The Future of Web Development',
    content: 'Explore the latest trends in web development including React, Next.js, and modern JavaScript frameworks. Learn how these technologies are shaping the future of digital experiences and business solutions.',
    excerpt: 'Latest trends in web development and modern JavaScript frameworks.',
    status: 'published',
    slug: 'the-future-of-web-development',
    author: 'Admin',
    created_at: '2024-01-14T14:30:00.000Z',
    updated_at: '2024-01-14T14:30:00.000Z',
  },
  {
    id: 3,
    title: 'Mobile App Development Best Practices',
    content: 'Discover the essential practices for building robust, scalable mobile applications. From user experience design to performance optimization, we cover everything you need to know.',
    excerpt: 'Essential practices for building robust, scalable mobile applications.',
    status: 'draft',
    slug: 'mobile-app-development-best-practices',
    author: 'Admin',
    created_at: '2024-01-13T09:15:00.000Z',
    updated_at: '2024-01-13T09:15:00.000Z',
  },
];

// Helper functions for local storage
const getPostsFromStorage = (): Post[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(POSTS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading posts from localStorage:', error);
    return [];
  }
};

const savePostsToStorage = (posts: Post[]): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving posts to localStorage:', error);
  }
};

// Initialize sample posts if none exist
export const initializeSamplePosts = (): void => {
  if (typeof window === 'undefined') return;
  
  const existingPosts = getPostsFromStorage();
  if (existingPosts.length === 0) {
    savePostsToStorage(samplePosts);
    console.log('✅ Sample posts initialized in localStorage');
  }
};

// Generate a unique ID
const generateId = (): number => {
  const posts = getPostsFromStorage();
  const maxId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;
  return maxId + 1;
};

// Create a new post
export const createPost = async (postData: PostFormData): Promise<Post | null> => {
  try {
    const posts = getPostsFromStorage();
    
    // Check for duplicate slug
    const existingPost = posts.find(post => post.slug === postData.title.toLowerCase().replace(/\s+/g, '-'));
    if (existingPost) {
      throw new Error('A post with this title already exists');
    }

    const newPost: Post = {
      id: generateId(),
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt,
      status: postData.status,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
      author: 'Admin', // Default author for local storage
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    posts.push(newPost);
    savePostsToStorage(posts);
    
    console.log('✅ Post created successfully:', newPost);
    return newPost;
  } catch (error) {
    console.error('❌ Error creating post:', error);
    throw error;
  }
};

// Get all posts
export const getAllPosts = async (): Promise<Post[]> => {
  try {
    const posts = getPostsFromStorage();
    console.log('✅ Retrieved posts from localStorage:', posts.length);
    return posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('❌ Error getting posts:', error);
    return [];
  }
};

// Get a single post by ID
export const getPostById = async (id: number): Promise<Post | null> => {
  try {
    const posts = getPostsFromStorage();
    const post = posts.find(p => p.id === id);
    console.log('✅ Retrieved post by ID:', post);
    return post || null;
  } catch (error) {
    console.error('❌ Error getting post by ID:', error);
    return null;
  }
};

// Update a post
export const updatePost = async (id: number, postData: PostFormData): Promise<Post | null> => {
  try {
    const posts = getPostsFromStorage();
    const postIndex = posts.findIndex(p => p.id === id);
    
    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    // Check for duplicate slug (excluding current post)
    const existingPost = posts.find(post => 
      post.slug === postData.title.toLowerCase().replace(/\s+/g, '-') && post.id !== id
    );
    if (existingPost) {
      throw new Error('A post with this title already exists');
    }

    const updatedPost: Post = {
      ...posts[postIndex],
      title: postData.title,
      content: postData.content,
      excerpt: postData.excerpt,
      status: postData.status,
      slug: postData.title.toLowerCase().replace(/\s+/g, '-'),
      updated_at: new Date().toISOString(),
    };

    posts[postIndex] = updatedPost;
    savePostsToStorage(posts);
    
    console.log('✅ Post updated successfully:', updatedPost);
    return updatedPost;
  } catch (error) {
    console.error('❌ Error updating post:', error);
    throw error;
  }
};

// Delete a post
export const deletePost = async (id: number): Promise<boolean> => {
  try {
    const posts = getPostsFromStorage();
    const filteredPosts = posts.filter(p => p.id !== id);
    
    if (filteredPosts.length === posts.length) {
      throw new Error('Post not found');
    }

    savePostsToStorage(filteredPosts);
    console.log('✅ Post deleted successfully');
    return true;
  } catch (error) {
    console.error('❌ Error deleting post:', error);
    return false;
  }
};

// Get published posts only
export const getPublishedPosts = async (): Promise<Post[]> => {
  try {
    const posts = getPostsFromStorage();
    const publishedPosts = posts.filter(post => post.status === 'published');
    return publishedPosts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    console.error('❌ Error getting published posts:', error);
    return [];
  }
};
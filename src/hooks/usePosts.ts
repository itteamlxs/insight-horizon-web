
import { useState, useEffect } from 'react';
import { Post } from '@/types';

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'TechCorp Announces Major Infrastructure Expansion',
    content: 'We are excited to announce our largest infrastructure expansion to date, including the opening of three new data centers across North America. This expansion will enhance our service capabilities and provide better coverage for our growing client base.',
    type: 'press_release',
    isPublic: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    authorId: '1'
  },
  {
    id: '2',
    title: 'Security Update: Enhanced Protection Measures',
    content: 'In our ongoing commitment to security, we have implemented additional protection measures across all our systems. These updates include advanced threat detection, improved encryption protocols, and enhanced monitoring capabilities.',
    type: 'announcement',
    isPublic: true,
    createdAt: '2024-01-10T14:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
    authorId: '1'
  },
  {
    id: '3',
    title: 'Company Sustainability Report 2024',
    content: 'Our annual sustainability report showcases our commitment to environmental responsibility. We have achieved carbon neutrality across all operations and invested in renewable energy sources for our data centers.',
    type: 'company_info',
    isPublic: true,
    createdAt: '2024-01-05T09:15:00Z',
    updatedAt: '2024-01-05T09:15:00Z',
    authorId: '1'
  },
  {
    id: '4',
    title: 'Internal System Maintenance',
    content: 'Scheduled maintenance for internal systems. This is a private post for internal use only.',
    type: 'announcement',
    isPublic: false,
    createdAt: '2024-01-08T16:00:00Z',
    updatedAt: '2024-01-08T16:00:00Z',
    authorId: '1'
  }
];

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 500);
  }, []);

  const getPublicPosts = () => {
    return posts.filter(post => post.isPublic);
  };

  const getAllPosts = () => {
    return posts;
  };

  const addPost = (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updatePost = (id: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === id 
        ? { ...post, ...updates, updatedAt: new Date().toISOString() }
        : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  return {
    posts,
    loading,
    getPublicPosts,
    getAllPosts,
    addPost,
    updatePost,
    deletePost
  };
};

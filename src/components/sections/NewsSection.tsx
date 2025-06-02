
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Post } from '@/types';

interface NewsSectionProps {
  publicPosts: Post[];
  onArticleClick: (article: Post) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ publicPosts, onArticleClick }) => {
  if (publicPosts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Latest News & Updates
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay informed with our latest announcements, press releases, and company news
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publicPosts.map((post) => (
            <Card 
              key={post.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer dark:bg-gray-800 dark:border-gray-700"
              onClick={() => onArticleClick(post)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">
                    {post.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 dark:text-white">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.content.length > 150 
                    ? `${post.content.substring(0, 150)}...` 
                    : post.content
                  }
                </p>
                <div className="mt-4">
                  <span className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Read more →
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';
import { Calendar, FileText, Megaphone, Building } from 'lucide-react';

interface PublicPostCardProps {
  post: Post;
}

const PublicPostCard: React.FC<PublicPostCardProps> = ({ post }) => {
  const getIcon = () => {
    switch (post.type) {
      case 'press_release':
        return <FileText className="h-5 w-5" />;
      case 'announcement':
        return <Megaphone className="h-5 w-5" />;
      case 'company_info':
        return <Building className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (post.type) {
      case 'press_release':
        return 'bg-blue-100 text-blue-800';
      case 'announcement':
        return 'bg-green-100 text-green-800';
      case 'company_info':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <Badge className={getTypeColor()}>
              {post.type.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-1" />
            {formatDate(post.createdAt)}
          </div>
        </div>
        <CardTitle className="text-xl">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed">
          {post.content.length > 200 
            ? `${post.content.substring(0, 200)}...` 
            : post.content
          }
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default PublicPostCard;

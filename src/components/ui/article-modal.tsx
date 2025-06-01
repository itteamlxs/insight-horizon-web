
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Post } from '@/types';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Post | null;
}

const ArticleModal = ({ isOpen, onClose, article }: ArticleModalProps) => {
  if (!isOpen || !article) return null;

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'press_release':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'announcement':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'company_info':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="flex flex-row items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTypeColor(article.type)}>
                {article.type.replace('_', ' ').toUpperCase()}
              </Badge>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="text-2xl dark:text-white">{article.title}</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap dark:text-gray-300">
              {article.content}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArticleModal;

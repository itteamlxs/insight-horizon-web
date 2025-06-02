
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, X } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';

const ContentTab: React.FC = () => {
  const { getAllPosts, addPost, updatePost, deletePost } = usePosts();
  
  const [newPost, setNewPost] = React.useState({
    title: '',
    content: '',
    type: 'announcement' as Post['type'],
    isPublic: false
  });

  const [editingPost, setEditingPost] = React.useState<Post | null>(null);

  const handleCreatePost = () => {
    if (newPost.title && newPost.content) {
      addPost({
        ...newPost,
        authorId: '1' // Default admin author ID
      });
      setNewPost({
        title: '',
        content: '',
        type: 'announcement',
        isPublic: false
      });
    }
  };

  const handleEditPost = (post: Post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = () => {
    if (editingPost) {
      updatePost(editingPost.id, editingPost);
      setEditingPost(null);
    }
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      deletePost(id);
    }
  };

  const posts = getAllPosts();

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Content Management</CardTitle>
          <CardDescription className="dark:text-gray-300">Create and manage posts, announcements, and press releases</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Create New Post */}
          <Card className="mb-6 dark:bg-gray-700 dark:border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Create New Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title" className="dark:text-white">Title</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div>
                <Label htmlFor="content" className="dark:text-white">Content</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  rows={4}
                  className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className="dark:text-white">Type</Label>
                  <select
                    id="type"
                    value={newPost.type}
                    onChange={(e) => setNewPost(prev => ({ ...prev, type: e.target.value as Post['type'] }))}
                    className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  >
                    <option value="announcement">Announcement</option>
                    <option value="press_release">Press Release</option>
                    <option value="company_info">Company Info</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    id="isPublic"
                    checked={newPost.isPublic}
                    onCheckedChange={(checked) => setNewPost(prev => ({ ...prev, isPublic: checked }))}
                  />
                  <Label htmlFor="isPublic" className="dark:text-white">Make Public</Label>
                </div>
              </div>
              <Button onClick={handleCreatePost} className="w-full">
                Create Post
              </Button>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="dark:bg-gray-700 dark:border-gray-600">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold dark:text-white">{post.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary">
                          {post.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        {post.isPublic && <Badge variant="outline">Public</Badge>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => handleEditPost(post)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeletePost(post.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Created: {new Date(post.createdAt).toLocaleString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Edit Post Modal */}
          {editingPost && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="dark:text-white">Edit Post</CardTitle>
                    <Button size="sm" variant="ghost" onClick={() => setEditingPost(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="dark:text-white">Title</Label>
                    <Input
                      value={editingPost.title}
                      onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Content</Label>
                    <Textarea
                      value={editingPost.content}
                      onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                      rows={6}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="dark:text-white">Type</Label>
                      <select
                        value={editingPost.type}
                        onChange={(e) => setEditingPost({ ...editingPost, type: e.target.value as Post['type'] })}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="announcement">Announcement</option>
                        <option value="press_release">Press Release</option>
                        <option value="company_info">Company Info</option>
                      </select>
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <Switch
                        checked={editingPost.isPublic}
                        onCheckedChange={(checked) => setEditingPost({ ...editingPost, isPublic: checked })}
                      />
                      <Label className="dark:text-white">Make Public</Label>
                    </div>
                  </div>
                  <Button onClick={handleUpdatePost} className="w-full">
                    Update Post
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentTab;

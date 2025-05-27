import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { usePosts } from '@/hooks/usePosts';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, FileText, Settings, Eye, EyeOff, Upload, Image } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Post } from '@/types';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getAllPosts, addPost, updatePost, deletePost } = usePosts();
  
  const [isCreating, setIsCreating] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    localStorage.getItem('companyLogo') || null
  );
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    type: 'announcement' as Post['type'],
    isPublic: true,
    authorId: '1'
  });

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const allPosts = getAllPosts();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoPreview(result);
        localStorage.setItem('companyLogo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveLogo = () => {
    if (logoPreview) {
      toast({
        title: "Success",
        description: "Logo updated successfully",
      });
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    localStorage.removeItem('companyLogo');
    toast({
      title: "Success",
      description: "Logo removed successfully",
    });
  };

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    addPost(newPost);
    setNewPost({
      title: '',
      content: '',
      type: 'announcement',
      isPublic: true,
      authorId: '1'
    });
    setIsCreating(false);
    
    toast({
      title: "Success",
      description: "Post created successfully",
    });
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;
    
    updatePost(editingPost.id, editingPost);
    setEditingPost(null);
    
    toast({
      title: "Success",
      description: "Post updated successfully",
    });
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
    toast({
      title: "Success",
      description: "Post deleted successfully",
    });
  };

  const togglePostVisibility = (post: Post) => {
    updatePost(post.id, { isPublic: !post.isPublic });
    toast({
      title: "Success",
      description: `Post ${post.isPublic ? 'hidden from' : 'made visible to'} public`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your content and company settings</p>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content Management
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            {/* Create New Post */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Content Management</CardTitle>
                    <CardDescription>Create and manage posts, press releases, and announcements</CardDescription>
                  </div>
                  <Button onClick={() => setIsCreating(!isCreating)}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              
              {isCreating && (
                <CardContent className="border-t">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        placeholder="Enter post title"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={newPost.content}
                        onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                        placeholder="Enter post content"
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type">Type</Label>
                        <Select value={newPost.type} onValueChange={(value: Post['type']) => setNewPost({ ...newPost, type: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="announcement">Announcement</SelectItem>
                            <SelectItem value="press_release">Press Release</SelectItem>
                            <SelectItem value="company_info">Company Info</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="public"
                          checked={newPost.isPublic}
                          onCheckedChange={(checked) => setNewPost({ ...newPost, isPublic: checked })}
                        />
                        <Label htmlFor="public">Make Public</Label>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={handleCreatePost}>Create Post</Button>
                      <Button variant="outline" onClick={() => setIsCreating(false)}>Cancel</Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Posts List */}
            <div className="space-y-4">
              {allPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    {editingPost?.id === post.id ? (
                      <div className="space-y-4">
                        <Input
                          value={editingPost.title}
                          onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                        />
                        <Textarea
                          value={editingPost.content}
                          onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                          rows={4}
                        />
                        <div className="flex gap-2">
                          <Button onClick={handleUpdatePost}>Save</Button>
                          <Button variant="outline" onClick={() => setEditingPost(null)}>Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <Badge variant={post.isPublic ? "default" : "secondary"}>
                              {post.type.replace('_', ' ').toUpperCase()}
                            </Badge>
                            {post.isPublic ? (
                              <Badge className="bg-green-100 text-green-800">Public</Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">Private</Badge>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePostVisibility(post)}
                            >
                              {post.isPublic ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingPost(post)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{post.content}</p>
                        <p className="text-sm text-gray-500">
                          Created: {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Logo</CardTitle>
                <CardDescription>Upload and manage your company logo</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col space-y-4">
                  {logoPreview && (
                    <div className="flex items-center space-x-4">
                      <img 
                        src={logoPreview} 
                        alt="Company Logo" 
                        className="h-16 w-auto max-w-32 object-contain border rounded"
                      />
                      <Button 
                        variant="outline" 
                        onClick={handleRemoveLogo}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Logo
                      </Button>
                    </div>
                  )}
                  <div>
                    <Label htmlFor="logo">Upload Logo</Label>
                    <div className="flex items-center space-x-2 mt-2">
                      <Input
                        id="logo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <Button onClick={handleSaveLogo} disabled={!logoPreview}>
                        <Upload className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Recommended size: 200x80px. Max file size: 5MB. Supported formats: JPG, PNG, SVG
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
                <CardDescription>Manage company information and configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" defaultValue="TechCorp Solutions" />
                </div>
                <div>
                  <Label htmlFor="companyDescription">Description</Label>
                  <Textarea 
                    id="companyDescription" 
                    defaultValue="Leading technology and infrastructure solutions provider"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" defaultValue="contact@techcorp.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

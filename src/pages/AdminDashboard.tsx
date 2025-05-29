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
import { Plus, Edit, Trash2, FileText, Settings, Eye, EyeOff, Upload, Image, DollarSign, ImageIcon, Download, Users } from 'lucide-react';
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

  // Company Settings State
  const [companySettings, setCompanySettings] = useState({
    companyName: 'TechCorp Solutions',
    description: 'Leading technology and infrastructure solutions provider',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    address: ''
  });

  // User Management State
  const [adminUsers, setAdminUsers] = useState([
    {
      id: '1',
      email: 'admin@techcorp.com',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    }
  ]);
  const [newAdminUser, setNewAdminUser] = useState({
    email: '',
    password: ''
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);

  // Pricing Plans State
  const [pricingPlans, setPricingPlans] = useState([
    {
      id: '1',
      name: 'Starter',
      price: 99,
      description: 'Perfect for small businesses',
      features: ['5 GB Storage', '24/7 Support', 'Basic Security', 'Email Integration'],
      highlighted: false
    },
    {
      id: '2',
      name: 'Professional',
      price: 299,
      description: 'Ideal for growing companies',
      features: ['50 GB Storage', 'Priority Support', 'Advanced Security', 'API Access', 'Custom Integrations'],
      highlighted: true
    },
    {
      id: '3',
      name: 'Enterprise',
      price: 699,
      description: 'For large organizations',
      features: ['Unlimited Storage', 'Dedicated Support', 'Enterprise Security', 'Full API Access', 'Custom Development', 'SLA Guarantee'],
      highlighted: false
    }
  ]);

  // Gallery Items State
  const [galleryItems, setGalleryItems] = useState([
    {
      id: '1',
      title: 'Data Center Infrastructure',
      description: 'State-of-the-art server facilities',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      category: 'Infrastructure'
    }
  ]);

  // Transparency Documents State - organized by category
  const [transparencyDocs, setTransparencyDocs] = useState({});
  const [newTransparencyDoc, setNewTransparencyDoc] = useState({
    title: '',
    description: '',
    fileName: '',
    fileUrl: '',
    publishDate: new Date().toISOString().split('T')[0],
    category: ''
  });

  const transparencyCategories = [
    { id: 'security', name: 'Security Practices' },
    { id: 'financial', name: 'Financial Reports' },
    { id: 'governance', name: 'Governance' },
    { id: 'environmental', name: 'Environmental Impact' },
    { id: 'privacy', name: 'Data Privacy' },
    { id: 'ethics', name: 'Ethics & Compliance' }
  ];

  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<any>(null);

  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
    // Load company settings from localStorage
    const savedSettings = localStorage.getItem('companySettings');
    if (savedSettings) {
      setCompanySettings(JSON.parse(savedSettings));
    }
    
    // Load admin users from localStorage
    const savedUsers = localStorage.getItem('adminUsers');
    if (savedUsers) {
      setAdminUsers(JSON.parse(savedUsers));
    }
    
    // Load pricing plans from localStorage
    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }
    
    // Load gallery items from localStorage
    const savedGallery = localStorage.getItem('galleryItems');
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    }

    // Load transparency documents from localStorage
    const savedDocs = localStorage.getItem('transparencyDocs');
    if (savedDocs) {
      setTransparencyDocs(JSON.parse(savedDocs));
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

  // Pricing Plan Handlers
  const handleUpdatePlan = (plan: any) => {
    const updatedPlans = pricingPlans.map(p => p.id === plan.id ? plan : p);
    setPricingPlans(updatedPlans);
    localStorage.setItem('pricingPlans', JSON.stringify(updatedPlans));
    setEditingPlan(null);
    toast({
      title: "Success",
      description: "Pricing plan updated successfully",
    });
  };

  // Gallery Item Handlers
  const handleAddGalleryItem = (item: any) => {
    const newItem = { ...item, id: Date.now().toString() };
    const updatedItems = [...galleryItems, newItem];
    setGalleryItems(updatedItems);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    toast({
      title: "Success",
      description: "Gallery item added successfully",
    });
  };

  const handleUpdateGalleryItem = (item: any) => {
    const updatedItems = galleryItems.map(i => i.id === item.id ? item : i);
    setGalleryItems(updatedItems);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    setEditingGalleryItem(null);
    toast({
      title: "Success",
      description: "Gallery item updated successfully",
    });
  };

  const handleDeleteGalleryItem = (id: string) => {
    const updatedItems = galleryItems.filter(i => i.id !== id);
    setGalleryItems(updatedItems);
    localStorage.setItem('galleryItems', JSON.stringify(updatedItems));
    toast({
      title: "Success",
      description: "Gallery item deleted successfully",
    });
  };

  // Transparency Document Handlers
  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for PDFs
        toast({
          title: "File too large",
          description: "Please select a file smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      if (file.type !== 'application/pdf') {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setNewTransparencyDoc({
          ...newTransparencyDoc,
          fileName: file.name,
          fileUrl: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTransparencyDoc = () => {
    if (!newTransparencyDoc.title.trim() || !newTransparencyDoc.description.trim() || !newTransparencyDoc.fileUrl || !newTransparencyDoc.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields, select a category, and upload a PDF",
        variant: "destructive",
      });
      return;
    }

    const newDoc = {
      ...newTransparencyDoc,
      id: Date.now().toString()
    };

    const updatedDocs = { ...transparencyDocs };
    if (!updatedDocs[newTransparencyDoc.category]) {
      updatedDocs[newTransparencyDoc.category] = [];
    }
    updatedDocs[newTransparencyDoc.category].push(newDoc);

    setTransparencyDocs(updatedDocs);
    localStorage.setItem('transparencyDocs', JSON.stringify(updatedDocs));

    setNewTransparencyDoc({
      title: '',
      description: '',
      fileName: '',
      fileUrl: '',
      publishDate: new Date().toISOString().split('T')[0],
      category: ''
    });

    toast({
      title: "Success",
      description: "Transparency document added successfully",
    });
  };

  const handleDeleteTransparencyDoc = (categoryId: string, docId: string) => {
    const updatedDocs = { ...transparencyDocs };
    updatedDocs[categoryId] = updatedDocs[categoryId].filter((doc: any) => doc.id !== docId);
    
    if (updatedDocs[categoryId].length === 0) {
      delete updatedDocs[categoryId];
    }
    
    setTransparencyDocs(updatedDocs);
    localStorage.setItem('transparencyDocs', JSON.stringify(updatedDocs));
    toast({
      title: "Success",
      description: "Document deleted successfully",
    });
  };

  const downloadDocument = (doc: any) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    link.click();
  };

  // Company Settings Handlers
  const handleSaveSettings = () => {
    localStorage.setItem('companySettings', JSON.stringify(companySettings));
    toast({
      title: "Success",
      description: "Company settings saved successfully",
    });
  };

  // User Management Handlers
  const handleCreateAdminUser = () => {
    if (!newAdminUser.email.trim() || !newAdminUser.password.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (adminUsers.some(u => u.email === newAdminUser.email)) {
      toast({
        title: "Validation Error",
        description: "An admin user with this email already exists",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email: newAdminUser.email,
      createdAt: new Date().toISOString(),
      lastLogin: null
    };

    const updatedUsers = [...adminUsers, newUser];
    setAdminUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    setNewAdminUser({ email: '', password: '' });
    setIsCreatingUser(false);

    toast({
      title: "Success",
      description: "Admin user created successfully",
    });
  };

  const handleDeleteAdminUser = (userId: string) => {
    if (userId === '1') {
      toast({
        title: "Error",
        description: "Cannot delete the primary admin user",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = adminUsers.filter(u => u.id !== userId);
    setAdminUsers(updatedUsers);
    localStorage.setItem('adminUsers', JSON.stringify(updatedUsers));

    toast({
      title: "Success",
      description: "Admin user deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage your content and company settings</p>
        </div>

        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="transparency" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Transparency
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
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

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Plans</CardTitle>
                <CardDescription>Manage your pricing plans and features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pricingPlans.map((plan) => (
                    <Card key={plan.id}>
                      <CardContent className="p-4">
                        {editingPlan?.id === plan.id ? (
                          <div className="space-y-4">
                            <Input
                              value={editingPlan.name}
                              onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                              placeholder="Plan name"
                            />
                            <Input
                              type="number"
                              value={editingPlan.price}
                              onChange={(e) => setEditingPlan({ ...editingPlan, price: parseInt(e.target.value) })}
                              placeholder="Price"
                            />
                            <Input
                              value={editingPlan.description}
                              onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                              placeholder="Description"
                            />
                            <div className="flex gap-2">
                              <Button onClick={() => handleUpdatePlan(editingPlan)}>Save</Button>
                              <Button variant="outline" onClick={() => setEditingPlan(null)}>Cancel</Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{plan.name}</h3>
                              <p className="text-gray-600">${plan.price}/month - {plan.description}</p>
                            </div>
                            <Button
                              variant="outline"
                              onClick={() => setEditingPlan(plan)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gallery Management</CardTitle>
                <CardDescription>Manage your project gallery and portfolio items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h3 className="text-lg font-semibold">{item.title}</h3>
                              <p className="text-gray-600">{item.description}</p>
                              <Badge variant="secondary">{item.category}</Badge>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingGalleryItem(item)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteGalleryItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transparency" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Transparency Documents</CardTitle>
                <CardDescription>Upload and manage transparency reports, policies, and compliance documents by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Upload New Document */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Upload New Document</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="docTitle">Document Title</Label>
                        <Input
                          id="docTitle"
                          value={newTransparencyDoc.title}
                          onChange={(e) => setNewTransparencyDoc({ ...newTransparencyDoc, title: e.target.value })}
                          placeholder="e.g., Q1 2024 Financial Report"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Select value={newTransparencyDoc.category} onValueChange={(value) => setNewTransparencyDoc({ ...newTransparencyDoc, category: value })}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {transparencyCategories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="publishDate">Publish Date</Label>
                      <Input
                        id="publishDate"
                        type="date"
                        value={newTransparencyDoc.publishDate}
                        onChange={(e) => setNewTransparencyDoc({ ...newTransparencyDoc, publishDate: e.target.value })}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="docDescription">Description</Label>
                      <Textarea
                        id="docDescription"
                        value={newTransparencyDoc.description}
                        onChange={(e) => setNewTransparencyDoc({ ...newTransparencyDoc, description: e.target.value })}
                        placeholder="Brief description of the document content"
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="pdfFile">PDF Document</Label>
                      <Input
                        id="pdfFile"
                        type="file"
                        accept=".pdf"
                        onChange={handleDocumentUpload}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        Upload PDF files only. Max file size: 10MB
                      </p>
                      {newTransparencyDoc.fileName && (
                        <p className="text-sm text-green-600 mt-1">
                          Selected: {newTransparencyDoc.fileName}
                        </p>
                      )}
                    </div>
                    
                    <Button onClick={handleAddTransparencyDoc} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Document
                    </Button>
                  </CardContent>
                </Card>

                {/* Documents List by Category */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Published Documents by Category</h3>
                  {transparencyCategories.map((category) => {
                    const categoryDocs = transparencyDocs[category.id] || [];
                    
                    return (
                      <Card key={category.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{category.name}</CardTitle>
                          <CardDescription>
                            {categoryDocs.length} document{categoryDocs.length !== 1 ? 's' : ''} published
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          {categoryDocs.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">
                              No documents uploaded for this category yet.
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {categoryDocs.map((doc: any) => (
                                <div key={doc.id} className="flex items-start justify-between p-4 border rounded-lg">
                                  <div className="flex items-start space-x-3">
                                    <FileText className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                                    <div>
                                      <h4 className="font-semibold text-gray-900 dark:text-white">
                                        {doc.title}
                                      </h4>
                                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-1">
                                        {doc.description}
                                      </p>
                                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                                        <span>Published: {new Date(doc.publishDate).toLocaleDateString()}</span>
                                        <span>File: {doc.fileName}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => downloadDocument(doc)}
                                    >
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteTransparencyDoc(category.id, doc.id)}
                                      className="text-red-600 hover:text-red-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage admin users who can access the dashboard</CardDescription>
                  </div>
                  <Button onClick={() => setIsCreatingUser(!isCreatingUser)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Admin User
                  </Button>
                </div>
              </CardHeader>
              
              {isCreatingUser && (
                <CardContent className="border-t">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="userEmail">Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        value={newAdminUser.email}
                        onChange={(e) => setNewAdminUser({ ...newAdminUser, email: e.target.value })}
                        placeholder="Enter admin email"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="userPassword">Password</Label>
                      <Input
                        id="userPassword"
                        type="password"
                        value={newAdminUser.password}
                        onChange={(e) => setNewAdminUser({ ...newAdminUser, password: e.target.value })}
                        placeholder="Enter password"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button onClick={handleCreateAdminUser}>Create User</Button>
                      <Button variant="outline" onClick={() => setIsCreatingUser(false)}>Cancel</Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Admin Users List */}
            <div className="space-y-4">
              {adminUsers.map((adminUser) => (
                <Card key={adminUser.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{adminUser.email}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Created: {new Date(adminUser.createdAt).toLocaleDateString()}</span>
                          {adminUser.lastLogin && (
                            <span>Last Login: {new Date(adminUser.lastLogin).toLocaleDateString()}</span>
                          )}
                        </div>
                        <Badge variant="secondary">Admin</Badge>
                      </div>
                      <div className="flex gap-2">
                        {adminUser.id !== '1' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteAdminUser(adminUser.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
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
                  <Input 
                    id="companyName" 
                    value={companySettings.companyName}
                    onChange={(e) => setCompanySettings({ ...companySettings, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="companyDescription">Description</Label>
                  <Textarea 
                    id="companyDescription" 
                    value={companySettings.description}
                    onChange={(e) => setCompanySettings({ ...companySettings, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Contact Email</Label>
                    <Input 
                      id="email" 
                      value={companySettings.email}
                      onChange={(e) => setCompanySettings({ ...companySettings, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={companySettings.phone}
                      onChange={(e) => setCompanySettings({ ...companySettings, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={companySettings.address}
                    onChange={(e) => setCompanySettings({ ...companySettings, address: e.target.value })}
                    placeholder="Company address"
                  />
                </div>
                <Button onClick={handleSaveSettings}>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

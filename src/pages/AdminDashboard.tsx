import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trash2, Edit, Plus, Upload, X, Settings, DollarSign, Image, FileText, Building } from 'lucide-react';
import { usePosts } from '@/hooks/usePosts';
import { Post } from '@/types';

const AdminDashboard = () => {
  const { getAllPosts, addPost, updatePost, deletePost } = usePosts();
  
  // Company Settings
  const [companySettings, setCompanySettings] = React.useState({
    companyName: 'TechCorp Solutions',
    description: 'Leading technology and infrastructure solutions provider'
  });

  // Video Background Settings
  const [videoSettings, setVideoSettings] = React.useState({
    videoUrl: '',
    enabled: false
  });

  // Pricing Plans with editable features
  const [pricingPlans, setPricingPlans] = React.useState([
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

  // Gallery Items with image upload support
  const [galleryItems, setGalleryItems] = React.useState([
    {
      id: '1',
      title: 'Data Center Infrastructure',
      description: 'State-of-the-art server facilities',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      category: 'Infrastructure'
    }
  ]);

  // Form states
  const [newPost, setNewPost] = React.useState({
    title: '',
    content: '',
    type: 'announcement' as Post['type'],
    isPublic: false
  });

  const [editingPost, setEditingPost] = React.useState<Post | null>(null);
  const [editingPlan, setEditingPlan] = React.useState<any>(null);
  const [editingGallery, setEditingGallery] = React.useState<any>(null);
  const [newGalleryItem, setNewGalleryItem] = React.useState({
    title: '',
    description: '',
    imageUrl: '',
    category: ''
  });

  // Load data from localStorage
  React.useEffect(() => {
    const savedCompanySettings = localStorage.getItem('companySettings');
    if (savedCompanySettings) {
      setCompanySettings(JSON.parse(savedCompanySettings));
    }

    const savedVideoUrl = localStorage.getItem('videoBackground');
    const savedVideoEnabled = localStorage.getItem('videoBackgroundEnabled') === 'true';
    setVideoSettings({
      videoUrl: savedVideoUrl || '',
      enabled: savedVideoEnabled
    });

    const savedPlans = localStorage.getItem('pricingPlans');
    if (savedPlans) {
      setPricingPlans(JSON.parse(savedPlans));
    }

    const savedGallery = localStorage.getItem('galleryItems');
    if (savedGallery) {
      setGalleryItems(JSON.parse(savedGallery));
    }
  }, []);

  // Image upload handler
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'gallery' | 'editing') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (type === 'gallery') {
          setNewGalleryItem(prev => ({ ...prev, imageUrl }));
        } else if (editingGallery) {
          setEditingGallery(prev => ({ ...prev, imageUrl }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save functions
  const saveCompanySettings = () => {
    localStorage.setItem('companySettings', JSON.stringify(companySettings));
    alert('Company settings saved successfully!');
  };

  const saveVideoSettings = () => {
    localStorage.setItem('videoBackground', videoSettings.videoUrl);
    localStorage.setItem('videoBackgroundEnabled', videoSettings.enabled.toString());
    alert('Video background settings saved successfully!');
  };

  const savePricingPlans = () => {
    localStorage.setItem('pricingPlans', JSON.stringify(pricingPlans));
    alert('Pricing plans saved successfully!');
  };

  const saveGalleryItems = () => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    alert('Gallery items saved successfully!');
  };

  // Plan management functions
  const handleEditPlan = (plan: any) => {
    setEditingPlan({ ...plan });
  };

  const handleSavePlan = () => {
    if (editingPlan) {
      setPricingPlans(prev => 
        prev.map(plan => 
          plan.id === editingPlan.id ? editingPlan : plan
        )
      );
      setEditingPlan(null);
      savePricingPlans();
    }
  };

  const handlePlanFeatureChange = (index: number, value: string) => {
    if (editingPlan) {
      const newFeatures = [...editingPlan.features];
      newFeatures[index] = value;
      setEditingPlan({ ...editingPlan, features: newFeatures });
    }
  };

  const addPlanFeature = () => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: [...editingPlan.features, '']
      });
    }
  };

  const removePlanFeature = (index: number) => {
    if (editingPlan) {
      setEditingPlan({
        ...editingPlan,
        features: editingPlan.features.filter((_, i) => i !== index)
      });
    }
  };

  // Gallery management functions
  const handleCreateGalleryItem = () => {
    if (newGalleryItem.title && newGalleryItem.description && newGalleryItem.imageUrl) {
      const item = {
        ...newGalleryItem,
        id: Date.now().toString()
      };
      setGalleryItems(prev => [...prev, item]);
      setNewGalleryItem({ title: '', description: '', imageUrl: '', category: '' });
      saveGalleryItems();
    }
  };

  const handleEditGalleryItem = (item: any) => {
    setEditingGallery({ ...item });
  };

  const handleSaveGalleryItem = () => {
    if (editingGallery) {
      setGalleryItems(prev => 
        prev.map(item => 
          item.id === editingGallery.id ? editingGallery : item
        )
      );
      setEditingGallery(null);
      saveGalleryItems();
    }
  };

  const handleDeleteGalleryItem = (id: string) => {
    if (confirm('Are you sure you want to delete this gallery item?')) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
      saveGalleryItems();
    }
  };

  // Post management functions
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
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
        
        <Tabs defaultValue="company" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Company Settings Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Company Information</CardTitle>
                <CardDescription className="dark:text-gray-300">Update your company details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName" className="dark:text-white">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companySettings.companyName}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, companyName: e.target.value }))}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="dark:text-white">Description</Label>
                  <Textarea
                    id="description"
                    value={companySettings.description}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, description: e.target.value }))}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button onClick={saveCompanySettings} className="w-full">
                  Save Company Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pricing Plans Tab */}
          <TabsContent value="pricing" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Pricing Plans Management</CardTitle>
                <CardDescription className="dark:text-gray-300">Edit pricing plans and their features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {pricingPlans.map((plan) => (
                    <Card key={plan.id} className="dark:bg-gray-700 dark:border-gray-600">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg dark:text-white">{plan.name}</CardTitle>
                          <Button size="sm" onClick={() => handleEditPlan(plan)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                        <CardDescription className="dark:text-gray-300">${plan.price}/month</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-2 dark:text-gray-300">{plan.description}</p>
                        <div className="space-y-1">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="text-xs text-gray-600 dark:text-gray-400">
                              • {feature}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Plan Modal */}
                {editingPlan && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="dark:text-white">Edit Plan: {editingPlan.name}</CardTitle>
                          <Button size="sm" variant="ghost" onClick={() => setEditingPlan(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="dark:text-white">Plan Name</Label>
                          <Input
                            value={editingPlan.name}
                            onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Price</Label>
                          <Input
                            type="number"
                            value={editingPlan.price}
                            onChange={(e) => setEditingPlan({...editingPlan, price: parseInt(e.target.value)})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Description</Label>
                          <Input
                            value={editingPlan.description}
                            onChange={(e) => setEditingPlan({...editingPlan, description: e.target.value})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <Label className="dark:text-white">Features</Label>
                            <Button size="sm" onClick={addPlanFeature}>
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            {editingPlan.features.map((feature: string, index: number) => (
                              <div key={index} className="flex gap-2">
                                <Input
                                  value={feature}
                                  onChange={(e) => handlePlanFeatureChange(index, e.target.value)}
                                  className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => removePlanFeature(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={editingPlan.highlighted}
                            onCheckedChange={(checked) => setEditingPlan({...editingPlan, highlighted: checked})}
                          />
                          <Label className="dark:text-white">Mark as Popular</Label>
                        </div>
                        <Button onClick={handleSavePlan} className="w-full">
                          Save Plan
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Gallery Management</CardTitle>
                <CardDescription className="dark:text-gray-300">Upload and manage gallery images</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Add New Gallery Item */}
                <Card className="mb-6 dark:bg-gray-700 dark:border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white">Add New Gallery Item</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="dark:text-white">Title</Label>
                        <Input
                          value={newGalleryItem.title}
                          onChange={(e) => setNewGalleryItem(prev => ({...prev, title: e.target.value}))}
                          className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                      </div>
                      <div>
                        <Label className="dark:text-white">Category</Label>
                        <Input
                          value={newGalleryItem.category}
                          onChange={(e) => setNewGalleryItem(prev => ({...prev, category: e.target.value}))}
                          className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="dark:text-white">Description</Label>
                      <Textarea
                        value={newGalleryItem.description}
                        onChange={(e) => setNewGalleryItem(prev => ({...prev, description: e.target.value}))}
                        className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                      />
                    </div>
                    <div>
                      <Label className="dark:text-white">Upload Image</Label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'gallery')}
                          className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                        />
                        {newGalleryItem.imageUrl && (
                          <img src={newGalleryItem.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
                        )}
                      </div>
                    </div>
                    <Button onClick={handleCreateGalleryItem} className="w-full">
                      <Upload className="h-4 w-4 mr-2" />
                      Add Gallery Item
                    </Button>
                  </CardContent>
                </Card>

                {/* Gallery Items List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id} className="dark:bg-gray-700 dark:border-gray-600">
                      <CardContent className="p-4">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                        <h3 className="font-semibold text-sm dark:text-white">{item.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{item.description}</p>
                        <Badge variant="secondary" className="text-xs mb-2">{item.category}</Badge>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleEditGalleryItem(item)}>
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteGalleryItem(item.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Edit Gallery Item Modal */}
                {editingGallery && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="dark:text-white">Edit Gallery Item</CardTitle>
                          <Button size="sm" variant="ghost" onClick={() => setEditingGallery(null)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label className="dark:text-white">Title</Label>
                          <Input
                            value={editingGallery.title}
                            onChange={(e) => setEditingGallery({...editingGallery, title: e.target.value})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Category</Label>
                          <Input
                            value={editingGallery.category}
                            onChange={(e) => setEditingGallery({...editingGallery, category: e.target.value})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Description</Label>
                          <Textarea
                            value={editingGallery.description}
                            onChange={(e) => setEditingGallery({...editingGallery, description: e.target.value})}
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          />
                        </div>
                        <div>
                          <Label className="dark:text-white">Upload New Image (optional)</Label>
                          <div className="flex items-center gap-4">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'editing')}
                              className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                            {editingGallery.imageUrl && (
                              <img src={editingGallery.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded" />
                            )}
                          </div>
                        </div>
                        <Button onClick={handleSaveGalleryItem} className="w-full">
                          Save Changes
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
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
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Video Background Settings</CardTitle>
                <CardDescription className="dark:text-gray-300">Configure hero section video background (supports YouTube URLs)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="videoEnabled"
                    checked={videoSettings.enabled}
                    onCheckedChange={(enabled) => setVideoSettings(prev => ({ ...prev, enabled }))}
                  />
                  <Label htmlFor="videoEnabled" className="dark:text-white">Enable Video Background</Label>
                </div>
                <div>
                  <Label htmlFor="videoUrl" className="dark:text-white">Video URL (YouTube or direct link)</Label>
                  <Input
                    id="videoUrl"
                    value={videoSettings.videoUrl}
                    onChange={(e) => setVideoSettings(prev => ({ ...prev, videoUrl: e.target.value }))}
                    placeholder="https://www.youtube.com/watch?v=... or direct video URL"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button onClick={saveVideoSettings} className="w-full">
                  Save Video Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

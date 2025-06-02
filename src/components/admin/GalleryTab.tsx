
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Upload, X } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
}

interface GalleryTabProps {
  galleryItems: GalleryItem[];
  setGalleryItems: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
}

const GalleryTab: React.FC<GalleryTabProps> = ({
  galleryItems,
  setGalleryItems
}) => {
  const [editingGallery, setEditingGallery] = React.useState<GalleryItem | null>(null);
  const [newGalleryItem, setNewGalleryItem] = React.useState({
    title: '',
    description: '',
    imageUrl: '',
    category: ''
  });

  const saveGalleryItems = () => {
    localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    alert('Gallery items saved successfully!');
  };

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

  const handleEditGalleryItem = (item: GalleryItem) => {
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

  return (
    <div className="space-y-6">
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
    </div>
  );
};

export default GalleryTab;

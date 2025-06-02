
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Download, Trash2, X } from 'lucide-react';

interface TransparencyDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  publishDate: string;
  category: string;
}

const TransparencyTab: React.FC = () => {
  const [transparencyDocs, setTransparencyDocs] = React.useState<Record<string, TransparencyDocument[]>>({});
  const [newDocument, setNewDocument] = React.useState({
    title: '',
    description: '',
    category: 'security',
    fileName: '',
    fileUrl: ''
  });
  const [editingDocument, setEditingDocument] = React.useState<TransparencyDocument | null>(null);

  const categories = [
    { id: 'security', name: 'Security Practices' },
    { id: 'financial', name: 'Financial Reports' },
    { id: 'governance', name: 'Governance' },
    { id: 'environmental', name: 'Environmental Impact' },
    { id: 'privacy', name: 'Data Privacy' },
    { id: 'ethics', name: 'Ethics & Compliance' }
  ];

  React.useEffect(() => {
    const savedDocs = localStorage.getItem('transparencyDocs');
    if (savedDocs) {
      setTransparencyDocs(JSON.parse(savedDocs));
    }
  }, []);

  const saveTransparencyDocs = (docs: Record<string, TransparencyDocument[]>) => {
    localStorage.setItem('transparencyDocs', JSON.stringify(docs));
    setTransparencyDocs(docs);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'new' | 'edit') => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileUrl = e.target?.result as string;
        if (type === 'new') {
          setNewDocument(prev => ({ 
            ...prev, 
            fileName: file.name, 
            fileUrl 
          }));
        } else if (editingDocument) {
          setEditingDocument(prev => ({
            ...prev!,
            fileName: file.name,
            fileUrl
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreateDocument = () => {
    if (newDocument.title && newDocument.description && newDocument.fileUrl) {
      const document: TransparencyDocument = {
        ...newDocument,
        id: Date.now().toString(),
        publishDate: new Date().toISOString()
      };
      
      const updatedDocs = {
        ...transparencyDocs,
        [newDocument.category]: [
          ...(transparencyDocs[newDocument.category] || []),
          document
        ]
      };
      
      saveTransparencyDocs(updatedDocs);
      setNewDocument({
        title: '',
        description: '',
        category: 'security',
        fileName: '',
        fileUrl: ''
      });
      alert('Document uploaded successfully!');
    }
  };

  const handleEditDocument = (doc: TransparencyDocument) => {
    setEditingDocument({ ...doc });
  };

  const handleSaveDocument = () => {
    if (editingDocument) {
      const updatedDocs = { ...transparencyDocs };
      const categoryDocs = updatedDocs[editingDocument.category] || [];
      const docIndex = categoryDocs.findIndex(doc => doc.id === editingDocument.id);
      
      if (docIndex !== -1) {
        categoryDocs[docIndex] = editingDocument;
        saveTransparencyDocs(updatedDocs);
        setEditingDocument(null);
        alert('Document updated successfully!');
      }
    }
  };

  const handleDeleteDocument = (category: string, docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      const updatedDocs = { ...transparencyDocs };
      updatedDocs[category] = updatedDocs[category]?.filter(doc => doc.id !== docId) || [];
      saveTransparencyDocs(updatedDocs);
      alert('Document deleted successfully!');
    }
  };

  const downloadDocument = (doc: TransparencyDocument) => {
    const link = document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.fileName;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Transparency Documents</CardTitle>
          <CardDescription className="dark:text-gray-300">
            Upload and manage transparency documents for each category
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Upload New Document */}
          <Card className="mb-6 dark:bg-gray-700 dark:border-gray-600">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">Upload New Document</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="dark:text-white">Document Title</Label>
                  <Input
                    value={newDocument.title}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, title: e.target.value }))}
                    className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                </div>
                <div>
                  <Label className="dark:text-white">Category</Label>
                  <select
                    value={newDocument.category}
                    onChange={(e) => setNewDocument(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <Label className="dark:text-white">Description</Label>
                <Textarea
                  value={newDocument.description}
                  onChange={(e) => setNewDocument(prev => ({ ...prev, description: e.target.value }))}
                  className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                />
              </div>
              <div>
                <Label className="dark:text-white">Upload Document</Label>
                <div className="flex items-center gap-4">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={(e) => handleFileUpload(e, 'new')}
                    className="dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                  />
                  {newDocument.fileName && (
                    <Badge variant="outline">{newDocument.fileName}</Badge>
                  )}
                </div>
              </div>
              <Button onClick={handleCreateDocument} className="w-full">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>

          {/* Documents by Category */}
          <div className="space-y-4">
            {categories.map(category => {
              const categoryDocs = transparencyDocs[category.id] || [];
              return (
                <Card key={category.id} className="dark:bg-gray-700 dark:border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      {category.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {categoryDocs.length > 0 ? (
                      <div className="space-y-2">
                        {categoryDocs.map(doc => (
                          <div key={doc.id} className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-3 rounded">
                            <div>
                              <h4 className="font-medium dark:text-white">{doc.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{doc.description}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                Published: {new Date(doc.publishDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => downloadDocument(doc)}>
                                <Download className="h-3 w-3" />
                              </Button>
                              <Button size="sm" onClick={() => handleEditDocument(doc)}>
                                <FileText className="h-3 w-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDeleteDocument(category.id, doc.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        No documents uploaded for this category yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Edit Document Modal */}
          {editingDocument && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="dark:text-white">Edit Document</CardTitle>
                    <Button size="sm" variant="ghost" onClick={() => setEditingDocument(null)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="dark:text-white">Title</Label>
                    <Input
                      value={editingDocument.title}
                      onChange={(e) => setEditingDocument({...editingDocument, title: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Description</Label>
                    <Textarea
                      value={editingDocument.description}
                      onChange={(e) => setEditingDocument({...editingDocument, description: e.target.value})}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <Label className="dark:text-white">Replace Document (optional)</Label>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={(e) => handleFileUpload(e, 'edit')}
                        className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                      {editingDocument.fileName && (
                        <Badge variant="outline">{editingDocument.fileName}</Badge>
                      )}
                    </div>
                  </div>
                  <Button onClick={handleSaveDocument} className="w-full">
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

export default TransparencyTab;

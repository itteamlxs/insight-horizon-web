
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings, DollarSign, Image, FileText, Shield, Users } from 'lucide-react';
import GeneralSettingsTab from '@/components/admin/GeneralSettingsTab';
import PricingTab from '@/components/admin/PricingTab';
import GalleryTab from '@/components/admin/GalleryTab';
import ContentTab from '@/components/admin/ContentTab';
import TransparencyTab from '@/components/admin/TransparencyTab';
import AdminUsersTab from '@/components/admin/AdminUsersTab';

const AdminDashboard = () => {
  // Company Settings with logo
  const [companySettings, setCompanySettings] = React.useState({
    companyName: 'TechCorp Solutions',
    description: 'Leading technology and infrastructure solutions provider',
    logoUrl: ''
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

  const saveAllGeneralSettings = () => {
    localStorage.setItem('companySettings', JSON.stringify(companySettings));
    localStorage.setItem('videoBackground', videoSettings.videoUrl);
    localStorage.setItem('videoBackgroundEnabled', videoSettings.enabled.toString());
    alert('All settings saved successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 dark:text-white">Admin Dashboard</h1>
        
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Admin Users
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
            <TabsTrigger value="transparency" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Transparency
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettingsTab
              companySettings={companySettings}
              setCompanySettings={setCompanySettings}
              videoSettings={videoSettings}
              setVideoSettings={setVideoSettings}
              onSaveAll={saveAllGeneralSettings}
            />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersTab />
          </TabsContent>

          <TabsContent value="pricing">
            <PricingTab
              pricingPlans={pricingPlans}
              setPricingPlans={setPricingPlans}
            />
          </TabsContent>

          <TabsContent value="gallery">
            <GalleryTab
              galleryItems={galleryItems}
              setGalleryItems={setGalleryItems}
            />
          </TabsContent>

          <TabsContent value="content">
            <ContentTab />
          </TabsContent>

          <TabsContent value="transparency">
            <TransparencyTab />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;

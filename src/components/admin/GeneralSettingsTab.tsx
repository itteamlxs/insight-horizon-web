
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface CompanySettings {
  companyName: string;
  description: string;
  logoUrl: string;
}

interface VideoSettings {
  videoUrl: string;
  enabled: boolean;
}

interface GeneralSettingsTabProps {
  companySettings: CompanySettings;
  setCompanySettings: React.Dispatch<React.SetStateAction<CompanySettings>>;
  videoSettings: VideoSettings;
  setVideoSettings: React.Dispatch<React.SetStateAction<VideoSettings>>;
  onSaveAll: () => void;
}

const GeneralSettingsTab: React.FC<GeneralSettingsTabProps> = ({
  companySettings,
  setCompanySettings,
  videoSettings,
  setVideoSettings,
  onSaveAll
}) => {
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const logoUrl = e.target?.result as string;
        setCompanySettings(prev => ({ ...prev, logoUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Company Information</CardTitle>
          <CardDescription className="dark:text-gray-300">Update your company details and logo</CardDescription>
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
          <div>
            <Label htmlFor="logo" className="dark:text-white">Company Logo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {companySettings.logoUrl && (
                <div className="flex items-center gap-2">
                  <img 
                    src={companySettings.logoUrl} 
                    alt="Company Logo" 
                    className="w-16 h-16 object-contain rounded border"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCompanySettings(prev => ({ ...prev, logoUrl: '' }))}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Upload a logo that will be displayed in the navigation bar
            </p>
          </div>
        </CardContent>
      </Card>

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
        </CardContent>
      </Card>

      <Button onClick={onSaveAll} className="w-full">
        Save All Settings
      </Button>
    </div>
  );
};

export default GeneralSettingsTab;

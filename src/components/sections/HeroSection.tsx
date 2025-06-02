
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  videoBackground: {
    videoUrl: string;
    enabled: boolean;
  };
  companySettings: {
    companyName: string;
    description: string;
  };
  onGetStarted: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  videoBackground,
  companySettings,
  onGetStarted
}) => {
  // Helper function to convert YouTube URLs to embed format
  const getYouTubeEmbedUrl = (url: string) => {
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=${match[1]}`;
    }
    return url; // Return original URL if not YouTube
  };

  return (
    <section className="relative h-[720px] bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      {/* Video Background */}
      {videoBackground.enabled && videoBackground.videoUrl && (
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-[1920px] h-[720px] relative">
            <iframe
              src={getYouTubeEmbedUrl(videoBackground.videoUrl)}
              className="w-full h-full object-cover"
              allow="autoplay; fullscreen"
              style={{ 
                filter: 'brightness(0.7)'
              }}
            />
          </div>
        </div>
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20 h-full flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your Business with 
            <span className="text-blue-200"> {companySettings.companyName}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {companySettings.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              onClick={onGetStarted}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3 dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-blue-600"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

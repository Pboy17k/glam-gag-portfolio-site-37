
import { useEffect, useState } from 'react';
import HeroSection from '@/components/home/HeroSection';
import GalleryShowcase from '@/components/home/GalleryShowcase';
import AboutSection from '@/components/home/AboutSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';
import { supabase } from '@/integrations/supabase/client';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure all data is loaded before showing sections
    const loadData = async () => {
      try {
        // Load gallery items for the showcase
        await supabase.from('gallery_items').select('*').limit(5);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <GalleryShowcase />
      <AboutSection />
      <ServicesPreview />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
};

export default Home;

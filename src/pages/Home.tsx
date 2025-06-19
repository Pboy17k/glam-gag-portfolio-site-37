
import { Suspense, lazy } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ContactSection from '@/components/home/ContactSection';
import FAQSection from '@/components/FAQSection';

// Lazy load the gallery component
const GalleryShowcase = lazy(() => import('@/components/home/GalleryShowcase'));

// Enhanced loading component with skeleton
const SectionLoader = () => (
  <div className="py-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <GalleryShowcase />
      </Suspense>
      
      <ContactSection />
      
      <FAQSection />
    </div>
  );
};

export default Home;

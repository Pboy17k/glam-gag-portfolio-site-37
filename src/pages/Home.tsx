
import { Suspense, lazy } from 'react';
import HeroSection from '@/components/home/HeroSection';

// Lazy load heavy components
const GalleryShowcase = lazy(() => import('@/components/home/GalleryShowcase'));
const AboutSection = lazy(() => import('@/components/home/AboutSection'));
const ServicesPreview = lazy(() => import('@/components/home/ServicesPreview'));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));

// Lightweight loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-background">
      <HeroSection />
      
      <Suspense fallback={<SectionLoader />}>
        <GalleryShowcase />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <ServicesPreview />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <TestimonialsSection />
      </Suspense>
      
      <Suspense fallback={<SectionLoader />}>
        <CTASection />
      </Suspense>
    </div>
  );
};

export default Home;


import HeroSection from '@/components/home/HeroSection';
import GalleryShowcase from '@/components/home/GalleryShowcase';
import AboutSection from '@/components/home/AboutSection';
import ServicesPreview from '@/components/home/ServicesPreview';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CTASection from '@/components/home/CTASection';

const Home = () => {
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

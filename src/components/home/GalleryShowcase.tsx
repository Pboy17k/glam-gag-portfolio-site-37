
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

const GalleryShowcase = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Default fallback images
  const defaultImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80'
  ];

  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        // Try to load from Supabase with timeout
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        );
        
        const supabasePromise = supabase
          .from('gallery_items')
          .select('src')
          .eq('type', 'image')
          .limit(6);

        const { data: galleryItems } = await Promise.race([supabasePromise, timeoutPromise]) as any;

        if (galleryItems && galleryItems.length > 0) {
          const validImages = galleryItems
            .map((item: any) => item.src)
            .filter((src: string) => {
              try {
                new URL(src);
                return true;
              } catch {
                return src.startsWith('blob:') || src.startsWith('data:');
              }
            });
          
          if (validImages.length > 0) {
            setGalleryImages(validImages);
          } else {
            setGalleryImages(defaultImages);
          }
        } else {
          setGalleryImages(defaultImages);
        }
      } catch (error) {
        console.warn('Using default images due to loading issue:', error);
        setGalleryImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };

    loadGalleryImages();
  }, []);

  useEffect(() => {
    if (galleryImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleImageError = () => {
    console.warn('Image load error, switching to next slide');
    if (galleryImages.length > 1) {
      nextSlide();
    }
  };

  if (isLoading) {
    return (
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Recent Transformations</h2>
            <p className="text-xl text-muted-foreground font-light">Showcasing our latest beauty creations ✨</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Recent Transformations</h2>
          <p className="text-xl text-muted-foreground font-light">Showcasing our latest beauty creations ✨</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {galleryImages.length > 0 && (
              <img
                src={galleryImages[currentSlide]}
                alt="Makeup transformation"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                loading="lazy"
                onError={handleImageError}
              />
            )}
            
            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-primary p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-primary p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {galleryImages.length > 1 && (
            <div className="flex justify-center mt-8 space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125 shadow-lg' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;


import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

  // Load gallery images from admin system
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      try {
        const parsedItems: GalleryItem[] = JSON.parse(savedItems);
        // Filter for images only and extract their src URLs
        const imageUrls = parsedItems
          .filter(item => item.type === 'image')
          .map(item => item.src);
        
        if (imageUrls.length > 0) {
          setGalleryImages(imageUrls);
        } else {
          // Fallback to placeholder images if no admin images available
          setGalleryImages([
            'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
            'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
            'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80'
          ]);
        }
      } catch (error) {
        console.error('Error loading gallery items:', error);
        // Fallback to placeholder images on error
        setGalleryImages([
          'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
          'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
          'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
          'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80'
        ]);
      }
    } else {
      // Set default placeholder images if no localStorage data
      setGalleryImages([
        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
        'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
        'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80'
      ]);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <section className="py-24 powder-bg bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Recent Transformations</h2>
          <p className="text-xl text-muted-foreground font-light">Showcasing our latest beauty creations ✨</p>
        </div>

        <div className="relative max-w-5xl mx-auto reveal-on-scroll">
          <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            {galleryImages.length > 0 && (
              <img
                src={galleryImages[currentSlide]}
                alt="Makeup transformation"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                onError={(e) => {
                  console.error('Image load error for:', galleryImages[currentSlide]);
                  // Remove broken image from array if needed
                }}
              />
            )}
            
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
          </div>

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
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;

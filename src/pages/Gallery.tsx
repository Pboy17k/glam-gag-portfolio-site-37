
import { useState } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  // Placeholder gallery images - in a real app, these would come from the admin/CMS
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
      category: 'bridal',
      alt: 'Bridal makeup transformation'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      category: 'casual',
      alt: 'Casual glam makeup'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      category: 'natural',
      alt: 'Natural makeup look'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
      category: 'bridal',
      alt: 'Elegant bridal makeup'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',
      category: 'casual',
      alt: 'Event makeup look'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80',
      category: 'natural',
      alt: 'Fresh natural makeup'
    },
    // Duplicate for more content
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
      category: 'bridal',
      alt: 'Wedding day makeup'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      category: 'casual',
      alt: 'Party makeup look'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
      category: 'natural',
      alt: 'Everyday makeup'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'casual', label: 'Casual Glam' },
    { id: 'natural', label: 'Natural Look' }
  ];

  const filteredImages = activeFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of makeup transformations and see the artistry behind each look
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="relative group cursor-pointer gallery-hover overflow-hidden rounded-lg"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium capitalize">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No images found for this category.</p>
          </div>
        )}

        {/* Image Modal */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            {selectedImage && (
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Gallery image"
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blush-50 to-wine-50 dark:from-blush-900/20 dark:to-wine-900/20 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Love What You See?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Book your makeup session and let's create something beautiful together
            </p>
            <Button asChild size="lg">
              <a href="/booking">Book Your Session</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Gallery;

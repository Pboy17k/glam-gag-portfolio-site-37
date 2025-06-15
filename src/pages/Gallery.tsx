
import { useState, useEffect } from 'react';
import { X, Filter, Video, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

const Gallery = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  // Load gallery items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        setGalleryItems(parsedItems);
      } catch (error) {
        console.error('Error loading gallery items:', error);
        // Fallback to default placeholder images if localStorage is empty or corrupted
        setGalleryItems([
          {
            id: 1,
            src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
            category: 'bridal',
            alt: 'Bridal makeup transformation',
            type: 'image'
          },
          {
            id: 2,
            src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
            category: 'casual',
            alt: 'Casual glam makeup',
            type: 'image'
          },
          {
            id: 3,
            src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
            category: 'natural',
            alt: 'Natural makeup look',
            type: 'image'
          }
        ]);
      }
    } else {
      // Set default placeholder content if no localStorage data
      setGalleryItems([
        {
          id: 1,
          src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
          category: 'bridal',
          alt: 'Bridal makeup transformation',
          type: 'image'
        },
        {
          id: 2,
          src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
          category: 'casual',
          alt: 'Casual glam makeup',
          type: 'image'
        },
        {
          id: 3,
          src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
          category: 'natural',
          alt: 'Natural makeup look',
          type: 'image'
        }
      ]);
    }
  }, []);

  const filters = [
    { id: 'all', label: 'All Work' },
    { id: 'bridal', label: 'Bridal' },
    { id: 'casual', label: 'Casual Glam' },
    { id: 'natural', label: 'Natural Look' },
    { id: 'evening', label: 'Evening' },
    { id: 'training', label: 'Training' }
  ];

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  const imageItems = filteredItems.filter(item => item.type === 'image');
  const videoItems = filteredItems.filter(item => item.type === 'video');

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of makeup transformations and training content
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              {imageItems.length} Images
            </span>
            <span className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              {videoItems.length} Videos
            </span>
          </div>
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
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group cursor-pointer gallery-hover overflow-hidden rounded-lg"
              onClick={() => setSelectedItem(item)}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  muted
                  preload="metadata"
                />
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
              
              {/* Media type indicator */}
              <div className="absolute top-2 right-2">
                <div className="bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                  {item.type === 'video' ? <Video className="h-3 w-3" /> : <Image className="h-3 w-3" />}
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-sm font-medium capitalize">{item.category}</p>
                  <p className="text-xs opacity-90">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No content found for this category.</p>
          </div>
        )}

        {/* Media Modal */}
        <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] p-0">
            {selectedItem && (
              <div className="relative">
                {selectedItem.type === 'video' ? (
                  <video
                    src={selectedItem.src}
                    className="w-full h-auto max-h-[85vh] object-contain"
                    controls
                    autoPlay
                  />
                ) : (
                  <img
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    className="w-full h-auto max-h-[85vh] object-contain"
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setSelectedItem(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-md">
                  <p className="text-sm font-medium">{selectedItem.alt}</p>
                  <p className="text-xs opacity-90 capitalize">{selectedItem.category} • {selectedItem.type}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-card p-12 rounded-2xl border border-border">
            <h2 className="text-3xl font-bold mb-4 text-card-foreground">Love What You See?</h2>
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

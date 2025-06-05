
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryImage {
  id: number;
  src: string;
  category: string;
  alt: string;
}

interface AdminGalleryUploadProps {
  images: GalleryImage[];
  onImagesUpdate: (images: GalleryImage[]) => void;
}

const AdminGalleryUpload = ({ images, onImagesUpdate }: AdminGalleryUploadProps) => {
  const [newImage, setNewImage] = useState({ src: '', category: 'bridal', alt: '' });
  const { toast } = useToast();

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem('galleryImages');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        onImagesUpdate(parsedImages);
      } catch (error) {
        console.error('Error loading images from localStorage:', error);
      }
    }
  }, [onImagesUpdate]);

  // Save images to localStorage whenever images change
  useEffect(() => {
    localStorage.setItem('galleryImages', JSON.stringify(images));
  }, [images]);

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newImage.src || !newImage.alt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newImageData: GalleryImage = {
      id: Date.now(),
      src: newImage.src,
      category: newImage.category,
      alt: newImage.alt
    };

    const updatedImages = [...images, newImageData];
    onImagesUpdate(updatedImages);
    
    setNewImage({ src: '', category: 'bridal', alt: '' });
    
    toast({
      title: "Success",
      description: "Image added to gallery successfully!",
    });
  };

  const handleDeleteImage = (imageId: number) => {
    const updatedImages = images.filter(img => img.id !== imageId);
    onImagesUpdate(updatedImages);
    
    toast({
      title: "Deleted",
      description: "Image removed from gallery",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setNewImage(prev => ({ ...prev, src: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add New Image Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddImage} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageFile">Upload Image File</Label>
                <Input
                  id="imageFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
              <div>
                <Label htmlFor="imageUrl">Or Enter Image URL</Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newImage.src}
                  onChange={(e) => setNewImage(prev => ({ ...prev, src: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newImage.category} 
                  onValueChange={(value) => setNewImage(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bridal">Bridal</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="natural">Natural</SelectItem>
                    <SelectItem value="evening">Evening</SelectItem>
                    <SelectItem value="training">Training</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="alt">Image Description *</Label>
                <Input
                  id="alt"
                  type="text"
                  placeholder="Describe the image..."
                  value={newImage.alt}
                  onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                  required
                />
              </div>
            </div>

            {newImage.src && (
              <div>
                <Label>Preview</Label>
                <img 
                  src={newImage.src} 
                  alt="Preview" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}

            <Button type="submit" className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Add Image
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gallery Management */}
      <Card>
        <CardHeader>
          <CardTitle>Gallery Images ({images.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No images in gallery yet. Add some images above!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteImage(image.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">{image.alt}</p>
                    <p className="text-xs text-muted-foreground capitalize">{image.category}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGalleryUpload;

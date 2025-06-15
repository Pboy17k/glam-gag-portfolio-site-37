import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Upload, Plus, Video, Image } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

interface AdminGalleryUploadProps {
  images: GalleryItem[];
  onImagesUpdate: (images: GalleryItem[]) => void;
}

const AdminGalleryUpload = ({ images, onImagesUpdate }: AdminGalleryUploadProps) => {
  const [newItem, setNewItem] = useState({ src: '', category: 'bridal', alt: '', type: 'image' as 'image' | 'video' });
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Load items from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('galleryItems');
    if (savedItems) {
      try {
        const parsedItems = JSON.parse(savedItems);
        onImagesUpdate(parsedItems);
      } catch (error) {
        console.error('Error loading items from localStorage:', error);
      }
    }
  }, [onImagesUpdate]);

  // Save items to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('galleryItems', JSON.stringify(images));
  }, [images]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.src || !newItem.alt) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const newItemData: GalleryItem = {
        id: Date.now(),
        src: newItem.src,
        category: newItem.category,
        alt: newItem.alt,
        type: newItem.type
      };

      const updatedItems = [...images, newItemData];
      onImagesUpdate(updatedItems);
      
      setNewItem({ src: '', category: 'bridal', alt: '', type: 'image' });
      
      toast({
        title: "Success",
        description: `${newItem.type === 'video' ? 'Video' : 'Image'} added to gallery successfully!`,
      });
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item to gallery",
        variant: "destructive",
      });
    }
  };

  const handleDeleteItem = (itemId: number) => {
    try {
      const updatedItems = images.filter(item => item.id !== itemId);
      onImagesUpdate(updatedItems);
      
      toast({
        title: "Deleted",
        description: "Item removed from gallery",
      });
    } catch (error) {
      console.error('Error deleting item:', error);
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log('File selected:', file.name, file.type, file.size);

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    
    if (!isVideo && !isImage) {
      toast({
        title: "Error",
        description: "Please select an image or video file",
        variant: "destructive",
      });
      return;
    }

    // Stricter file size limits - 10MB for videos, 5MB for images
    const maxVideoSize = 10 * 1024 * 1024; // 10MB
    const maxImageSize = 5 * 1024 * 1024; // 5MB
    const maxSize = isVideo ? maxVideoSize : maxImageSize;
    
    if (file.size > maxSize) {
      toast({
        title: "Error",
        description: `File size too large. Please select a ${isVideo ? 'video' : 'image'} under ${isVideo ? '10MB' : '5MB'}.`,
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create object URL instead of data URL for better performance
      const objectUrl = URL.createObjectURL(file);
      
      setNewItem(prev => ({ 
        ...prev, 
        src: objectUrl, 
        type: isVideo ? 'video' : 'image' 
      }));
      
      console.log('File processed successfully with object URL');
      
      toast({
        title: "File Ready",
        description: `${isVideo ? 'Video' : 'Image'} is ready to be added to gallery`,
      });
      
      setIsUploading(false);
    } catch (error) {
      console.error('Error processing file:', error);
      toast({
        title: "Error",
        description: "Failed to process the uploaded file",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const imageItems = images.filter(item => item.type === 'image');
  const videoItems = images.filter(item => item.type === 'video');

  return (
    <div className="space-y-6">
      {/* Add New Item Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddItem} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="mediaFile">Upload Media File</Label>
                <Input
                  id="mediaFile"
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                  disabled={isUploading}
                />
                {isUploading && (
                  <p className="text-sm text-muted-foreground mt-1">Processing...</p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: Images 5MB, Videos 10MB
                </p>
              </div>
              <div>
                <Label htmlFor="mediaUrl">Or Enter Media URL</Label>
                <Input
                  id="mediaUrl"
                  type="url"
                  placeholder="https://example.com/media.jpg"
                  value={newItem.src.startsWith('blob:') ? '' : newItem.src}
                  onChange={(e) => setNewItem(prev => ({ ...prev, src: e.target.value }))}
                  disabled={isUploading}
                />
              </div>
              <div>
                <Label htmlFor="mediaType">Media Type</Label>
                <Select 
                  value={newItem.type} 
                  onValueChange={(value: 'image' | 'video') => setNewItem(prev => ({ ...prev, type: value }))}
                  disabled={isUploading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={newItem.category} 
                  onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value }))}
                  disabled={isUploading}
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
                <Label htmlFor="alt">Description *</Label>
                <Input
                  id="alt"
                  type="text"
                  placeholder="Describe the content..."
                  value={newItem.alt}
                  onChange={(e) => setNewItem(prev => ({ ...prev, alt: e.target.value }))}
                  required
                  disabled={isUploading}
                />
              </div>
            </div>

            {newItem.src && (
              <div>
                <Label>Preview</Label>
                {newItem.type === 'video' ? (
                  <video 
                    src={newItem.src} 
                    className="w-32 h-32 object-cover rounded-lg border"
                    controls
                    preload="metadata"
                    onError={(e) => {
                      console.error('Video preview error:', e);
                      toast({
                        title: "Preview Error",
                        description: "Unable to preview video",
                        variant: "destructive",
                      });
                    }}
                  />
                ) : (
                  <img 
                    src={newItem.src} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border"
                    onError={(e) => {
                      console.error('Image preview error:', e);
                      toast({
                        title: "Preview Error",
                        description: "Unable to preview image",
                        variant: "destructive",
                      });
                    }}
                  />
                )}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isUploading}>
              <Upload className="mr-2 h-4 w-4" />
              {isUploading ? 'Processing...' : `Add ${newItem.type === 'video' ? 'Video' : 'Image'}`}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Gallery Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Gallery Content ({images.length} items)
            <span className="text-sm text-muted-foreground">
              - {imageItems.length} images, {videoItems.length} videos
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {images.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No content in gallery yet. Add some images or videos above!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((item) => (
                <div key={item.id} className="relative group">
                  {item.type === 'video' ? (
                    <video
                      src={item.src}
                      className="w-full h-48 object-cover rounded-lg"
                      controls
                      onError={(e) => {
                        console.error('Video display error:', e);
                      }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        console.error('Image display error:', e);
                      }}
                    />
                  )}
                  <div className="absolute top-2 left-2">
                    <div className="bg-black/70 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
                      {item.type === 'video' ? <Video className="h-3 w-3" /> : <Image className="h-3 w-3" />}
                      {item.type}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">{item.alt}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.category}</p>
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

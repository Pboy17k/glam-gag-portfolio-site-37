
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { uploadFileToStorage } from '@/utils/storageUtils';
import MediaPreview from './MediaPreview';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

interface MediaUploadFormProps {
  onAddItem: (item: Omit<GalleryItem, 'id'>) => void;
}

const MediaUploadForm = ({ onAddItem }: MediaUploadFormProps) => {
  const [newItem, setNewItem] = useState({ src: '', category: 'bridal', alt: '', type: 'image' as 'image' | 'video' });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.src || !newItem.alt.trim()) {
      toast({
        title: "Error",
        description: "Please provide both a media file/URL and description",
        variant: "destructive",
      });
      return;
    }

    try {
      onAddItem({
        src: newItem.src,
        category: newItem.category,
        alt: newItem.alt.trim(),
        type: newItem.type
      });
      
      // Reset form after successful submission
      setNewItem({ src: '', category: 'bridal', alt: '', type: 'image' });
      setUploadProgress(0);
      
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item to gallery",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setUploadProgress(10);

    try {
      // Upload to Supabase Storage
      setUploadProgress(50);
      const storageUrl = await uploadFileToStorage(file, 'gallery');
      setUploadProgress(90);
      
      setNewItem(prev => ({ 
        ...prev, 
        src: storageUrl, 
        type: isVideo ? 'video' : 'image' 
      }));
      
      setUploadProgress(100);
      console.log('File uploaded successfully with storage URL:', storageUrl);
      
      toast({
        title: "Upload Successful",
        description: `${isVideo ? 'Video' : 'Image'} uploaded and ready to add to gallery`,
      });
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
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
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Uploading... {uploadProgress}%</p>
                </div>
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
                value={newItem.src.includes('supabase.co') ? '' : newItem.src}
                onChange={(e) => setNewItem(prev => ({ ...prev, src: e.target.value }))}
                disabled={isUploading}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {newItem.src.includes('supabase.co') ? 'File uploaded to storage' : 'Enter URL or upload file above'}
              </p>
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
            <MediaPreview src={newItem.src} type={newItem.type} />
          )}

          <Button type="submit" className="w-full" disabled={isUploading}>
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? `Uploading... ${uploadProgress}%` : `Add ${newItem.type === 'video' ? 'Video' : 'Image'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MediaUploadForm;

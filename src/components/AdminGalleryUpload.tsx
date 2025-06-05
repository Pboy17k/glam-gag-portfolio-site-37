
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, X, Image as ImageIcon, Trash2, Check } from 'lucide-react';
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
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadSettings, setUploadSettings] = useState({
    category: '',
    altPrefix: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    if (!uploadSettings.category || selectedFiles.length === 0) {
      toast({
        title: "Upload Error",
        description: "Please select category and at least one image",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    try {
      const newImages: GalleryImage[] = selectedFiles.map((file, index) => ({
        id: Date.now() + index,
        src: URL.createObjectURL(file),
        category: uploadSettings.category,
        alt: uploadSettings.altPrefix ? 
          `${uploadSettings.altPrefix} ${index + 1}` : 
          `${uploadSettings.category} makeup ${index + 1}`
      }));

      onImagesUpdate([...images, ...newImages]);
      setSelectedFiles([]);
      setUploadSettings({ category: '', altPrefix: '' });
      
      toast({
        title: "Upload Successful",
        description: `${newImages.length} image(s) uploaded successfully`,
      });
    } catch (error) {
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your images",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = (imageId: number) => {
    onImagesUpdate(images.filter(img => img.id !== imageId));
    toast({
      title: "Image Deleted",
      description: "Image removed from gallery",
    });
  };

  return (
    <div className="space-y-6">
      {/* Bulk Upload Section */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Upload className="h-5 w-5" />
            Bulk Image Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Upload Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-foreground">Category</Label>
              <Select onValueChange={(value) => setUploadSettings(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="bg-background border-border text-foreground">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="bridal">Bridal</SelectItem>
                  <SelectItem value="casual">Casual Glam</SelectItem>
                  <SelectItem value="natural">Natural Look</SelectItem>
                  <SelectItem value="evening">Evening Glam</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="altPrefix" className="text-foreground">Alt Text Prefix (Optional)</Label>
              <Input
                id="altPrefix"
                placeholder="e.g., Wedding makeup"
                value={uploadSettings.altPrefix}
                onChange={(e) => setUploadSettings(prev => ({ ...prev, altPrefix: e.target.value }))}
                className="bg-background border-border text-foreground"
              />
            </div>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragOver 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50 bg-background'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Drag & Drop Images Here
            </h3>
            <p className="text-muted-foreground mb-4">
              Or click to select files (PNG, JPG, JPEG)
            </p>
            <Button type="button" variant="outline">
              Select Files
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Selected Files ({selectedFiles.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeSelectedFile(index)}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <div className="absolute bottom-1 left-1 bg-black/70 text-white px-2 py-1 rounded text-xs">
                      {file.name.split('.')[0].substring(0, 8)}...
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={uploadImages} 
                disabled={uploading || !uploadSettings.category}
                className="w-full"
              >
                {uploading ? 'Uploading...' : `Upload ${selectedFiles.length} Image(s)`}
                {!uploading && <Check className="h-4 w-4 ml-2" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Gallery */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Current Gallery ({images.length} images)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    onClick={() => deleteImage(image.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {image.category}
                </div>
              </div>
            ))}
          </div>
          {images.length === 0 && (
            <div className="text-center py-8">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No images in gallery. Upload some to get started!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminGalleryUpload;

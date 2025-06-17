
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface MediaPreviewProps {
  src: string;
  type: 'image' | 'video';
}

const MediaPreview = ({ src, type }: MediaPreviewProps) => {
  const { toast } = useToast();

  const handleError = (mediaType: string) => {
    console.error(`${mediaType} preview error for:`, src);
    toast({
      title: "Preview Error",
      description: `Unable to preview ${mediaType.toLowerCase()}. Please check the file or URL.`,
      variant: "destructive",
    });
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return url.startsWith('blob:') || url.startsWith('data:');
    }
  };

  if (!isValidUrl(src)) {
    return (
      <div>
        <Label>Preview</Label>
        <div className="w-32 h-32 bg-gray-100 rounded-lg border flex items-center justify-center">
          <span className="text-xs text-gray-500">Invalid URL</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Label>Preview</Label>
      {type === 'video' ? (
        <video 
          src={src} 
          className="w-32 h-32 object-cover rounded-lg border"
          controls
          preload="metadata"
          onError={() => handleError('Video')}
        />
      ) : (
        <img 
          src={src} 
          alt="Preview" 
          className="w-32 h-32 object-cover rounded-lg border"
          loading="lazy"
          onError={() => handleError('Image')}
        />
      )}
    </div>
  );
};

export default MediaPreview;

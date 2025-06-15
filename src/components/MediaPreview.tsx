
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface MediaPreviewProps {
  src: string;
  type: 'image' | 'video';
}

const MediaPreview = ({ src, type }: MediaPreviewProps) => {
  const { toast } = useToast();

  const handleError = (mediaType: string) => {
    console.error(`${mediaType} preview error`);
    toast({
      title: "Preview Error",
      description: `Unable to preview ${mediaType.toLowerCase()}`,
      variant: "destructive",
    });
  };

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
          onError={() => handleError('Image')}
        />
      )}
    </div>
  );
};

export default MediaPreview;

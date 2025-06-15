
import { Button } from '@/components/ui/button';
import { Trash2, Video, Image } from 'lucide-react';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

interface GalleryItemProps {
  item: GalleryItem;
  onDelete: (id: number) => void;
}

const GalleryItemComponent = ({ item, onDelete }: GalleryItemProps) => {
  const handleMediaError = (mediaType: string) => {
    console.error(`${mediaType} display error`);
  };

  return (
    <div className="relative group">
      {item.type === 'video' ? (
        <video
          src={item.src}
          className="w-full h-48 object-cover rounded-lg"
          controls
          onError={() => handleMediaError('Video')}
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          className="w-full h-48 object-cover rounded-lg"
          onError={() => handleMediaError('Image')}
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
          onClick={() => onDelete(item.id)}
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
  );
};

export default GalleryItemComponent;

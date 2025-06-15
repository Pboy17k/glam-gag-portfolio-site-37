
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import GalleryItemComponent from './GalleryItem';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

interface GalleryGridProps {
  items: GalleryItem[];
  onDeleteItem: (id: number) => void;
}

const GalleryGrid = ({ items, onDeleteItem }: GalleryGridProps) => {
  const imageItems = items.filter(item => item.type === 'image');
  const videoItems = items.filter(item => item.type === 'video');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Gallery Content ({items.length} items)
          <span className="text-sm text-muted-foreground">
            - {imageItems.length} images, {videoItems.length} videos
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No content in gallery yet. Add some images or videos above!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <GalleryItemComponent
                key={item.id}
                item={item}
                onDelete={onDeleteItem}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GalleryGrid;

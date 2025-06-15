
import AdminGalleryUpload from "@/components/AdminGalleryUpload";

interface GalleryPanelProps {
  images: { id: number; src: string; category: string; alt: string; type: 'image' | 'video' }[];
  onImagesUpdate: (galleryItems: any[]) => void;
}

const GalleryPanel = ({ images, onImagesUpdate }: GalleryPanelProps) => (
  <AdminGalleryUpload 
    images={images}
    onImagesUpdate={onImagesUpdate}
  />
);

export default GalleryPanel;

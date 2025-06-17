
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import MediaUploadForm from './MediaUploadForm';
import GalleryGrid from './GalleryGrid';

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
  const { toast } = useToast();

  const handleAddItem = (itemData: Omit<GalleryItem, 'id'>) => {
    const newItemData: GalleryItem = {
      id: Date.now(),
      ...itemData
    };

    const updatedItems = [...images, newItemData];
    onImagesUpdate(updatedItems);
    
    toast({
      title: "Added",
      description: `${itemData.type === 'video' ? 'Video' : 'Image'} added to gallery successfully!`,
    });
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

  return (
    <div className="space-y-6">
      <MediaUploadForm onAddItem={handleAddItem} />
      <GalleryGrid items={images} onDeleteItem={handleDeleteItem} />
    </div>
  );
};

export default AdminGalleryUpload;

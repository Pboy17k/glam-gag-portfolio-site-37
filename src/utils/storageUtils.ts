
import { supabase } from '@/integrations/supabase/client';

export const uploadFileToStorage = async (file: File, folder: string = 'gallery') => {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
    
    console.log('Uploading file to storage:', fileName);
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('gallery-media')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Storage upload error:', error);
      throw error;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('gallery-media')
      .getPublicUrl(fileName);

    console.log('File uploaded successfully:', urlData.publicUrl);
    return urlData.publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export const deleteFileFromStorage = async (url: string) => {
  try {
    // Extract filename from URL
    const urlParts = url.split('/');
    const fileName = urlParts[urlParts.length - 1];
    const folderName = urlParts[urlParts.length - 2];
    const filePath = `${folderName}/${fileName}`;
    
    const { error } = await supabase.storage
      .from('gallery-media')
      .remove([filePath]);

    if (error) {
      console.error('Storage delete error:', error);
      throw error;
    }
    
    console.log('File deleted successfully:', filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
    // Don't throw error for delete failures to avoid blocking UI
  }
};

export const isStorageUrl = (url: string): boolean => {
  return url.includes('supabase.co/storage/') || url.includes('gallery-media');
};

export const isBlobUrl = (url: string): boolean => {
  return url.startsWith('blob:');
};

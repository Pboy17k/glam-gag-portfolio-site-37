import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { migrateLocalStorageToSupabase } from "@/utils/migrateLocalStorageToSupabase";

const LOCAL_STORAGE_KEY = "bookings";

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

interface Service {
  id: number;
  name: string;
  price: number;
  category: string;
}

export const useAdminData = (isLoggedIn: boolean) => {
  const { toast } = useToast();
  
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [bookingAvailability, setBookingAvailability] = useState(true);
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Studio Bridal Glam', price: 100000, category: 'bridal' },
    { id: 2, name: 'Home Service Bridal', price: 130000, category: 'bridal' },
    { id: 3, name: 'Studio Casual Glam', price: 40000, category: 'casual' },
    { id: 4, name: 'Home Service Casual Glam', price: 40000, category: 'casual' }
  ]);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: 1, src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80', category: 'bridal', alt: 'Bridal makeup', type: 'image' },
    { id: 2, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', category: 'casual', alt: 'Casual glam', type: 'image' },
    { id: 3, src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', category: 'natural', alt: 'Natural look', type: 'image' }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const bookingsJSON = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (bookingsJSON) {
      try {
        setBookingRequests(JSON.parse(bookingsJSON));
      } catch {
        setBookingRequests([]);
      }
    }
  }, []);

  // Migration and Supabase loader
  useEffect(() => {
    const migrateAndLoadAll = async () => {
      const migratedKey = "hasSupabaseMigrated";
      const alreadyMigrated = localStorage.getItem(migratedKey);
      if (!alreadyMigrated) {
        await migrateLocalStorageToSupabase();
        localStorage.setItem(migratedKey, "true");
      }

      // Load bookings from Supabase
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select("data, id")
        .order("id", { ascending: true });
      setBookingRequests(
        bookingsData?.map((d: any) => ({
          ...d.data,
          id: d.id
        })) ?? []
      );

      // Load galleryItems from Supabase
      const { data: gallery } = await supabase
        .from("gallery_items")
        .select("*")
        .order("id", { ascending: true });
      setGalleryItems(
        (gallery ?? []).map((g: any) => ({
          ...g,
          type: g.type === "image" ? "image" : "video",
        }))
      );
    };
    
    if (isLoggedIn) {
      migrateAndLoadAll();
    }
  }, [isLoggedIn]);

  // Update booking status
  const handleStatusUpdate = (bookingId: number, newStatus: string) => {
    const updated = bookingRequests.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    handleBookingRequestsUpdateSupabase(updated);
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  // Unified updater to keep Supabase in sync for bookings
  const handleBookingRequestsUpdateSupabase = async (updated: any[]) => {
    setBookingRequests(updated);
    await supabase.from("bookings").delete().neq("id", 0);
    for (const booking of updated) {
      await supabase.from("bookings").insert({ data: booking });
    }
  };

  // Gallery updates
  const handleGalleryItemsUpdate = async (newGalleryList: GalleryItem[]) => {
    setGalleryItems(newGalleryList);
    await supabase.from("gallery_items").delete().neq("id", 0);
    for (const item of newGalleryList) {
      await supabase.from("gallery_items").upsert({
        id: item.id,
        src: item.src,
        category: item.category,
        alt: item.alt,
        type: item.type,
      });
    }
  };

  return {
    bookingRequests,
    bookingAvailability,
    services,
    galleryItems,
    handleStatusUpdate,
    handleGalleryItemsUpdate,
    setBookingAvailability,
    setServices
  };
};

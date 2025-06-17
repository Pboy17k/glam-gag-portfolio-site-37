import { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminGalleryUpload from '@/components/AdminGalleryUpload';
import AdminBookingStats from '@/components/AdminBookingStats';
import AdminBookingTable from '@/components/AdminBookingTable';
import AdminServicesManager from '@/components/AdminServicesManager';
import AdminSettings from '@/components/AdminSettings';
import AdminManagement from '@/components/AdminManagement';
import { Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import BookingsPanel from '@/components/admin/BookingsPanel';
import GalleryPanel from '@/components/admin/GalleryPanel';
import ServicesPanel from '@/components/admin/ServicesPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import AdminsPanel from '@/components/admin/AdminsPanel';
import AppImagesPanel from "@/components/admin/AppImagesPanel";

import { migrateLocalStorageToSupabase } from "@/utils/migrateLocalStorageToSupabase";
import { supabase } from "@/integrations/supabase/client";

const LOCAL_STORAGE_KEY = "bookings";
const ADMIN_ACCOUNTS_KEY = "admin_accounts";
const ADMIN_SESSION_KEY = "admin_session";

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

const Admin = () => {
  // Check admin session from localStorage
  const getSession = () => {
    try {
      const sess = localStorage.getItem(ADMIN_SESSION_KEY);
      if (sess) return JSON.parse(sess);
    } catch {}
    return null;
  };

  const [isLoggedIn, setIsLoggedIn] = useState(!!getSession());
  const [currentAdmin, setCurrentAdmin] = useState(getSession()?.username ?? null);
  const [adminAccounts, setAdminAccounts] = useState<{username: string; password: string;}[]>([]);
  const [bookingRequests, setBookingRequests] = useState<any[]>([]);
  const [bookingAvailability, setBookingAvailability] = useState(true);
  const { toast } = useToast();

  const [services, setServices] = useState([
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

  // Load admin accounts from Supabase on mount
  useEffect(() => {
    const loadAdminAccounts = async () => {
      try {
        const { data: supabaseAdmins } = await supabase
          .from('admin_accounts')
          .select('*');

        if (supabaseAdmins && supabaseAdmins.length > 0) {
          setAdminAccounts(supabaseAdmins);
        } else {
          // Create default admin if none exist
          const defaultAdmin = { username: "admin", password: "glamadmin2024" };
          await supabase
            .from('admin_accounts')
            .insert([defaultAdmin]);
          setAdminAccounts([defaultAdmin]);
        }
      } catch (error) {
        console.error('Error loading admin accounts from Supabase:', error);
        // Fallback to localStorage
        let admins = [];
        try {
          const json = localStorage.getItem(ADMIN_ACCOUNTS_KEY);
          if (json) admins = JSON.parse(json);
        } catch {}
        if (!Array.isArray(admins) || admins.length === 0) {
          admins = [{ username: "admin", password: "glamadmin2024" }];
          localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(admins));
        }
        setAdminAccounts(admins);
      }
    };

    if (isLoggedIn) {
      loadAdminAccounts();
    }
  }, [isLoggedIn]);

  // On mount: load from localStorage
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

  // Add new admin account (username must be unique) and save to Supabase
  const addAdminAccount = async (username: string, password: string) => {
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Error",
        description: "Username and password cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    if (adminAccounts.find(a => a.username === username)) {
      toast({
        title: "Error",
        description: "Username already exists",
        variant: "destructive",
      });
      return;
    }

    const newAdmin = { username, password };
    
    try {
      // Save to Supabase
      const { error } = await supabase
        .from('admin_accounts')
        .insert([newAdmin]);

      if (error) {
        console.error('Error saving admin to Supabase:', error);
        toast({
          title: "Error",
          description: "Failed to save admin account",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      const updated = [...adminAccounts, newAdmin];
      setAdminAccounts(updated);
      
      // Also update localStorage as backup
      localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(updated));
      
      toast({
        title: "Success",
        description: `Admin "${username}" created successfully`,
      });
    } catch (error) {
      console.error('Error adding admin account:', error);
      toast({
        title: "Error",
        description: "Failed to create admin account",
        variant: "destructive",
      });
    }
  };

  // Delete admin account (cannot delete last admin or yourself) and remove from Supabase
  const deleteAdminAccount = async (username: string) => {
    if (adminAccounts.length <= 1) {
      toast({
        title: "Error",
        description: "Cannot delete the last admin account",
        variant: "destructive",
      });
      return;
    }
    
    if (username === currentAdmin) {
      toast({
        title: "Error",
        description: "Cannot delete your own account while logged in",
        variant: "destructive",
      });
      return;
    }

    try {
      // Delete from Supabase
      const { error } = await supabase
        .from('admin_accounts')
        .delete()
        .eq('username', username);

      if (error) {
        console.error('Error deleting admin from Supabase:', error);
        toast({
          title: "Error",
          description: "Failed to delete admin account",
          variant: "destructive",
        });
        return;
      }

      // Update local state
      const updated = adminAccounts.filter(a => a.username !== username);
      setAdminAccounts(updated);
      
      // Also update localStorage as backup
      localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(updated));
      
      toast({
        title: "Success",
        description: `Admin "${username}" deleted successfully`,
      });
    } catch (error) {
      console.error('Error deleting admin account:', error);
      toast({
        title: "Error",
        description: "Failed to delete admin account",
        variant: "destructive",
      });
    }
  };

  // Update booking status and persist to Supabase
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

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  // --- MIGRATION & SUPABASE LOADER ---
  useEffect(() => {
    // 1. Run migration ONCE (remove items from localStorage after!)
    async function migrateAndLoadAll() {
      const migratedKey = "hasSupabaseMigrated";
      const alreadyMigrated = localStorage.getItem(migratedKey);
      if (!alreadyMigrated) {
        await migrateLocalStorageToSupabase();
        localStorage.setItem(migratedKey, "true");
      }

      // --- Load bookings from Supabase ---
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

      // --- Load galleryItems from Supabase ---
      const { data: gallery } = await supabase
        .from("gallery_items")
        .select("*")
        .order("id", { ascending: true });
      // Fix: enforce type!
      setGalleryItems(
        (gallery ?? []).map((g: any) => ({
          ...g,
          type: g.type === "image" ? "image" : "video",
        }))
      );
    }
    
    if (isLoggedIn) {
      migrateAndLoadAll();
    }
  }, [isLoggedIn]);

  // Unified updater to keep Supabase in sync for bookings
  const handleBookingRequestsUpdateSupabase = async (updated: any[]) => {
    setBookingRequests(updated);
    // Overwrite all bookings in supabase
    await supabase.from("bookings").delete().neq("id", 0); // delete all
    for (const booking of updated) {
      // Upsert without specifying id (Supabase type restrictions)
      await supabase.from("bookings").insert({ data: booking });
    }
  };

  // Gallery updates
  const handleGalleryItemsUpdate = async (newGalleryList: GalleryItem[]) => {
    setGalleryItems(newGalleryList);
    await supabase.from("gallery_items").delete().neq("id", 0);
    for (const item of newGalleryList) {
      // Supabase schema: id, src, category, alt, type
      await supabase.from("gallery_items").upsert({
        id: item.id,
        src: item.src,
        category: item.category,
        alt: item.alt,
        type: item.type,
      });
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => { setIsLoggedIn(true); setCurrentAdmin(getSession()?.username ?? null); }} />;
  }

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your Glow and Go business</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-card">
            <TabsTrigger value="bookings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bookings</TabsTrigger>
            <TabsTrigger value="gallery" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Services</TabsTrigger>
            <TabsTrigger value="settings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
            <TabsTrigger value="admins" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Manage Admins</TabsTrigger>
            <TabsTrigger value="app-images" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">App Images</TabsTrigger>
          </TabsList>
          {/* Enhanced Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <BookingsPanel 
              bookingRequests={bookingRequests}
              onStatusUpdate={handleStatusUpdate}
            />
          </TabsContent>
          <TabsContent value="gallery" className="space-y-6">
            <GalleryPanel 
              images={galleryItems}
              onImagesUpdate={handleGalleryItemsUpdate}
            />
          </TabsContent>
          <TabsContent value="services" className="space-y-6">
            <ServicesPanel 
              services={services}
              onServicesUpdate={setServices}
            />
          </TabsContent>
          <TabsContent value="settings" className="space-y-6">
            <SettingsPanel 
              bookingAvailability={bookingAvailability}
              onBookingAvailabilityChange={setBookingAvailability}
            />
          </TabsContent>
          {/* --- Manage Admins Tab --- */}
          <TabsContent value="admins" className="space-y-6">
            <AdminsPanel
              adminAccounts={adminAccounts}
              addAdminAccount={addAdminAccount}
              deleteAdminAccount={deleteAdminAccount}
              currentAdmin={currentAdmin}
            />
          </TabsContent>
          <TabsContent value="app-images" className="space-y-6">
            <AppImagesPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

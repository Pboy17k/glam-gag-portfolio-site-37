import { useState, useEffect } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminGalleryUpload from '@/components/AdminGalleryUpload';
import AdminBookingStats from '@/components/AdminBookingStats';
import AdminBookingTable from '@/components/AdminBookingTable';
import AdminServicesManager from '@/components/AdminServicesManager';
import AdminSettings from '@/components/AdminSettings';
import { Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

const LOCAL_STORAGE_KEY = "bookings";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Make state for bookings loaded from localStorage:
  const [bookingRequests, setBookingRequests] = useState<any[]>([]); // Type is fine for mock/demo, see below
  const [bookingAvailability, setBookingAvailability] = useState(true);
  const { toast } = useToast();

  // Mock data - in a real app, this would come from a database
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

  // Unified updater to always persist to localStorage and state
  const handleBookingRequestsUpdate = (updated: any[]) => {
    setBookingRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Update booking status and persist
  const handleStatusUpdate = (bookingId: number, newStatus: string) => {
    const updated = bookingRequests.map((booking) =>
      booking.id === bookingId ? { ...booking, status: newStatus } : booking
    );
    handleBookingRequestsUpdate(updated);
    toast({
      title: "Booking Updated",
      description: `Booking status changed to ${newStatus}`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
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
          <TabsList className="grid w-full grid-cols-4 bg-card">
            <TabsTrigger value="bookings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bookings</TabsTrigger>
            <TabsTrigger value="gallery" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Services</TabsTrigger>
            <TabsTrigger value="settings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
          </TabsList>

          {/* Enhanced Bookings Management */}
          <TabsContent value="bookings" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground">
                  <Calendar className="h-5 w-5" />
                  Booking Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AdminBookingStats bookingRequests={bookingRequests} />
                <AdminBookingTable 
                  bookingRequests={bookingRequests}
                  onStatusUpdate={handleStatusUpdate}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <AdminGalleryUpload 
              images={galleryItems}
              onImagesUpdate={setGalleryItems}
            />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <AdminServicesManager 
              services={services}
              onServicesUpdate={setServices}
            />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <AdminSettings 
              bookingAvailability={bookingAvailability}
              onBookingAvailabilityChange={setBookingAvailability}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

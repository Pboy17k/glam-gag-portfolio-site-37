
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingsPanel from '@/components/admin/BookingsPanel';
import GalleryPanel from '@/components/admin/GalleryPanel';
import ServicesPanel from '@/components/admin/ServicesPanel';
import SettingsPanel from '@/components/admin/SettingsPanel';
import AdminsPanel from '@/components/admin/AdminsPanel';
import AppImagesPanel from "@/components/admin/AppImagesPanel";

interface AdminTabsProps {
  bookingRequests: any[];
  onStatusUpdate: (bookingId: number, newStatus: string) => void;
  galleryItems: any[];
  onGalleryItemsUpdate: (items: any[]) => void;
  services: any[];
  onServicesUpdate: (services: any[]) => void;
  bookingAvailability: boolean;
  onBookingAvailabilityChange: (availability: boolean) => void;
  adminAccounts: any[];
  addAdminAccount: (username: string, password: string) => void;
  deleteAdminAccount: (username: string) => void;
  currentAdmin: string | null;
}

const AdminTabs = ({
  bookingRequests,
  onStatusUpdate,
  galleryItems,
  onGalleryItemsUpdate,
  services,
  onServicesUpdate,
  bookingAvailability,
  onBookingAvailabilityChange,
  adminAccounts,
  addAdminAccount,
  deleteAdminAccount,
  currentAdmin
}: AdminTabsProps) => {
  return (
    <Tabs defaultValue="bookings" className="w-full">
      <TabsList className="grid w-full grid-cols-6 bg-card">
        <TabsTrigger value="bookings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bookings</TabsTrigger>
        <TabsTrigger value="gallery" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Gallery</TabsTrigger>
        <TabsTrigger value="services" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Services</TabsTrigger>
        <TabsTrigger value="settings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
        <TabsTrigger value="admins" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Manage Admins</TabsTrigger>
        <TabsTrigger value="app-images" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">App Images</TabsTrigger>
      </TabsList>

      <TabsContent value="bookings" className="space-y-6">
        <BookingsPanel 
          bookingRequests={bookingRequests}
          onStatusUpdate={onStatusUpdate}
        />
      </TabsContent>

      <TabsContent value="gallery" className="space-y-6">
        <GalleryPanel 
          images={galleryItems}
          onImagesUpdate={onGalleryItemsUpdate}
        />
      </TabsContent>

      <TabsContent value="services" className="space-y-6">
        <ServicesPanel 
          services={services}
          onServicesUpdate={onServicesUpdate}
        />
      </TabsContent>

      <TabsContent value="settings" className="space-y-6">
        <SettingsPanel 
          bookingAvailability={bookingAvailability}
          onBookingAvailabilityChange={onBookingAvailabilityChange}
        />
      </TabsContent>

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
  );
};

export default AdminTabs;

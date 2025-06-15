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
import { Input } from '@/components/ui/input';

interface GalleryItem {
  id: number;
  src: string;
  category: string;
  alt: string;
  type: 'image' | 'video';
}

const LOCAL_STORAGE_KEY = "bookings";
const ADMIN_ACCOUNTS_KEY = "admin_accounts";
const ADMIN_SESSION_KEY = "admin_session";

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

  // On mount: load admin accounts
  useEffect(() => {
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

  // Unified updater to always persist to localStorage and state
  const handleBookingRequestsUpdate = (updated: any[]) => {
    setBookingRequests(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Unified updater for admin accounts
  const handleAdminsUpdate = (newList: {username: string; password: string;}[]) => {
    setAdminAccounts(newList);
    localStorage.setItem(ADMIN_ACCOUNTS_KEY, JSON.stringify(newList));
  };

  // Add new admin account (username must be unique)
  const addAdminAccount = (username: string, password: string) => {
    if (!username.trim() || !password.trim()) return;
    if (adminAccounts.find(a => a.username === username)) return;
    const updated = [...adminAccounts, { username, password }];
    handleAdminsUpdate(updated);
  };

  // Delete admin account (cannot delete last admin or yourself)
  const deleteAdminAccount = (username: string) => {
    if (adminAccounts.length <= 1) return;
    if (username === currentAdmin) return;
    const updated = adminAccounts.filter(a => a.username !== username);
    handleAdminsUpdate(updated);
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
    localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setCurrentAdmin(null);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out",
    });
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
          <TabsList className="grid w-full grid-cols-5 bg-card">
            <TabsTrigger value="bookings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Bookings</TabsTrigger>
            <TabsTrigger value="gallery" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Gallery</TabsTrigger>
            <TabsTrigger value="services" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Services</TabsTrigger>
            <TabsTrigger value="settings" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Settings</TabsTrigger>
            <TabsTrigger value="admins" className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Manage Admins</TabsTrigger>
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

          {/* --- Manage Admins Tab --- */}
          <TabsContent value="admins" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">Admin Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AdminManagement
                    adminAccounts={adminAccounts}
                    addAdminAccount={addAdminAccount}
                    deleteAdminAccount={deleteAdminAccount}
                    currentAdmin={currentAdmin}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface AdminManagementProps {
  adminAccounts: { username: string; password: string; }[];
  addAdminAccount: (username: string, password: string) => void;
  deleteAdminAccount: (username: string) => void;
  currentAdmin: string | null;
}

// Admin management component
function AdminManagement({ adminAccounts, addAdminAccount, deleteAdminAccount, currentAdmin }: AdminManagementProps) {
  const [addForm, setAddForm] = useState({ username: "", password: "" });
  const { toast } = useToast();

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.username.trim() || !addForm.password.trim()) {
      toast({ title: "Error", description: "Fields cannot be empty", variant: "destructive" });
      return;
    }
    if (adminAccounts.find(a => a.username === addForm.username)) {
      toast({ title: "Error", description: "Username already exists", variant: "destructive" });
      return;
    }
    addAdminAccount(addForm.username, addForm.password);
    toast({ title: "Added", description: `Admin "${addForm.username}" created.` });
    setAddForm({ username: "", password: "" });
  };

  return (
    <div>
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-3 mb-8">
        <Input
          placeholder="Username"
          value={addForm.username}
          onChange={e => setAddForm(f => ({ ...f, username: e.target.value }))}
          required
        />
        <Input
          placeholder="Password"
          value={addForm.password}
          onChange={e => setAddForm(f => ({ ...f, password: e.target.value }))}
          type="password"
          required
        />
        <Button type="submit" className="md:w-auto w-full">Add Admin</Button>
      </form>
      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full border text-left text-sm">
            <thead>
              <tr>
                <th className="p-2 border-b">Username</th>
                <th className="p-2 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminAccounts.map(acc => (
                <tr key={acc.username}>
                  <td className="p-2 border-b">{acc.username}{acc.username === currentAdmin && " (You)"}</td>
                  <td className="p-2 border-b">
                    {adminAccounts.length > 1 && acc.username !== currentAdmin ? (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          deleteAdminAccount(acc.username);
                          toast({ title: "Admin removed", description: `Admin "${acc.username}" deleted.` });
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">Cannot remove</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          You cannot remove your own account while logged in or delete the last remaining admin.
        </p>
      </div>
    </div>
  );
}

export default Admin;

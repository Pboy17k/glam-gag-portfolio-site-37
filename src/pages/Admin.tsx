import { useState } from 'react';
import AdminLogin from '@/components/AdminLogin';
import AdminGalleryUpload from '@/components/AdminGalleryUpload';
import { Plus, Trash2, Edit, Save, X, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditingService, setIsEditingService] = useState<number | null>(null);
  const [bookingAvailability, setBookingAvailability] = useState(true);
  const { toast } = useToast();

  // Mock booking data - in real app, this would come from database
  const [bookingRequests, setBookingRequests] = useState([
    { 
      id: 1, 
      name: 'Amina Hassan', 
      phone: '+234 801 234 5678',
      email: 'amina@email.com',
      service: 'Studio Bridal Glam', 
      date: '2024-07-15', 
      time: '10:00 AM',
      location: 'Kaduna',
      notes: 'Need makeup for traditional wedding',
      status: 'pending',
      createdAt: '2024-06-28'
    },
    { 
      id: 2, 
      name: 'Fatima Ibrahim', 
      phone: '+234 802 345 6789',
      email: 'fatima@email.com',
      service: 'Home Service Casual', 
      date: '2024-07-20', 
      time: '2:00 PM',
      location: 'Abuja',
      notes: 'Birthday photoshoot',
      status: 'confirmed',
      createdAt: '2024-06-29'
    },
    { 
      id: 3, 
      name: 'Khadijah Musa', 
      phone: '+234 803 456 7890',
      email: 'khadijah@email.com',
      service: 'Studio Natural Glam', 
      date: '2024-07-25', 
      time: '11:30 AM',
      location: 'Kaduna',
      notes: 'Corporate headshots',
      status: 'pending',
      createdAt: '2024-06-30'
    }
  ]);

  // Mock data - in a real app, this would come from a database
  const [services, setServices] = useState([
    { id: 1, name: 'Studio Bridal Glam', price: 100000, category: 'bridal' },
    { id: 2, name: 'Home Service Bridal', price: 130000, category: 'bridal' },
    { id: 3, name: 'Studio Casual Glam', price: 40000, category: 'casual' },
    { id: 4, name: 'Home Service Casual Glam', price: 40000, category: 'casual' }
  ]);

  const [galleryImages, setGalleryImages] = useState([
    { id: 1, src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80', category: 'bridal', alt: 'Bridal makeup' },
    { id: 2, src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', category: 'casual', alt: 'Casual glam' },
    { id: 3, src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80', category: 'natural', alt: 'Natural look' }
  ]);

  const handleStatusUpdate = (bookingId: number, newStatus: string) => {
    setBookingRequests(prev => 
      prev.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
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
                <div className="mb-4 flex gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {bookingRequests.filter(b => b.status === 'pending').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Pending</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {bookingRequests.filter(b => b.status === 'confirmed').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Confirmed</div>
                      </div>
                    </Card>
                    <Card className="p-4 bg-greyviolet-50 dark:bg-greyviolet-950/30 border-greyviolet-200 dark:border-greyviolet-800">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">
                          {bookingRequests.length}
                        </div>
                        <div className="text-sm text-muted-foreground">Total</div>
                      </div>
                    </Card>
                  </div>
                </div>

                <div className="bg-card border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead className="text-foreground font-semibold">Client</TableHead>
                        <TableHead className="text-foreground font-semibold">Service</TableHead>
                        <TableHead className="text-foreground font-semibold">Date & Time</TableHead>
                        <TableHead className="text-foreground font-semibold">Contact</TableHead>
                        <TableHead className="text-foreground font-semibold">Status</TableHead>
                        <TableHead className="text-foreground font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingRequests.map((booking) => (
                        <TableRow key={booking.id} className="hover:bg-muted/50">
                          <TableCell>
                            <div>
                              <div className="font-medium text-foreground">{booking.name}</div>
                              <div className="text-sm text-muted-foreground">{booking.location}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-foreground">{booking.service}</div>
                            {booking.notes && (
                              <div className="text-xs text-muted-foreground mt-1">{booking.notes}</div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-foreground">{booking.date}</div>
                            <div className="text-sm text-muted-foreground">{booking.time}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-foreground">{booking.phone}</div>
                            <div className="text-xs text-muted-foreground">{booking.email}</div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {booking.status === 'pending' && (
                                <Button 
                                  size="sm" 
                                  onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                >
                                  Confirm
                                </Button>
                              )}
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                              >
                                Cancel
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Gallery Management */}
          <TabsContent value="gallery" className="space-y-6">
            <AdminGalleryUpload 
              images={galleryImages}
              onImagesUpdate={setGalleryImages}
            />
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services Management</CardTitle>
                <Button onClick={handleAddService}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="border rounded-lg p-4">
                      {isEditingService === service.id ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <Input
                            value={service.name}
                            onChange={(e) => handleServiceUpdate(service.id, 'name', e.target.value)}
                            placeholder="Service name"
                          />
                          <Input
                            type="number"
                            value={service.price}
                            onChange={(e) => handleServiceUpdate(service.id, 'price', parseInt(e.target.value))}
                            placeholder="Price"
                          />
                          <div className="flex gap-2">
                            <Button onClick={() => handleSaveService(service.id)} size="sm">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setIsEditingService(null)}
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{service.name}</h3>
                            <p className="text-muted-foreground">₦{service.price.toLocaleString()}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setIsEditingService(service.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteService(service.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="booking-availability">Booking Availability</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle to enable or disable new bookings
                    </p>
                  </div>
                  <Switch
                    id="booking-availability"
                    checked={bookingAvailability}
                    onCheckedChange={setBookingAvailability}
                  />
                </div>

                <div>
                  <Label htmlFor="business-description">Business Description</Label>
                  <Textarea
                    id="business-description"
                    placeholder="Update your business description..."
                    defaultValue="Glow and Go is your go-to bridal and casual glam studio. We specialize in flawless skin finishes, elegant eye makeup, and defined lips that bring out confidence and radiance in every client."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input id="contact-phone" placeholder="+234 xxx xxx xxxx" />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="info@glowandgo.com" />
                  </div>
                </div>

                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;

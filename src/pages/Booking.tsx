
import { useState } from 'react';
import { Calendar, MapPin, Clock, User, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    serviceType: '',
    location: '',
    notes: '',
    requestGele: false,
    requireTouchup: false
  });
  
  const { toast } = useToast();

  const serviceTypes = [
    { value: 'studio-bridal', label: 'Studio Bridal Glam - ₦100,000' },
    { value: 'home-bridal', label: 'Home Service Bridal - ₦130,000' },
    { value: 'studio-natural', label: 'Studio Natural Glam - ₦25,000' },
    { value: 'home-natural', label: 'Home Service Natural Glam - ₦25,000' },
    { value: 'studio-casual', label: 'Studio Casual Glam - ₦40,000' },
    { value: 'home-casual', label: 'Home Service Casual Glam - ₦40,000' }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `Hello! I'd like to book a makeup session:

Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
Event Date: ${formData.eventDate}
Service: ${formData.serviceType}
Location: ${formData.location}
${formData.requestGele ? 'Additional: Gele tying requested' : ''}
${formData.requireTouchup ? 'Additional: Touchup support required' : ''}
Notes: ${formData.notes}

Please confirm availability and next steps.`;

    const whatsappUrl = `https://wa.me/2348000000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Booking Request Sent!",
      description: "Your booking request has been sent via WhatsApp. We'll get back to you soon!",
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Your <span className="gradient-text">Session</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to get glammed up? Fill out the form below and we'll get back to you shortly
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder="+234 xxx xxx xxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Event Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="eventDate">Event Date *</Label>
                      <Input
                        id="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) => handleInputChange('eventDate', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="serviceType">Service Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map((service) => (
                            <SelectItem key={service.value} value={service.value}>
                              {service.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">Event Location *</Label>
                    <Input
                      id="location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      required
                      placeholder="Venue address or area in Kaduna"
                    />
                  </div>

                  {/* Additional Services */}
                  <div className="space-y-4">
                    <Label>Additional Services</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="gele"
                        checked={formData.requestGele}
                        onCheckedChange={(checked) => handleInputChange('requestGele', checked as boolean)}
                      />
                      <Label htmlFor="gele" className="text-sm">
                        Request Gele tying (+₦15,000 studio / +₦25,000 home service)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="touchup"
                        checked={formData.requireTouchup}
                        onCheckedChange={(checked) => handleInputChange('requireTouchup', checked as boolean)}
                      />
                      <Label htmlFor="touchup" className="text-sm">
                        Require touchup support (+₦15,000)
                      </Label>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <Label htmlFor="notes">Special Requests or Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Any special requests, preferences, or additional information..."
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Send Booking Request via WhatsApp
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Information */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">+234 xxx xxx xxxx</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+234 xxx xxx xxxx</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Kaduna, Nigeria</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Booking Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>• Book at least 2 weeks in advance for bridal services</p>
                <p>• A deposit is required to secure your booking</p>
                <p>• Cancellations must be made 48 hours in advance</p>
                <p>• Outside Kaduna: Additional ₦100,000 fee applies</p>
                <p>• We'll confirm availability within 24 hours</p>
              </CardContent>
            </Card>

            {/* Special Offer */}
            <Card className="bg-gradient-to-r from-blush-50 to-wine-50 dark:from-blush-900/20 dark:to-wine-900/20">
              <CardHeader>
                <CardTitle className="text-primary">Special Offer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Book multiple events and save! Get ₦10,000 off studio bridal services or ₦20,000 off home bridal services when booking more than one event.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;

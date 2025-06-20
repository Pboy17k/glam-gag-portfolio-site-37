
import { Phone, MessageSquare, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import MapComponent from '@/components/MapComponent';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your makeup services. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/2349055551251?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our services? Ready to book your session? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" type="text" required placeholder="Your full name" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required placeholder="+234 xxx xxx xxxx" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" type="text" placeholder="What's this about?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Tell us how we can help you..."
                      rows={6}
                    />
                  </div>

                  <Button type="submit" className="w-full luxury-button" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-muted-foreground">09055551251</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">09055551251</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">Opposite SMC Central Mosque Unguwan Dosa, Kaduna</p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleWhatsAppClick} className="w-full luxury-button" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="text-muted-foreground">8:00 AM - 6:00 PM</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Weekend and evening appointments available for events
                </p>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/glow.and.go__/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Instagram className="h-5 w-5 text-primary" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    <Facebook className="h-5 w-5 text-primary" />
                  </a>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Follow us on social media for the latest updates and makeup inspiration!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-20">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Find Our Studio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapComponent />
              <div className="mt-4 text-center">
                <p className="text-lg font-medium">Studio Location</p>
                <p className="text-muted-foreground">Opposite SMC Central Mosque Unguwan Dosa, Kaduna</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Call or WhatsApp for detailed directions
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Contact;

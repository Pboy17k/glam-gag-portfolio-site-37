
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello! I'm interested in your makeup services. Could you please provide more information?";
    const whatsappUrl = `https://wa.me/2349055551251?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to book your session? Let's chat!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground mb-4">09055551251</p>
              <Button 
                onClick={handleWhatsAppClick} 
                className="luxury-button w-full hover:bg-blue-600 dark:hover:bg-blue-600"
              >
                Chat Now
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-4">09055551251</p>
              <Button 
                asChild 
                className="luxury-button w-full hover:bg-blue-600 dark:hover:bg-blue-600"
              >
                <a href="tel:+2349055551251">Call Now</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-4">Unguwan Dosa, Kaduna</p>
              <Button 
                asChild 
                className="luxury-button w-full hover:bg-blue-600 dark:hover:bg-blue-600"
              >
                <a href="/contact">Get Directions</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

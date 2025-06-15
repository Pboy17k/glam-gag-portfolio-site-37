
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ServicesPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Luxury Services</h2>
          <p className="text-xl text-muted-foreground font-light">Professional makeup and training for every special occasion 💅</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll border-0 bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">👰</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-playfair text-card-foreground">Bridal Glam</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Complete bridal makeup with flawless finish for your special day ✨
              </p>
              <p className="text-primary font-bold text-xl">From ₦100,000</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll border-0 bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">💃</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-playfair text-card-foreground">Casual Glam</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Perfect for events, parties, and special occasions 💖
              </p>
              <p className="text-primary font-bold text-xl">From ₦40,000</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll border-0 bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-playfair text-card-foreground">Natural Look</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Subtle enhancement for a fresh, natural appearance 🌿
              </p>
              <p className="text-primary font-bold text-xl">From ₦25,000</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll border-0 bg-card">
            <CardContent className="p-8">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl mb-6 flex items-center justify-center">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4 font-playfair text-card-foreground">Makeup Training</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Professional courses for aspiring makeup artists 📚
              </p>
              <p className="text-primary font-bold text-xl">From ₦50,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-16 reveal-on-scroll">
          <Button asChild size="lg" className="luxury-button rounded-full px-12 py-4 text-lg">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;


import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0">
        <img
          src="/lovable-uploads/cd837cf5-3f94-4026-977d-d24bc7fc2861.png"
          alt="Glow and Go - Professional makeup artistry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient"></div>
      </div>

      {/* Animated sparkles */}
      <div className="absolute inset-0">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>

      {/* Floating hearts */}
      <div className="floating-hearts">
        <div className="floating-heart">💖</div>
        <div className="floating-heart">✨</div>
        <div className="floating-heart">💅</div>
        <div className="floating-heart">🌸</div>
        <div className="floating-heart">💎</div>
      </div>
      
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in text-shadow-soft">
          <span className="gradient-text font-playfair">Glow and Go</span>
        </h1>
        <p className="text-xl md:text-3xl mb-4 text-foreground/90 animate-slide-up font-light tracking-wide">
          Where your beauty meets elegance
        </p>
        <p className="text-lg md:text-xl mb-8 text-muted-foreground animate-slide-up">
          Professional Makeup Artistry & Training for Your Special Moments ✨
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-zoom-in">
          <Button asChild size="lg" className="luxury-button text-xl px-12 py-4 rounded-full font-medium">
            <Link to="/booking">✨ Book Your Session ✨</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-xl px-12 py-4 rounded-full border-2 border-primary/30 hover:border-primary bg-background/20 backdrop-blur-sm text-foreground">
            <Link to="/gallery">View Portfolio</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">About Glow and Go</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Glow and Go is your go-to bridal and casual glam studio. We specialize in flawless skin finishes, 
              elegant eye makeup, and defined lips that bring out confidence and radiance in every client. ✨
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              With years of experience and a passion for beauty, we use only high-end products and maintain 
              the highest standards of hygiene to ensure every client feels pampered and beautiful. 💖
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We also offer professional makeup training courses for aspiring makeup artists who want to 
              learn the secrets of the trade and build their own successful beauty careers. 🎓
            </p>
            <Button asChild className="luxury-button rounded-full px-8 py-3">
              <Link to="/about">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative reveal-on-scroll">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl opacity-20 animate-gentle-bounce"></div>
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
              alt="Makeup artist at work"
              className="relative rounded-3xl shadow-2xl animate-float hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;


import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 cta-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="sparkle"></div>
        <div className="sparkle"></div>
        <div className="sparkle"></div>
      </div>
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 font-playfair text-white">Ready to Get Glammed Up? ✨</h2>
        <p className="text-xl mb-12 text-white/90 font-light leading-relaxed">
          Book your makeup session today and let us bring out your natural beauty 💖
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white hover:bg-gray-100 rounded-full px-12 py-4 text-lg font-medium hover:scale-105 transition-transform text-black dark:text-black">
            <Link to="/booking">
              <Heart className="mr-2 h-5 w-5 animate-pulse-heart" />
              Book Your Session
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white hover:bg-white hover:text-slate-900 rounded-full px-12 py-4 text-lg font-medium hover:scale-105 transition-transform text-black dark:text-white">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

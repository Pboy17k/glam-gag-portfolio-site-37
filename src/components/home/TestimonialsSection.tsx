
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Amina Hassan",
      text: "Absolutely stunning work! GAG made me feel like a queen on my wedding day. The attention to detail was incredible. ✨",
      rating: 5
    },
    {
      name: "Fatima Ibrahim", 
      text: "Professional, clean, and so talented. My makeup lasted all day and looked flawless in every photo. 💖",
      rating: 5
    },
    {
      name: "Khadijah Musa",
      text: "The best makeup artist in Kaduna! She understood my vision perfectly and delivered beyond expectations. 💅",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="py-24 powder-bg bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 gradient-text reveal-on-scroll">Client Love 💖</h2>
        
        <div className="relative reveal-on-scroll">
          <Card className="bg-card/90 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-12">
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-primary fill-current animate-sparkle" style={{animationDelay: `${i * 0.2}s`}} />
                ))}
              </div>
              <p className="text-xl italic mb-8 leading-relaxed font-light text-card-foreground">"{testimonials[currentTestimonial].text}"</p>
              <p className="font-semibold text-primary text-lg font-playfair">{testimonials[currentTestimonial].name}</p>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary scale-125 shadow-lg' 
                    : 'bg-primary/30 hover:bg-primary/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Placeholder gallery images - in a real app, these would come from the admin/CMS
  const galleryImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80',
    'https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80'
  ];

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
      setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [galleryImages.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&q=80"
            alt="Professional makeup artistry"
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
            Professional Makeup Artistry for Your Special Moments ✨
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-zoom-in">
            <Button asChild size="lg" className="luxury-button text-xl px-12 py-4 rounded-full font-medium">
              <Link to="/booking">✨ Book Your Glam ✨</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-xl px-12 py-4 rounded-full border-2 border-primary/30 hover:border-primary bg-background/20 backdrop-blur-sm text-foreground">
              <Link to="/gallery">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-24 powder-bg bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Recent Transformations</h2>
            <p className="text-xl text-muted-foreground font-light">Showcasing our latest beauty creations ✨</p>
          </div>

          <div className="relative max-w-5xl mx-auto reveal-on-scroll">
            <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={galleryImages[currentSlide]}
                alt="Makeup transformation"
                className="w-full h-full object-cover transition-all duration-700 ease-in-out"
              />
              
              <button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-primary p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md text-primary p-3 rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex justify-center mt-8 space-x-3">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125 shadow-lg' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">About Glow and Go</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Glow and Go is your go-to bridal and casual glam studio. We specialize in flawless skin finishes, 
                elegant eye makeup, and defined lips that bring out confidence and radiance in every client. ✨
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                With years of experience and a passion for beauty, we use only high-end products and maintain 
                the highest standards of hygiene to ensure every client feels pampered and beautiful. 💖
              </p>
              <Button asChild className="luxury-button rounded-full px-8 py-3">
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative reveal-on-scroll">
              <div className="absolute -inset-4 bg-gradient-to-r from-blush-200 to-lavender-200 rounded-3xl opacity-20 animate-gentle-bounce"></div>
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                alt="Makeup artist at work"
                className="relative rounded-3xl shadow-2xl animate-float hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Luxury Services</h2>
            <p className="text-xl text-muted-foreground font-light">Professional makeup for every special occasion 💅</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll luxury-button border-0 bg-card">
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

            <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll luxury-button border-0 bg-card">
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

            <Card className="group hover:shadow-2xl transition-all duration-500 reveal-on-scroll luxury-button border-0 bg-card">
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
          </div>

          <div className="text-center mt-16 reveal-on-scroll">
            <Button asChild size="lg" className="luxury-button rounded-full px-12 py-4 text-lg">
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 font-playfair">Ready to Get Glammed Up? ✨</h2>
          <p className="text-xl mb-12 opacity-95 font-light leading-relaxed">
            Book your makeup session today and let us bring out your natural beauty 💖
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary rounded-full px-12 py-4 text-lg font-medium hover:scale-105 transition-transform">
              <Link to="/booking">
                <Heart className="mr-2 h-5 w-5 animate-pulse-heart" />
                Book Your Session
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary rounded-full px-12 py-4 text-lg font-medium hover:scale-105 transition-transform">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

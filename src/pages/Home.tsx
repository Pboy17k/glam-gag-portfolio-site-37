
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, ArrowRight } from 'lucide-react';
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
      text: "Absolutely stunning work! GAG made me feel like a queen on my wedding day. The attention to detail was incredible.",
      rating: 5
    },
    {
      name: "Fatima Ibrahim",
      text: "Professional, clean, and so talented. My makeup lasted all day and looked flawless in every photo.",
      rating: 5
    },
    {
      name: "Khadijah Musa",
      text: "The best makeup artist in Kaduna! She understood my vision perfectly and delivered beyond expectations.",
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=1920&q=80"
            alt="Professional makeup artistry"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span className="gradient-text">Glam by GAG</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground animate-slide-up">
            Professional Makeup Artistry for Your Special Moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-zoom-in">
            <Button asChild size="lg" className="text-lg px-8 py-3">
              <Link to="/booking">Book Your Session</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8 py-3">
              <Link to="/gallery">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Showcase */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Work</h2>
            <p className="text-xl text-muted-foreground">Showcasing our latest transformations</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={galleryImages[currentSlide]}
                alt="Makeup transformation"
                className="w-full h-full object-cover transition-all duration-500"
              />
              
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <div className="flex justify-center mt-6 space-x-2">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Glam by GAG</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Glam by GAG is your go-to bridal and casual glam studio. We specialize in flawless skin finishes, 
                elegant eye makeup, and defined lips that bring out confidence and radiance in every client.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                With years of experience and a passion for beauty, we use only high-end products and maintain 
                the highest standards of hygiene to ensure every client feels pampered and beautiful.
              </p>
              <Button asChild>
                <Link to="/about">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80"
                alt="Makeup artist at work"
                className="rounded-2xl shadow-2xl animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground">Professional makeup for every occasion</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blush-500 to-wine-600 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Bridal Glam</h3>
                <p className="text-muted-foreground mb-4">
                  Complete bridal makeup with flawless finish for your special day
                </p>
                <p className="text-primary font-semibold">From ₦100,000</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-wine-500 to-blush-600 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Casual Glam</h3>
                <p className="text-muted-foreground mb-4">
                  Perfect for events, parties, and special occasions
                </p>
                <p className="text-primary font-semibold">From ₦40,000</p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-gradient-to-r from-beige-500 to-blush-600 rounded-lg mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Natural Look</h3>
                <p className="text-muted-foreground mb-4">
                  Subtle enhancement for a fresh, natural appearance
                </p>
                <p className="text-primary font-semibold">From ₦25,000</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>
          
          <div className="relative">
            <Card className="bg-gradient-to-r from-blush-50 to-wine-50 dark:from-blush-900/20 dark:to-wine-900/20">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonials[currentTestimonial].text}"</p>
                <p className="font-semibold text-primary">{testimonials[currentTestimonial].name}</p>
              </CardContent>
            </Card>

            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blush-500 to-wine-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Glammed Up?</h2>
          <p className="text-xl mb-8 opacity-90">
            Book your makeup session today and let us bring out your natural beauty
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-primary">
              <Link to="/booking">Book Your Session</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

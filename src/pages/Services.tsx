
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, MapPin, Sparkles, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      id: 1,
      name: 'Studio Bridal Glam',
      price: '₦100,000',
      duration: '3-4 hours',
      location: 'Studio',
      description: 'Complete bridal transformation with premium products and techniques for your special day.',
      features: [
        'Premium makeup products',
        'Hair styling included',
        'Touch-up kit provided',
        'Professional consultation',
        'Pre-wedding trial available'
      ],
      category: 'bridal',
      popular: true
    },
    {
      id: 2,
      name: 'Home Service Bridal',
      price: '₦130,000',
      duration: '3-4 hours',
      location: 'Your Location',
      description: 'Luxury bridal makeup service at your preferred location with full professional setup.',
      features: [
        'Mobile professional setup',
        'Premium makeup products',
        'Hair styling included',
        'Touch-up kit provided',
        'Travel within 20km included'
      ],
      category: 'bridal',
      popular: false
    },
    {
      id: 3,
      name: 'Studio Casual Glam',
      price: '₦40,000',
      duration: '1.5-2 hours',
      location: 'Studio',
      description: 'Perfect for parties, dates, photoshoots, and special occasions.',
      features: [
        'Professional makeup application',
        'Basic hair styling',
        'Touch-up recommendations',
        'Photo-ready finish',
        'Product consultation'
      ],
      category: 'casual',
      popular: false
    },
    {
      id: 4,
      name: 'Home Service Casual',
      price: '₦50,000',
      duration: '1.5-2 hours',
      location: 'Your Location',
      description: 'Casual glam makeup service delivered to your preferred location.',
      features: [
        'Mobile makeup service',
        'Professional products',
        'Basic hair styling',
        'Travel within 15km included',
        'Flexible timing'
      ],
      category: 'casual',
      popular: false
    },
    {
      id: 5,
      name: 'Natural Glow',
      price: '₦25,000',
      duration: '1 hour',
      location: 'Studio',
      description: 'Subtle enhancement for a fresh, natural look perfect for everyday wear.',
      features: [
        'Natural makeup application',
        'Skin preparation & care',
        'Minimal yet elegant look',
        'Product recommendations',
        'Quick touch-up tips'
      ],
      category: 'natural',
      popular: false
    },
    {
      id: 6,
      name: 'Evening Glamour',
      price: '₦60,000',
      duration: '2-3 hours',
      location: 'Studio',
      description: 'Dramatic and sophisticated makeup for evening events and galas.',
      features: [
        'Bold and dramatic looks',
        'Premium evening makeup',
        'Professional hair styling',
        'Long-lasting application',
        'Red carpet ready finish'
      ],
      category: 'evening',
      popular: false
    },
    {
      id: 7,
      name: 'Basic Makeup Training',
      price: '₦50,000',
      duration: '2 weeks',
      location: 'Studio',
      description: 'Learn the fundamentals of makeup artistry with hands-on training.',
      features: [
        'Basic makeup techniques',
        'Product knowledge',
        'Color theory',
        'Practice on models',
        'Certificate of completion'
      ],
      category: 'training',
      popular: false
    },
    {
      id: 8,
      name: 'Advanced Makeup Training',
      price: '₦100,000',
      duration: '1 month',
      location: 'Studio',
      description: 'Comprehensive professional makeup training program.',
      features: [
        'Advanced techniques',
        'Bridal makeup specialization',
        'Business setup guidance',
        'Portfolio development',
        'Professional certification'
      ],
      category: 'training',
      popular: true
    }
  ];

  const addOns = [
    { name: 'Eyelash Extensions', price: '₦15,000' },
    { name: 'Eyebrow Shaping', price: '₦8,000' },
    { name: 'Additional Trial Session', price: '₦20,000' },
    { name: 'Extra Touch-up Kit', price: '₦12,000' },
    { name: 'Hair Accessories Setup', price: '₦10,000' }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'bridal':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300';
      case 'casual':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'natural':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'evening':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'training':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            From bridal transformations to professional training, we offer comprehensive makeup services 
            tailored to enhance your natural beauty for any occasion.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="text-sm py-2 px-4 bg-card border-border text-foreground">
              <Star className="h-4 w-4 mr-2" />
              Professional Certified
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4 bg-card border-border text-foreground">
              <Heart className="h-4 w-4 mr-2" />
              Premium Products
            </Badge>
            <Badge variant="outline" className="text-sm py-2 px-4 bg-card border-border text-foreground">
              <Sparkles className="h-4 w-4 mr-2" />
              Customized Looks
            </Badge>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service) => (
            <Card key={service.id} className="relative bg-card border-border hover:shadow-lg transition-all duration-300 group">
              {service.popular && (
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-primary text-primary-foreground shadow-lg">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
                    {service.name}
                  </CardTitle>
                  <Badge className={getCategoryColor(service.category)}>
                    {service.category}
                  </Badge>
                </div>
                <CardDescription className="text-muted-foreground">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Service Info */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{service.location}</span>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-card-foreground mb-3">What's Included:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                  <Button asChild className="w-full luxury-button">
                    <Link to="/booking">Book This Service</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-ons Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Add-On <span className="gradient-text">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Enhance your experience with our additional services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-card-foreground">{addon.name}</h3>
                    <span className="text-primary font-bold">{addon.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple steps to your perfect look
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Consultation',
                description: 'We discuss your vision, preferences, and the occasion to create the perfect look for you.'
              },
              {
                step: '02',
                title: 'Preparation',
                description: 'Skin preparation and color matching to ensure a flawless base and long-lasting results.'
              },
              {
                step: '03',
                title: 'Transformation',
                description: 'Professional application using premium products with attention to every detail.'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Transform Your Look?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book your appointment today and let our expert makeup artists bring out your natural radiance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="luxury-button">
                  <Link to="/booking">Book Appointment</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Ask Questions</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Services;

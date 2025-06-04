
import { useState } from 'react';
import { Check, MapPin, Clock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Services = () => {
  const [activeTab, setActiveTab] = useState('bridal');

  const bridalServices = [
    {
      title: "Studio Bridal Glam",
      price: "₦100,000",
      duration: "2-3 hours",
      location: "Studio",
      features: [
        "Complete bridal makeup",
        "Skin preparation and priming",
        "Long-lasting finish",
        "Photo-ready application",
        "Complimentary touch-up kit"
      ],
      discount: "₦10,000 off for multiple events"
    },
    {
      title: "Home Service Bridal",
      price: "₦130,000",
      duration: "2-3 hours",
      location: "Your Location",
      features: [
        "Complete bridal makeup at your location",
        "Professional lighting setup",
        "Skin preparation and priming",
        "Long-lasting finish",
        "Photo-ready application",
        "Complimentary touch-up kit"
      ],
      discount: "₦20,000 off for multiple events"
    }
  ];

  const casualServices = [
    {
      title: "Studio Natural Glam",
      price: "₦25,000",
      duration: "1 hour",
      location: "Studio",
      features: [
        "Natural, fresh makeup look",
        "Skin enhancement",
        "Subtle eye makeup",
        "Natural lip color"
      ]
    },
    {
      title: "Home Service Natural Glam",
      price: "₦25,000",
      duration: "1 hour",
      location: "Your Location",
      features: [
        "Natural makeup at your location",
        "Skin enhancement",
        "Subtle eye makeup",
        "Natural lip color"
      ]
    },
    {
      title: "Studio Casual Glam",
      price: "₦40,000",
      duration: "1 hour",
      location: "Studio",
      features: [
        "Enhanced makeup for events",
        "Defined eyes and lips",
        "Contouring and highlighting",
        "Perfect for parties and occasions"
      ]
    },
    {
      title: "Home Service Casual Glam",
      price: "₦40,000",
      duration: "1 hour",
      location: "Your Location",
      features: [
        "Enhanced makeup at your location",
        "Defined eyes and lips",
        "Contouring and highlighting",
        "Perfect for parties and occasions"
      ]
    }
  ];

  const addOnServices = [
    {
      title: "Gele Tying (Asoeke/Sego)",
      studioPrice: "₦15,000",
      homePrice: "₦25,000",
      description: "Professional gele tying service"
    },
    {
      title: "Outfit Change Touchup",
      price: "₦15,000",
      description: "Makeup refresh for outfit changes"
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional makeup services tailored to your needs, from intimate celebrations to grand occasions
          </p>
        </div>

        {/* Services Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
            <TabsTrigger value="bridal">Bridal Services</TabsTrigger>
            <TabsTrigger value="casual">Casual Services</TabsTrigger>
          </TabsList>

          <TabsContent value="bridal" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {bridalServices.map((service, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {service.price}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    {service.discount && (
                      <div className="bg-blush-50 dark:bg-blush-900/20 p-3 rounded-lg mb-4">
                        <p className="text-sm text-primary font-medium">{service.discount}</p>
                      </div>
                    )}
                    <Button asChild className="w-full">
                      <Link to="/booking">Book This Service</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="casual" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {casualServices.map((service, index) => (
                <Card key={index} className="relative group hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {service.price}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{service.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{service.location}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full">
                      <Link to="/booking">Book This Service</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Add-on Services */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Add-on Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {addOnServices.map((addon, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl">{addon.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{addon.description}</p>
                  {addon.studioPrice ? (
                    <div className="space-y-2">
                      <p><span className="font-semibold">Studio:</span> {addon.studioPrice}</p>
                      <p><span className="font-semibold">Home Service:</span> {addon.homePrice}</p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-primary">{addon.price}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Important Notes */}
        <section className="mt-20">
          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-800 dark:text-amber-200">
                <AlertCircle className="h-5 w-5 mr-2" />
                Important Notes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-800 dark:text-amber-200">
              <ul className="space-y-2">
                <li>• Events outside Kaduna attract ₦100,000 extra fee (excluding logistics)</li>
                <li>• Touch-ups attract additional charges</li>
                <li>• All prices are subject to change based on specific requirements</li>
                <li>• A deposit is required to secure your booking</li>
                <li>• Cancellations must be made 48 hours in advance</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* CTA Section */}
        <section className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blush-50 to-wine-50 dark:from-blush-900/20 dark:to-wine-900/20 p-12 rounded-2xl">
            <h2 className="text-3xl font-bold mb-4">Ready to Book Your Session?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create the perfect look for your special day
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/booking">Book Now</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">Have Questions?</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;

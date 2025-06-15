import { CheckCircle, Award, Users, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const getAboutImageSrc = () => {
  // Fetch from localStorage if available, otherwise default.
  try {
    const customImages = JSON.parse(localStorage.getItem("customImages") ?? "{}");
    return customImages.aboutProfile || "/lovable-uploads/0debc043-5d1d-4ec7-a3c6-3c492c6b0cd6.png";
  } catch {
    return "/lovable-uploads/0debc043-5d1d-4ec7-a3c6-3c492c6b0cd6.png";
  }
};

const About = () => {
  const features = [
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Professional Excellence",
      description: "Years of experience in bridal and event makeup artistry"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "High-End Products",
      description: "Only premium, high-quality makeup products for best results"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Client Satisfaction",
      description: "Dedicated to making every client feel confident and beautiful"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Punctual Service",
      description: "Reliable, on-time service for your special events"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Meet <span className="gradient-text">GAG</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your dedicated makeup artist bringing beauty and confidence to life through the art of makeup.
              </p>
              <div className="prose prose-lg text-muted-foreground">
                <p className="mb-4">
                  This service intends to make you feel and look special on your big day. Here we use high-end 
                  products and careful detailing to achieve seamless skin finishes with eyes and lips that speak elegance.
                </p>
                <p>
                  With a passion for enhancing natural beauty and creating stunning transformations, 
                  I've dedicated my career to perfecting the art of makeup for brides and special occasions.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={getAboutImageSrc()}
                alt="GAG - Professional Makeup Artist"
                className="rounded-2xl shadow-2xl animate-float object-cover w-full h-96"
              />
              <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-2xl shadow-lg">
                <p className="text-2xl font-bold">5+</p>
                <p className="text-sm">Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Glam by GAG?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Professional approach, attention to detail, and commitment to client satisfaction sets us apart
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Standards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80"
                alt="Professional makeup setup"
                className="rounded-2xl shadow-2xl"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Professional Standards</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Hygiene Excellence</h3>
                    <p className="text-muted-foreground">
                      Strict sanitation protocols and disposable tools to ensure the highest level of hygiene
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Premium Products</h3>
                    <p className="text-muted-foreground">
                      High-end makeup brands and products that are long-lasting and photograph beautifully
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Expert Styling</h3>
                    <p className="text-muted-foreground">
                      Detailed consultation to understand your vision and create the perfect look for your occasion
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">Personalized Service</h3>
                    <p className="text-muted-foreground">
                      Every makeup application is tailored to enhance your unique features and complement your style
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-r from-blush-50 to-wine-50 dark:from-blush-900/20 dark:to-wine-900/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
          <div className="bg-white dark:bg-card p-8 rounded-2xl shadow-lg">
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              "To bring out the natural beauty and confidence in every client through professional makeup artistry. 
              We believe that makeup is not just about transformation, but about empowering individuals to feel 
              their absolute best."
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Every brush stroke, every color choice, and every detail is carefully considered to create a look 
              that not only enhances your features but also reflects your personality and the significance of your special moment.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

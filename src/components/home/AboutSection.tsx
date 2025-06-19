import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

const AboutSection = () => {
  const [profileImage, setProfileImage] = useState("/lovable-uploads/0debc043-5d1d-4ec7-a3c6-3c492c6b0cd6.png");
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const loadProfileImage = async () => {
      try {
        console.log('Loading profile image...');
        
        // Extended timeout for better reliability
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 6000)
        );
        
        const supabasePromise = supabase
          .from('custom_images')
          .select('value')
          .eq('key', 'aboutProfile')
          .maybeSingle();

        const { data } = await Promise.race([supabasePromise, timeoutPromise]) as any;

        if (data?.value) {
          console.log('Profile image loaded from Supabase');
          setProfileImage(data.value);
        } else {
          // Enhanced fallback to localStorage
          try {
            const customImages = JSON.parse(localStorage.getItem("customImages") ?? "{}");
            if (customImages.aboutProfile) {
              console.log('Profile image loaded from localStorage');
              setProfileImage(customImages.aboutProfile);
            }
          } catch (error) {
            console.error('Error loading from localStorage:', error);
          }
        }
      } catch (error) {
        console.warn('Profile image loading failed, using default:', error);
        // Keep default image
      } finally {
        setImageLoaded(true);
      }
    };

    loadProfileImage();
  }, []);

  const handleImageError = (e: any) => {
    console.warn('Profile image failed to load, using fallback');
    e.currentTarget.src = "/lovable-uploads/0debc043-5d1d-4ec7-a3c6-3c492c6b0cd6.png";
  };

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
            {!imageLoaded ? (
              <div className="relative rounded-3xl shadow-2xl bg-gray-200 animate-pulse h-96 w-full"></div>
            ) : (
              <img
                src={profileImage}
                alt="Makeup artist at work"
                className="relative rounded-3xl shadow-2xl animate-float hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={handleImageError}
                onLoad={() => console.log('Profile image loaded successfully')}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

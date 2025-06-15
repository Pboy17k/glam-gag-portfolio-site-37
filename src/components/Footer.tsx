
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone } from 'lucide-react';

const LOGO_SRC = "/lovable-uploads/7ff86ad9-8ffd-49de-ac39-780f6abf70e1.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={LOGO_SRC}
                alt="Glow and Go Logo"
                className="w-8 h-8 rounded-full bg-white border border-primary/20 object-cover"
              />
              <span className="text-xl font-bold gradient-text">Glam by GAG</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Professional makeup artistry for bridal and casual glam. Specializing in flawless skin finishes, 
              elegant eye makeup, and defined lips that bring out confidence and radiance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="tel:+234" className="text-muted-foreground hover:text-primary transition-colors">
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link to="/booking" className="text-muted-foreground hover:text-primary transition-colors">Book Now</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-muted-foreground">Bridal Glam</span></li>
              <li><span className="text-muted-foreground">Casual Makeup</span></li>
              <li><span className="text-muted-foreground">Natural Look</span></li>
              <li><span className="text-muted-foreground">Gele Tying</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 Glam by GAG. All rights reserved. | Based in Kaduna, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

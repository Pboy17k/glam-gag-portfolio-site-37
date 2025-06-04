
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import ScrollReveal from './ScrollReveal';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16">
        {children}
      </main>
      <Footer />
      <ScrollReveal />
    </div>
  );
};

export default Layout;

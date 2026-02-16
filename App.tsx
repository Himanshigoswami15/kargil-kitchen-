import React, { useState } from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { MENU_DATA } from './data';
import { MenuItem } from './types';
import MenuSection from './components/MenuSection';
import CategoryNav from './components/CategoryNav';
import SommelierModal from './components/SommelierModal';
import BrandLogo from './components/BrandLogo';

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const handleSommelierClick = (item: MenuItem) => {
    setSelectedItem(item);
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-800 text-white selection:bg-primary-200 selection:text-primary-900">
      
      {/* Hero Section - Logo Display */}
      <header className="py-12 md:py-20 flex flex-col items-center justify-center bg-primary-800 text-center px-4 animate-fade-in-up">
         <div className="mb-6 hover:scale-105 transition-transform duration-500">
           <BrandLogo className="h-56 w-56 md:h-72 md:w-72" />
         </div>
         <h1 className="sr-only">
           Kargil Kitchen
         </h1>
         <p className="font-sans text-primary-200 uppercase tracking-[0.2em] text-sm md:text-base font-semibold mt-4">
           Authentic Flavors & Dining
         </p>
         <div className="mt-6">
           <p className="font-serif text-primary-100/80 italic text-lg max-w-xl mx-auto">
             "A culinary journey to the heart of taste."
           </p>
         </div>
      </header>

      {/* Navigation */}
      <CategoryNav categories={MENU_DATA} />

      {/* Main Content */}
      <main className="flex-grow pb-20">
        <div className="max-w-7xl mx-auto">
          {MENU_DATA.map(category => (
            <MenuSection 
              key={category.id} 
              category={category} 
              onSommelierClick={handleSommelierClick}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-900 text-primary-100 py-12 border-t border-primary-700">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-4">
             <h3 className="font-serif text-2xl text-white">Kargil Kitchen</h3>
             <p className="text-sm font-sans leading-relaxed text-primary-200">
               Experience the finest flavors from around the world, curated with passion and served with elegance.
             </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Visit Us</h4>
            <div className="text-sm font-sans space-y-2 text-primary-200">
              <p>123 Culinary Avenue</p>
              <p>Metropolis, NY 10012</p>
              <p className="pt-2 text-white font-medium">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg text-white">Hours</h4>
            <div className="text-sm font-sans space-y-2 text-primary-200">
               <p>Mon-Sun: 5pm - 11pm</p>
               <p>Happy Hour: 5pm - 7pm</p>
            </div>
            <div className="flex justify-center md:justify-start gap-4 pt-4 text-primary-300">
              <a href="#" className="hover:text-white transition-colors"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center text-xs font-sans text-primary-400 uppercase tracking-widest border-t border-primary-800 pt-8 mx-auto max-w-5xl">
          © 2024 Kargil Kitchen. All rights reserved.
        </div>
      </footer>

      {/* Interactive Modal */}
      {selectedItem && (
        <SommelierModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)} 
        />
      )}
    </div>
  );
};

export default App;
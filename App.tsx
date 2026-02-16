import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, ShoppingBag } from 'lucide-react';
import { MENU_DATA } from './data';
import { MenuItem, CartItem } from './types';
import MenuSection from './components/MenuSection';
import CategoryNav from './components/CategoryNav';
import CartSidebar from './components/CartSidebar';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // REPLACE THIS URL WITH YOUR DESIRED LOGO IMAGE
  const imageUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    // Removed setIsCartOpen(true) to prevent cart from opening automatically
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-primary-800 text-white selection:bg-primary-200 selection:text-primary-900">
      
      {/* Hero Section - Logo Display */}
      <header className="py-12 md:py-20 flex flex-col items-center justify-center bg-primary-800 text-center px-4 animate-fade-in-up relative">
         <div className="mb-6 hover:scale-105 transition-transform duration-500">
           {/* Logo Image using the imageUrl constant */}
           <img 
             src={imageUrl} 
             alt="Restaurant Logo" 
             className="h-64 w-64 md:h-80 md:w-80 object-contain"
           />
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
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Floating Cart Button */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-white text-primary-900 p-4 rounded-full shadow-2xl hover:bg-primary-100 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="View Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-primary-800">
            {cartCount}
          </span>
        )}
      </button>

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

      {/* Cart Sidebar */}
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
};

export default App;
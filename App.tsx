import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, ShoppingBag, ChevronDown } from 'lucide-react';
import { MENU_DATA } from './data';
import { MenuItem, CartItem } from './types';
import MenuSection from './components/MenuSection';
import CategoryNav from './components/CategoryNav';
import CartSidebar from './components/CartSidebar';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const imageUrl = "https://ik.imagekit.io/j1fgksdwx/ChatGPT%20Image%20Feb%2016,%202026,%2006_12_08%20PM.png?updatedAt=1771245805784";

  const addToCart = (item: MenuItem) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
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
    <div className="min-h-screen flex flex-col bg-primary-950 text-primary-50 selection:bg-accent-500/30 selection:text-accent-200">
      
      {/* Hero Section */}
      <header className="relative py-24 md:py-32 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
         {/* Background glow effect */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-primary-800/20 blur-[100px] -z-10 rounded-full"></div>

         <div className="mb-8 hover:scale-105 transition-transform duration-700 ease-out">
           <img 
             src={imageUrl} 
             alt="Kargil Kitchen Logo" 
             className="h-48 w-48 md:h-64 md:w-64 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
           />
         </div>
         
         <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-4">
           Kargil Kitchen
         </h1>
         
         <div className="flex items-center gap-4 mb-8 opacity-80">
            <span className="h-px w-8 bg-accent-400"></span>
            <p className="font-sans text-accent-400 uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
              Fine Dining & Authentic Flavors
            </p>
            <span className="h-px w-8 bg-accent-400"></span>
         </div>

         <p className="font-serif text-primary-200/80 italic text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
           "A culinary journey to the heart of taste, where every dish tells a story."
         </p>
         
         <ChevronDown className="w-6 h-6 text-accent-500/50 mt-16 animate-bounce" />
      </header>

      {/* Navigation */}
      <CategoryNav categories={MENU_DATA} />

      {/* Main Content */}
      <main className="flex-grow pb-32 pt-8">
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
        className="fixed bottom-8 right-8 z-40 bg-accent-600 text-primary-950 p-4 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:bg-accent-400 transition-all hover:scale-110 active:scale-95 flex items-center justify-center group"
        aria-label="View Cart"
      >
        <ShoppingBag className="w-6 h-6" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-primary-900 text-accent-400 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-accent-600 group-hover:border-accent-400">
            {cartCount}
          </span>
        )}
      </button>

      {/* Footer */}
      <footer className="bg-primary-950 text-primary-300 py-16 border-t border-primary-900 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary-700 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Brand */}
          <div className="space-y-6">
             <h3 className="font-serif text-3xl text-white">Kargil Kitchen</h3>
             <p className="text-sm font-sans leading-relaxed text-primary-400 max-w-xs mx-auto md:mx-0">
               Experience the finest flavors from around the world, curated with passion and served with elegance.
             </p>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-accent-100 italic">Visit Us</h4>
            <div className="text-sm font-sans space-y-3 text-primary-400">
              <p>123 Culinary Avenue</p>
              <p>Metropolis, NY 10012</p>
              <p className="pt-2 text-accent-400 font-medium">+1 (555) 123-4567</p>
            </div>
          </div>

          {/* Hours & Social */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-accent-100 italic">Hours</h4>
            <div className="text-sm font-sans space-y-3 text-primary-400">
               <p><span className="text-primary-200">Mon-Sun:</span> 5pm - 11pm</p>
               <p><span className="text-primary-200">Happy Hour:</span> 5pm - 7pm</p>
            </div>
            <div className="flex justify-center md:justify-start gap-6 pt-2">
              <a href="#" className="text-primary-500 hover:text-accent-400 transition-colors"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="text-primary-500 hover:text-accent-400 transition-colors"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="text-primary-500 hover:text-accent-400 transition-colors"><Twitter className="w-5 h-5"/></a>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center text-[10px] font-sans text-primary-600 uppercase tracking-widest mx-auto max-w-5xl">
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
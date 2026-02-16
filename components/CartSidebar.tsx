import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => {
    // Extract numeric price from string (e.g. "₹180" -> 180)
    const priceString = item.price.replace(/[^0-9.]/g, '');
    const price = priceString ? parseFloat(priceString) : 0;
    return sum + (price * item.quantity);
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fade-in" 
        onClick={onClose}
      ></div>
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-primary-950 h-full shadow-2xl border-l border-primary-800 flex flex-col transform transition-transform duration-300 animate-slide-up sm:animate-none">
        
        {/* Header */}
        <div className="p-6 border-b border-primary-800 flex justify-between items-center bg-primary-900/50">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-5 h-5 text-accent-400" />
            <h2 className="font-serif text-2xl text-white tracking-wide italic">Your Selection</h2>
          </div>
          <button onClick={onClose} className="text-primary-400 hover:text-accent-400 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-primary-400 font-sans opacity-60">
              <div className="w-20 h-20 rounded-full border border-primary-800 flex items-center justify-center mb-6">
                 <ShoppingBag className="w-8 h-8 stroke-1" />
              </div>
              <p className="text-xl font-serif italic mb-2">Your plate is empty</p>
              <p className="text-sm uppercase tracking-wider">Explore our menu to begin</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                 <div className="w-20 h-20 flex-shrink-0 bg-primary-900 rounded-sm overflow-hidden border border-primary-800">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                 </div>
                 
                 <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                       <h3 className="font-serif text-lg text-primary-100 leading-tight pr-2">{item.name}</h3>
                       <span className="font-sans text-accent-400 font-medium text-sm whitespace-nowrap">{item.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                       {/* Quantity Controls */}
                       <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)} 
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-primary-700 text-primary-400 hover:border-accent-500 hover:text-accent-400 transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm text-white font-sans font-medium w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)} 
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-primary-700 text-primary-400 hover:border-accent-500 hover:text-accent-400 transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                       </div>
                       
                       {/* Remove Button */}
                       <button 
                         onClick={() => onRemoveItem(item.id)} 
                         className="text-primary-500 hover:text-red-400 text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                       >
                          <Trash2 size={12} /> Remove
                       </button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Totals */}
        <div className="p-8 border-t border-primary-800 bg-primary-900/30">
           <div className="flex justify-between items-baseline mb-8">
             <span className="font-sans text-primary-400 uppercase tracking-widest text-xs font-bold">Total</span>
             <span className="font-serif text-4xl text-accent-400">₹{total.toLocaleString('en-IN')}</span>
           </div>
           <button 
             className="w-full py-4 bg-accent-600 hover:bg-accent-500 text-primary-950 font-sans font-bold uppercase tracking-[0.2em] rounded-sm transition-all active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]" 
             disabled={items.length === 0}
             onClick={() => alert('Your order has been placed successfully. Thank you for dining with us.')}
           >
             Confirm Order
           </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
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
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Sidebar Panel */}
      <div className="relative w-full max-w-md bg-primary-900 h-full shadow-2xl border-l border-primary-700 flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="p-5 border-b border-primary-700 flex justify-between items-center bg-primary-800">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-6 h-6 text-primary-200" />
            <h2 className="font-serif text-2xl text-white tracking-wide">Your Order</h2>
          </div>
          <button onClick={onClose} className="text-primary-300 hover:text-white transition-colors p-2 hover:bg-primary-700 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-primary-300 font-sans opacity-60">
              <ShoppingBag className="w-16 h-16 mb-4 stroke-1" />
              <p className="text-lg">Your cart is empty.</p>
              <p className="text-sm">Start adding some delicious dishes!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-primary-800/40 p-3 rounded-lg border border-primary-700/50 hover:border-primary-500 transition-colors">
                 <div className="w-20 h-20 flex-shrink-0 bg-primary-950 rounded overflow-hidden">
                   <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                 </div>
                 
                 <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                       <h3 className="font-serif text-lg text-white leading-tight pr-2">{item.name}</h3>
                       <span className="font-sans text-primary-200 font-semibold whitespace-nowrap">{item.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                       {/* Quantity Controls */}
                       <div className="flex items-center bg-primary-950 rounded border border-primary-700">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)} 
                            className="p-1.5 text-primary-300 hover:text-white hover:bg-primary-700 rounded-l transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="px-3 text-sm text-white font-sans font-medium min-w-[2rem] text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)} 
                            className="p-1.5 text-primary-300 hover:text-white hover:bg-primary-700 rounded-r transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                       </div>
                       
                       {/* Remove Button */}
                       <button 
                         onClick={() => onRemoveItem(item.id)} 
                         className="text-red-400 hover:text-red-300 text-xs uppercase tracking-wider flex items-center gap-1.5 font-medium px-2 py-1 hover:bg-red-900/20 rounded transition-colors"
                       >
                          <Trash2 size={14} /> Remove
                       </button>
                    </div>
                 </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Totals */}
        <div className="p-6 border-t border-primary-700 bg-primary-800 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
           <div className="flex justify-between items-end mb-6">
             <span className="font-sans text-primary-300 uppercase tracking-widest text-xs font-bold mb-1">Total Amount</span>
             <span className="font-serif text-4xl text-white">₹{total.toLocaleString('en-IN')}</span>
           </div>
           <button 
             className="w-full py-4 bg-primary-100 hover:bg-white text-primary-900 font-sans font-bold uppercase tracking-[0.2em] rounded shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100" 
             disabled={items.length === 0}
             onClick={() => alert('Order placed successfully!')}
           >
             Checkout
           </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
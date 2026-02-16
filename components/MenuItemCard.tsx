import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
  return (
    <div className="group flex flex-col sm:flex-row bg-primary-900/40 rounded-sm border border-primary-800/60 hover:border-accent-600/50 hover:bg-primary-900/60 transition-all duration-500 overflow-hidden relative">
      
      {/* Image Section */}
      <div className="w-full sm:w-40 h-56 sm:h-auto overflow-hidden relative flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-primary-950/20"></div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-6 flex flex-col justify-between relative">
        <div className="space-y-3">
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-serif text-2xl text-primary-50 font-medium tracking-wide group-hover:text-accent-200 transition-colors duration-300">
              {item.name}
            </h3>
            <span className="font-sans text-lg text-accent-400 font-semibold whitespace-nowrap pt-1">
              {item.price}
            </span>
          </div>
          
          <p className="text-primary-200/80 text-sm font-sans leading-relaxed font-light line-clamp-2 sm:line-clamp-3">
            {item.description || "A delightful preparation with authentic spices and fresh ingredients."}
          </p>
          
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {item.tags.map(tag => (
                <span key={tag} className="px-2 py-[2px] border border-primary-700 text-[10px] uppercase tracking-wider text-primary-400 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-6 flex items-center justify-end">
           <button 
             onClick={() => onAddToCart(item)}
             className="group/btn relative overflow-hidden px-6 py-2 bg-transparent border border-accent-600/50 hover:border-accent-400 text-accent-400 hover:text-primary-950 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm"
           >
             <span className="relative z-10 flex items-center gap-2">
               Add to Order
             </span>
             <div className="absolute inset-0 bg-accent-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left"></div>
           </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
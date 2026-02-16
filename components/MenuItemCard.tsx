import React from 'react';
import { Wine } from 'lucide-react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onSommelierClick: (item: MenuItem) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onSommelierClick }) => {
  return (
    <div className="group relative bg-primary-900 rounded-xl shadow-md hover:shadow-xl hover:shadow-black/20 transition-all duration-300 overflow-hidden border border-primary-700 flex flex-col md:flex-row h-full">
      {/* Image Section */}
      <div className="w-full md:w-1/3 h-48 md:h-auto overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        {/* Mobile Price Overlay */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white px-3 py-1 rounded-full text-sm font-serif md:hidden border border-white/10">
          {item.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-xl text-white font-medium group-hover:text-primary-200 transition-colors">
              {item.name}
            </h3>
            <span className="hidden md:block font-serif text-lg text-primary-200 font-semibold">
              {item.price}
            </span>
          </div>
          
          <p className="text-primary-100 text-sm font-sans leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
            {item.description}
          </p>
          
          {item.tags && (
            <div className="flex gap-2 mb-4">
              {item.tags.map(tag => (
                <span key={tag} className="px-2 py-0.5 border border-primary-600 text-[10px] uppercase tracking-wider text-primary-300 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end pt-4 border-t border-primary-800 mt-auto">
           <button 
             onClick={() => onSommelierClick(item)}
             className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-300 hover:text-white transition-colors"
           >
             <Wine className="w-4 h-4" />
             Pairing
           </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
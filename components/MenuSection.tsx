import React from 'react';
import { MenuCategory, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategory;
  onAddToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, onAddToCart }) => {
  return (
    <section id={category.id} className="py-16 md:py-24 scroll-mt-20">
      <div className="flex items-center justify-center mb-12 md:mb-16">
        <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60"></div>
        <h2 className="px-8 font-serif text-3xl md:text-5xl text-accent-100 text-center tracking-wide relative">
          <span className="relative z-10">{category.title}</span>
          <span className="absolute -inset-1 blur-xl bg-accent-500/10 rounded-full z-0"></span>
        </h2>
        <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent via-accent-500 to-transparent opacity-60"></div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 px-4 md:px-8 max-w-7xl mx-auto">
        {category.items.map(item => (
          <MenuItemCard 
            key={item.id} 
            item={item} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
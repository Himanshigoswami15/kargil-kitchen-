import React from 'react';
import { MenuCategory, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuSectionProps {
  category: MenuCategory;
  onAddToCart: (item: MenuItem) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ category, onAddToCart }) => {
  return (
    <section id={category.id} className="py-12 scroll-mt-24">
      <div className="flex items-center justify-center mb-10">
        <div className="h-px w-8 bg-primary-200 opacity-40"></div>
        <h2 className="px-6 font-serif text-3xl md:text-4xl text-white text-center italic">
          {category.title}
        </h2>
        <div className="h-px w-8 bg-primary-200 opacity-40"></div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 px-4 md:px-0 max-w-5xl mx-auto">
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
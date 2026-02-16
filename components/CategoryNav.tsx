import React, { useEffect, useState } from 'react';
import { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string>(categories[0].id);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } 
    );

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="sticky top-0 z-40 bg-primary-800/95 backdrop-blur-md border-b border-primary-700 shadow-lg shadow-black/10">
      <div className="max-w-5xl mx-auto overflow-x-auto hide-scrollbar">
        <div className="flex justify-start md:justify-center min-w-max px-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`
                px-6 py-4 text-sm uppercase tracking-widest font-sans font-medium transition-all relative
                ${activeId === cat.id ? 'text-white' : 'text-primary-300 hover:text-white'}
              `}
            >
              {cat.title}
              {activeId === cat.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white animate-fade-in" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
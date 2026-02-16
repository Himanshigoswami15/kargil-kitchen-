import React, { useEffect, useState, useRef } from 'react';
import { MenuCategory } from '../types';

interface CategoryNavProps {
  categories: MenuCategory[];
}

const CategoryNav: React.FC<CategoryNavProps> = ({ categories }) => {
  const [activeId, setActiveId] = useState<string>(categories[0].id);
  const navRef = useRef<HTMLDivElement>(null);

  const scrollToCategory = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            // Optional: scroll nav to keep active item in view
          }
        });
      },
      { rootMargin: '-150px 0px -50% 0px', threshold: 0.1 } 
    );

    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  return (
    <div className="sticky top-0 z-40 bg-primary-950/90 backdrop-blur-md border-b border-primary-800 shadow-xl">
      <div className="max-w-7xl mx-auto overflow-x-auto hide-scrollbar" ref={navRef}>
        <div className="flex justify-start md:justify-center items-center min-w-max px-4 md:px-8 py-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`
                group relative px-5 py-4 text-xs md:text-sm uppercase tracking-[0.15em] font-sans font-medium transition-all duration-300
                ${activeId === cat.id ? 'text-accent-400' : 'text-primary-300 hover:text-white'}
              `}
            >
              {cat.title}
              <span className={`
                absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-accent-400 transition-all duration-300
                ${activeId === cat.id ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50'}
              `} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;
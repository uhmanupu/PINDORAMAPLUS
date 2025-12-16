import React from 'react';
import { Brand } from '../types';

interface BrandNavProps {
    onBrandSelect: (category: string) => void;
}

const brands: Brand[] = [
  { id: '1', name: 'Cinema', image: '', colorStart: '#003366', colorEnd: '#0055A4', filterCategory: 'Ação' }, // Azul Profundo
  { id: '2', name: 'Natureza', image: '', colorStart: '#004d00', colorEnd: '#008000', filterCategory: 'Natureza' }, // Verde Puro
  { id: '3', name: 'Ficção', image: '', colorStart: '#008b8b', colorEnd: '#00ced1', filterCategory: 'Ficção' }, // Ciano/Turquesa
  { id: '4', name: 'Fantasia', image: '', colorStart: '#1a1a2e', colorEnd: '#16213e', filterCategory: 'Fantasia' }, // Azul Noturno
  { id: '5', name: 'Desenhos', image: '', colorStart: '#d4af37', colorEnd: '#ffd700', filterCategory: 'Aventura' }, // Dourado/Amarelo
];

const BrandNav: React.FC<BrandNavProps> = ({ onBrandSelect }) => {
  return (
    <div className="px-4 md:px-12 py-8 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
      {brands.map((brand) => (
        <div
          key={brand.id}
          onClick={() => brand.filterCategory && onBrandSelect(brand.filterCategory)}
          className="relative h-24 md:h-32 rounded-lg border border-white/10 bg-white/5 shadow-xl cursor-pointer overflow-hidden transition-all duration-300 transform hover:scale-105 hover:border-white/40 hover:shadow-2xl group backdrop-blur-sm"
        >
          {/* Background Gradient matching brand - subtle opacity */}
          <div 
            className="absolute inset-0 opacity-40 group-hover:opacity-90 transition-opacity duration-500"
            style={{ background: `linear-gradient(135deg, ${brand.colorStart}, ${brand.colorEnd})` }}
          />
          
          {/* Content */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
             <span className="text-white font-bold tracking-widest text-lg md:text-xl drop-shadow-lg uppercase">
               {brand.name}
             </span>
             {/* Simulated glass shine effect */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandNav;
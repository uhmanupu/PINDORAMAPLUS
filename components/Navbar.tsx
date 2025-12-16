import React from 'react';
import { Home, Search, Plus, Star, Tv, Film } from './Icons';
import { ViewState } from '../types';

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const navItems = [
    { icon: Home, label: 'Início', view: ViewState.HOME },
    { icon: Search, label: 'Pesquisar', view: ViewState.SEARCH },
    { icon: Plus, label: 'Minha Lista', view: ViewState.WATCHLIST },
    { icon: Star, label: 'Originais', view: ViewState.ORIGINALS },
    { icon: Film, label: 'Filmes', view: ViewState.MOVIES },
    { icon: Tv, label: 'Séries', view: ViewState.SERIES },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] z-50 flex items-center px-4 md:px-9 transition-all duration-500 bg-[#010a05]/70 backdrop-blur-xl border-b border-white/5">
      {/* Logo */}
      <div 
        className="mr-8 md:mr-12 cursor-pointer font-bold text-2xl md:text-3xl tracking-tighter"
        onClick={() => setView(ViewState.HOME)}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-yellow-300 to-blue-400 drop-shadow-sm filter brightness-110">
          PINDORAMA+
        </span>
      </div>

      {/* Nav Links - Hidden on Mobile, Visible on Desktop */}
      <div className="hidden md:flex items-center gap-8 flex-1">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setView(item.view)}
            className={`flex items-center gap-2 text-[13px] font-bold tracking-[1.42px] uppercase transition-colors relative group ${
              currentView === item.view ? 'text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <item.icon className="w-4 h-4 mb-1" />
            <span className="relative">
              {item.label}
              <span className={`absolute -bottom-1.5 left-0 h-[2px] bg-gradient-to-r from-emerald-400 to-yellow-400 transition-all duration-300 ${
                currentView === item.view ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </span>
          </button>
        ))}
      </div>

      {/* Mobile Nav Icon (Simulated) */}
      <div className="md:hidden flex-1 flex justify-end gap-4 items-center">
        <button onClick={() => setView(ViewState.SEARCH)} className="p-2">
            <Search className="w-6 h-6 text-white" />
        </button>
        {/* Mobile Menu Icon would go here in a real implementation */}
      </div>

      {/* Profile Avatar */}
      <div className="hidden md:block w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-white/50 transition-all cursor-pointer ml-auto shadow-lg">
        <img 
          src="https://picsum.photos/seed/avatar1/200" 
          alt="Perfil" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Mobile Profile Avatar */}
       <div className="md:hidden w-8 h-8 rounded-full overflow-hidden border-2 border-transparent ml-2">
        <img 
          src="https://picsum.photos/seed/avatar1/200" 
          alt="Perfil" 
          className="w-full h-full object-cover"
        />
      </div>
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Movie } from '../types';
import { Play, Plus, X } from './Icons'; // Using X as checkmark replacement roughly or toggle icon

interface HeroProps {
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  watchlist: string[];
}

const Hero: React.FC<HeroProps> = ({ movies, onPlay, onToggleWatchlist, watchlist }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % movies.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [movies.length]);

  const movie = movies[currentIndex];

  if (!movie) return null;

  const isInWatchlist = watchlist.includes(movie.id);

  return (
    <div className="relative w-full h-[350px] md:h-[500px] lg:h-[75vh] mt-[72px] mb-6 group">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={movie.backdrop || movie.image}
          alt={movie.title}
          className="w-full h-full object-cover object-top opacity-80 transition-opacity duration-1000"
        />
        {/* Gradients to fade into background - Updated to match #010a05 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#010a05] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#010a05] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl leading-tight">
          {movie.title}
        </h1>
        
        <div className="flex items-center gap-3 text-sm md:text-base text-gray-300 mb-6 font-medium drop-shadow-md">
          <span className="glass-panel px-2 py-0.5 rounded text-white text-xs border border-white/20">
             {movie.type === 'movie' ? 'Filme' : 'Série'}
          </span>
          <span>{movie.year || 2024}</span>
          <span>•</span>
          <span>{movie.category}</span>
          <span>•</span>
          <span>{movie.duration || '2h 15m'}</span>
        </div>

        <p className="text-gray-100 text-sm md:text-lg mb-8 line-clamp-3 md:line-clamp-4 drop-shadow-lg max-w-xl text-shadow-sm">
          {movie.description}
        </p>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onPlay(movie)}
            className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3.5 rounded hover:bg-gray-200 transition-all font-bold uppercase tracking-wide text-sm md:text-base min-w-[140px] shadow-lg hover:scale-105 transform duration-200"
          >
            <Play className="w-5 h-5 fill-black" />
            Assistir
          </button>
          <button 
            onClick={() => onToggleWatchlist(movie)}
            className="flex items-center justify-center gap-2 bg-black/40 border border-white/30 text-white px-6 py-3.5 rounded hover:bg-white/10 transition-all font-bold uppercase tracking-wide text-sm md:text-base min-w-[140px] backdrop-blur-md shadow-lg"
          >
            {isInWatchlist ? (
                <>
                    <span className="text-yellow-400 text-lg">✓</span>
                    Na Lista
                </>
            ) : (
                <>
                    <Plus className="w-5 h-5" />
                    Minha Lista
                </>
            )}
          </button>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-4 right-12 flex gap-2">
        {movies.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
              idx === currentIndex ? 'w-8 bg-white' : 'w-2 bg-gray-500 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
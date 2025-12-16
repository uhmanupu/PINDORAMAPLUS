import React from 'react';
import { Movie } from '../types';

interface ContentRowProps {
  title: string;
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, movies, onMovieClick }) => {
  return (
    <div className="mb-8 px-4 md:px-12 group">
      <h2 className="text-gray-200 text-lg md:text-xl font-bold mb-3 pl-1 group-hover:text-white transition-colors drop-shadow-md">
        {title}
      </h2>
      <div className="flex overflow-x-auto gap-4 pb-6 pt-2 no-scrollbar scroll-smooth">
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieClick(movie)}
            className="relative min-w-[200px] md:min-w-[260px] h-[112px] md:h-[146px] rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:z-10 bg-white/5 border border-white/10 hover:border-white/50 shadow-lg overflow-hidden shrink-0 backdrop-blur-md"
          >
            <img
              src={movie.image}
              alt={movie.title}
              className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-2 left-2 right-2">
                <p className="text-white text-xs font-bold drop-shadow-md truncate opacity-0 hover:opacity-100 transition-opacity transform translate-y-2 hover:translate-y-0 duration-300">
                    {movie.title}
                </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
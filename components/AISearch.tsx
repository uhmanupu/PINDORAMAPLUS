import React, { useState, useEffect } from 'react';
import { Sparkles, Play, Plus, X } from './Icons';
import { getAIRecommendations } from '../services/geminiService';
import { Movie } from '../types';

interface AISearchProps {
  onClose: () => void;
  onPlay: (movie: Movie) => void;
}

const AISearch: React.FC<AISearchProps> = ({ onClose, onPlay }) => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResults([]);

    try {
      const data = await getAIRecommendations(query);
      
      const mappedMovies: Movie[] = data.recommendations.map((rec, index) => {
          // Map visual keys to picsum images for demo
          let imageId = 10;
          if (rec.visualKey === 'nature') imageId = 28;
          if (rec.visualKey === 'city') imageId = 44;
          if (rec.visualKey === 'space') imageId = 54;
          if (rec.visualKey === 'fantasy') imageId = 88;
          if (rec.visualKey === 'action') imageId = 200;
          if (rec.visualKey === 'romance') imageId = 320;
          if (rec.visualKey === 'horror') imageId = 666; 
          if (rec.visualKey === 'cartoon') imageId = 111;

          return {
              id: `ai-${index}`,
              title: rec.title,
              description: rec.description,
              image: `https://picsum.photos/id/${imageId}/500/281`,
              backdrop: `https://picsum.photos/id/${imageId}/1200/675`,
              category: rec.genre,
              matchScore: 90 + Math.floor(Math.random() * 9),
          }
      });

      setResults(mappedMovies);
    } catch (err) {
      setError("Falha ao obter recomendações. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12 animate-fade-in bg-black/40">
        <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 drop-shadow-sm">
                P+ IA
            </h2>
            <p className="text-gray-200 mb-8 text-lg font-light">
                Descreva o que você quer assistir e nossa IA criará uma lista personalizada para você.
            </p>
            
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="ex: 'Um filme de ficção com final feliz' ou 'Documentários sobre a Amazônia'"
                    className="w-full h-16 bg-white/10 backdrop-blur-md border border-white/20 focus:border-emerald-400 rounded-full px-8 text-xl text-white outline-none transition-all shadow-xl placeholder-gray-400"
                    autoFocus
                />
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="absolute right-2 top-2 h-12 w-12 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center hover:scale-105 transition-all disabled:opacity-50 shadow-lg"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                        <Sparkles className="w-6 h-6 text-white" />
                    )}
                </button>
            </form>
        </div>

        {error && <div className="text-red-400 text-center mb-8 bg-red-900/20 py-2 rounded border border-red-500/20">{error}</div>}

        {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                {results.map((movie) => (
                    <div key={movie.id} className="glass-panel rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-white/30 bg-[#112218]/50">
                        <div className="relative h-48">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 bg-emerald-500/90 text-black text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                                {movie.matchScore}% Compatível
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                            <p className="text-xs text-yellow-300 mb-2 font-bold uppercase tracking-wider">{movie.category}</p>
                            <p className="text-gray-300 text-sm line-clamp-3 mb-4 font-light">{movie.description}</p>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => onPlay(movie)}
                                    className="flex-1 bg-white text-black py-2 rounded font-bold text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Assistir
                                </button>
                                <button className="w-10 flex items-center justify-center border border-gray-500 rounded hover:bg-white/10 hover:border-white transition-all">
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};

export default AISearch;
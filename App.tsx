import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandNav from './components/BrandNav';
import ContentRow from './components/ContentRow';
import AISearch from './components/AISearch';
import VideoPlayer from './components/VideoPlayer';
import IntroAnimation from './components/IntroAnimation';
import { ViewState, Movie } from './types';
import { X, Play, Plus } from './components/Icons';

// Mock Data Translated & Enhanced
const MOCK_MOVIES: Movie[] = [
  { id: '1', title: 'A Grande Aventura', description: 'Uma jornada através das montanhas místicas para encontrar a cidade perdida de ouro antes que o império a destrua.', category: 'Aventura', image: 'https://picsum.photos/id/1018/800/450', backdrop: 'https://picsum.photos/id/1018/1600/900', year: 2023, duration: '2h 14m', type: 'movie', isOriginal: false, videoId: 'K_9tX4eHztY' },
  { id: '2', title: 'Azul Profundo', description: 'Explore as profundezas do oceano onde criaturas desconhecidas espreitam na escuridão.', category: 'Natureza', image: 'https://picsum.photos/id/1015/800/450', backdrop: 'https://picsum.photos/id/1015/1600/900', year: 2022, duration: '1h 45m', type: 'series', isOriginal: true, videoId: 'JkaxUblCGz0' },
  { id: '3', title: 'Cidade Cyber', description: 'Em 2077, um detetive de IA desonesto tenta resolver o assassinato de um humano sintético.', category: 'Ficção', image: 'https://picsum.photos/id/1033/800/450', backdrop: 'https://picsum.photos/id/1033/1600/900', year: 2024, duration: '2h 30m', type: 'series', isOriginal: true, videoId: 'qEVUtrk8_B4' },
  { id: '4', title: 'Sussurros da Floresta', description: 'As árvores têm olhos e o vento carrega segredos do passado.', category: 'Fantasia', image: 'https://picsum.photos/id/1039/800/450', backdrop: 'https://picsum.photos/id/1039/1600/900', year: 2021, duration: '1h 55m', type: 'movie', isOriginal: false, videoId: 'VngD3Q88dC4' },
  { id: '5', title: 'Velocidade Máxima', description: 'Corridas de alta octanagem no deserto sem regras.', category: 'Ação', image: 'https://picsum.photos/id/1071/800/450', backdrop: 'https://picsum.photos/id/1071/1600/900', year: 2023, duration: '2h 05m', type: 'movie', isOriginal: false, videoId: 'N93j6A020k0' },
  { id: '6', title: 'Vida Tranquila', description: 'Um drama sobre uma pequena vila nos Alpes.', category: 'Drama', image: 'https://picsum.photos/id/1080/800/450', backdrop: 'https://picsum.photos/id/1080/1600/900', year: 2020, duration: '1h 30m', type: 'series', isOriginal: false, videoId: 'Z9AYPxH5NTM' },
  { id: '7', title: 'O Último Guerreiro', description: 'Um samurai solitário busca redenção em um mundo esquecido.', category: 'Ação', image: 'https://picsum.photos/id/1060/800/450', backdrop: 'https://picsum.photos/id/1060/1600/900', year: 2021, duration: '2h 00m', type: 'movie', isOriginal: true, videoId: 'Y9Jv1sLw5v4' },
  { id: '8', title: 'Reino dos Céus', description: 'Documentário sobre as aves mais raras do planeta.', category: 'Natureza', image: 'https://picsum.photos/id/1025/800/450', backdrop: 'https://picsum.photos/id/1025/1600/900', year: 2023, duration: '50m', type: 'series', isOriginal: true, videoId: 'F2fR4t7X70U' },
];

// Palette-compliant Genre Styles (Blue, Green, Yellow, White)
const GENRE_STYLES: Record<string, { gradient: string, shadow: string }> = {
  'Todos': { gradient: 'from-gray-100 to-gray-400', shadow: 'shadow-white/20' },
  'Ação': { gradient: 'from-blue-600 to-blue-400', shadow: 'shadow-blue-500/50' },
  'Aventura': { gradient: 'from-yellow-500 to-yellow-300', shadow: 'shadow-yellow-500/50' },
  'Ficção': { gradient: 'from-cyan-600 to-blue-500', shadow: 'shadow-cyan-500/50' },
  'Fantasia': { gradient: 'from-indigo-900 to-blue-800', shadow: 'shadow-indigo-500/50' },
  'Drama': { gradient: 'from-yellow-600 to-amber-500', shadow: 'shadow-amber-500/50' },
  'Natureza': { gradient: 'from-emerald-600 to-green-400', shadow: 'shadow-emerald-500/50' },
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<string>('Todos');
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showIntro, setShowIntro] = useState<boolean>(true);

  // Handle intro animation timing
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowIntro(false);
    }, 4000); // 3.5s animation + 0.5s buffer
    return () => clearTimeout(timer);
  }, []);

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
    if (view !== ViewState.CATALOGUE) {
        setSelectedGenre('Todos');
    }
  }, [view]);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeDetail = () => {
    setSelectedMovie(null);
  };

  const handlePlay = (movie: Movie) => {
    setSelectedMovie(movie); // Ensure details are available if needed
    setIsPlaying(true);
  };

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist(prev => 
        prev.includes(movie.id) 
            ? prev.filter(id => id !== movie.id) 
            : [...prev, movie.id]
    );
  };

  const handleBrandSelect = (category: string) => {
    setSelectedGenre(category);
    setView(ViewState.CATALOGUE);
  };

  // Logic to determine which movies to show based on the current ViewState
  const getDisplayMovies = () => {
    let movies = MOCK_MOVIES;

    // Filter by View Context
    if (view === ViewState.MOVIES) {
        movies = movies.filter(m => m.type === 'movie');
    } else if (view === ViewState.SERIES) {
        movies = movies.filter(m => m.type === 'series');
    } else if (view === ViewState.ORIGINALS) {
        movies = movies.filter(m => m.isOriginal);
    } else if (view === ViewState.WATCHLIST) {
        movies = movies.filter(m => watchlist.includes(m.id));
    } else if (view === ViewState.CATALOGUE) {
        // Catalogue uses the genre filter directly as primary filter if set
        // But we also apply the genre filter below for all views
    }

    // Apply Genre Filter (except for Watchlist where we usually want to see everything)
    if (selectedGenre !== 'Todos' && view !== ViewState.WATCHLIST) {
        movies = movies.filter(m => m.category === selectedGenre);
    }

    return movies;
  };

  const filteredMovies = getDisplayMovies();
  const isGridView = [ViewState.MOVIES, ViewState.SERIES, ViewState.ORIGINALS, ViewState.WATCHLIST, ViewState.CATALOGUE].includes(view);

  // Helper title for Grid Views
  const getPageTitle = () => {
      switch(view) {
          case ViewState.MOVIES: return 'Filmes';
          case ViewState.SERIES: return 'Séries';
          case ViewState.ORIGINALS: return 'Originais P+';
          case ViewState.WATCHLIST: return 'Minha Lista';
          case ViewState.CATALOGUE: return selectedGenre !== 'Todos' ? selectedGenre : 'Catálogo';
          default: return '';
      }
  };

  return (
    <div className="min-h-screen text-white font-sans selection:bg-emerald-500 selection:text-black">
      {/* Intro Animation Layer */}
      {showIntro && <IntroAnimation />}

      <Navbar currentView={view} setView={setView} />

      {/* Main Content Area */}
      {view === ViewState.HOME && (
        <main className="pb-20">
          <Hero 
            movies={MOCK_MOVIES.slice(0, 5)} 
            onPlay={handlePlay}
            onToggleWatchlist={toggleWatchlist}
            watchlist={watchlist}
          />
          <BrandNav onBrandSelect={handleBrandSelect} />
          
          <ContentRow 
            title="Recomendado para Você" 
            movies={MOCK_MOVIES} 
            onMovieClick={handleMovieClick} 
          />
          {watchlist.length > 0 && (
            <ContentRow 
                title="Minha Lista" 
                movies={MOCK_MOVIES.filter(m => watchlist.includes(m.id))} 
                onMovieClick={handleMovieClick} 
            />
          )}
          <ContentRow 
            title="Novidades no P+" 
            movies={[...MOCK_MOVIES].reverse()} 
            onMovieClick={handleMovieClick} 
          />
          <ContentRow 
            title="Originais P+" 
            movies={MOCK_MOVIES.filter(m => m.isOriginal)} 
            onMovieClick={handleMovieClick} 
          />
        </main>
      )}

      {view === ViewState.SEARCH && (
        <AISearch 
            onClose={() => setView(ViewState.HOME)} 
            onPlay={handlePlay}
        />
      )}

      {isGridView && (
         <div className="min-h-screen pt-24 px-4 md:px-12 animate-fade-in bg-black/30">
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-200 to-blue-400 drop-shadow-sm">
                    {getPageTitle()}
                </h1>
                {view === ViewState.WATCHLIST 
                    ? <p className="text-gray-300 text-lg">Seus títulos salvos.</p>
                    : <p className="text-gray-300 text-lg">Explore nosso catálogo completo.</p>
                }
            </div>

            {/* Dynamic Glass Pill Filter Buttons */}
            {view !== ViewState.WATCHLIST && (
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {Object.entries(GENRE_STYLES).map(([genre, style]) => {
                        const isSelected = selectedGenre === genre;
                        return (
                            <button
                                key={genre}
                                onClick={() => setSelectedGenre(genre)}
                                className={`
                                    relative px-6 py-2.5 rounded-full overflow-hidden transition-all duration-500 ease-out group
                                    border border-white/10
                                    ${isSelected ? `scale-110 border-white/50 ${style.shadow} shadow-lg` : 'hover:scale-105 hover:border-white/30'}
                                `}
                            >
                                {/* Background: Dark glass by default, Full gradient when selected */}
                                <div className={`
                                    absolute inset-0 transition-all duration-500
                                    ${isSelected ? `bg-gradient-to-r ${style.gradient} opacity-100` : 'bg-white/5 backdrop-blur-md'}
                                `} />

                                {/* Hover Glow Effect (only when not selected) */}
                                {!isSelected && (
                                    <div className={`
                                        absolute inset-0 bg-gradient-to-r ${style.gradient} 
                                        opacity-0 group-hover:opacity-30 transition-opacity duration-500
                                    `} />
                                )}
                                
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                {/* Text */}
                                <span className={`
                                    relative z-10 font-bold tracking-wide text-sm md:text-base
                                    ${isSelected ? 'text-black drop-shadow-sm' : 'text-gray-300 group-hover:text-white'}
                                `}>
                                    {genre}
                                </span>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Grid */}
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
                {filteredMovies.map((movie) => (
                    <div 
                        key={movie.id} 
                        onClick={() => handleMovieClick(movie)}
                        className="glass-panel rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:border-white/50 group bg-[#112218]/50"
                    >
                        <div className="relative aspect-video">
                            <img src={movie.image} alt={movie.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            {watchlist.includes(movie.id) && (
                                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow-lg">
                                    NA LISTA
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold text-white text-sm md:text-base truncate">{movie.title}</h3>
                            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{movie.category} • {movie.year}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            {filteredMovies.length === 0 && (
                <div className="text-center py-20 text-gray-400 bg-white/5 rounded-lg border border-white/5 mx-auto max-w-2xl backdrop-blur-sm">
                    {view === ViewState.WATCHLIST ? (
                         <>
                            <p className="text-xl mb-4">Sua lista está vazia.</p>
                            <button 
                                onClick={() => setView(ViewState.HOME)}
                                className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-gray-200 transition-colors"
                            >
                                Descobrir Títulos
                            </button>
                         </>
                    ) : (
                        <>
                            <p className="text-lg">Nenhum título encontrado para "{selectedGenre}".</p>
                            <button 
                                onClick={() => setSelectedGenre('Todos')}
                                className="mt-4 text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
                            >
                                Ver todos os títulos
                            </button>
                        </>
                    )}
                </div>
            )}
         </div>
      )}

      {/* Movie Detail Modal */}
      {selectedMovie && !isPlaying && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative w-full max-w-5xl bg-[#0b1a12]/95 rounded-xl overflow-hidden shadow-2xl border border-white/10 animate-scale-up backdrop-blur-xl">
            
            <button 
                onClick={closeDetail}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full hover:bg-white/20 transition-all border border-white/10 group"
            >
                <X className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            <div className="relative aspect-video">
                <img 
                    src={selectedMovie.backdrop || selectedMovie.image} 
                    alt={selectedMovie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a12] via-transparent to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-2xl">{selectedMovie.title}</h2>
                    <div className="flex gap-4 mb-6">
                        <button 
                            onClick={() => handlePlay(selectedMovie)}
                            className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded hover:bg-gray-200 transition-colors font-bold uppercase tracking-widest text-sm shadow-lg hover:scale-105 transform duration-200"
                        >
                            <Play className="w-5 h-5 fill-black" /> Assistir
                        </button>
                        <button 
                            onClick={() => toggleWatchlist(selectedMovie)}
                            className="flex items-center gap-2 bg-black/60 border border-white/30 text-white px-8 py-3 rounded hover:bg-white/10 transition-colors font-bold uppercase tracking-widest text-sm backdrop-blur-md"
                        >
                            {watchlist.includes(selectedMovie.id) ? (
                                <><span>✓</span> Na Lista</>
                            ) : (
                                <><Plus className="w-5 h-5" /> Minha Lista</>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="p-8 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="flex items-center gap-3 text-gray-300 text-sm mb-4">
                        <span className="border border-gray-500 px-1 rounded text-xs">HD</span>
                        <span className="border border-gray-500 px-1 rounded text-xs">5.1</span>
                        <span>{selectedMovie.year || 2024}</span>
                        <span>•</span>
                        <span>{selectedMovie.duration || '2h 10m'}</span>
                        <span>•</span>
                        <span>{selectedMovie.category}</span>
                    </div>
                    <p className="text-gray-200 text-lg leading-relaxed font-light">
                        {selectedMovie.description}
                    </p>
                </div>
                <div className="text-gray-400 text-sm space-y-3 p-4 bg-white/5 rounded-lg border border-white/5">
                    <p><span className="text-gray-200 font-bold block mb-1">Diretor:</span> Jane Doe</p>
                    <p><span className="text-gray-200 font-bold block mb-1">Elenco:</span> John Smith, Sarah Connor</p>
                    <p><span className="text-gray-200 font-bold block mb-1">Gênero:</span> {selectedMovie.category}</p>
                </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Overlay */}
      {isPlaying && selectedMovie && (
        <VideoPlayer 
            movie={selectedMovie} 
            onClose={() => setIsPlaying(false)} 
        />
      )}
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Defina a Interface (Estrutura do dado que você espera do TMDB)
interface Movie {
  id: number;
  title: string;
  overview: string; // TMDB usa 'overview' para a sinopse
  poster_path: string | null; // Usaremos no futuro para as imagens
}

// 2. Interface para a resposta completa do TMDB (contém o array 'results')
interface TMDBResponse {
    results: Movie[];
}


// Sua chave de API, agora diretamente no código (PARA TESTE, idealmente em variáveis de ambiente)
const TMDB_KEY = "8896b0775ab7c42f8e5d105a36a92d7a"; 
// Endpoint: Filmes Populares, com chave e em Português-BR
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=pt-BR`; 


const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<TMDBResponse>(apiUrl)
      .then(response => {
        // 3. ATENÇÃO: A lista de filmes está em response.data.results
        setMovies(response.data.results); 
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar filmes:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Carregando filmes reais do TMDB...</h2>
        </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>PINDORAMAPLUS (Filmes Populares)</h1>
      <p>Total de Filmes Carregados: {movies.length}</p>
      
      {/* Mapeia a lista de filmes para exibir */}
      {movies.map(movie => (
        <div 
          key={movie.id} 
          style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '10px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h2>🎬 {movie.title}</h2>
          <p>ID: {movie.id}</p>
          {/* Agora usamos 'movie.overview' para a sinopse */}
          <p>Sinopse: {movie.overview || "Sinopse não disponível."}</p>
        </div>
      ))}
    </div>
  );
};


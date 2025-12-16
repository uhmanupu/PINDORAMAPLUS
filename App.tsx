import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Defina a Interface (Estrutura do dado que você espera do TMDB)
interface Movie {
  id: number;
  title: string;
  overview: string; 
  poster_path: string | null; 
}

// 2. Interface para a resposta completa do TMDB (contém o array 'results')
interface TMDBResponse {
    results: Movie[];
}

// A CHAVE É AGORA BUSCADA DE UMA VARIÁVEL DE AMBIENTE (REQUERIDO PELO VERCEL/REACT)
const TMDB_KEY = process.env.REACT_APP_TMDB_KEY; 

// Endpoint: Filmes Populares, com chave e em Português-BR
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_KEY}&language=pt-BR`; 


const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Adicione uma verificação de segurança, caso a variável de ambiente não esteja definida
    if (!TMDB_KEY) {
        console.error("Erro: A chave TMDB não foi definida na Variável de Ambiente.");
        setLoading(false);
        return;
    }

    axios.get<TMDBResponse>(apiUrl)
      .then(response => {
        // A lista de filmes está em response.data.results
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
          <p>Sinopse: {movie.overview || "Sinopse não disponível."}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 1. Defina a Interface (Estrutura do dado que você espera)
interface Movie {
  id: number;
  title: string;
  body: string; // Usaremos 'body' como a descrição/sinopse
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // URL de Teste: Buscaremos 5 'posts' que simulam 5 'filmes'
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts?_limit=5'; 
    
    axios.get<Movie[]>(apiUrl)
      .then(response => {
        // 2. Armazena a lista de filmes no estado
        setMovies(response.data); 
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
            <h2>Carregando filmes...</h2>
        </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>PINDORAMAPLUS (Simulação de API)</h1>
      <p>Total de Filmes Carregados: {movies.length}</p>
      
      {/* 3. Mapeia a lista de filmes para exibir */}
      {movies.map(movie => (
        <div 
          key={movie.id} 
          style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '10px' 
          }}
        >
          <h2>🎬 {movie.title}</h2>
          <p>ID: {movie.id}</p>
          <p>Sinopse: {movie.body.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
};

export default App;
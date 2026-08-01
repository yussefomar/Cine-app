import { useEffect, useState } from 'react';
import { movies as fallbackMovies } from '../data/movies';
import { api } from '../services/api';
import { normalizeMovie } from '../utils/movies';

export function useMovies(fecha = '') {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const query = fecha ? `?fecha=${encodeURIComponent(fecha)}` : '';

    setLoading(true);
    setError('');
    api(`/funciones${query}`)
      .then(response => setMovies(response.data.map(normalizeMovie)))
      .catch(() => {
        setMovies(fallbackMovies);
        setError('No pudimos conectar con la API. Se muestran datos de demostración.');
      })
      .finally(() => setLoading(false));
  }, [fecha]);

  return { movies, loading, error };
}

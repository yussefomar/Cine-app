import { useNavigate } from 'react-router-dom';
import { Poster } from './Poster';

export function MovieTile({ movie }) {
  const navigate = useNavigate();

  return <article className="movie-tile" onClick={() => navigate(`/pelicula/${movie.id}`)}>
    <Poster movie={movie} large />
    <div className="pt-3">
      <div className="d-flex gap-2 mb-2">
        <span className="rating">{movie.rating}</span>
        <span className="meta">{movie.format}</span>
      </div>
      <h3>{movie.title}</h3>
      <p>{movie.genre} · {movie.duration} min</p>
    </div>
  </article>;
}

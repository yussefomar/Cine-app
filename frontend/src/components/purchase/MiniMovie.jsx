import { Poster } from '../movies/Poster';

export function MiniMovie({ movie, children }) {
  return <div className="mini-movie">
    <Poster movie={movie} />
    <div><b>{movie.title}</b>{children}</div>
  </div>;
}

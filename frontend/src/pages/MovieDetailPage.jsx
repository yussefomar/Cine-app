import { Link, useParams } from 'react-router-dom';
import { Loading } from '../components/feedback/Loading';
import { Poster } from '../components/movies/Poster';
import { useMovies } from '../hooks/useMovies';

export function MovieDetailPage() {
    const { id } = useParams();
    const { movies, loading } = useMovies();
    if (loading) return <Loading />;

    const movie = movies.find((item) => item.id === Number(id)) || movies[0];
    const screenings =
        movie.screenings || movie.times.map((time) => ({ id: movie.id, time }));

    return (
        <main className="detail-page">
            <div className="container py-5">
                <Link className="back" to="/cartelera">
                    <i className="bi bi-arrow-left" /> Volver a cartelera
                </Link>
                <div className="row g-5 align-items-center mt-2">
                    <div className="col-md-4 col-lg-3">
                        <Poster movie={movie} large />
                    </div>
                    <div className="col-md-8">
                        <span className="eyebrow">AHORA EN CINES</span>
                        <h1>{movie.title}</h1>
                        <p className="lead">{movie.description}</p>
                        <div className="detail-meta">
                            <span>{movie.rating}</span>
                            <span>{movie.duration} min</span>
                            <span>{movie.genre}</span>
                            <span>{movie.format}</span>
                        </div>
                        <h4 className="mt-4 mb-3">Elegí un horario</h4>
                        <div className="showtimes">
                            {screenings.map((screening) => (
                                <Link
                                    key={screening.id}
                                    to={`/funcion/${screening.id}/asientos?movie=${movie.id}`}
                                >
                                    {screening.time}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

import { Link } from 'react-router-dom';
import { Loading } from '../components/feedback/Loading';
import { MovieTile } from '../components/movies/MovieTile';
import { Poster } from '../components/movies/Poster';
import { useMovies } from '../hooks/useMovies';

export function HomePage() {
    const { movies, loading } = useMovies();
    if (loading) return <Loading />;

    const benefits = [
        ['ticket-perforated', 'Compra simple', 'Tu entrada en pocos pasos.'],
        ['grid-3x3-gap', 'Elegí tu lugar', 'Reservá el mejor asiento.'],
        ['shield-check', 'Pago seguro', 'Tus datos siempre protegidos.'],
    ];

    return (
        <main>
            <section className="home-hero">
                <div className="container py-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="eyebrow">
                                <i className="bi bi-stars" /> ESTRENOS DE LA
                                SEMANA
                            </span>
                            <h1>Tu próxima gran historia empieza acá.</h1>
                            <p>
                                Elegí la película, reservá tu asiento favorito y
                                disfrutá del cine como nunca antes.
                            </p>
                            <Link
                                className="btn btn-primary btn-lg rounded-pill px-4"
                                to="/cartelera"
                            >
                                Ver cartelera{' '}
                                <i className="bi bi-arrow-right ms-2" />
                            </Link>
                        </div>
                        <div className="col-lg-6 hero-posters">
                            {movies.slice(0, 3).map((movie, index) => (
                                <div
                                    className={`hero-poster p${index}`}
                                    key={movie.id}
                                >
                                    <Poster movie={movie} large />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className="container section-space">
                <div className="section-title">
                    <div>
                        <span>EN CARTELERA</span>
                        <h2>Historias para todos</h2>
                    </div>
                    <Link to="/cartelera">
                        Ver todas <i className="bi bi-arrow-right" />
                    </Link>
                </div>
                <div className="row g-4">
                    {movies.map((movie) => (
                        <div className="col-6 col-lg-3" key={movie.id}>
                            <MovieTile movie={movie} />
                        </div>
                    ))}
                </div>
            </section>
            <section className="benefits">
                <div className="container">
                    <div className="row g-4">
                        {benefits.map(([icon, title, description]) => (
                            <div className="col-md-4" key={title}>
                                <div className="benefit">
                                    <i className={`bi bi-${icon}`} />
                                    <div>
                                        <b>{title}</b>
                                        <p>{description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

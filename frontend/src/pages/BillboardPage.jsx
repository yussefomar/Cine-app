import { useState } from 'react';
import { Loading } from '../components/feedback/Loading';
import { FunctionCard } from '../components/movies/FunctionCard';
import { useMovies } from '../hooks/useMovies';

export function BillboardPage() {
    const [date, setDate] = useState('2026-07-30');
    const { movies, loading, error } = useMovies(date);
    const [query, setQuery] = useState('');
    const [format, setFormat] = useState('Todos');
    if (loading) return <Loading />;

    const filtered = movies.filter(
        (movie) =>
            (format === 'Todos' || movie.format === format) &&
            movie.title.toLowerCase().includes(query.toLowerCase()),
    );

    return (
        <main className="page-bg">
            <div className="container py-5">
                <div className="page-heading">
                    <span className="heading-icon">
                        <i className="bi bi-calendar3" />
                    </span>
                    <div>
                        <h1>Funciones disponibles</h1>
                        <p>
                            Elegí la película, fecha y horario que más te
                            convenga.
                        </p>
                    </div>
                </div>
                <div className="row g-4 mt-2">
                    <aside className="col-lg-3">
                        <div className="panel sticky-lg-top">
                            <h4>Filtrar funciones</h4>
                            <label>Buscar película</label>
                            <div className="input-icon">
                                <i className="bi bi-search" />
                                <input
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                    placeholder="Título..."
                                />
                            </div>
                            <label>Fecha</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                            />
                            <label>Formato</label>
                            <div className="format-options">
                                {['Todos', '2D', '3D', 'IMAX'].map((item) => (
                                    <button
                                        className={
                                            format === item ? 'active' : ''
                                        }
                                        onClick={() => setFormat(item)}
                                        key={item}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            <button
                                className="btn btn-primary w-100 mt-4"
                                onClick={() => {
                                    setQuery('');
                                    setFormat('Todos');
                                    setDate('');
                                }}
                            >
                                Limpiar filtros
                            </button>
                        </div>
                    </aside>
                    <section className="col-lg-9">
                        {error && (
                            <div className="alert alert-warning py-2">
                                <i className="bi bi-exclamation-triangle me-2" />
                                {error}
                            </div>
                        )}
                        <div className="results-head">
                            <b>{filtered.length} películas encontradas</b>
                            <span>
                                <i className="bi bi-geo-alt" /> Cine Max ·
                                Centro
                            </span>
                        </div>
                        <div className="d-grid gap-3">
                            {filtered.map((movie) => (
                                <FunctionCard key={movie.id} movie={movie} />
                            ))}
                            {!filtered.length && (
                                <div className="empty">
                                    <i className="bi bi-camera-reels" />
                                    <h3>No hay funciones disponibles</h3>
                                    <p>
                                        Probá con otros filtros o una fecha
                                        diferente.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

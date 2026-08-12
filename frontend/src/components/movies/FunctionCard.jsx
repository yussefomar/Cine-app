import { useNavigate } from 'react-router-dom';
import { Poster } from './Poster';

export function FunctionCard({ movie }) {
    const navigate = useNavigate();
    const screenings =
        movie.screenings ||
        movie.times.map((time, index) => ({
            id: movie.id,
            time,
            format: movie.format,
            room: movie.room,
            price: movie.price,
            key: index,
        }));

    return (
        <article className="function-card">
            <Poster movie={movie} />
            <div className="movie-info">
                <div>
                    <span className="rating">{movie.rating}</span>
                    <h3>{movie.title}</h3>
                    <p className="meta-line">
                        {movie.genre} <span /> {movie.duration} min
                    </p>
                    <p>{movie.description}</p>
                </div>
                <div className="times">
                    <b>Horarios disponibles</b>
                    <div>
                        {screenings.map((screening) => (
                            <button
                                key={screening.id ?? screening.key}
                                onClick={() =>
                                    navigate(
                                        `/funcion/${screening.id}/asientos?movie=${movie.id}`,
                                    )
                                }
                            >
                                {screening.time}
                            </button>
                        ))}
                    </div>
                    <small>
                        Formato: <b>{movie.format}</b> · Sala:{' '}
                        <b>{movie.room}</b>
                    </small>
                </div>
            </div>
        </article>
    );
}

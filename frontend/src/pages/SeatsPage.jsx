import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loading } from '../components/feedback/Loading';
import { Stepper } from '../components/navigation/Stepper';
import { MiniMovie } from '../components/purchase/MiniMovie';
import { movies as fallbackMovies } from '../data/movies';
import { api } from '../services/api';
import { money } from '../utils/formatters';
import { normalizeMovie } from '../utils/movies';

const rows = 'ABCDEFGH'.split('');
const occupiedDemo = new Set([
    'A4',
    'A5',
    'B7',
    'B8',
    'C3',
    'C4',
    'C5',
    'C6',
    'F5',
    'F6',
    'G8',
]);

export function SeatsPage() {
    const { screeningId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const movieId = Number(new URLSearchParams(location.search).get('movie'));
    const [movie, setMovie] = useState(
        () =>
            fallbackMovies.find((item) => item.id === movieId) ||
            fallbackMovies[0],
    );
    const [screening, setScreening] = useState(null);
    const [seatData, setSeatData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiError, setApiError] = useState('');

    useEffect(() => {
        Promise.all([
            api('/funciones'),
            api(`/funciones/${screeningId}/asientos`),
        ])
            .then(([movieResponse, seatResponse]) => {
                const loadedMovie = movieResponse.data
                    .map(normalizeMovie)
                    .find((item) => item.id === seatResponse.screening.movieId);
                if (loadedMovie) setMovie(loadedMovie);
                setScreening(seatResponse.screening);
                setSeatData(seatResponse.data);
            })
            .catch(() =>
                setApiError(
                    'No se pudo cargar el plano desde la API. Se usa el plano de demostración.',
                ),
            )
            .finally(() => setLoading(false));
    }, [screeningId]);

    if (loading) return <Loading />;

    const hour = screening?.time || movie.times[0];
    const seatCodes = seatData.length
        ? seatData.map((item) => item.code)
        : rows.flatMap((row) =>
              Array.from({ length: 12 }, (_, index) => `${row}${index + 1}`),
          );
    const unavailable = seatData.length
        ? new Set(
              seatData
                  .filter((item) => item.status !== 'disponible')
                  .map((item) => item.code),
          )
        : occupiedDemo;
    const price = screening?.price || movie.price;
    const toggle = (seat) =>
        setSelected((current) =>
            current.includes(seat)
                ? current.filter((item) => item !== seat)
                : current.length < 6
                  ? [...current, seat]
                  : current,
        );

    const continueToPayment = () =>
        navigate('/pago', {
            state: {
                movie: {
                    ...movie,
                    price,
                    room: screening?.room || movie.room,
                    format: screening?.format || movie.format,
                },
                hour,
                seats: selected,
            },
        });

    return (
        <main className="page-bg">
            <div className="container py-5">
                <Stepper activeStep={2} />
                <div className="page-heading compact">
                    <span className="heading-icon">
                        <i className="bi bi-grid-3x3-gap" />
                    </span>
                    <div>
                        <h1>Elegí tus asientos</h1>
                        <p>
                            {movie.title} · Hoy {hour} · Sala{' '}
                            {screening?.room || movie.room}
                        </p>
                    </div>
                </div>
                {apiError && (
                    <div className="alert alert-warning">
                        <i className="bi bi-exclamation-triangle me-2" />
                        {apiError}
                    </div>
                )}
                <div className="row g-4">
                    <section className="col-lg-8">
                        <div className="panel seat-panel">
                            <div className="screen">PANTALLA</div>
                            <div className="screen-glow" />
                            <div className="seat-map">
                                {rows.map((row) => (
                                    <div className="seat-row" key={row}>
                                        <b>{row}</b>
                                        {seatCodes
                                            .filter((code) =>
                                                code.startsWith(row),
                                            )
                                            .map((seat) => (
                                                <button
                                                    disabled={unavailable.has(
                                                        seat,
                                                    )}
                                                    className={
                                                        selected.includes(seat)
                                                            ? 'selected'
                                                            : ''
                                                    }
                                                    onClick={() => toggle(seat)}
                                                    aria-label={`Asiento ${seat}`}
                                                    key={seat}
                                                >
                                                    {seat.slice(1)}
                                                </button>
                                            ))}
                                    </div>
                                ))}
                            </div>
                            <div className="legend">
                                <span>
                                    <i className="available" />
                                    Disponible
                                </span>
                                <span>
                                    <i className="selected" />
                                    Seleccionado
                                </span>
                                <span>
                                    <i className="occupied" />
                                    Ocupado
                                </span>
                            </div>
                        </div>
                    </section>
                    <aside className="col-lg-4">
                        <div className="panel summary-card">
                            <h3>Resumen de compra</h3>
                            <MiniMovie movie={movie}>
                                <small>Hoy · {hour}</small>
                                <small>
                                    Sala {screening?.room || movie.room} ·{' '}
                                    {screening?.format || movie.format}
                                </small>
                            </MiniMovie>
                            <hr />
                            <div className="summary-row">
                                <span>Asientos</span>
                                <b>
                                    {selected.length
                                        ? selected.join(', ')
                                        : 'Sin seleccionar'}
                                </b>
                            </div>
                            <div className="summary-row">
                                <span>{selected.length} × Entrada general</span>
                                <b>{money(selected.length * price)}</b>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <b>{money(selected.length * price)}</b>
                            </div>
                            <button
                                disabled={!selected.length}
                                className="btn btn-primary btn-lg w-100"
                                onClick={continueToPayment}
                            >
                                Continuar al pago{' '}
                                <i className="bi bi-arrow-right" />
                            </button>
                            <small className="secure">
                                <i className="bi bi-shield-lock" /> Tu reserva
                                se mantiene por 10 minutos
                            </small>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

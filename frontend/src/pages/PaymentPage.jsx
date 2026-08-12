import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Stepper } from '../components/navigation/Stepper';
import { MiniMovie } from '../components/purchase/MiniMovie';
import { Ticket } from '../components/purchase/Ticket';
import { movies as fallbackMovies } from '../data/movies';
import { money } from '../utils/formatters';

export function PaymentPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const movie = state?.movie || fallbackMovies[0];
    const seats = state?.seats || ['D6'];
    const [subscription, setSubscription] = useState(false);
    const [paid, setPaid] = useState(false);
    const subtotal = seats.length * movie.price;
    const discount = subscription ? subtotal * 0.2 : 0;
    const total = subtotal - discount;

    if (paid)
        return (
            <Ticket
                movie={movie}
                seats={seats}
                hour={state?.hour || movie.times[0]}
                total={total}
            />
        );

    return (
        <main className="page-bg">
            <div className="container py-5">
                <Stepper activeStep={3} />
                <div className="page-heading compact">
                    <span className="heading-icon">
                        <i className="bi bi-credit-card" />
                    </span>
                    <div>
                        <h1>Finalizá tu compra</h1>
                        <p>Completá los datos para recibir tus entradas.</p>
                    </div>
                </div>
                <div className="row g-4">
                    <section className="col-lg-7">
                        <div className="panel checkout">
                            <h3>Datos de contacto</h3>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label>Nombre completo</label>
                                    <input defaultValue="Juan Pérez" />
                                </div>
                                <div className="col-md-6">
                                    <label>Email</label>
                                    <input defaultValue="juan@email.com" />
                                </div>
                            </div>
                            <h3>Medio de pago</h3>
                            <div className="payment-option active">
                                <i className="bi bi-credit-card-2-front" />
                                <div>
                                    <b>Tarjeta de crédito o débito</b>
                                    <small>Visa, Mastercard, Amex</small>
                                </div>
                                <i className="bi bi-check-circle-fill" />
                            </div>
                            <label>Número de tarjeta</label>
                            <input placeholder="0000 0000 0000 0000" />
                            <div className="row g-3">
                                <div className="col-6">
                                    <label>Vencimiento</label>
                                    <input placeholder="MM/AA" />
                                </div>
                                <div className="col-6">
                                    <label>CVV</label>
                                    <input placeholder="123" />
                                </div>
                            </div>
                            <label className="subscription">
                                <input
                                    type="checkbox"
                                    checked={subscription}
                                    onChange={(event) =>
                                        setSubscription(event.target.checked)
                                    }
                                />{' '}
                                Aplicar suscripción Cine Max (20% de descuento)
                            </label>
                        </div>
                    </section>
                    <aside className="col-lg-5">
                        <div className="panel summary-card">
                            <h3>Tu compra</h3>
                            <MiniMovie movie={movie}>
                                <small>
                                    {state?.hour} · Sala {movie.room}
                                </small>
                                <small>Asientos {seats.join(', ')}</small>
                            </MiniMovie>
                            <hr />
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <b>{money(subtotal)}</b>
                            </div>
                            {discount > 0 && (
                                <div className="summary-row discount">
                                    <span>Descuento suscripción</span>
                                    <b>-{money(discount)}</b>
                                </div>
                            )}
                            <div className="summary-row total">
                                <span>Total</span>
                                <b>{money(total)}</b>
                            </div>
                            <button
                                className="btn btn-primary btn-lg w-100"
                                onClick={() => setPaid(true)}
                            >
                                <i className="bi bi-lock" /> Pagar{' '}
                                {money(total)}
                            </button>
                            <button
                                className="btn btn-link w-100 mt-2"
                                onClick={() => navigate(-1)}
                            >
                                Volver a los asientos
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

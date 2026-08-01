import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { money } from '../../utils/formatters';

export function Ticket({ movie, seats, hour, total }) {
  const code = useMemo(() => `CM-${Math.random().toString(36).slice(2, 8).toUpperCase()}`, []);

  return <main className="success-page"><div className="container py-5">
    <div className="success-icon"><i className="bi bi-check-lg" /></div>
    <h1>¡Compra confirmada!</h1>
    <p>Enviamos las entradas a tu correo. También podés descargarlas ahora.</p>
    <div className="ticket">
      <div className="ticket-main">
        <span className="eyebrow">TU ENTRADA</span><h2>{movie.title}</h2>
        <div className="ticket-data">
          <div><small>FECHA Y HORA</small><b>Hoy · {hour}</b></div>
          <div><small>SALA</small><b>{movie.room} · {movie.format}</b></div>
          <div><small>ASIENTOS</small><b>{seats.join(', ')}</b></div>
          <div><small>TOTAL</small><b>{money(total)}</b></div>
        </div>
      </div>
      <div className="ticket-code"><div className="fake-qr"><i className="bi bi-qr-code" /></div><b>{code}</b><small>Presentá este código al ingresar</small></div>
    </div>
    <div className="d-flex gap-3 justify-content-center flex-wrap">
      <button className="btn btn-primary px-4" onClick={() => window.print()}><i className="bi bi-download" /> Descargar entrada</button>
      <Link className="btn btn-outline-light px-4" to="/cartelera">Volver a cartelera</Link>
    </div>
  </div></main>;
}

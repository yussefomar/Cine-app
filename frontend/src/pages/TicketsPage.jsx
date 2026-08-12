import { Link } from 'react-router-dom';

export function TicketsPage() {
    return (
        <main className="page-bg">
            <div className="container py-5">
                <div className="page-heading">
                    <span className="heading-icon">
                        <i className="bi bi-ticket-perforated" />
                    </span>
                    <div>
                        <h1>Mis entradas</h1>
                        <p>Tus próximas funciones aparecerán acá.</p>
                    </div>
                </div>
                <div className="empty panel">
                    <i className="bi bi-ticket-detailed" />
                    <h3>Todavía no tenés entradas</h3>
                    <p>Encontrá tu próxima película en nuestra cartelera.</p>
                    <Link className="btn btn-primary" to="/cartelera">
                        Explorar cartelera
                    </Link>
                </div>
            </div>
        </main>
    );
}

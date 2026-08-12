import { Link, NavLink } from 'react-router-dom';

export function Header() {
    return (
        <header className="topbar">
            <nav className="container d-flex align-items-center justify-content-between py-3">
                <Link
                    className="brand d-flex align-items-center gap-3 text-decoration-none"
                    to="/"
                >
                    <span className="brand-mark">
                        <i className="bi bi-film" />
                    </span>
                    <span>
                        <b>CINE MAX</b>
                        <small>Tu mejor experiencia</small>
                    </span>
                </Link>
                <div className="nav-links d-none d-lg-flex">
                    <NavLink to="/">
                        <i className="bi bi-house" /> Inicio
                    </NavLink>
                    <NavLink to="/cartelera">
                        <i className="bi bi-calendar3" /> Cartelera
                    </NavLink>
                    <NavLink to="/entradas">
                        <i className="bi bi-ticket-perforated" /> Mis entradas
                    </NavLink>
                </div>
                <div className="user-pill">
                    <i className="bi bi-person-circle" />
                    <span className="d-none d-sm-inline">Hola, Juan</span>
                </div>
            </nav>
        </header>
    );
}

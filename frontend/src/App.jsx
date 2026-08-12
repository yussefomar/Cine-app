import { Route, Routes } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { BillboardPage } from './pages/BillboardPage';
import { HomePage } from './pages/HomePage';
import { MovieDetailPage } from './pages/MovieDetailPage';
import { PaymentPage } from './pages/PaymentPage';
import { SeatsPage } from './pages/SeatsPage';
import { TicketsPage } from './pages/TicketsPage';

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cartelera" element={<BillboardPage />} />
                <Route path="/pelicula/:id" element={<MovieDetailPage />} />
                <Route
                    path="/funcion/:screeningId/asientos"
                    element={<SeatsPage />}
                />
                <Route path="/pago" element={<PaymentPage />} />
                <Route path="/entradas" element={<TicketsPage />} />
                <Route path="*" element={<HomePage />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;

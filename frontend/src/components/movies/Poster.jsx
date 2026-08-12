export function Poster({ movie, large = false }) {
    return (
        <div
            className={`poster ${large ? 'poster-large' : ''}`}
            style={{ '--c1': movie.colors[0], '--c2': movie.colors[1] }}
        >
            <span>CINE MAX</span>
            <strong>{movie.short}</strong>
            <small>Solo en cines</small>
        </div>
    );
}

export function normalizeMovie(movie) {
  const first = movie.screenings?.[0];

  return {
    ...movie,
    format: first?.format || movie.format,
    room: first?.room || movie.room,
    price: first?.price || movie.price,
    times: movie.screenings?.map(screening => screening.time) || movie.times,
  };
}

const API_URL =
    import.meta.env.VITE_API_URL || 'http://localhost/cine-app/public/api';

export async function api(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers: { 'Content-Type': 'application/json', ...options.headers },
    });
    if (!response.ok) throw new Error('No pudimos completar la operación.');
    return response.json();
}

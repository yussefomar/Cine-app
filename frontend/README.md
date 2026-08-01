# Cine Max — Frontend

Frontend React + Bootstrap para el flujo de venta de entradas.

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

## Flujo implementado

- Cartelera con búsqueda, filtros y estado vacío.
- Detalle de película y elección de horario.
- Plano de sala con asientos disponibles, ocupados y seleccionados.
- Resumen y cálculo de precio con descuento por suscripción.
- Formulario de pago y confirmación.
- Ticket imprimible con código de compra.

En desarrollo, `frontend/.env.development` conecta automáticamente con Symfony
en `http://localhost/cine-app/public/api`. Copiar `.env.example` como `.env.local`
solamente si se necesita usar otra URL.

## Estructura

```text
src/
├── components/  Piezas visuales reutilizables
├── pages/       Pantallas asociadas a las rutas
├── hooks/       Estado y efectos reutilizables
├── services/    Comunicación HTTP con Symfony
├── utils/       Funciones auxiliares sin interfaz
├── data/        Datos de demostración
└── App.jsx      Layout y definición de rutas
```

`App.jsx` no contiene la implementación de las pantallas. Su responsabilidad es
componer `Header`, `Routes` y `Footer`. Cada página utiliza componentes más
pequeños y obtiene los datos compartidos mediante hooks y servicios.

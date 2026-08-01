<?php

namespace App\Controller;

use App\Entity\Asiento;
use App\Repository\AsientoRepository;
use App\Repository\FuncionRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\MapQueryParameter;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/funciones')]
final readonly class FuncionController
{
    public function __construct(
        private FuncionRepository $funcionRepository,
        private AsientoRepository $asientoRepository,
    ) {}

    #[Route('', name: 'api_funciones_list', methods: ['GET'])]
    public function list(
        #[MapQueryParameter] ?string $fecha = null,
    ): JsonResponse {
        // $fecha viene directamente del query parameter de la URL.
        // Ejemplo: GET /api/funciones?fecha=2026-07-30
        // produce $fecha = '2026-07-30'. Si no se envía, vale null.
        $inicio = null;
        $fin = null;

        if ($fecha !== null && $fecha !== '') {
            $inicio = \DateTimeImmutable::createFromFormat('!Y-m-d', $fecha);
            $errores = \DateTimeImmutable::getLastErrors();

            if ($inicio === false || ($errores !== false && ($errores['warning_count'] > 0 || $errores['error_count'] > 0))) {
                return new JsonResponse(['error' => 'La fecha debe tener formato AAAA-MM-DD.'], 400);
            }

            $fin = $inicio->modify('+1 day');
        }

        $funciones = $this->funcionRepository->findCartelera($inicio, $fin);

        $agrupadas = [];
        foreach ($funciones as $funcion) {
            $pelicula = $funcion->getPelicula();
            $id = $pelicula->getId();
            if (!isset($agrupadas[$id])) {
                $agrupadas[$id] = [
                    'id' => $id,
                    'title' => $pelicula->getTitulo(),
                    'short' => mb_strtoupper(explode(':', $pelicula->getTitulo())[0]),
                    'genre' => str_replace(', ', ' · ', $pelicula->getGenero()),
                    'duration' => $pelicula->getDuracion(),
                    'rating' => $pelicula->getClasificacion(),
                    'description' => $pelicula->getDescripcion(),
                    'colors' => [$pelicula->getColorPrimario(), $pelicula->getColorSecundario()],
                    'screenings' => [],
                ];
            }
            $agrupadas[$id]['screenings'][] = [
                'id' => $funcion->getId(),
                'date' => $funcion->getFechaHora()->format('Y-m-d'),
                'time' => $funcion->getFechaHora()->format('H:i'),
                'format' => $funcion->getFormato(),
                'room' => $funcion->getSala(),
                'price' => $funcion->getPrecio(),
            ];
        }

        return new JsonResponse(['data' => array_values($agrupadas), 'total' => count($agrupadas)]);
    }

    #[Route('/{id}/asientos', name: 'api_funcion_seats', methods: ['GET'])]
    public function seats(int $id): JsonResponse
    {
        // El valor de $id viene del segmento {id} de la URL.
        // Ejemplo: GET /api/funciones/5/asientos produce $id = 5.
        $funcion = $this->funcionRepository->find($id);

        // Si Doctrine no encuentra una función con ese ID, find() devuelve null.
        if ($funcion === null) {
            return new JsonResponse(
                ['error' => sprintf('No existe una función con el ID %d.', $id)],
                JsonResponse::HTTP_NOT_FOUND
            );
        }

        // En este punto $funcion sí es un objeto de la entidad Funcion.
        // Buscamos todos los asientos relacionados mediante funcion_id.
        $asientos = $this->asientoRepository->findByFuncionOrdenados($funcion);

        return new JsonResponse([
            'data' => array_map(static fn (Asiento $asiento) => [
                'id' => $asiento->getId(),
                'code' => $asiento->getFila().$asiento->getNumero(),
                'row' => $asiento->getFila(),
                'number' => $asiento->getNumero(),
                'status' => $asiento->getEstado(),
            ], $asientos),
            'screening' => [
                'id' => $funcion->getId(),
                'movieId' => $funcion->getPelicula()->getId(),
                'movie' => $funcion->getPelicula()->getTitulo(),
                'date' => $funcion->getFechaHora()->format('Y-m-d'),
                'time' => $funcion->getFechaHora()->format('H:i'),
                'room' => $funcion->getSala(),
                'format' => $funcion->getFormato(),
                'price' => $funcion->getPrecio(),
            ],
        ]);
    }
}

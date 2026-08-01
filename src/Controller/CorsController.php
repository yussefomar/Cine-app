<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class CorsController
{
    #[Route('/api/{path}', name: 'api_cors_preflight', requirements: ['path' => '.+'], methods: ['OPTIONS'], priority: 100)]
    public function __invoke(): Response
    {
        return new Response(status: Response::HTTP_NO_CONTENT);
    }
}

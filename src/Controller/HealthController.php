<?php

namespace App\Controller;

use App\Service\HealthService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final readonly class HealthController
{
    public function __construct(private HealthService $healthService)
    {
    }

    #[Route('/api/health', name: 'api_health', methods: ['GET'])]
    public function __invoke(): JsonResponse
    {
        return new JsonResponse($this->healthService->status());
    }
}


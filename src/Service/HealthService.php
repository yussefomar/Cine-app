<?php

namespace App\Service;

final class HealthService
{
    /**
     * @return array{status: string, service: string}
     */
    public function status(): array
    {
        return [
            'status' => 'ok',
            'service' => 'cine-app-api',
        ];
    }
}


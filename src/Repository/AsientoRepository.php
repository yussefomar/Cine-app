<?php

namespace App\Repository;

use App\Entity\Asiento;
use App\Entity\Funcion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/** @extends ServiceEntityRepository<Asiento> */
final class AsientoRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Asiento::class);
    }

    /** @return Asiento[] */
    public function findByFuncionOrdenados(Funcion $funcion): array
    {
        return $this->findBy(
            ['funcion' => $funcion],
            ['fila' => 'ASC', 'numero' => 'ASC']
        );
    }
}

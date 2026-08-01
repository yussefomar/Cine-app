<?php

namespace App\Repository;

use App\Entity\Funcion;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/** @extends ServiceEntityRepository<Funcion> */
final class FuncionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Funcion::class);
    }

    /**
     * Obtiene la cartelera junto con la película de cada función.
     *
     * @return Funcion[]
     */
    public function findCartelera(
        ?\DateTimeImmutable $inicio = null,
        ?\DateTimeImmutable $fin = null,
    ): array {
        $qb = $this->createQueryBuilder('f')
            ->join('f.pelicula', 'p')
            ->addSelect('p')
            ->orderBy('p.id', 'ASC')
            ->addOrderBy('f.fechaHora', 'ASC');

        if ($inicio !== null && $fin !== null) {
            $qb->andWhere('f.fechaHora >= :inicio')
                ->andWhere('f.fechaHora < :fin')
                ->setParameter('inicio', $inicio)
                ->setParameter('fin', $fin);
        }

        return $qb->getQuery()->getResult();
    }
}

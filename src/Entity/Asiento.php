<?php

namespace App\Entity;

use App\Repository\AsientoRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AsientoRepository::class)]
#[ORM\UniqueConstraint(name: 'uniq_funcion_asiento', columns: ['funcion_id', 'fila', 'numero'])]
class Asiento
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'asientos')]
    #[ORM\JoinColumn(nullable: false, onDelete: 'CASCADE')]
    private Funcion $funcion;

    #[ORM\Column(length: 1)]
    private string $fila;

    #[ORM\Column]
    private int $numero;

    #[ORM\Column(length: 15)]
    private string $estado = 'disponible';

    public function getId(): ?int { return $this->id; }
    public function getFila(): string { return $this->fila; }
    public function getNumero(): int { return $this->numero; }
    public function getEstado(): string { return $this->estado; }
}

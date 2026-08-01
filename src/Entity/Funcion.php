<?php

namespace App\Entity;

use App\Repository\FuncionRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FuncionRepository::class)]
class Funcion
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'funciones')]
    #[ORM\JoinColumn(nullable: false)]
    private Pelicula $pelicula;

    #[ORM\Column(type: 'datetime_immutable')]
    private \DateTimeImmutable $fechaHora;

    #[ORM\Column]
    private int $sala;

    #[ORM\Column(length: 10)]
    private string $formato;

    #[ORM\Column]
    private int $precio;

    /** @var Collection<int, Asiento> */
    #[ORM\OneToMany(mappedBy: 'funcion', targetEntity: Asiento::class)]
    private Collection $asientos;

    public function __construct()
    {
        $this->asientos = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getPelicula(): Pelicula { return $this->pelicula; }
    public function getFechaHora(): \DateTimeImmutable { return $this->fechaHora; }
    public function getSala(): int { return $this->sala; }
    public function getFormato(): string { return $this->formato; }
    public function getPrecio(): int { return $this->precio; }
}

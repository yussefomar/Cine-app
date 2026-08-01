<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Pelicula
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private string $titulo;

    #[ORM\Column(length: 80)]
    private string $genero;

    #[ORM\Column]
    private int $duracion;

    #[ORM\Column(length: 10)]
    private string $clasificacion;

    #[ORM\Column(type: 'text')]
    private string $descripcion;

    #[ORM\Column(length: 7)]
    private string $colorPrimario;

    #[ORM\Column(length: 7)]
    private string $colorSecundario;

    /** @var Collection<int, Funcion> */
    #[ORM\OneToMany(mappedBy: 'pelicula', targetEntity: Funcion::class)]
    private Collection $funciones;

    public function __construct()
    {
        $this->funciones = new ArrayCollection();
    }

    public function getId(): ?int { return $this->id; }
    public function getTitulo(): string { return $this->titulo; }
    public function getGenero(): string { return $this->genero; }
    public function getDuracion(): int { return $this->duracion; }
    public function getClasificacion(): string { return $this->clasificacion; }
    public function getDescripcion(): string { return $this->descripcion; }
    public function getColorPrimario(): string { return $this->colorPrimario; }
    public function getColorSecundario(): string { return $this->colorSecundario; }
}

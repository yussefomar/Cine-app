<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260730230000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Crea películas, funciones y asientos con datos iniciales para Cine Max';
    }

    public function up(Schema $schema): void
    {
        $this->addSql("CREATE TABLE pelicula (id INT AUTO_INCREMENT NOT NULL, titulo VARCHAR(150) NOT NULL, genero VARCHAR(80) NOT NULL, duracion INT NOT NULL, clasificacion VARCHAR(10) NOT NULL, descripcion LONGTEXT NOT NULL, color_primario VARCHAR(7) NOT NULL, color_secundario VARCHAR(7) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB");
        $this->addSql("CREATE TABLE funcion (id INT AUTO_INCREMENT NOT NULL, pelicula_id INT NOT NULL, fecha_hora DATETIME NOT NULL, sala INT NOT NULL, formato VARCHAR(10) NOT NULL, precio INT NOT NULL, INDEX IDX_2E1D608A70713909 (pelicula_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB");
        $this->addSql("CREATE TABLE asiento (id INT AUTO_INCREMENT NOT NULL, funcion_id INT NOT NULL, fila VARCHAR(1) NOT NULL, numero INT NOT NULL, estado VARCHAR(15) NOT NULL, INDEX IDX_71D6D35C8C185C36 (funcion_id), UNIQUE INDEX uniq_funcion_asiento (funcion_id, fila, numero), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB");
        $this->addSql('ALTER TABLE funcion ADD CONSTRAINT FK_8EAA2DA75212E255 FOREIGN KEY (pelicula_id) REFERENCES pelicula (id)');
        $this->addSql('ALTER TABLE asiento ADD CONSTRAINT FK_43C065D43283B8BD FOREIGN KEY (funcion_id) REFERENCES funcion (id) ON DELETE CASCADE');

        $this->addSql("INSERT INTO pelicula (id,titulo,genero,duracion,clasificacion,descripcion,color_primario,color_secundario) VALUES
            (1,'Garfield: La película','Animación, Comedia',101,'ATP','Garfield deja su cómoda vida para embarcarse en una aventura inesperada.','#ff8a00','#cf3300'),
            (2,'Furiosa: De la saga Mad Max','Acción, Aventura',148,'+13','Una heroína forja su camino de regreso en un mundo devastado.','#e4b633','#202b1e'),
            (3,'Guardianes de la Galaxia Vol. 3','Ciencia ficción, Aventura',126,'ATP','El equipo se enfrenta a su pasado para proteger el universo una vez más.','#2448a5','#7c1d54'),
            (4,'Intensa-Mente 2','Animación, Familia',96,'ATP','Nuevas emociones llegan a la mente de Riley y cambian todo.','#7d38b5','#ec4d8d')");
        $this->addSql("INSERT INTO funcion (id,pelicula_id,fecha_hora,sala,formato,precio) VALUES
            (1,1,'2026-07-30 14:00:00',1,'2D',8200),(2,1,'2026-07-30 16:30:00',1,'2D',8200),(3,1,'2026-07-30 19:00:00',1,'2D',8200),(4,1,'2026-07-30 21:30:00',1,'2D',8200),
            (5,2,'2026-07-30 13:00:00',2,'3D',9900),(6,2,'2026-07-30 16:00:00',2,'3D',9900),(7,2,'2026-07-30 19:15:00',2,'3D',9900),(8,2,'2026-07-30 22:15:00',2,'3D',9900),
            (9,3,'2026-07-30 13:30:00',3,'IMAX',11500),(10,3,'2026-07-30 16:45:00',3,'IMAX',11500),(11,3,'2026-07-30 20:00:00',3,'IMAX',11500),(12,3,'2026-07-30 22:45:00',3,'IMAX',11500),
            (13,4,'2026-07-30 12:15:00',4,'2D',8200),(14,4,'2026-07-30 15:10:00',4,'2D',8200),(15,4,'2026-07-30 18:10:00',4,'2D',8200)");

        $ocupados = ['A4', 'A5', 'B7', 'B8', 'C3', 'C4', 'C5', 'C6', 'F5', 'F6', 'G8'];

        foreach (range(1, 15) as $funcionId) {
            $values = [];
            $params = [];

            foreach (range('A', 'H') as $fila) {
                foreach (range(1, 12) as $numero) {
                    $estado = in_array($fila.$numero, $ocupados, true) ? 'vendido' : 'disponible';
                    $values[] = '(?, ?, ?, ?)';
                    array_push($params, $funcionId, $fila, $numero, $estado);
                }
            }

            $this->addSql(
                'INSERT INTO asiento (funcion_id, fila, numero, estado) VALUES '.implode(', ', $values),
                $params
            );
        }
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE asiento');
        $this->addSql('DROP TABLE funcion');
        $this->addSql('DROP TABLE pelicula');
    }
}

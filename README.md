# Cine App — Backend

API base construida con Symfony 7.4, Doctrine ORM y MySQL.

## Requisitos

- Docker Desktop con Docker Compose, o
- PHP 8.2+, Composer y MySQL 8+

## Inicio rápido con Docker

```bash
docker compose up --build -d
docker compose exec php php bin/console doctrine:database:create --if-not-exists
docker compose exec php php bin/console doctrine:migrations:migrate --no-interaction
```

La API queda disponible en `http://localhost:8080`. Para comprobarla:

```bash
curl http://localhost:8080/api/health
```

Respuesta esperada:

```json
{"status":"ok","service":"cine-app-api"}
```

## Uso sin Docker

```bash
composer install
php bin/console doctrine:database:create --if-not-exists
php bin/console doctrine:migrations:migrate --no-interaction
symfony server:start
```

Copia `.env` como `.env.local` si necesitas cambiar credenciales. Los secretos
reales deben ir en `.env.local`, que no se versiona.

## Estructura

- `src/Controller`: entrada HTTP y respuestas.
- `src/Service`: casos de uso y lógica de aplicación.
- `src/Repository`: acceso a datos mediante Doctrine.
- `src/Entity`: entidades persistidas.
- `migrations`: cambios versionados del esquema.

## Comandos útiles

```bash
docker compose exec php php bin/console about
docker compose exec php php bin/console debug:router
docker compose exec php php bin/console doctrine:schema:validate
docker compose exec php composer test
docker compose logs -f php
```

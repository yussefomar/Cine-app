# Cine App — Symfony + React con XAMPP

Aplicación de cine con una API construida en Symfony 7.4, Doctrine ORM y
MariaDB/MySQL, y un frontend desarrollado con React, Vite y Bootstrap.

El proyecto ofrece dos alternativas de desarrollo local: XAMPP o Docker. El
código de React y Symfony es el mismo; sólo cambia el entorno que ejecuta cada
servicio y sus variables de conexión.

## Requisitos

- Git.
- XAMPP con PHP 8.2 o superior, Apache y MySQL/MariaDB.
- Composer 2.
- Node.js 18 o superior y npm.
- Opcional: Docker Desktop con Docker Compose, si no se desea usar XAMPP.

Comprobar las herramientas:

```powershell
git --version
C:\xampp\php\php.exe -v
composer --version
node --version
npm --version
```

## Descargar el proyecto

La opción más sencilla es clonarlo directamente dentro de `htdocs`:

```powershell
cd C:\xampp\htdocs
git clone URL_DEL_REPOSITORIO cine-app
cd cine-app
```

Reemplazar `URL_DEL_REPOSITORIO` por la dirección HTTPS del repositorio de
GitHub.

Si el repositorio se clona en otra ubicación, crear una unión de directorio
desde PowerShell como administrador:

```powershell
New-Item -ItemType Junction `
  -Path C:\xampp\htdocs\cine-app `
  -Target C:\ruta\donde\clonaste\Cine-app
```

## Alternativa A — Ejecutar con XAMPP

### 1. Instalar el backend

Desde la raíz del proyecto:

```powershell
composer install
```

Este comando utiliza `composer.lock` para instalar en `vendor/` las versiones
exactas de las dependencias PHP del proyecto.

La configuración local predeterminada utiliza:

```text
Host:       127.0.0.1
Puerto:     3306
Usuario:    root
Contraseña: vacía
Base:       cine
```

Si XAMPP utiliza otras credenciales, crear un archivo `.env.local` en la raíz:

```env
DATABASE_URL="mysql://USUARIO:CONTRASENA@127.0.0.1:3306/cine?serverVersion=mariadb-10.4.27&charset=utf8mb4"
```

`.env.local` está ignorado por Git y no debe subirse al repositorio.

### 2. Iniciar XAMPP y preparar la base

Abrir **XAMPP Control Panel** e iniciar:

- Apache.
- MySQL.

Después, desde la raíz del proyecto:

```powershell
C:\xampp\php\php.exe bin\console doctrine:database:create --if-not-exists
C:\xampp\php\php.exe bin\console doctrine:migrations:migrate --no-interaction
```

El primer comando crea la base `cine` si todavía no existe. El segundo ejecuta
las migraciones pendientes, crea las tablas y carga los datos iniciales de
demostración.

Comprobar el backend:

```text
http://localhost/cine-app/public/api/health
```

Respuesta esperada:

```json
{"status":"ok","service":"cine-app-api"}
```

Endpoints disponibles:

```text
GET /api/health
GET /api/funciones
GET /api/funciones?fecha=2026-07-30
GET /api/funciones/{id}/asientos
```

Listar las rutas desde Symfony:

```powershell
C:\xampp\php\php.exe bin\console debug:router
```

### 3. Instalar y ejecutar el frontend

Abrir otra terminal desde la raíz del proyecto:

```powershell
cd frontend
npm install
npm run dev
```

Vite inicia React en:

```text
http://localhost:5173
```

La URL local de la API está configurada en `frontend/.env.development`:

```env
VITE_API_URL=http://localhost/cine-app/public/api
```

### 4. Verificación completa

1. Confirmar que Apache y MySQL estén activos en XAMPP.
2. Abrir `http://localhost/cine-app/public/api/health`.
3. Abrir `http://localhost:5173`.
4. Entrar en la cartelera.
5. Cambiar la fecha y comprobar que la petición incluye `?fecha=AAAA-MM-DD`.
6. Abrir DevTools → Network → Fetch/XHR para inspeccionar la respuesta de la API.

## Alternativa B — Ejecutar con Docker

Esta alternativa no requiere Apache, PHP, MariaDB, Composer ni Node instalados
directamente para el proyecto. Docker ejecuta tres servicios:

```text
frontend   React + Vite       http://localhost:5173
backend    Symfony + Apache   http://localhost:8081
database   MariaDB            red interna de Docker
```

No iniciar simultáneamente el frontend de XAMPP/local y el de Docker, porque
ambos intentarán utilizar el puerto `5173`.

Desde la raíz del repositorio:

```powershell
docker compose up --build -d
```

Crear las tablas y cargar los datos iniciales:

```powershell
docker compose exec backend php bin/console doctrine:migrations:migrate --no-interaction
```

Comprobar los servicios:

```text
Frontend: http://localhost:5173
API:      http://localhost:8081/api/health
```

Ver los logs:

```powershell
docker compose logs -f backend
docker compose logs -f frontend
docker compose logs -f database
```

Detener los contenedores sin borrar la base:

```powershell
docker compose down
```

Los datos de MariaDB se conservan en el volumen `database_data`. Para reiniciar
deliberadamente todo desde cero se puede usar `docker compose down -v`, pero ese
comando elimina la base Docker y sus datos.

### Por qué el código no cambia

Docker Compose sobrescribe las variables necesarias para sus contenedores:

```text
XAMPP backend: 127.0.0.1:3306
Docker backend: database:3306

XAMPP frontend API: http://localhost/cine-app/public/api
Docker frontend API: http://localhost:8081/api
```

Por eso Controllers, Repositories, entidades, componentes, páginas y hooks son
idénticos en ambas alternativas.

## Estructura principal

```text
src/                 Backend Symfony
├── Controller/      Endpoints y respuestas HTTP
├── Entity/          Entidades y mapeo Doctrine
├── Repository/      Consultas a la base de datos
└── Service/         Casos de uso y reglas de negocio

migrations/          Versiones del esquema de la base
public/              Único directorio público del backend

frontend/src/        Frontend React
├── components/      Componentes reutilizables
├── pages/           Pantallas asociadas a rutas
├── hooks/           Estado y efectos reutilizables
├── services/        Peticiones HTTP
└── utils/           Funciones auxiliares
```

## Comandos útiles

### Opción 1: XAMPP

Con Apache y MySQL iniciados desde XAMPP, ejecutar desde la raíz:

```powershell
C:\xampp\php\php.exe bin\console about
C:\xampp\php\php.exe bin\console debug:router
C:\xampp\php\php.exe bin\console doctrine:migrations:status
C:\xampp\php\php.exe bin\console doctrine:schema:validate
C:\xampp\php\php.exe bin\console cache:clear
```

### Opción 2: Docker

Con los contenedores iniciados, ejecutar desde la raíz:

```powershell
docker compose exec backend php bin/console about
docker compose exec backend php bin/console debug:router
docker compose exec backend php bin/console doctrine:migrations:status
docker compose exec backend php bin/console doctrine:schema:validate
docker compose exec backend php bin/console cache:clear
```

Para entrar a MariaDB y ver las tablas:

```powershell
docker compose exec database mariadb -u cine -pcine cine
```

Dentro de MariaDB:

```sql
SHOW DATABASES;
USE cine;
SHOW TABLES;
DESCRIBE nombre_de_la_tabla;
SELECT * FROM nombre_de_la_tabla LIMIT 20;
EXIT;
```

Consulta rápida sin entrar a la consola interactiva:

```powershell
docker compose exec database mariadb -u cine -pcine cine -e "SHOW TABLES;"
```

> Elegir una alternativa según el entorno: `C:\xampp\php\php.exe` para XAMPP o `docker compose exec backend php` para Docker.

Compilar el frontend para producción:

```powershell
cd frontend
npm run build
```

El resultado se genera en `frontend/dist/`.

## Problemas frecuentes

### El puerto 5173 ya está ocupado

Ya existe una instancia de Vite. Abrir `http://localhost:5173` o detenerla antes
de ejecutar nuevamente `npm run dev`.

### La API devuelve error de conexión a la base

Comprobar que MySQL esté iniciado y que `DATABASE_URL` coincida con las
credenciales y el puerto de XAMPP.

### Las rutas de Symfony devuelven 404

Comprobar que Apache tenga `mod_rewrite` activo y `AllowOverride All` para
`htdocs`. El proyecto incluye `public/.htaccess`.

### El frontend muestra datos de demostración

Abrir DevTools → Network y comprobar la petición a la API. Revisar también
`frontend/.env.development` y CORS.

## Datos y migraciones

Las migraciones recrean la estructura y los datos iniciales de demostración. Los
datos reales agregados posteriormente a MariaDB no se guardan en GitHub. Para
trasladarlos es necesario exportar e importar un backup SQL que incluya la tabla
`doctrine_migration_versions`.

No subir backups con datos personales, credenciales o información de producción
a un repositorio público.

## Producción

XAMPP y `npm run dev` son únicamente para desarrollo local. En Hostinger se deben
utilizar credenciales propias, `APP_ENV=prod`, un `APP_SECRET` seguro, HTTPS y el
build generado en `frontend/dist/`.

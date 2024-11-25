# Evaluacion sumativa 3 Arquitectura de Sistemas

## Autores
Fernando Javier Sanabria Ampuero
Jhon Michael Lopez Rodriguez

## Correo
fernando.sanabria@alumnos.ucn.cl
jhon.lopez@alumnos.ucn.cl

## Rut
21.011.823-3
25.415.945-K

## Prerequisitos para correr el projecto sin docker

Antes de correr el projecto, asegurate de tener las siguientes cosas instaladas:

- Bun (version 1.1.34)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/mores-hitt/hono-user-service.git
```

2. Navega al directorio del proyecto:

```bash
cd hono-user-service
```

3. Instala las dependecias del proyecto:

```bash
bun install
```

4. Crea el archivo .env

```bash
cp .env.example .env
```

5. Configura la variable SECRET y el puerto. Asegurate que el puerto que elijas este disponible
```dotenv

SECRET=secreto//Insertar secreto aqui
PORT=1234//Insertar puerto aqui

```

6. Ejecuta las migraciones y el seeder
```bash
bun run migrate && bun run seed
```

## Uso

Para correr el proyecto, utiliza el siguiente comando:

```bash
bun run ./src/index.ts
```

Para correr el proyecto en modo desarrollo, utiliza el siguiente comando:

```bash
bun run dev
```

Para detener la aplicación, utiliza el siguiente atajo en la terminal:

<kbd>Ctrl</kbd> + <kbd>C</kbd>


## Correr el proyecto usando docker

Antes de iniciar asegurate de tener las siguientes tecnologias 

- Docker Desktop (version 4.34.2)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/mores-hitt/hono-user-api.git
```

2. Navega al directorio del proyecto:

```bash
cd hono-user-api
```

3. Crea el archivo .env

```bash
cp .env.example .env
```

4. Configura la variable SECRET y PORT. Asegurate que el puerto que elijas este disponible
```dotenv

SECRET=secreto//Insertar secreto aqui
PORT=1234//Insertar puerto aqui

```

5. Genera la imagen del proyecto y corre el contenedor

```bash
docker compose up --build
``` 

Alternativamente, puedes correr el contenedor en modo detached

```bash
docker compose up --build -d
``` 
## FASE 1 — `00_BASE_INIT_NESTJS`

### Inicialización del proyecto NestJS

#### 1.1 — Crear carpetas padre y permisos

##### En este caso ya habíamos creado la carpeta vamos a dar el permiso

mkdir -p backend-manual

chmod -R 755 backend-manual

## Evidencia

![](images/clipboard-4201718986.png)

**Sugerencia de commit (issue):**

Realizamos el primer commit

git add .

git commit -m "chore: prepare workspace folders for nest backend"

![Verificamos que creo el Commit](images/clipboard-457057375.png)

![](images/clipboard-1440777311.png)

#### 1.2 — Instalar Nest CLI (si no existe)

El CLI generamos `main.ts`, `app.module.ts`, `tsconfig`, scripts npm entre otros

![](images/clipboard-160430891.png)

**Sugerencia de commit (issue):**

Realizamos el segundo commit

![](images/clipboard-4173200926.png)

#### 1.3 — Crear proyecto NestJS

Usamos el nombre `backend_ia` (workspace didáctico). Responde las preguntas del CLI (package manager: npm).

``` bash
cd ~/ia-lab/projects/dw/pry-campusnube/app-CampusNube
nest new backend-manual
```

Evidencia de que quedo creado el proyecto

![](images/clipboard-2924490721.png)

**Sugerencia de commit (issue):**

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: scaffold nestjs project backend_manual"
git push origin main
```

#### ![](images/clipboard-2438337494.png)

![](images/clipboard-1398865804.png)

#### 1.4 — Crear `.env` mínimo (puerto)

El puerto `3002` evita choques con el 3000. Más adelante el `.env` crecerá con BD y JWT.

``` bash
cat > .env <<'EOF_BACKEND_MANUAL' PORT=3002 NODE_ENV=development EOF_BACKEND_MANUAL
```

Evidenciamos

![](images/clipboard-3000011176.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "chore: add initial .env with PORT=3002"
```

Evidencia de qeu se realizó el commit correctamente desde la terminal de Ubutntun y en Github

![](images/clipboard-3672955977.png)

![](images/clipboard-4217862566.png)

#### 1.5 — Commit inicial del esqueleto

Congela el punto de partida reproducible.

``` bash
git init
git add .
git commit -m "chore: inicialización del proyecto NestJS"
```

## FASE 2 — `01_BASE_DEPS_Y_PUERTO`

### Dependencias + manejo de puerto (EADDRINUSE)

En esta fase realizamos las dependencias y el manejo de puesto de CampusNube

#### 2.1 — Dependencias de producción

Config, Swagger, JWT/Passport, Sequelize + drivers de 4 motores, validación, bcrypt y utilidades HTTP.

``` bash
npm install @nestjs/config @nestjs/swagger @nestjs/jwt @nestjs/passport @nestjs/mapped-types \   passport passport-jwt sequelize sequelize-typescript mysql2 pg tedious oracledb \   class-validator class-transformer bcrypt reflect-metadata express compression helmet
```

Evidencia del las dependencias

![](images/clipboard-2869246869.png)

![](images/clipboard-3412233800.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "chore: install production dependencies for ca backend"
```

Evudencia del Commit Por Ubuntu

![](images/clipboard-2314863677.png)

En github se verfica si quedo registrado.

![](images/clipboard-3140450029.png)

#### 2.2 — Dependencias de desarrollo

En este paso se realizan las dependencias de desarrollo

Tipados y sequelize-cli para herramientas de BD.

``` bash
npm install -D @types/bcrypt @types/passport-jwt sequelize-cli
```

Evidencia de que se instalo de dependencias de desarrollo![](images/clipboard-1309090371.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: install auth and sequelize-cli devDependencies"
```

Se evidencia que se realizó el commit correctamente desde la consola de Ubuntu

![](images/clipboard-105930002.png)

Desde Github

![](images/clipboard-1228792992.png)

#### 2.3 — Script para liberar puerto (evita EADDRINUSE)

En este paso realizamos para liberar el puerto en Linux/WSL

Si reinicias Nest sin matar el proceso anterior, Node lanza `listen EADDRINUSE`. Este script lee `PORT` del `.env` y libera el puerto en Linux/WSL.

``` bash
mkdir -p scripts cat > scripts/free-port.js <<'EOF_BACKEND_IA' /**  * Libera el puerto configurado en .env (PORT) antes de arrancar Nest.  * Evita EADDRINUSE cuando queda una instancia previa de start:dev.  */ const { execSync } = require('child_process'); const fs = require('fs'); const path = require('path');  function readPortFromEnv() {   const envPath = path.join(__dirname, '..', '.env');   let port = 3002;    if (fs.existsSync(envPath)) {     const content = fs.readFileSync(envPath, 'utf8');     const match = content.match(/^\s*PORT\s*=\s*(\d+)\s*$/m);     if (match) {       port = parseInt(match[1], 10);     }   }    if (process.env.PORT) {     port = parseInt(process.env.PORT, 10) || port;   }    return port; }  function freePort(port) {   try {     // Linux/WSL: mata el proceso que escucha en el puerto     execSync(`fuser -k ${port}/tcp`, { stdio: 'ignore' });     console.log(`✅ Puerto ${port} liberado`);   } catch {     // No había proceso escuchando: ok     console.log(`ℹ️  Puerto ${port} disponible`);   } }  const port = readPortFromEnv(); freePort(port); EOF_BACKEND_MANUAL
```

Evudencia desde la consola de ubuntu

![](images/clipboard-2777906187.png)

![](images/clipboard-3159892279.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "chore: add scripts/free-port.js to avoid EADDRINUSE"
```

En este paso realizamos el commit desde la consola de Ubuntu

![](images/clipboard-256952167.png)

Verficamos desde Github

![](images/clipboard-3477536938.png)

#### 2.4 — Actualizar scripts npm en package.json

En este paso se actualiza los scripts npm

Integra `free:port` en `start:dev` / `start:debug`. Aplica el cambio con Node para no editar JSON a mano.

``` bash
node <<'EOF_BACKEND_MANUAL' const fs = require('fs'); const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); pkg.scripts = {   ...pkg.scripts,   'free:port': 'node scripts/free-port.js',   'start:dev': 'npm run free:port && nest start --watch',   'start:debug': 'npm run free:port && nest start --debug --watch', }; fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n'); console.log('✅ package.json scripts actualizados'); EOF_BACKEND_MANUAL
```

![](images/clipboard-4001817702.png)

Se verifica si se actualizó correctamente

![](images/clipboard-110964755.png)

**Sugerencia de commit (issue):**

Ahora se realizá el commit desde la consola de Ubuntu.

``` bash
git add . 
git commit -m "chore: wire free:port into nest start scripts"
```

![](images/clipboard-2005532662.png)

Desde Github

![](images/clipboard-1017777081.png)

#### 2.5 — Verificar arranque base

En este paso se realizá el levantamiento del Hello World de Nest en el Puerto del `.env`.

``` bash
npm run start:dev # Ctrl+C cuando veas el log de arranque curl -s http://localhost:3002 || true
```

![](images/clipboard-1541841894.png)

![](images/clipboard-268097221.png)

**Sugerencia de commit (issue):**

Ahora realizamos el commit desde la terminal de Ubuntu

``` bash
git add . git commit -m "test: verify nest boots after dependency install"
```

------------------------------------------------------------------------

![](images/clipboard-3784517063.png)

Ahora verifficamos desde Github

![](images/clipboard-1858926625.png)

## FASE 3 — `02_BASE_ESTRUCTURA_CA`

### Estructura de carpetas Clean Architecture

> En esta fase se realizó la creación del mapa mental: config / common / infrastructure / features (business + auth).

#### 3.1 — Crear árbol base de carpetas

Aún no hay código de dominio. Solo directorios y módulos vacíos de features para anclar imports futuros.

``` bash
cd ~/ia-lab/projects/dw/pry-campusnube/app-CampusNube/backend-manual

mkdir -p src/config/{app,database,environment,jwt,logger,swagger}

mkdir -p src/common/{constants,decorators,enums,exceptions,filters,guards,interceptors,interfaces,pipes,types,utils,validators}

mkdir -p src/infrastructure/database/{sequelize,migrations,seeders}

mkdir -p src/infrastructure/{logging,security/hashing,security/tokens}
```

![](images/clipboard-2997080608.png)

**Sugerencia de commit (issue):**

Ahora realizamos el commit en la terminal de Ubuntu

``` bash
git add . 
git commit -m "chore: create clean architecture folder tree and empty feature modules"
```

![](images/clipboard-2932937375.png)

Ahora se verifica si se creo el commit correctamente en Github

![](images/clipboard-996875215.png)

#### 3.2 — Recordatorio de responsabilidades

| Carpeta           | Responsabilidad                              |
|-------------------|----------------------------------------------|
| `config/`         | Cómo se configura la app (env, jwt, swagger) |
| `common/`         | Piezas transversales reutilizables           |
| `infrastructure/` | Detalles técnicos (Sequelize, bcrypt, JWT)   |
| `features/*`      | Dominios (business/auth) con CA interna      |

**Error típico:** poner `@Table` de Sequelize dentro de `domain/entities`.

**Sugerencia de commit (issue):**

Realizamos el commit

``` bash
git add . git commit -m "docs: note clean architecture folder responsibilities"
```

![](images/clipboard-3115426755.png)

Verfificamos en Github

![](images/clipboard-1235618571.png)

------------------------------------------------------------------------

## FASE 4 — `03_BASE_ENTORNO_ENV`

### Configuración del entorno tipado (multi-base)

> **Objetivo de la fase:** Centralizar variables en `.env`: selector `DB_DIALECT` y un bloque de credenciales por motor (MySQL, PostgreSQL, SQL Server, Oracle). Validar antes del boot.

#### 4.1 — Crear `.env.example` y actualizar `.env` completo

El `.env` real NO se sube a Git. Usa BD dedicada CampusNube.

**Contrato multi-base (igual que `docs/Prompt.md`):** - `DB_DIALECT` = `mysql` \| `postgres` \| `mssql` \| `oracle` (elige qué motor corre). - MySQL: `DB_MYSQL_HOST`, `DB_MYSQL_PORT`, `DB_MYSQL_USERNAME`, `DB_MYSQL_PASSWORD`, `DB_MYSQL_NAME`. - PostgreSQL: `DB_POSTGRES_*` (puerto lab 5432). - SQL Server: `DB_MSSQL_*` (puerto lab 1433, usuario `sa`). - Oracle: `DB_ORACLE_*` + `DB_ORACLE_CONNECT_STRING` (puerto lab 1521). - Para cambiar de motor, cambia **solo** `DB_DIALECT`. No uses `DB_HOST` / `DB_USERNAME` genéricos.

``` bash
```

![](images/clipboard-2410757004.png)

![](images/clipboard-1770170136.png)

**Ahora realizamos el siguiente paso:**

``` bash

cp .env.example .env # Laboratorio: DB_DIALECT + un bloque por motor (MYSQL/POSTGRES/MSSQL/ORACLE). # Cambia solo el bloque del motor que uses. Mantén DB_*_NAME=tecnogua_ia
```

![](images/clipboard-4216363095.png)

**Sugerencia de commit (issue):**

Realizamos el commit correspondinete

``` bash
git add .
git commit -m "chore: add typed env template and local .env for campusnube"
```

![](images/clipboard-1746460580.png)

Verificamos en Github

![](images/clipboard-2236412612.png)

#### 4.2 — Interface de entorno

En este paso relaizamos lo siguiente

Tipos TypeScript de las variables de entorno (APP, DB, JWT) y enum de dialectos.

**Archivo:** `src/config/environment/env.interface.ts`

![](images/clipboard-1564653549.png)

**Sugerencia de commit (issue):**

Realizamos el commit

``` bash
git add .
git commit -m "feat: add environment interfaces and DatabaseDialect enum"
```

![](images/clipboard-702265808.png)

Verficamos en Github

![](images/clipboard-2026949456.png)

#### 4.3 — Validación de entorno con class-validator

Si falta JWT_SECRET o DB_DIALECT es inválido, o el bloque del motor activo está vacío, el boot falla con mensaje claro.

**Archivo:** `src/config/environment/env.validation.ts`

``` bash
```

![](images/clipboard-2871391334.png)

![](images/clipboard-3521592807.png)

![](images/clipboard-936575606.png)

![](images/clipboard-3641610718.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: validate environment variables with class-validator"
```

![](images/clipboard-4089399561.png)

Verifacamos en Github

![](images/clipboard-2580823397.png)

#### 4.4 — Resolver de credenciales por motor

Lee el bloque DB_MYSQL\_\* / DB_POSTGRES\_\* / DB_MSSQL\_\* / DB_ORACLE\_\* según DB_DIALECT.

**Archivo:** `src/config/environment/db-env.ts`

![](images/clipboard-3859536938.png)

![](images/clipboard-1227187629.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: resolve database credentials per dialect"
```

![](images/clipboard-2496631958.png)

![](images/clipboard-2759011974.png)

Verifacamos en Github

![](images/clipboard-1212090738.png)

#### 4.5 — Factory registerAs de entorno

Expone `environment.*` vía ConfigService (`registerAs`).

**Archivo:** `src/config/environment/env.config.ts`

![](images/clipboard-1069328555.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: register environment config factory"
```

![](images/clipboard-2349995675.png)

Vereficamos en Github

![](images/clipboard-1812688162.png)

## FASE 5 — `04_BASE_DATABASE_SEQUELIZE`

### Base de datos multi-dialecto (Sequelize)

> Conectamos Sequelize al motor de `DB_DIALECT` usando el bloque `DB_MYSQL_*` / `DB_POSTGRES_*` / `DB_MSSQL_*` / `DB_ORACLE_*`. Aún sin features (ALL_MODELS vacío).

#### 5.1 — Constante SEQUELIZE_TOKEN

Token DI para inyectar la instancia Sequelize en repositorios.

**Archivo:** `src/common/constants/database.constants.ts`

``` bash
mkdir -p src/common/constants cat > src/common/constants/database.constants.ts <<'EOF_BACKEND_MANUAL' export const SEQUELIZE_TOKEN = 'SEQUELIZE'; EOF_BACKEND_MANUAL
```

![](images/clipboard-762697150.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add SEQUELIZE_TOKEN constant"
```

![](images/clipboard-134448391.png)

#### 5.2 — Tipos auxiliares de database config

Tipos auxiliares del bloque config/database (legado/compat).

**Archivo:** `src/config/database/database.types.ts`

``` bash
```

![](images/clipboard-1306153006.png)

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "chore: add database.types helpers"
```

![](images/clipboard-3261062312.png)

Verificamos si se creo en Github

![](images/clipboard-3917405366.png)

#### 5.3 — database.config.ts

Factory registerAs opcional para namespace `database` (complementa environment).

**Archivo:** `src/config/database/database.config.ts`

``` bash
```

![](images/clipboard-1830267301.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add database.config registerAs"
```

![](images/clipboard-2054772370.png)

Verificamos en Github

![](images/clipboard-3391524224.png)

#### 5.4 — database.module.ts / providers

Módulo de configuración de BD (forFeature). Los providers quedan vacíos a propósito.

**Archivo:** `src/config/database/database.module.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.module.ts <<'EOF_BACKEND_MANUAL' import { Module } from '@nestjs/common'; import { ConfigModule } from '@nestjs/config'; import { databaseConfig } from './database.config';  @Module({   imports: [ConfigModule.forFeature(databaseConfig)],   exports: [ConfigModule], }) export class DatabaseConfigModule {} EOF_BACKEND_MANUAL
```

![](images/clipboard-4149659638.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add DatabaseConfigModule"
```

![](images/clipboard-2472240498.png)

Se verifica en Github

![](images/clipboard-1633714399.png)

#### 5.5 — database.providers.ts

Placeholder de providers de config/database.

**Archivo:** `src/config/database/database.providers.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.providers.ts <<'EOF_BACKEND_MANULA' export const DATABASE_PROVIDERS = []; EOF_BACKEND_MANUAL
```

![](images/clipboard-2526682909.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "chore: add empty DATABASE_PROVIDERS"
```

![](images/clipboard-3585471151.png)

Se verifica en Github

![](images/clipboard-416598359.png)

#### 5.6 — Opciones Sequelize por dialecto

Arma host/port/user/password/logging con el bloque del motor seleccionado por DB_DIALECT.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.options.ts`

![](images/clipboard-1966664587.png)

![](images/clipboard-167231867.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add getSequelizeOptions multi-dialect"
```

![](images/clipboard-698577788.png)

Se verificó si se creo en Github

![](images/clipboard-3653347044.png)

#### 5.7 — Factory Sequelize (sin modelos aún)

Crea la instancia Sequelize. `ALL_MODELS` empieza vacío: se llena al crear cada entidad.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.factory.ts`

![](images/clipboard-1925825785.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add createSequelizeInstance with empty ALL_MODELS"
```

![](images/clipboard-3129374122.png)

![](images/clipboard-240286589.png)

#### 5.8 — DatabaseSeederService (sin seeders aún)

Hook OnModuleInit para seeders. Todavía no llama a ningún seeder de feature.

**Archivo:** `src/infrastructure/database/seeders/database-seeder.service.ts`

![](images/clipboard-110733854.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add DatabaseSeederService scaffold"
```

![](images/clipboard-2007922307.png)

Se verifica en Github

![](images/clipboard-1735970936.png)

#### 5.9 — Módulo global Sequelize

Módulo `@Global()` que provee `SEQUELIZE_TOKEN` + ejecuta seeders.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.module.ts`

``` bash
```

![](images/clipboard-3593336533.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add global SequelizeDatabaseModule"
```

![](images/clipboard-508652840.png)

Se verifica en Github

![](images/clipboard-3442993441.png)

#### 5.10 — Verificar conexión a BD

Crea la BD vacía CampusNube en el motor que indica `DB_DIALECT`. Aún no hay tablas de negocio. Si falla el authenticate, corrige el **bloque de ese motor** en `.env` (no el de otro).

``` bash
# mysql: # mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS campusnube;" # postgres: # createdb campusnube # mssql (sqlcmd): # sqlcmd -S localhost -U sa -Q "CREATE DATABASE campusnube;" # oracle: crea el schema/PDB que apunte DB_ORACLE_CONNECT_STRING npm run start:dev # Busca: ✅ Conexión exitosa a MYSQL (o POSTGRES / MSSQL / ORACLE según DB_DIALECT) # Ctrl+C
```

![](images/clipboard-4220641476.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "test: verify sequelize authenticates against tecnogua_ia"
```

![](images/clipboard-684232977.png)

Ahora verificamos en Github

![](images/clipboard-3466657546.png)

#### 6.1 — config/app/app.constants.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/app/app.constants.ts`

``` bash
mkdir -p src/config/app cat > src/config/app/app.constants.ts <<'EOF_BACKEND_MANUAL' export const APP_CONFIG_NAME = 'app';  export const APP_DEFAULTS = {   PORT: 3002,   NODE_ENV: 'development', }; EOF_BACKEND_MANUAL
```

![](images/clipboard-2698699101.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add app.constants.ts"
```

![](images/clipboard-3617415654.png)

Se verifica desde Github

![](images/clipboard-2641026614.png)

#### 6.2 — config/app/app.config.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/app/app.config.ts`

![](images/clipboard-2144985209.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add app.config.ts"
```

![](images/clipboard-793146250.png)

Verificamos en Github

![](images/clipboard-3734901151.png)

#### 6.3 — config/logger/logger.config.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/logger/logger.config.ts`

``` bash
```

![](images/clipboard-3506552122.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add logger.config.ts"
```

![](images/clipboard-237023111.png)

Verificamos en Github

![](images/clipboard-1773170203.png)

#### 6.4 — config/logger/logger.module.ts

Módulo Nest del feature: cablea providers, tokens DI y controller.

**Archivo:** `src/config/logger/logger.module.ts`

![](images/clipboard-1856056513.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: wire nest module logger.module.ts"
```

![](images/clipboard-2900901802.png)

Verficamos en Github

![](images/clipboard-2071533306.png)

#### 6.5 — config/jwt/jwt.constants.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/jwt/jwt.constants.ts`

![](images/clipboard-2453647593.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add jwt.constants.ts"
```

![](images/clipboard-292292539.png)

Verificamos Github

![](images/clipboard-2480430459.png)

#### 6.6 — config/jwt/jwt.config.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/jwt/jwt.config.ts`

![](images/clipboard-3269858430.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add jwt.config.ts"
```

![](images/clipboard-4048400864.png)

Verificamos en Github

![](images/clipboard-3318526835.png)

#### 6.7 — config/swagger/swagger.constants.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/swagger/swagger.constants.ts`

![](images/clipboard-2202211041.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add swagger.constants.ts"
```

![](images/clipboard-2657632585.png)

Verificamos en Github

![](images/clipboard-313355500.png)

#### 6.8 — config/swagger/swagger.config.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/config/swagger/swagger.config.ts`

![](images/clipboard-2920590520.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add swagger.config.ts"
```

![](images/clipboard-2556245500.png)

Verificamos en Ghitub

![](images/clipboard-3173562869.png)

#### 6.9 — common/enums/status.enum.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/enums/status.enum.ts`

![](images/clipboard-735218179.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add status.enum.ts"
```

![](images/clipboard-398594375.png)

Verificamos en Github

![](images/clipboard-1485257192.png)

#### 6.10 — common/enums/http-method.enum.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/enums/http-method.enum.ts`

![](images/clipboard-1675141145.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add http-method.enum.ts"
```

![](images/clipboard-216929513.png)

Verificamos en Github

![](images/clipboard-2987008073.png)

#### 6.11 — common/enums/sort-order.enum.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/enums/sort-order.enum.ts`

![](images/clipboard-3906864917.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add sort-order.enum.ts"
```

![](images/clipboard-1670626337.png)

Verificar en Github

![](images/clipboard-827794231.png)

#### 6.12 — common/constants/app.constants.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/constants/app.constants.ts`

![](images/clipboard-3592659670.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add app.constants.ts"
```

![](images/clipboard-513106201.png)

Se verfica en Github

![](images/clipboard-1934031372.png)

#### 6.13 — common/constants/pagination.constants.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/constants/pagination.constants.ts`

![](images/clipboard-3370131502.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add pagination.constants.ts"
```

![](images/clipboard-1830201442.png)

Verificamos en Github

![](images/clipboard-1896301489.png)

#### 6.14 — common/exceptions/application.exception.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/exceptions/application.exception.ts`

![](images/clipboard-3490504036.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add application.exception.ts"
```

![](images/clipboard-562312981.png)

Verificamos en Github

![](images/clipboard-3944420489.png)

#### 6.15 — common/exceptions/domain.exception.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/exceptions/domain.exception.ts`

![](images/clipboard-1101038658.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain.exception.ts"
```

![](images/clipboard-3612606435.png)

Verificamos con Github

![](images/clipboard-1642691339.png)

#### 6.16 — common/exceptions/entity-not-found.exception.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/exceptions/entity-not-found.exception.ts`

![](images/clipboard-561050270.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add entity-not-found.exception.ts"
```

![](images/clipboard-3968346537.png)

Verificamos en Github

![](images/clipboard-4048449594.png)

#### 6.17 — common/exceptions/validation.exception.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/exceptions/validation.exception.ts`

![](images/clipboard-1591262204.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add validation.exception.ts"
```

![](images/clipboard-135362351.png)

Verificar en Github

![](images/clipboard-407095430.png)

#### 6.18 — common/filters/global-exception.filter.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/filters/global-exception.filter.ts`

![](images/clipboard-3084385529.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add global-exception.filter.ts"
```

![](images/clipboard-1556505652.png)

Verificamos en Github

![](images/clipboard-3196154934.png)

#### 6.19 — common/filters/sequelize-exception.filter.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/filters/sequelize-exception.filter.ts`

![](images/clipboard-1186664963.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add sequelize-exception.filter.ts"
```

![](images/clipboard-252837753.png)

Verificamos en Github

![](images/clipboard-1133720670.png)

#### 6.20 — common/interceptors/response.interceptor.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interceptors/response.interceptor.ts`

![](images/clipboard-267500423.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add response.interceptor.ts"
```

![](images/clipboard-2654450952.png)

Verificamos en Github

![](images/clipboard-2005024850.png)

#### 6.21 — common/interceptors/logging.interceptor.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interceptors/logging.interceptor.ts`

![](images/clipboard-33823184.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add logging.interceptor.ts"
```

![](images/clipboard-1656535576.png)

Verificamos en Github

![](images/clipboard-1316247177.png)

#### 6.22 — common/interceptors/timeout.interceptor.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interceptors/timeout.interceptor.ts`

![](images/clipboard-3036777617.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add timeout.interceptor.ts"
```

![](images/clipboard-222877493.png)

Verificamos en Github

![](images/clipboard-3888839245.png)

#### 6.23 — common/pipes/validation.pipe.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/pipes/validation.pipe.ts`

![](images/clipboard-4109774225.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add validation.pipe.ts"
```

![](images/clipboard-351218171.png)

Verificamos en Github

![](images/clipboard-3314660977.png)

#### 6.24 — common/pipes/parse-positive-int.pipe.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/pipes/parse-positive-int.pipe.ts`

![](images/clipboard-2572073584.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add parse-positive-int.pipe.ts"
```

![](images/clipboard-3418214076.png)

Verificamos en Github

![](images/clipboard-1926906940.png)

#### 6.25 — common/decorators/public.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/public.decorator.ts`

![](images/clipboard-1441355997.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add public.decorator.ts"
```

![](images/clipboard-387514524.png)

Verificamos en Github

![](images/clipboard-2479595621.png)

#### 6.26 — common/decorators/roles.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/roles.decorator.ts`

![](images/clipboard-1493062435.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add roles.decorator.ts"
```

![](images/clipboard-3037316332.png)

Verificamos con Github

![](images/clipboard-4232144685.png)

#### 6.27 — common/decorators/current-user.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/current-user.decorator.ts`

![](images/clipboard-3730600860.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add current-user.decorator.ts"
```

![](images/clipboard-3276828138.png)

Verificamos en Github

![](images/clipboard-2495709006.png)

#### 6.28 — common/decorators/resource.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/resource.decorator.ts`

![](images/clipboard-1830493935.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add resource.decorator.ts"
```

![](images/clipboard-2709924808.png)

Verificamos en Github

![](images/clipboard-2781890254.png)

#### 6.29 — common/interfaces/authenticated-user.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/authenticated-user.interface.ts`

![](images/clipboard-3777900467.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add authenticated-user.interface.ts"
```

![](images/clipboard-546381944.png)

Verificamos en Github

![](images/clipboard-307638452.png)

#### 6.30 — common/interfaces/pagination.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/pagination.interface.ts`

![](images/clipboard-163125390.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add pagination.interface.ts"
```

![](images/clipboard-994483392.png)

Se verifcó en Github

![](images/clipboard-4204956597.png)

#### 6.31 — common/interfaces/api-response.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/api-response.interface.ts`

![](images/clipboard-227582684.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add api-response.interface.ts"
```

![](images/clipboard-1317956439.png)

Se verificó en Github

![](images/clipboard-2798167764.png)

#### 6.32 — common/types/nullable.type.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/types/nullable.type.ts`

![](images/clipboard-3541257009.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add nullable.type.ts"
```

![](images/clipboard-1990913384.png)

Se verificó en Github

![](images/clipboard-3494142727.png)

#### 6.33 — common/types/optional.type.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/types/optional.type.ts`

![](images/clipboard-291740963.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add optional.type.ts"
```

![](images/clipboard-855685755.png)

Se verificó en Github

![](images/clipboard-2048282554.png)

#### 6.34 — common/utils/pagination.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/pagination.util.ts`

![](images/clipboard-4162346816.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add pagination.util.ts"
```

![](images/clipboard-1955619530.png)

Se verifcó en Github

![](images/clipboard-1605797027.png)

#### 6.35 — common/utils/date.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/date.util.ts`

![](images/clipboard-903510198.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add date.util.ts"
```

![](images/clipboard-916499666.png)

Se verificó en Github

![](images/clipboard-171781475.png)

#### 6.36 — common/utils/string.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/string.util.ts`¿

![](images/clipboard-1565378425.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add string.util.ts"
```

![](images/clipboard-796932751.png)

Verificamos en Github

![](images/clipboard-1738490990.png)

#### 6.37 — infrastructure/security/hashing/password-hasher.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/hashing/password-hasher.interface.ts`

![](images/clipboard-1672936880.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add password-hasher.interface.ts"
```

![](images/clipboard-351648589.png)

Verficamos en Github

![](images/clipboard-86770805.png)

#### 6.38 — infrastructure/security/hashing/bcrypt-password-hasher.service.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/hashing/bcrypt-password-hasher.service.ts`

![](images/clipboard-3050107496.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add bcrypt-password-hasher.service.ts"
```

![](images/clipboard-2494052433.png)

Verificamos en Github

![](images/clipboard-933804380.png)

#### 6.39 — infrastructure/security/tokens/token.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/tokens/token.interface.ts`

![](images/clipboard-1016657769.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add token.interface.ts"
```

![](images/clipboard-2860025136.png)

Verficamos en Github

![](images/clipboard-3584995211.png)

#### 6.40 — infrastructure/security/tokens/token.service.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/tokens/token.service.ts`

![](images/clipboard-2955914265.png)

![](images/clipboard-2862308736.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add token.service.ts"
```

![](images/clipboard-490750481.png)

Se verificó en Github

![](images/clipboard-2665161268.png)

#### 6.41 — infrastructure/security/security.module.ts

Módulo Nest del feature: cablea providers, tokens DI y controller.

**Archivo:** `src/infrastructure/security/security.module.ts`

![](images/clipboard-1288504716.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: wire nest module security.module.ts"
```

![](images/clipboard-3712680706.png)

Se verificó en Github

![](images/clipboard-552638182.png)

#### 6.42 — Actualizar main.ts (bootstrap completo)

Prefix global, filters, interceptors, pipes, Swagger y manejo amigable de EADDRINUSE.

**Archivo:** `src/main.ts`

![](images/clipboard-2394112310.png)

![](images/clipboard-496215501.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: harden main.ts bootstrap with swagger and global pipes"
```

![](images/clipboard-40916865.png)

Se verificó en Github

![](images/clipboard-2396666987.png)

#### 6.43 — Actualizar app.module.ts (base sin features ni guards)

Cablea Config + Sequelize + Security + Logger. Business/Auth y guards llegan en fases posteriores.

**Archivo:** `src/app.module.ts`

![](images/clipboard-3535158265.png)

![](images/clipboard-2852822681.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: wire AppModule with config database security logger"
```

![](images/clipboard-3952394356.png)

Se verificó en Github

![](images/clipboard-1986213562.png)

#### 6.44 — Verificar bootstrap transversal

La app debe arrancar, mostrar Swagger en `/api/docs` y conectar a BD. Todavía no hay endpoints de negocio.

``` bash
npm run start:dev # Abre http://localhost:3002/api/docs # Ctrl+C
```

![](images/clipboard-3865112499.png)

![](images/clipboard-1082208095.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "test: verify base infrastructure bootstrap"
```

![](images/clipboard-1170036767.png)

Se verificó en Github

![](images/clipboard-1430959678.png)

## FASE 7 — Courses

#### 7.1 — features/business/courses/domain/entities/couses.e

![](images/clipboard-3781788981.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain entity course.entity.ts"
```

![](images/clipboard-2207989503.png)

Verificamos en Github

![](images/clipboard-2729746398.png)

#### 7.2 — course-name-already-exists.exception.ts

Excepción de dominio. El caso de uso la lanza; el filter HTTP la traduce a status code.

![](images/clipboard-2534191220.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain exception course-name-already-exists.exception.ts"
```

![](images/clipboard-2681659607.png)

Verificamos en Github

![](images/clipboard-2704072215.png)

#### 7.3 — course-not-found.exception.ts

Excepción de dominio. El caso de uso la lanza; el filter HTTP la traduce a status code.

**Archivo:** `src/features/business/courses/domain/exceptions/course-not-found.exception.ts`

![](images/clipboard-1143009250.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain exception course-not-found.exception.ts"
```

![](images/clipboard-3960129143.png)

Verificamos eh Github

![](images/clipboard-415491448.png)

#### 7.4 — course-repository.por.ts

![](images/clipboard-393142458.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add repository port course-repository.interface.ts"
```

![](images/clipboard-2775699145.png)

Verificamos en Github

![](images/clipboard-4159430317.png)

#### 7.5 — course-name.validator.ts

Validador de dominio reutilizable (reglas independientes del framework HTTP).

**Archivo:** `src/features/business/courses/domain/validators/course-name.validator.ts`

![](images/clipboard-4181516782.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain validator course-name.validator.ts"
```

![](images/clipboard-2109479634.png)

Verificamos en Github

![](images/clipboard-4012600575.png)

#### 7.6 — course-descrition.validator.ts

Validador de dominio reutilizable (reglas independientes del framework HTTP).

**Archivo:** `src/features/business/courses/domain/validators/course.description.validator.ts`

![](images/clipboard-2432019979.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain validator course-description.validator.ts"
```

![](images/clipboard-744772356.png)

Verificamos en Github

![](images/clipboard-1705471064.png)

#### 7.7 — Modelo Sequelize

![](images/clipboard-3413830347.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add sequelize model course.model.ts"
```

![](images/clipboard-4046701343.png)

Verificamos en Github

![](images/clipboard-2729173565.png)

#### 7.8 —course.repository.ts

Adaptador del repositorio: implementa el puerto de dominio con Sequelize.

**Archivo:**

![](images/clipboard-605228531.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add sequelize repository course.repository.ts"
```

![](images/clipboard-595658846.png)

Verificamos en Github

![](images/clipboard-1083809229.png)

#### 7.9 — create-course-table.migration.ts

Migración documental/auxiliar de la tabla. En dev el sync de Sequelize crea el esquema.

![](images/clipboard-1406657345.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: add migration create-courses-table.migration.ts"
```

![](images/clipboard-1103956373.png)

Verificamos en Github

![](images/clipboard-1061529710.png)

#### 7.10 — courses.seeder.ts

Seeder de datos iniciales para desarrollo y verificación física en BD.

**Archivo:**

![](images/clipboard-2008341500.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "chore: add seeder courses.seeder.ts"
```

![](images/clipboard-3307244104.png)

Verificamos en Github

![](images/clipboard-2177129354.png)

#### 7.11 — course-filter.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-2866554251.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto course-filter.dto.ts"
```

![](images/clipboard-1141417486.png)

Verificar en github

![](images/clipboard-838827318.png)

#### 7.12 — course-response.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-685106936.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto course-response.dto.ts"
```

![](images/clipboard-1861155961.png)

Verificamos en Github

![](images/clipboard-1497291592.png)

#### 7.13 — create-course.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-1529303010.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto course-create.dto.ts"
```

![](images/clipboard-2217397064.png)

Verificamos en Github

![](images/clipboard-1100291139.png)

#### 7.14 — update-course.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-2138110224.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto course-update.dto.ts"
```

![](images/clipboard-1482834958.png)

Verificamos en Github

![](images/clipboard-1080601658.png)

#### 7.15 — course.mapper.ts

Mapper entre entidad de dominio y DTO de respuesta.

![](images/clipboard-3090479312.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add mapper course.mapper.ts"
```

![](images/clipboard-2538749437.png)

Verificamos en Github

![](images/clipboard-2199841257.png)

#### 7.16 — create-course.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

![](images/clipboard-3105794817.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case create-course.use-case.ts""
```

![](images/clipboard-3871418216.png)

Verificamos en Github

![](images/clipboard-2919452926.png)

#### 7.17 — delete-course.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

![](images/clipboard-2296724994.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add use case delete-course.use-case.ts"
```

![](images/clipboard-2971710898.png)

Verifcamos eb Github

![](images/clipboard-20313684.png)

#### 7.18 — Get-course.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

![](images/clipboard-1026117600.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case get-course.use-case.ts"
```

![](images/clipboard-181074642.png)

Verificamos en Github

![](images/clipboard-2783424423.png)

#### 7.19 — List-clients.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

![](images/clipboard-1583008270.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case list-courses.use-case.ts"
```

![](images/clipboard-975783086.png)

Verificamos en Github

![](images/clipboard-369416427.png)

#### 7.20 — update-course.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

![](images/clipboard-1240007897.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case update-course.use-case.ts"
```

![](images/clipboard-2515358713.png)

Verficamos en Github

![](images/clipboard-1829711456.png)

#### 7.21 — Course.serializer.ts

Serializer de presentación (forma estable de la respuesta HTTP).

![](images/clipboard-2239627157.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add serializer course.serializer.ts"
```

![](images/clipboard-3049130201.png)

Verificamos en Github

![](images/clipboard-3990477741.png)

#### 7.22 — courses.controller.ts

Controller delgado: valida DTO, llama use-case, devuelve respuesta.

![](images/clipboard-3787678343.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add controller courses.controller.ts"
```

![](images/clipboard-2951277148.png)

Verficamos en Github

![](images/clipboard-1814593610.png)

#### 7.23 — courses/index.ts

Barrel export del feature para imports limpios.

![](images/clipboard-3429921026.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: add barrel export courses"
```

![](images/clipboard-3943564554.png)

Verficamos en Github

![](images/clipboard-2217440401.png)

#### 7.24 — courses.module.ts

Módulo Nest del feature: cablea providers, tokens DI y controller.

![](images/clipboard-2796103532.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: wire nest module courses.module.ts"
```

Verificamos en Github

![](images/clipboard-3677989963.png)

#### 7.25 — Actualizar sequelize.factory.ts (registrar modelos)

Registra en ALL_MODELS solo los modelos ya creados (orden de dependencias).

![](images/clipboard-3909871866.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: register CourseModel in sequelize factory"
```

![](images/clipboard-2025979513.png)

Verificamos en Github

![](images/clipboard-1855705044.png)

#### 7.26 — Actualizar business.module.ts

Agrega el feature module de negocio recién terminado.

![](images/clipboard-2491985319.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: export CoursesModule from BusinessModule"
```

![](images/clipboard-738600480.png)

Verificamos en Github

![](images/clipboard-1871443428.png)

#### 7.27 — Actualizar database-seeder.service.ts

Ejecuta seeders en orden de dependencias al arrancar (dev).

![](images/clipboard-60419750.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: run seedCourses on bootstrap"
```

![](images/clipboard-1567590538.png)

Verficamos en Github

![](images/clipboard-2042012891.png)

#### 7.28 — Actualizar app.module.ts

Importa BusinessModule y/o AuthModule según el avance. Los guards globales llegan en la fase RBAC.

**Archivo:** `src/app.module.ts`

![](images/clipboard-1394433966.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: import BusinessModule into AppModule"
```

![](images/clipboard-1429573938.png)

Verificar en Github

![](images/clipboard-2270698405.png)

#### 7.29 — Verificar tabla física `courses` y API

Arranca la app. Debe crear/sync tabla `courses`, correr seeder y exponer `/api/clients`. Prueba list/create en Swagger o curl.

``` bash
npm run start:dev
```

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "test: verify courses table and crud endpoints"
```

![](images/clipboard-433722546.png)

Verifcar en Github

![](images/clipboard-3567146641.png)

## FASE 8 — `07_BUSINESS_ENROLLMENT`

### Business — Enrollment

> **Objetivo de la fase:** Catálogo de tipos de producto. Misma plantilla CA que Courses.

#### 8.1 — Enrollment.entity.ts

Entidad de dominio (TypeScript puro). No extiende Sequelize `Model`. Aquí viven las reglas del negocio.

![](images/clipboard-577844545.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain entity enrollment.entity.ts"
```

![](images/clipboard-3221281674.png)

Verificamos en Github

![](images/clipboard-4134813069.png)

#### 8.2 — Enrollment-not-found.exception.ts

Excepción de dominio. El caso de uso la lanza; el filter HTTP la traduce a status code.

![](images/clipboard-2364009608.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add domain exception enrollment-not-found.exception.ts"
```

![](images/clipboard-1437829291.png)

Verificamos en Github

![](images/clipboard-2950428895.png)

#### 8.3 — Enrollment-repository.interface.ts

Puerto (contrato) del repositorio. La aplicación depende de esta interface, no de Sequelize.

![](images/clipboard-2690022882.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add repository port enrollment-repository.interface.ts"
```

![](images/clipboard-4037356496.png)

Verificar en Github

![](images/clipboard-2030737078.png)

#### 8.4 — Enrollment.model.ts

Modelo Sequelize (`@Table`). Solo infraestructura: mapeo a tabla física.

![](images/clipboard-4146970544.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add sequelize model enrollment.model.ts"
```

![](images/clipboard-2392004184.png)

Verificar en Github

![](images/clipboard-2955591794.png)

#### 8.5 — Erollment.repository.ts

Adaptador del repositorio: implementa el puerto de dominio con Sequelize.

![](images/clipboard-2224296654.png)

**Sugerencia de commit (issue):**

``` bash
git add .
git commit -m "feat: add sequelize repository enrollment.repository.ts"
```

![](images/clipboard-3737952456.png)

Verificamos en Github

![](images/clipboard-3196723666.png)

#### 8.6 —table.migration.ts

Migración documental/auxiliar de la tabla. En dev el sync de Sequelize crea el esquema.

![](images/clipboard-2945129076.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: add migration create-enrollments-table.migration.ts"
```

![](images/clipboard-3804483057.png)

Verificamos en Github

![](images/clipboard-1975189210.png)

#### 8.7 —Enrollments.seeder.ts

Seeder de datos iniciales para desarrollo y verificación física en BD.

![](images/clipboard-591292729.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "chore: add seeder enrollments.seeder.ts"
```

![](images/clipboard-3731864269.png)

Verificamos con Github

![](images/clipboard-92550267.png)

#### 8.8 — create-enrollment.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-1234002009.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto create-enrollment.dto.ts"
```

![](images/clipboard-302353586.png)

Verificar en Github

![](images/clipboard-1391072445.png)

#### 8.9 —Enrollment-filter.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-1505478724.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto enrollment-filter.dto.ts"
```

![](images/clipboard-4229619307.png)

Verificamos en Github

![](images/clipboard-3476922459.png)

#### 8.10 — Enrollment-response.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-1144146374.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto enrollment-response.dto.ts"
```

![](images/clipboard-2998661488.png)

Verificar en Github

![](images/clipboard-1455988708.png)

#### 8.11 — Update-enrollment.dto.ts

DTO de entrada/salida HTTP con `class-validator` / Swagger.

![](images/clipboard-1304645484.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add dto update-enrollment.dto.ts"
```

![](images/clipboard-3933803857.png)

Verificar en Github

![](images/clipboard-3069103713.png)

#### 8.12 — Enrollment.mapper.ts

Mapper entre entidad de dominio y DTO de respuesta.

![](images/clipboard-2796511788.png)

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add mapper product-type.mapper.ts"
```

#### 8.13 —use-cases/create-enrollment.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case create-product-type.use-case.ts"
```

Verifamos en Github

#### 8.14 — use-cases/delete-enrollment.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case delete-product-type.use-case.ts"
```

Verificamos en Github

#### 8.15 — features/business/product-types/application/use-cases/get-enrollment.use-case.ts

Caso de uso (aplicación). Orquesta dominio + repositorio. El controller solo lo invoca.

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add use case get-product-type.use-case.ts"
```

Verificamos en Github

#### 

## 

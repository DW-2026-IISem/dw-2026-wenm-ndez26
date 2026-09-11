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

Verificamos en Github

#### 6.24 — common/pipes/parse-positive-int.pipe.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/pipes/parse-positive-int.pipe.ts`

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add parse-positive-int.pipe.ts"
```

Verificamos en Github

#### 6.25 — common/decorators/public.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/public.decorator.ts`

**Sugerencia de commit (issue):**

``` bash
git add . 
git commit -m "feat: add public.decorator.ts"
```

Verificamos en Github

#### 6.26 — common/decorators/roles.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/roles.decorator.ts`

``` bash
mkdir -p src/common/decorators cat > src/common/decorators/roles.decorator.ts <<'EOF_BACKEND_IA' import { SetMetadata } from '@nestjs/common';  export const ROLES_KEY = 'roles'; export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add roles.decorator.ts"
```

#### 6.27 — common/decorators/current-user.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/current-user.decorator.ts`

``` bash
mkdir -p src/common/decorators cat > src/common/decorators/current-user.decorator.ts <<'EOF_BACKEND_IA' import { createParamDecorator, ExecutionContext } from '@nestjs/common';  export const CurrentUser = createParamDecorator(   (data: string | undefined, ctx: ExecutionContext) => {     const request = ctx.switchToHttp().getRequest();     const user = request.user;     return data ? user?.[data] : user;   }, ); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add current-user.decorator.ts"
```

#### 6.28 — common/decorators/resource.decorator.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/decorators/resource.decorator.ts`

``` bash
mkdir -p src/common/decorators cat > src/common/decorators/resource.decorator.ts <<'EOF_BACKEND_IA' import { SetMetadata } from '@nestjs/common';  export const RESOURCE_KEY = 'resource'; export const ResourceMeta = (path: string, method: string) =>   SetMetadata(RESOURCE_KEY, { path, method }); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add resource.decorator.ts"
```

#### 6.29 — common/interfaces/authenticated-user.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/authenticated-user.interface.ts`

``` bash
mkdir -p src/common/interfaces cat > src/common/interfaces/authenticated-user.interface.ts <<'EOF_BACKEND_IA' export interface AuthenticatedUser {   id: number;   email: string;   username: string;   roles: string[]; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add authenticated-user.interface.ts"
```

#### 6.30 — common/interfaces/pagination.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/pagination.interface.ts`

``` bash
mkdir -p src/common/interfaces cat > src/common/interfaces/pagination.interface.ts <<'EOF_BACKEND_IA' export interface PaginationMeta {   page: number;   limit: number;   total: number;   totalPages: number; }  export interface PaginatedResult<T> {   items: T[];   meta: PaginationMeta; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add pagination.interface.ts"
```

#### 6.31 — common/interfaces/api-response.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/interfaces/api-response.interface.ts`

``` bash
mkdir -p src/common/interfaces cat > src/common/interfaces/api-response.interface.ts <<'EOF_BACKEND_IA' export interface ApiResponseBody<T> {   statusCode: number;   message: string;   data: T;   timestamp: string; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add api-response.interface.ts"
```

#### 6.32 — common/types/nullable.type.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/types/nullable.type.ts`

``` bash
mkdir -p src/common/types cat > src/common/types/nullable.type.ts <<'EOF_BACKEND_IA' export type Nullable<T> = T | null; EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add nullable.type.ts"
```

#### 6.33 — common/types/optional.type.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/types/optional.type.ts`

``` bash
mkdir -p src/common/types cat > src/common/types/optional.type.ts <<'EOF_BACKEND_IA' export type Optional<T> = T | undefined; EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add optional.type.ts"
```

#### 6.34 — common/utils/pagination.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/pagination.util.ts`

``` bash
mkdir -p src/common/utils cat > src/common/utils/pagination.util.ts <<'EOF_BACKEND_IA' import {   DEFAULT_LIMIT,   DEFAULT_PAGE,   MAX_LIMIT, } from '../constants/pagination.constants'; import { PaginatedResult } from '../interfaces/pagination.interface';  export function normalizePagination(page?: number, limit?: number) {   const safePage = !page || page < 1 ? DEFAULT_PAGE : page;   const safeLimit = !limit || limit < 1 ? DEFAULT_LIMIT : Math.min(limit, MAX_LIMIT);   const offset = (safePage - 1) * safeLimit;   return { page: safePage, limit: safeLimit, offset }; }  export function buildPaginatedResult<T>(   items: T[],   total: number,   page: number,   limit: number, ): PaginatedResult<T> {   return {     items,     meta: {       page,       limit,       total,       totalPages: Math.ceil(total / limit) || 0,     },   }; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add pagination.util.ts"
```

#### 6.35 — common/utils/date.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/date.util.ts`

``` bash
mkdir -p src/common/utils cat > src/common/utils/date.util.ts <<'EOF_BACKEND_IA' export function addDays(date: Date, days: number): Date {   const result = new Date(date);   result.setDate(result.getDate() + days);   return result; }  export function parseDurationToMs(duration: string): number {   const match = /^(\d+)([smhd])$/.exec(duration);   if (!match) {     return 24 * 60 * 60 * 1000;   }    const value = parseInt(match[1], 10);   const unit = match[2];    switch (unit) {     case 's':       return value * 1000;     case 'm':       return value * 60 * 1000;     case 'h':       return value * 60 * 60 * 1000;     case 'd':       return value * 24 * 60 * 60 * 1000;     default:       return 24 * 60 * 60 * 1000;   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add date.util.ts"
```

#### 6.36 — common/utils/string.util.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/common/utils/string.util.ts`

``` bash
mkdir -p src/common/utils cat > src/common/utils/string.util.ts <<'EOF_BACKEND_IA' export function normalizeEmail(email: string): string {   return email.trim().toLowerCase(); }  export function isBlank(value?: string | null): boolean {   return !value || value.trim().length === 0; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add string.util.ts"
```

#### 6.37 — infrastructure/security/hashing/password-hasher.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/hashing/password-hasher.interface.ts`

``` bash
mkdir -p src/infrastructure/security/hashing cat > src/infrastructure/security/hashing/password-hasher.interface.ts <<'EOF_BACKEND_IA' export const PASSWORD_HASHER = 'PASSWORD_HASHER';  export interface IPasswordHasher {   hash(plain: string): Promise<string>;   compare(plain: string, hashed: string): Promise<boolean>; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add password-hasher.interface.ts"
```

#### 6.38 — infrastructure/security/hashing/bcrypt-password-hasher.service.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/hashing/bcrypt-password-hasher.service.ts`

``` bash
mkdir -p src/infrastructure/security/hashing cat > src/infrastructure/security/hashing/bcrypt-password-hasher.service.ts <<'EOF_BACKEND_IA' import { Injectable } from '@nestjs/common'; import * as bcrypt from 'bcrypt'; import { IPasswordHasher } from './password-hasher.interface';  @Injectable() export class BcryptPasswordHasherService implements IPasswordHasher {   private readonly rounds = 10;    async hash(plain: string): Promise<string> {     return bcrypt.hash(plain, this.rounds);   }    async compare(plain: string, hashed: string): Promise<boolean> {     return bcrypt.compare(plain, hashed);   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add bcrypt-password-hasher.service.ts"
```

#### 6.39 — infrastructure/security/tokens/token.interface.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/tokens/token.interface.ts`

``` bash
mkdir -p src/infrastructure/security/tokens cat > src/infrastructure/security/tokens/token.interface.ts <<'EOF_BACKEND_IA' export const TOKEN_SERVICE = 'TOKEN_SERVICE';  export interface TokenPayload {   sub: number;   email: string;   username: string;   roles: string[]; }  export interface IssuedTokens {   accessToken: string;   refreshToken: string;   expiresIn: string; }  export interface ITokenService {   signAccessToken(payload: TokenPayload): Promise<string>;   signRefreshToken(payload: TokenPayload): Promise<string>;   verifyAccessToken(token: string): Promise<TokenPayload>;   verifyRefreshToken(token: string): Promise<TokenPayload>;   issueTokens(payload: TokenPayload): Promise<IssuedTokens>; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add token.interface.ts"
```

#### 6.40 — infrastructure/security/tokens/token.service.ts

Archivo del feature en Clean Architecture.

**Archivo:** `src/infrastructure/security/tokens/token.service.ts`

``` bash
mkdir -p src/infrastructure/security/tokens cat > src/infrastructure/security/tokens/token.service.ts <<'EOF_BACKEND_IA' import { Injectable } from '@nestjs/common'; import { ConfigService } from '@nestjs/config'; import { JwtService } from '@nestjs/jwt'; import {   ITokenService,   IssuedTokens,   TokenPayload, } from './token.interface';  @Injectable() export class TokenService implements ITokenService {   constructor(     private readonly jwtService: JwtService,     private readonly configService: ConfigService,   ) {}    async signAccessToken(payload: TokenPayload): Promise<string> {     return this.jwtService.signAsync(payload, {       secret: this.configService.get<string>('environment.jwt.secret'),       expiresIn: this.configService.get<string>('environment.jwt.expiresIn') as any,     });   }    async signRefreshToken(payload: TokenPayload): Promise<string> {     return this.jwtService.signAsync(payload, {       secret: this.configService.get<string>('environment.jwt.refreshSecret'),       expiresIn: this.configService.get<string>(         'environment.jwt.refreshExpiresIn',       ) as any,     });   }    async verifyAccessToken(token: string): Promise<TokenPayload> {     return this.jwtService.verifyAsync<TokenPayload>(token, {       secret: this.configService.get<string>('environment.jwt.secret'),     });   }    async verifyRefreshToken(token: string): Promise<TokenPayload> {     return this.jwtService.verifyAsync<TokenPayload>(token, {       secret: this.configService.get<string>('environment.jwt.refreshSecret'),     });   }    async issueTokens(payload: TokenPayload): Promise<IssuedTokens> {     const [accessToken, refreshToken] = await Promise.all([       this.signAccessToken(payload),       this.signRefreshToken(payload),     ]);      return {       accessToken,       refreshToken,       expiresIn:         this.configService.get<string>('environment.jwt.expiresIn') || '1d',     };   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add token.service.ts"
```

#### 6.41 — infrastructure/security/security.module.ts

Módulo Nest del feature: cablea providers, tokens DI y controller.

**Archivo:** `src/infrastructure/security/security.module.ts`

``` bash
mkdir -p src/infrastructure/security cat > src/infrastructure/security/security.module.ts <<'EOF_BACKEND_IA' import { Global, Module } from '@nestjs/common'; import { ConfigModule, ConfigService } from '@nestjs/config'; import { JwtModule } from '@nestjs/jwt'; import { PASSWORD_HASHER } from './hashing/password-hasher.interface'; import { BcryptPasswordHasherService } from './hashing/bcrypt-password-hasher.service'; import { TOKEN_SERVICE } from './tokens/token.interface'; import { TokenService } from './tokens/token.service';  @Global() @Module({   imports: [     JwtModule.registerAsync({       imports: [ConfigModule],       inject: [ConfigService],       useFactory: (configService: ConfigService) => ({         secret: configService.get<string>('environment.jwt.secret') ?? '',         signOptions: {           expiresIn: (configService.get<string>('environment.jwt.expiresIn') ??             '1d') as any,         },       }),     }),   ],   providers: [     BcryptPasswordHasherService,     {       provide: PASSWORD_HASHER,       useExisting: BcryptPasswordHasherService,     },     TokenService,     {       provide: TOKEN_SERVICE,       useExisting: TokenService,     },   ],   exports: [     JwtModule,     BcryptPasswordHasherService,     PASSWORD_HASHER,     TokenService,     TOKEN_SERVICE,   ], }) export class SecurityModule {} EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: wire nest module security.module.ts"
```

#### 6.42 — Actualizar main.ts (bootstrap completo)

Prefix global, filters, interceptors, pipes, Swagger y manejo amigable de EADDRINUSE.

**Archivo:** `src/main.ts`

``` bash
mkdir -p src cat > src/main.ts <<'EOF_BACKEND_IA' import { NestFactory } from '@nestjs/core'; import { ConfigService } from '@nestjs/config'; import { AppModule } from './app.module'; import { getLoggerConfig } from './config/logger/logger.config'; import { GlobalExceptionFilter } from './common/filters/global-exception.filter'; import { ResponseInterceptor } from './common/interceptors/response.interceptor'; import { LoggingInterceptor } from './common/interceptors/logging.interceptor'; import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor'; import { CustomValidationPipe } from './common/pipes/validation.pipe'; import { setupSwagger } from './config/swagger/swagger.config'; import { GLOBAL_PREFIX } from './common/constants/app.constants';  async function bootstrap() {   const app = await NestFactory.create(AppModule, {     logger: getLoggerConfig().logLevels,   });    const configService = app.get(ConfigService);   const port = configService.get<number>('app.port', 3002);    app.setGlobalPrefix(GLOBAL_PREFIX);    app.useGlobalFilters(new GlobalExceptionFilter());    app.useGlobalInterceptors(     new ResponseInterceptor(),     new LoggingInterceptor(),     new TimeoutInterceptor(),   );    app.useGlobalPipes(new CustomValidationPipe());    setupSwagger(app);    try {     await app.listen(port);     console.log(`🚀 Application running on: http://localhost:${port}`);     console.log(`📘 Swagger: http://localhost:${port}/api/docs`);   } catch (error: any) {     if (error?.code === 'EADDRINUSE') {       console.error(         `❌ El puerto ${port} ya está en uso (EADDRINUSE).\n` +           `   Solución rápida:\n` +           `   1) npm run free:port\n` +           `   2) npm run start:dev\n` +           `   O cambia PORT en el archivo .env`,       );       await app.close();       process.exit(1);     }     throw error;   } } bootstrap(); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: harden main.ts bootstrap with swagger and global pipes"
```

#### 6.43 — Actualizar app.module.ts (base sin features ni guards)

Cablea Config + Sequelize + Security + Logger. Business/Auth y guards llegan en fases posteriores.

**Archivo:** `src/app.module.ts`

``` bash
mkdir -p src cat > src/app.module.ts <<'EOF_BACKEND_IA' import { Module } from '@nestjs/common'; import { ConfigModule } from '@nestjs/config'; import { envConfig } from './config/environment/env.config'; import { appConfig } from './config/app/app.config'; import { jwtConfig } from './config/jwt/jwt.config'; import { LoggerModule } from './config/logger/logger.module'; import { SequelizeDatabaseModule } from './infrastructure/database/sequelize/sequelize.module'; import { SecurityModule } from './infrastructure/security/security.module'; import { AppController } from './app.controller'; import { AppService } from './app.service';  @Module({   imports: [     ConfigModule.forRoot({       isGlobal: true,       load: [envConfig, appConfig, jwtConfig],       envFilePath: '.env',     }),     SequelizeDatabaseModule,     SecurityModule,     LoggerModule,   ],   controllers: [AppController],   providers: [     AppService,   ], }) export class AppModule {} EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: wire AppModule with config database security logger"
```

#### 6.44 — Verificar bootstrap transversal

La app debe arrancar, mostrar Swagger en `/api/docs` y conectar a BD. Todavía no hay endpoints de negocio.

``` bash
npm run start:dev # Abre http://localhost:3002/api/docs # Ctrl+C
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "test: verify base infrastructure bootstrap"
```

------------------------------------------------------------------------

## 

## 

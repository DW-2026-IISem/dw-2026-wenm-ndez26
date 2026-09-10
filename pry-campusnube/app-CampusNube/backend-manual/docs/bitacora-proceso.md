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

#### 5.2 — Tipos auxiliares de database confighk

Tipos auxiliares del bloque config/database (legado/compat).

**Archivo:** `src/config/database/database.types.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.types.ts <<'EOF_BACKEND_IA' import { Options as SequelizeOptions } from 'sequelize';  export type DialectOptions =   | { dialect: 'mysql'; options?: SequelizeOptions }   | { dialect: 'postgres'; options?: SequelizeOptions }   | { dialect: 'mssql'; options?: SequelizeOptions }   | { dialect: 'oracle'; options?: SequelizeOptions }; EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "chore: add database.types helpers"
```

#### 5.3 — database.config.ts

Factory registerAs opcional para namespace `database` (complementa environment).

**Archivo:** `src/config/database/database.config.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.config.ts <<'EOF_BACKEND_IA' import { registerAs } from '@nestjs/config'; import { resolveDialectCredentials } from '../environment/db-env'; import { DatabaseDialect } from '../environment/env.interface';  export const DATABASE_CONFIG_NAME = 'database';  const dialectModuleMap: Record<DatabaseDialect, string> = {   [DatabaseDialect.MySQL]: 'mysql2',   [DatabaseDialect.Postgres]: 'pg',   [DatabaseDialect.MSSQL]: 'tedious',   [DatabaseDialect.Oracle]: 'oracledb', };  export const databaseConfig = registerAs(DATABASE_CONFIG_NAME, () => {   const dialect =     (process.env.DB_DIALECT as DatabaseDialect) || DatabaseDialect.MySQL;   const credentials = resolveDialectCredentials({     DB_DIALECT: dialect,     ...process.env,   });    return {     ...credentials,     dialectModulePath: dialectModuleMap[dialect],     autoLoadModels: true,     synchronize: process.env.NODE_ENV !== 'production',     logging: process.env.NODE_ENV === 'development' ? console.log : false,   }; }); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add database.config registerAs"
```

#### 5.4 — database.module.ts / providers

Módulo de configuración de BD (forFeature). Los providers quedan vacíos a propósito.

**Archivo:** `src/config/database/database.module.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.module.ts <<'EOF_BACKEND_IA' import { Module } from '@nestjs/common'; import { ConfigModule } from '@nestjs/config'; import { databaseConfig } from './database.config';  @Module({   imports: [ConfigModule.forFeature(databaseConfig)],   exports: [ConfigModule], }) export class DatabaseConfigModule {} EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add DatabaseConfigModule"
```

#### 5.5 — database.providers.ts

Placeholder de providers de config/database.

**Archivo:** `src/config/database/database.providers.ts`

``` bash
mkdir -p src/config/database cat > src/config/database/database.providers.ts <<'EOF_BACKEND_IA' export const DATABASE_PROVIDERS = []; EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "chore: add empty DATABASE_PROVIDERS"
```

#### 5.6 — Opciones Sequelize por dialecto

Arma host/port/user/password/logging con el bloque del motor seleccionado por DB_DIALECT.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.options.ts`

``` bash
mkdir -p src/infrastructure/database/sequelize cat > src/infrastructure/database/sequelize/sequelize.options.ts <<'EOF_BACKEND_IA' import { SequelizeOptions } from 'sequelize-typescript'; import { resolveDialectCredentials } from '../../../config/environment/db-env'; import { DatabaseDialect } from '../../../config/environment/env.interface';  export function getSequelizeOptions(   dialect: DatabaseDialect, ): Partial<SequelizeOptions> {   const credentials = resolveDialectCredentials({     DB_DIALECT: dialect,     ...process.env,   });    const base: SequelizeOptions = {     dialect: dialect as SequelizeOptions['dialect'],     host: credentials.host,     port: credentials.port,     username: credentials.username,     password: credentials.password,     database: credentials.database,     logging: process.env.NODE_ENV === 'development' ? console.log : false,     define: {       underscored: false,       freezeTableName: true,     },   };    switch (dialect) {     case DatabaseDialect.MSSQL:       return {         ...base,         dialectOptions: {           options: {             encrypt: true,             trustServerCertificate: true,           },         },       };     case DatabaseDialect.Oracle:       return {         ...base,         dialectOptions: {           connectString: credentials.connectString,         },       };     default:       return base;   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add getSequelizeOptions multi-dialect"
```

#### 5.7 — Factory Sequelize (sin modelos aún)

Crea la instancia Sequelize. `ALL_MODELS` empieza vacío: se llena al crear cada entidad.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.factory.ts`

``` bash
mkdir -p src/infrastructure/database/sequelize cat > src/infrastructure/database/sequelize/sequelize.factory.ts <<'EOF_BACKEND_IA' import { Sequelize } from 'sequelize-typescript'; import { DatabaseDialect } from '../../../config/environment/env.interface'; import { getSequelizeOptions } from './sequelize.options';   export const ALL_MODELS = [   // (aún sin modelos — se agregan por feature) ];  export async function createSequelizeInstance(   dialect: DatabaseDialect, ): Promise<Sequelize> {   const options = getSequelizeOptions(dialect);    let dialectModule: any;    switch (dialect) {     case DatabaseDialect.MySQL:       dialectModule = require('mysql2');       break;     case DatabaseDialect.Postgres:       dialectModule = require('pg');       break;     case DatabaseDialect.MSSQL:       dialectModule = require('tedious');       break;     case DatabaseDialect.Oracle:       dialectModule = require('oracledb');       break;     default:       throw new Error(`Dialecto no soportado: ${dialect}`);   }    const sequelize = new Sequelize({     ...options,     dialectModule,     models: ALL_MODELS,   } as any);    try {     await sequelize.authenticate();     console.log(`✅ Conexión exitosa a ${dialect.toUpperCase()}`);   } catch (error: any) {     console.error(       `❌ Error conectando a ${dialect.toUpperCase()}:`,       error.message,     );     throw error;   }    if (process.env.NODE_ENV !== 'production') {     await sequelize.sync({ alter: false });     console.log('✅ Tablas sincronizadas');   }    return sequelize; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add createSequelizeInstance with empty ALL_MODELS"
```

#### 5.8 — DatabaseSeederService (sin seeders aún)

Hook OnModuleInit para seeders. Todavía no llama a ningún seeder de feature.

**Archivo:** `src/infrastructure/database/seeders/database-seeder.service.ts`

``` bash
mkdir -p src/infrastructure/database/seeders cat > src/infrastructure/database/seeders/database-seeder.service.ts <<'EOF_BACKEND_IA' import { Injectable, Logger, OnModuleInit } from '@nestjs/common';   /**  * Ejecuta seeders en orden de dependencias.  * Solo en entornos no productivos.  */ @Injectable() export class DatabaseSeederService implements OnModuleInit {   private readonly logger = new Logger(DatabaseSeederService.name);    async onModuleInit(): Promise<void> {     if (process.env.NODE_ENV === 'production') {       return;     }      try {       // sin seeders aún       this.logger.log('✅ Seeders ejecutados');     } catch (error: any) {       this.logger.error(`❌ Error en seeders: ${error.message}`, error.stack);       throw error;     }   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add DatabaseSeederService scaffold"
```

#### 5.9 — Módulo global Sequelize

Módulo `@Global()` que provee `SEQUELIZE_TOKEN` + ejecuta seeders.

**Archivo:** `src/infrastructure/database/sequelize/sequelize.module.ts`

``` bash
mkdir -p src/infrastructure/database/sequelize cat > src/infrastructure/database/sequelize/sequelize.module.ts <<'EOF_BACKEND_IA' import { Module, Global } from '@nestjs/common'; import { ConfigService } from '@nestjs/config'; import { Sequelize } from 'sequelize-typescript'; import { DatabaseDialect } from '../../../config/environment/env.interface'; import { SEQUELIZE_TOKEN } from '../../../common/constants/database.constants'; import { createSequelizeInstance } from './sequelize.factory'; import { DatabaseSeederService } from '../seeders/database-seeder.service';  @Global() @Module({   providers: [     {       provide: SEQUELIZE_TOKEN,       useFactory: async (configService: ConfigService): Promise<Sequelize> => {         const dialect = configService.get<DatabaseDialect>(           'environment.database.dialect',           DatabaseDialect.MySQL,         );         return createSequelizeInstance(dialect);       },       inject: [ConfigService],     },     DatabaseSeederService,   ],   exports: [SEQUELIZE_TOKEN], }) export class SequelizeDatabaseModule {} EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add global SequelizeDatabaseModule"
```

#### 5.10 — Verificar conexión a BD

Crea la BD vacía `tecnogua_ia` en el motor que indica `DB_DIALECT`. Aún no hay tablas de negocio. Si falla el authenticate, corrige el **bloque de ese motor** en `.env` (no el de otro).

``` bash
# mysql: # mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS tecnogua_ia;" # postgres: # createdb tecnogua_ia # mssql (sqlcmd): # sqlcmd -S localhost -U sa -Q "CREATE DATABASE tecnogua_ia;" # oracle: crea el schema/PDB que apunte DB_ORACLE_CONNECT_STRING npm run start:dev # Busca: ✅ Conexión exitosa a MYSQL (o POSTGRES / MSSQL / ORACLE según DB_DIALECT) # Ctrl+C
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "test: verify sequelize authenticates against tecnogua_ia"
```

------------------------------------------------------------------------

## 

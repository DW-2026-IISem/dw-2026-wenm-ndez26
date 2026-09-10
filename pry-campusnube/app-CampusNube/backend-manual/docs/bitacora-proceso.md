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
git add . git commit -m "chore: add typed env template and local .env for tecnogua_ia"
```

#### 4.2 — Interface de entorno

Tipos TypeScript de las variables de entorno (APP, DB, JWT) y enum de dialectos.

**Archivo:** `src/config/environment/env.interface.ts`

``` bash
mkdir -p src/config/environment cat > src/config/environment/env.interface.ts <<'EOF_BACKEND_IA' export enum Environment {   Development = 'development',   Production = 'production',   Test = 'test', }  export enum DatabaseDialect {   MySQL = 'mysql',   Postgres = 'postgres',   MSSQL = 'mssql',   Oracle = 'oracle', }  export interface AppConfig {   port: number;   nodeEnv: Environment; }  export interface DatabaseConfig {   dialect: DatabaseDialect;   host: string;   port: number;   username: string;   password: string;   database: string;   connectString?: string; }  export interface JwtConfig {   secret: string;   expiresIn: string;   refreshSecret: string;   refreshExpiresIn: string; }  export interface EnvironmentConfig {   app: AppConfig;   database: DatabaseConfig;   jwt: JwtConfig; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: add environment interfaces and DatabaseDialect enum"
```

#### 4.3 — Validación de entorno con class-validator

Si falta JWT_SECRET o DB_DIALECT es inválido, o el bloque del motor activo está vacío, el boot falla con mensaje claro.

**Archivo:** `src/config/environment/env.validation.ts`

``` bash
mkdir -p src/config/environment cat > src/config/environment/env.validation.ts <<'EOF_BACKEND_IA' import { plainToInstance } from 'class-transformer'; import {   IsEnum,   IsNumber,   IsOptional,   IsString,   Max,   Min,   validateSync, } from 'class-validator'; import {   assertActiveDialectCredentials,   resolveDialectCredentials, } from './db-env'; import { DatabaseDialect, Environment } from './env.interface';  export class EnvironmentVariables {   @IsEnum(Environment)   @IsOptional()   NODE_ENV: Environment = Environment.Development;    @IsNumber()   @Min(0)   @Max(65535)   @IsOptional()   PORT: number = 3002;    @IsEnum(DatabaseDialect)   DB_DIALECT: DatabaseDialect;    @IsString()   @IsOptional()   DB_MYSQL_HOST?: string;    @IsNumber()   @IsOptional()   DB_MYSQL_PORT?: number;    @IsString()   @IsOptional()   DB_MYSQL_USERNAME?: string;    @IsString()   @IsOptional()   DB_MYSQL_PASSWORD?: string;    @IsString()   @IsOptional()   DB_MYSQL_NAME?: string;    @IsString()   @IsOptional()   DB_POSTGRES_HOST?: string;    @IsNumber()   @IsOptional()   DB_POSTGRES_PORT?: number;    @IsString()   @IsOptional()   DB_POSTGRES_USERNAME?: string;    @IsString()   @IsOptional()   DB_POSTGRES_PASSWORD?: string;    @IsString()   @IsOptional()   DB_POSTGRES_NAME?: string;    @IsString()   @IsOptional()   DB_MSSQL_HOST?: string;    @IsNumber()   @IsOptional()   DB_MSSQL_PORT?: number;    @IsString()   @IsOptional()   DB_MSSQL_USERNAME?: string;    @IsString()   @IsOptional()   DB_MSSQL_PASSWORD?: string;    @IsString()   @IsOptional()   DB_MSSQL_NAME?: string;    @IsString()   @IsOptional()   DB_ORACLE_HOST?: string;    @IsNumber()   @IsOptional()   DB_ORACLE_PORT?: number;    @IsString()   @IsOptional()   DB_ORACLE_USERNAME?: string;    @IsString()   @IsOptional()   DB_ORACLE_PASSWORD?: string;    @IsString()   @IsOptional()   DB_ORACLE_NAME?: string;    @IsString()   @IsOptional()   DB_ORACLE_CONNECT_STRING?: string;    @IsString()   JWT_SECRET: string;    @IsString()   @IsOptional()   JWT_EXPIRES_IN: string = '1d';    @IsString()   JWT_REFRESH_SECRET: string;    @IsString()   @IsOptional()   JWT_REFRESH_EXPIRES_IN: string = '7d'; }  function formatValidationErrors(   errors: ReturnType<typeof validateSync>, ): string {   return errors     .map((error) => {       const constraints = error.constraints         ? Object.values(error.constraints).join(', ')         : 'valor inválido';       return `${error.property}: ${constraints}`;     })     .join('; '); }  export function validate(config: Record<string, unknown>): EnvironmentVariables {   const validatedConfig = plainToInstance(EnvironmentVariables, config, {     enableImplicitConversion: true,     exposeDefaultValues: true,   });    const errors = validateSync(validatedConfig, {     skipMissingProperties: false,   });    if (errors.length > 0) {     throw new Error(       `Error de configuración: variable(s) crítica(s) inválida(s) o ausente(s). ${formatValidationErrors(errors)}. Copia .env.example a .env y completa el bloque del motor elegido (DB_DIALECT).`,     );   }    assertActiveDialectCredentials(resolveDialectCredentials(validatedConfig));    return validatedConfig; } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: validate environment variables with class-validator"
```

#### 4.4 — Resolver de credenciales por motor

Lee el bloque DB_MYSQL\_\* / DB_POSTGRES\_\* / DB_MSSQL\_\* / DB_ORACLE\_\* según DB_DIALECT.

**Archivo:** `src/config/environment/db-env.ts`

``` bash
mkdir -p src/config/environment cat > src/config/environment/db-env.ts <<'EOF_BACKEND_IA' import { DatabaseConfig, DatabaseDialect } from './env.interface';  export const DEFAULT_DB_PORTS: Record<DatabaseDialect, number> = {   [DatabaseDialect.MySQL]: 3306,   [DatabaseDialect.Postgres]: 5432,   [DatabaseDialect.MSSQL]: 1433,   [DatabaseDialect.Oracle]: 1521, };  export type DialectEnvSource = {   DB_DIALECT: DatabaseDialect;   DB_MYSQL_HOST?: string;   DB_MYSQL_PORT?: string | number;   DB_MYSQL_USERNAME?: string;   DB_MYSQL_PASSWORD?: string;   DB_MYSQL_NAME?: string;   DB_POSTGRES_HOST?: string;   DB_POSTGRES_PORT?: string | number;   DB_POSTGRES_USERNAME?: string;   DB_POSTGRES_PASSWORD?: string;   DB_POSTGRES_NAME?: string;   DB_MSSQL_HOST?: string;   DB_MSSQL_PORT?: string | number;   DB_MSSQL_USERNAME?: string;   DB_MSSQL_PASSWORD?: string;   DB_MSSQL_NAME?: string;   DB_ORACLE_HOST?: string;   DB_ORACLE_PORT?: string | number;   DB_ORACLE_USERNAME?: string;   DB_ORACLE_PASSWORD?: string;   DB_ORACLE_NAME?: string;   DB_ORACLE_CONNECT_STRING?: string; };  function toPort(value: string | number | undefined, fallback: number): number {   if (typeof value === 'number' && Number.isFinite(value)) {     return value;   }   if (typeof value === 'string' && value.trim() !== '') {     const parsed = parseInt(value, 10);     if (Number.isFinite(parsed)) {       return parsed;     }   }   return fallback; }  function text(value: string | undefined): string {   return value?.trim() ?? ''; }  export function resolveDialectCredentials(   env: DialectEnvSource, ): DatabaseConfig {   const dialect = env.DB_DIALECT;   const port = DEFAULT_DB_PORTS[dialect];    switch (dialect) {     case DatabaseDialect.MySQL:       return {         dialect,         host: text(env.DB_MYSQL_HOST),         port: toPort(env.DB_MYSQL_PORT, port),         username: text(env.DB_MYSQL_USERNAME),         password: text(env.DB_MYSQL_PASSWORD),         database: text(env.DB_MYSQL_NAME),       };     case DatabaseDialect.Postgres:       return {         dialect,         host: text(env.DB_POSTGRES_HOST),         port: toPort(env.DB_POSTGRES_PORT, port),         username: text(env.DB_POSTGRES_USERNAME),         password: text(env.DB_POSTGRES_PASSWORD),         database: text(env.DB_POSTGRES_NAME),       };     case DatabaseDialect.MSSQL:       return {         dialect,         host: text(env.DB_MSSQL_HOST),         port: toPort(env.DB_MSSQL_PORT, port),         username: text(env.DB_MSSQL_USERNAME),         password: text(env.DB_MSSQL_PASSWORD),         database: text(env.DB_MSSQL_NAME),       };     case DatabaseDialect.Oracle:       return {         dialect,         host: text(env.DB_ORACLE_HOST),         port: toPort(env.DB_ORACLE_PORT, port),         username: text(env.DB_ORACLE_USERNAME),         password: text(env.DB_ORACLE_PASSWORD),         database: text(env.DB_ORACLE_NAME),         connectString: text(env.DB_ORACLE_CONNECT_STRING) || undefined,       };     default:       throw new Error(         `Error de configuración: DB_DIALECT inválido. Use mysql, postgres, mssql u oracle.`,       );   } }  export function assertActiveDialectCredentials(config: DatabaseConfig): void {   const prefix: Record<DatabaseDialect, string> = {     [DatabaseDialect.MySQL]: 'DB_MYSQL',     [DatabaseDialect.Postgres]: 'DB_POSTGRES',     [DatabaseDialect.MSSQL]: 'DB_MSSQL',     [DatabaseDialect.Oracle]: 'DB_ORACLE',   };   const tag = prefix[config.dialect];   const missing: string[] = [];    if (!config.host) missing.push(`${tag}_HOST`);   if (!config.username) missing.push(`${tag}_USERNAME`);   if (!config.database) missing.push(`${tag}_NAME`);   if (config.dialect === DatabaseDialect.Oracle && !config.connectString) {     missing.push('DB_ORACLE_CONNECT_STRING');   }    if (missing.length > 0) {     throw new Error(       `Error de configuración: variable(s) crítica(s) inválida(s) o ausente(s) para ${config.dialect}: ${missing.join(', ')}. Completa el bloque de ese motor en .env (no commitees secretos).`,     );   } } EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: resolve database credentials per dialect"
```

#### 4.5 — Factory registerAs de entorno

Expone `environment.*` vía ConfigService (`registerAs`).

**Archivo:** `src/config/environment/env.config.ts`

``` bash
mkdir -p src/config/environment cat > src/config/environment/env.config.ts <<'EOF_BACKEND_IA' import { registerAs } from '@nestjs/config'; import { resolveDialectCredentials } from './db-env'; import { Environment } from './env.interface'; import { validate } from './env.validation';  export const ENV_CONFIG_NAME = 'environment';  export const envConfig = registerAs(ENV_CONFIG_NAME, () => {   const validated = validate(process.env);    return {     app: {       port: validated.PORT,       nodeEnv: validated.NODE_ENV ?? Environment.Development,     },     database: resolveDialectCredentials(validated),     jwt: {       secret: validated.JWT_SECRET,       expiresIn: validated.JWT_EXPIRES_IN,       refreshSecret: validated.JWT_REFRESH_SECRET,       refreshExpiresIn: validated.JWT_REFRESH_EXPIRES_IN,     },   }; }); EOF_BACKEND_IA
```

**Sugerencia de commit (issue):**

``` bash
git add . git commit -m "feat: register environment config factory"
```

------------------------------------------------------------------------

## 

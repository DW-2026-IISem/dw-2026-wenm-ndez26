# Backend Express — CampusNube

## Documentación del proyecto

**Proyecto:** CampusNube – Aprendizaje virtual\
**Backend:** Express + TypeScript + Sequelize\
**Base de datos:** MySQL\
**Arquitectura:** Organización por features\
**Repositorio:** wenmendez26

------------------------------------------------------------------------

# 1. ISS-00 — Requisitos previos

**Objetivo:** entorno listo para el laboratorio.\
**Bloqueado por:** ninguno.

### Criterios de aceptación (ISS-00)

- [x] `node -v` muestra v20+ (lab: v24.x)
- [x] `npm -v` responde
- [ ] Motor de BD accesible (MySQL recomendado para el primer `sync`)

### Pasos

``` bash
node -v npm -v
```

### Verificación del ISS

``` bash
node -v && npm -v
```

#### EVIDENCIA

#### ![](images/clipboard-1705120117.png)

------------------------------------------------------------------------

# 2. ISS-01 — Esqueleto del proyecto

**Objetivo:** proyecto npm + TypeScript + Express con estructura `features/` y servidor HTTP base.\
**Bloqueado por:** ISS-00.

### Criterios de aceptación (ISS-01) — consolidados

- [ ] **2.1** Existe `package.json` con `"type": "commonjs"` y scripts `build` / `dev`

  #### Evidencia

  ![](images/clipboard-625410312.png)

- [ ] **2.2** Árbol `src/` con `config`, `database/seeders`, `routes`, `features/business/` (auth **fuera de alcance** de este lab)

  #### Se creó la estructura base del backend Express organizada por features, adaptada al dominio de CampusNube. Se prepararon las carpetas correspondientes a las 11 entidades del sistema.

  La estructura contempla los features Learner, Teacher, Course, Module, Lesson, Enrollment, Evaluation, Attempt, Submission, Progress y Certificate.

  ![](images/clipboard-487243888.png)

- [ ] **2.3** Dependencias Express/TS instaladas (`npm ls --depth=0`)

  ### Evidencia

  ![](images/clipboard-3449297051.png)

- [ ] **2.4** Existe `tsconfig.json` (`rootDir: ./src`, `outDir: ./dist`, `strict: true`)

  ### Evidencia

  ![](images/clipboard-1837826771.png)

- [ ] **2.5** Existen `src/server.ts` y `src/config/index.ts` (esqueleto App) `npx tsc --noEmit` sin errores al cerrar el ISS

  CREAMOS EL ESQUELETO DE APP

  #### 2.5.1 — `src/server.ts`

![](images/clipboard-3695772202.png)

### 2.5.3 — Verificar los archivos creados

![](images/clipboard-3576761008.png)

### 2.5.4 — Ejecutar el servidor

![](images/clipboard-2373908580.png)

### Realizamos el primer commit

``` bash
git add .
git commit -m "ISS-01: Esqueleto del proyecto"
git push origin main
```

# 2. ISS-01 — Esqueleto del proyecto

**Objetivo:** proyecto npm + TypeScript + Express con estructura `features/` y servidor HTTP base.\
**Bloqueado por:** ISS-00.

### Criterios de aceptación (ISS-01) — consolidados

- [ ] **2.1** Existe `package.json` con `"type": "commonjs"` y scripts `build` / `dev`

  ### EVIDENCIA

  ![](images/clipboard-2359049380.png)

- [ ] **2.2** Árbol `src/` con `config`, `database/seeders`, `routes`, `features/business/`

  #### EVIDENCIA

  ![](images/clipboard-739199143.png)

- [ ] **2.3** Dependencias Express/TS instaladas (`npm ls --depth=0`)

  #### EVIDENCIA

  ![](images/clipboard-165362000.png)

- [ ] **2.4** Existe `tsconfig.json` (`rootDir: ./src`, `outDir: ./dist`, `strict: true`)

  #### EVIDENCIA

  ![](images/clipboard-2314045361.png)

  **2.5** Existen `src/server.ts` y `src/config/index.ts` (esqueleto App)

  `npx tsc --noEmit` sin errores al cerrar el ISS

  ### EVIDENCIA `config/index.ts`

  ![](images/clipboard-1908940105.png)

  ### EVIDENCIA `config/server.ts`

![](images/clipboard-4268425216.png)

## 2.1 Inicializar npm y scripts

**Criterios de este sub-ítem**

- [x] `package.json` creado
- [x] Scripts `build` y `dev` definidos
- [x] **PARCHE** — `package.json` **ya existe** (lo creó `npm init -y`).

<!-- -->

- **Dentro de** `"scripts"`: deja solo (o añade) `build` y `dev` como abajo.
- **Debajo de** `"license"` (o al mismo nivel que `"scripts"`): asegúrate de `"type": "commonjs"`.

### EVIDENCIA

![](images/clipboard-2646010305.png)

#### Verificación

``` bash
node -e "const p=require('./package.json'); console.log(p.scripts)"
```

![](images/clipboard-2629655820.png)

------------------------------------------------------------------------

## 2.2 Estructura de carpetas (features)

**Criterios de este sub-ítem**

- [x] Carpetas de infra y features creadas según el árbol

| Carpeta | Uso |
|----------------------------------------------|--------------------------|
| `features/business/<entidad>/` | model + controller + routes (+ seeder, swagger, http, associations) |
| `database/seeders/` | counts + SeedersRunner (`npm run db:seed`) |
| `routes/index.ts` | Agregador de features |
| `config/` · `database/` | Arranque e infraestructura |

**Seeders (patrón del lab)**

| Pieza | Dónde |
|------------------------------------|------------------------------------|
| Por entidad | `src/features/business/<entidad>/<entidad>.seeder.ts` |
| Runner + counts | `src/database/seeders/{index,counts}.ts` → `npm run db:seed` |
| Datos falsos | `@faker-js/faker` |

``` bash
find src -type d | sort
```

#### Evidencia

![](images/clipboard-3900110705.png)

------------------------------------------------------------------------

## 2.3 Dependencias base (Express + TypeScript)

**Criterios de este sub-ítem**

- [x] `express`, `cors`, `dotenv`, `morgan` instalados
- [x] `typescript`, `ts-node`, `nodemon`, `@types/*` instalados

``` bash
npm install express@^5.2.1 cors@^2.8.6 dotenv@^17.4.2 morgan@^1.12.1  npm install -D typescript@~5.9.2 ts-node@^10.9.2 nodemon@^3.1.14 \   @types/node@^22.20.3 @types/express@^5.0.6 \   @types/cors@^2.8.19 @types/morgan@^1.9.10
```

> En este paso ya habíamos realizado este paso
>
> TypeScript en **5.9.x** por compatibilidad con `ts-node`.

``` bash
npm ls --depth=0
```

#### Evidencia

![](images/clipboard-2539398355.png)

------------------------------------------------------------------------

## 2.4 TypeScript (`tsconfig.json`)

**Criterios de este sub-ítem**

- [x] `tsconfig.json` con `rootDir: ./src`, `outDir: ./dist`, `strict: true`

``` bash
Ya este pasó se realizó correctamente solo verificamos 
```

``` bash
test -f tsconfig.json && npx tsc --showConfig | head -20
```

![](images/clipboard-3079428652.png)

------------------------------------------------------------------------

## 2.5 Servidor y App (esqueleto HTTP)

**Criterios de este sub-ítem**

- [x] Existen `src/server.ts` y `src/config/index.ts`

  #### Evidencia `src/server.ts`![](images/clipboard-3081404163.png)

  #### Evidencia `src/config/index.ts`

  ![](images/clipboard-3723639345.png)

- [x] `App` define `settings`, `middlewares`, `routes`, `dbConnection`, `listen` (placeholders OK)

### Verificación del ISS-01

``` bash
npx tsc --noEmit find src -type f | sort
```

![](images/clipboard-1244678421.png)

### Cierre del ISS

``` bash
npm run dev
```

> El servidor debe arrancar sin error. Detenerlo con Ctrl+C antes de continuar.
>
> ![](images/clipboard-2806914315.png)

### Realizamos el commit

``` bash
git add . 
git commit -m "ISS-01: ISS-01: Inicializar npm y scripts" 
git push origin main
```

![](images/clipboard-1244445308.png){width="722"}

# 3. ISS-02 — Infraestructura de base de datos

**Objetivo:** drivers + `.env` + módulo Sequelize + carpeta `seeders/`.\
**Bloqueado por:** ISS-01.

### Criterios de aceptación (ISS-02) — consolidados

- [ ] **3.1** Paquetes Sequelize/drivers instalados; existe `.env` con `DB_ENGINE` y bloques de motores

  ![](images/clipboard-3659110232.png)

- [ ] **3.2** Existe `src/database/db.ts` exportando `sequelize`, `getDatabaseInfo`, `testConnection`

  Crear `src/database/db.ts`

  ![](images/clipboard-1563374045.png)

- [ ] **3.3** Existe carpeta `src/database/seeders/` **sin** lógica implementada aún

  ![](images/clipboard-2590173340.png)

- [ ] `npx tsc --noEmit`

  ![](images/clipboard-1361748247.png)

  ### Realizamos el commit

  ``` bash
  git add . 
  git commit -m "ISS-02: Infraestructura de base de datos"  
  git push origin main
  ```

  # ![](images/clipboard-1242110958.png)

------------------------------------------------------------------------

## 3.1 Drivers Sequelize y `.env`

**Criterios de este sub-ítem**

- [x] `sequelize`, `mysql2`, `pg`, `pg-hstore`, `tedious`, `oracledb` instalados

- [x] `.env` con `PORT`, `DB_ENGINE`, MySQL/Postgres/MSSQL/Oracle

- [x] Instalar Sequelize y los drivers

  #### Evidencia

  ![](images/clipboard-3702284504.png)

- [x] ![](images/clipboard-2814811267.png)

  #### Crear `.env` para CampusNube

  ![](images/clipboard-2378225846.png)

#### Verificar Sequelize y MySQL

![](images/clipboard-1561342852.png)

- ::: {}
  ### Realizamos el commit

  ``` bash
  git add . 
  git commit -m "ISS-02: Drivers Sequelize y .env"  
  git push origin main
  ```
  :::

![](images/clipboard-1802680355.png)

## 3.2 Configuración Sequelize (`database/db.ts`)

**Criterios de este sub-ítem**

- [ ] Archivo `src/database/db.ts` creado

  ![](images/clipboard-3159151139.png)

- [ ] Exporta `sequelize`, `getDatabaseInfo`, `testConnection`

``` bash
test -f src/database/db.ts && npx tsc --noEmit
```

- ::: {}
  ### Realizamos el commit

  ``` bash
  git add . 
  git commit -m "Configuración Sequelize (database/db.ts)"
  git push origin main
  ```
  :::

  ![](images/clipboard-2651415791.png)

------------------------------------------------------------------------

## 3.3 Carpeta seeders (reservada)

**Criterios de este sub-ítem**

- [x] `src/database/seeders/` existe (la lógica llega en ISS-04)

  ![](images/clipboard-3995174481.png)

- [x] `src/database/seeders/` existe **sin** `*.seeder.ts` ni runner

  ### Verificación del ISS-02

``` bash
npx tsc --noEmit test -f src/database/db.ts && test -f .env && test -d src/database/seeders
```

![](images/clipboard-199508076.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-228772405.png)
>
> El servidor debe arrancar sin error. Detenerlo con Ctrl+C antes de continuar.

![](images/clipboard-1343494053.png)

### Realizamos commit

``` bash
git add . 
git commit -m "ISS-02: Preparar carpeta seeders" 
git push origin main
```

# 4. ISS-03-A — Feature leaners — fundación (modelo, esqueleto, HTTP, cableado)

**Nombre recomendado:** *Feature Client — fundación*\
**Objetivo:** dejar el feature listo para CRUD: modelo con columnas obligatorias, esqueleto controller/routes, carpeta `http/`, agregador y sync.\
**Bloqueado por:** ISS-02.

## 4.1 Modelo learners 

**Criterios**

- [x] `src/features/business/learners/leaner.model.ts`
- [x] Enum `active`/`inactive`, default `inactive`; `timestamps: true`

``` bash
npm install bcryptjs@^3.0.3
npm install -D @types/bcryptjs@^3.0.0
```

![](images/clipboard-2703867273.png)

### Realizamos el commit

``` bash
git add . 
git commit -m "ISS-03-A: Modelo Learner" 
git push origin main
```

![](images/clipboard-3745688854.png)

## 4.2 Esqueleto controller / routes + carpeta HTTP

**Criterios**

- [x] Archivos `leaner.controller.ts` y `leaner.routes.ts` existen (esqueleto)

``` bash
mkdir -p src/features/business/learner/http
```

> #### Evidencia  `leaner.controller.ts`
>
> ![](images/clipboard-291041579.png)
>
> > #### Evidencia  `leaner.routes.ts`
>
> ![](images/clipboard-1929538768.png)
>
> ### Realizamos el commit
>
> ``` bash
> git add .  
> git commit -m "ISS-03-A: Esqueleto Controller y Routes de Learner" 
> git push origin main
> ```
>
> ### 4.3 Agregador Routes + cableado en Config

**Criterios**

- [ ] `src/routes/index.ts` con `clientRoutes`
- [ ] `config` importa modelo + `dbConnection` + `routes`

``` bash
: > src/routes/index.ts cat >> src/routes/index.ts << 'EOF' import { ClientRoutes } from "../features/business/client/client.routes";  export class Routes {   public clientRoutes: ClientRoutes = new ClientRoutes(); } EOF
```

**PARCHE** — `src/config/index.ts` **ya existe** (ISS-01).

1.  **Debajo de** `var cors = require("cors");` **añadir**:

``` ts
import { sequelize, getDatabaseInfo, testConnection } from "../database/db"; import "../features/business/client/client.model"; import { Routes } from "../routes/index";
```

2.  **Dentro de** `export class App`, **debajo de** `public app: Application;` **añadir**:

``` ts
  public routePrv: Routes = new Routes();
```

3.  **Dentro de** `routes()`, **reemplazar** el comentario `// ISS-03 §4.3` por:

``` ts
    this.routePrv.clientRoutes.routes(this.app);
```

4.  **Dentro de** `dbConnection()`, **reemplazar** el comentario `// ISS-02 / ISS-03` por:

``` ts
    try {       // Mostrar información de la base de datos seleccionada       const dbInfo = getDatabaseInfo();       console.log(`🔗 Intentando conectar a: ${dbInfo.engine.toUpperCase()}`);        // Probar la conexión       const isConnected = await testConnection();        if (!isConnected) {         throw new Error(`No se pudo conectar a la base de datos ${dbInfo.engine.toUpperCase()}`);       }        // alter: true actualiza columnas faltantes (ej. createdAt/updatedAt tras timestamps: true).       // force: false no recrea tablas; no borra datos. En producción preferir migraciones.       await sequelize.sync({ force: false, alter: true });       console.log(`📦 Base de datos sincronizada exitosamente`);     } catch (error) {       console.error("❌ Error al conectar con la base de datos:", error);       process.exit(1); // Terminar la aplicación si no se puede conectar     }
```

> **Importante (lab):** si la tabla `clients` se creó antes con `timestamps: false`, `sync({ force: false })` **no** añade `createdAt`/`updatedAt`. Por eso se usa `alter: true`.

### Verificación ISS-03-A

``` bash
test -d src/features/business/client/http && echo HTTP_FOLDER_OK
```

### Cierre del ISS

``` bash
npm run dev
```

> Sync OK y tabla `clients` (con `createdAt` / `updatedAt`). Detenerlo con Ctrl+C antes de continuar.

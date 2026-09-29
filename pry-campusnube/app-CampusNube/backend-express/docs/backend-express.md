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
> ![](images/clipboard-3387377060.png)
>
> ### 4.3 Agregador Routes + cableado en Config

**Criterios**

- [ ] `src/routes/index.ts` con `leanerRoutes`

  **Crear `src/routes/index.ts`**

  ![](images/clipboard-2067884378.png)

- [x] **PARCHE** — `src/config/index.ts` **ya existe** (ISS-01).

1.  **Debajo de** `var cors = require("cors");` **añadir**:

![](images/clipboard-3724928373.png)

2.  **Dentro de** `export class App`, **debajo de** `public app: Application;` **añadir**:

``` ts
  public routePrv: Routes = new Routes();
```

![](images/clipboard-1379712393.png)

3.  **Dentro de** `routes()`, **reemplazar** el comentario `// ISS-03 §4.3` por:

``` ts
  this.routePrv.learnerRoutes.routes(this.app);
```

![](images/clipboard-2656875063.png)

4.  **Dentro de** `dbConnection()`, **reemplazar** el comentario `// ISS-02 / ISS-03` por:![](images/clipboard-2124942523.png)

### Verificación ISS-03-A

``` bash
test -d src/features/business/learner/http && echo HTTP_FOLDER_OK
```

![](images/clipboard-692750428.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-3854915334.png)

### Realizamos el commit

``` bash
git add .  
git commit -m "ISS-03-A: Agregador Routes + cableado en Config"  
git push origin main
```

![](images/clipboard-2125299570.png)

# 5. ISS-03-B — Feature leaners — GetAll y GetOne

**Objetivo:** listar activos y obtener uno por id. Es el primer paso del feature: getAll, getOne, luego create, update y delete.\
**Bloqueado por:** ISS-03-A.

### Controller — **PARCHE** `leaner.controller.ts` (ya existe)

**Debajo de** el comentario `// ================== READ ==================` (y **encima de** `// ================== CREATE ==================`), **añadir** primero `getAll` y después `getOne`:

![](images/clipboard-1991663154.png)

Rutas — **PARCHE** `learns.routes.ts` (ya existe)

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-03-B: Learner - Controller GetAll y GetOne"  
git push origin main
```

**Debajo de** el comentario `// ================== RUTAS SIN AUTENTICACIÓN / SIN MIDDLEWARE JWT ==================`, **añadir** primero `getAll` y después `getOne`:

![](images/clipboard-579907181.png)

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-03-B: Learner - Rutas GetAll y GetOne"  
git push origin main
```

![](images/clipboard-1719580219.png)

### HTTP — archivo nuevo

![](images/clipboard-3742688651.png)

### Verificación

``` bash
curl -s http://localhost:4000/api/aprendices
curl -s http://localhost:4000/api/aprendices/1
```

![](images/clipboard-3578344295.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-1256150355.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-03-B: Learner - HTTP GetAll y GetOne"  
git push origin main
```

![](images/clipboard-2534740742.png)

# 6. ISS-03-C — Feature learn— learn

**Objetivo:** alta de aprendiz vía API, después de getAll y getOne.\
**Bloqueado por:** ISS-03-B.

### Controller — **PARCHE** `leaner.controller.ts` (ya existe)

**Debajo de** el comentario `// ================== CREATE ==================` (y **encima de** `// ================== UPDATE ==================`), **añadir** el método `create`:Rutas — **PARCHE** `client.routes.ts` (ya existe)

![](images/clipboard-2644206639.png)

### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-03-C: Learner - Controller Create"  
git push origin main
```

![](images/clipboard-1208310019.png)

**Debajo de** el bloque `// getOne`, **añadir**:

``` ts
    // create     app       .route("/api/clientes")       .post(this.clientController.create.bind(this.clientController));
```

![](images/clipboard-2353985714.png)

### HTTP — archivo nuevo

![](images/clipboard-2725799390.png)

### Verificación

![](images/clipboard-3780338936.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-3234504110.png)
>
> ### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-03-C: Learner - Crear aprendiz vía API" 
git push origin main
```

![](images/clipboard-2895064167.png)

# 7. ISS-03-D — Feature learn — Update (PUT) y Update (PATCH)

**Objetivo:** actualización completa y parcial.\
**Bloqueado por:** ISS-03-C.

### Controller — **PARCHE** `learn.controller.ts` (ya existe)

**Debajo de** el comentario `// ================== UPDATE ==================` (y **encima de** `// ================== DELETE ==================`), **añadir**:

![](images/clipboard-3678796925.png)

> ### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-03-D: Learner - Controller Update PUT y PATCH"
git push origin main
```

![](images/clipboard-235923656.png)

### Rutas — **PARCHE** `learns.routes.ts` (ya existe)

**Debajo de** el bloque `// create`, **añadir** PUT y PATCH:

![](images/clipboard-2640336509.png)

> ### Realizamos el commit

``` bash
git add .      
git commit -m "ISS-03-D: Learner - Rutas Update PUT y PATCH"
git push origin main
```

![](images/clipboard-3781145699.png)

### HTTP — archivo nuevo

![](images/clipboard-293634186.png)

### Verificación

![](images/clipboard-918879003.png)

### Cierre del ISS

``` bash
npm run dev
```

![](images/clipboard-2313887628.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-03-D: Learner - HTTP Update PUT y PATCH"
git push origin main
```

![](images/clipboard-3203890707.png)

# 8. ISS-03-E — controller: eliminación física y lógica

**Objetivo:** borrado físico (`DELETE`) y lógico (`status = 'inactive'`).\
**Bloqueado por:** ISS-03-D.

### Controller — **PARCHE** `client.controller.ts` (ya existe)

**Debajo de** el comentario `// ================== DELETE ==================`, **añadir** primero el borrado físico y después el lógico:

![](images/clipboard-2582246386.png)

ELIMINACIÓN LÓGICA

![](images/clipboard-3607640621.png)

### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-03-E: Learner - Controller Delete físico y lógico" 
git push origin main
```

![](images/clipboard-3564895151.png)

### Rutas — **PARCHE** `client.routes.ts` (ya existe)

1.  **Debajo de** el bloque `// update (PUT / PATCH)`, **añadir** el borrado físico
2.  **Debajo de** ese bloque, **añadir** la baja lógica:

![](images/clipboard-1000311232.png)

### Realizamos el commit

``` bash
git add .      
git commit -m "ISS-03-E: Learner - Rutas Delete físico y lógico"
git push origin main
```

![](images/clipboard-463755597.png)

### **HTTP — archivo nuevo**

![](images/clipboard-49540967.png)

### Verificación

``` bash
curl -i -X PATCH http://localhost:4000/api/aprendices/1/deactivate
curl -i http://localhost:4000/api/aprendices
```

![](images/clipboard-2993058184.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-2485617577.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-03-E: Learner - HTTP Delete físico y lógico"
git push origin main
```

![](images/clipboard-4293606642.png)

# 9. ISS-04 — Seeders con Faker 

**Objetivo:** datos falsos por feature (Faker) y un orquestador externo que ejecuta todos los seeders enviando la **cantidad por entidad**.\
**Bloqueado por:** ISS-03-A (modelo); recomendado tras ISS-03-E.

**Diseño**

| Pieza | Ubicación | Rol |
|---------------------|---------------------------------|-------------------|
| Seeder del feature | `src/features/business/leanrs/client.seeder.ts` | Genera filas falsas de learns |
| Conteos | `src/database/seeders/counts.ts` | `learns: N` (y futuras entidades) |
| Runner | `src/database/seeders/index.ts` | Importa seeders de features y los ejecuta en orden |

------------------------------------------------------------------------

## 9.1 Seeder dentro del feature learns

**Criterios**

``` bash
npm install -D @faker-js/faker@^10.6.0
```

``` bash
Instalar Faker
```

![](images/clipboard-2551523415.png)

------------------------------------------------------------------------

## 9.2 SeedersRunner + conteos por entidad (`database/seeders`)

## **Creamos el seders.learns**

![](images/clipboard-3612915010.png)

### Realizamos el commit

``` bash
git add .  
git commit -m "ISS-04: Learner - Seeder con Faker"
git push origin main
```

![](images/clipboard-3112225544.png)

### 9.2.1 Conteos

![](images/clipboard-2735206219.png)

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-04: Learner - Configuración de cantidad del seeder"
git push origin main
```

![](images/clipboard-382621725.png)

### 9.2.2 Runner

![](images/clipboard-2296215481.png)

### **PARCHE** — `package.json` **ya existe**.

**Dentro de** `"scripts"`, **debajo de** `"dev": "..."`, **añadir** la coma al final de `dev` (si falta) y la clave:

![](images/clipboard-435139364.png)

#### **Verificación ISS-04**

``` bash
npm run db:seed
```

**Al agregar otra entidad (patrón):**

1.  Archivo **nuevo** `features/.../<entidad>.seeder.ts` con `: >` + `cat >>`.
2.  **PARCHE** `counts.ts`: **dentro de** `SeedCounts` / defaults, **añadir** clave (ej. `products: 10`).
3.  **PARCHE** `database/seeders/index.ts`: **debajo de** `await seedClients(...)`, **añadir** la llamada al nuevo seeder.

![](images/clipboard-3553180495.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-04: Learner - SeedersRunner"
git push origin main
```

![](images/clipboard-379942148.png)

# 10. ISS-05 — leaner-Swagger / OpenAPI

**Objetivo:** documentar el API del feature leaner en OpenAPI 3 y montar Swagger UI desde un **registry externo** (mismo patrón que seeders).\
**Bloqueado por:** ISS-03-E (rutas CRUD definidas).

**Diseño**

| Pieza | Ubicación | Rol |
|---------------------|---------------------------------|-------------------|
| Docs del feature | `src/features/business/learn/leaner.swagger.ts` | Paths + schemas Leaner |
| Registry | `src/swagger/index.ts` | Fusiona features + `setupSwagger(app)` |
| UI | `/api/docs` | Swagger UI |
| Spec | `/api/docs.json` | OpenAPI JSON |

------------------------------------------------------------------------

## 10.1 OpenAPI dentro del feature Leaner

**Criterios**

- [ ] Exporta `clientSwagger` con `tags`, `paths`, `components.schemas`
- [ ] Endpoints documentados como **SIN AUTH**
- [ ] 

``` bash
# Paquetes (una vez) npm install swagger-ui-express@^5.0.1
npm install -D @types/swagger-ui-express@^4.1.8
```

![](images/clipboard-3741575613.png)

#### creamos learner.swagger.ts:

![](images/clipboard-1566625716.png)

### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-05: Learner - Documentación OpenAPI"
git push origin main
```

![](images/clipboard-2224628942.png)

## 10.2 Registry externo + montaje en Config

**Criterios**

``` bash
CREAMOS Registry Swagger
mkdir -p src/swagger
```

### Archivo **nuevo**:

![](images/clipboard-4050939070.png)

**PARCHE** — `src/config/index.ts` **ya existe**.

1.  **Debajo de** `import { Routes } from "../routes/index";` (o **debajo de** los imports de BD/modelo), **añadir**:

    ![](images/clipboard-1277468247.png)

2.  **Dentro del** `constructor`, **debajo de** `this.routes();` y **encima de** `this.dbConnection();`, **añadir**:

![](images/clipboard-2396736941.png)

3.  **Dentro de** la clase `App`, **debajo de** el método `routes()` y **encima de** `dbConnection()`, **añadir**:

![](images/clipboard-3910061208.png)

### Verificación ISS-05

``` bash
curl -s http://localhost:4000/api/docs.json | head
```

> Con el servidor del cierre: abrir [`http://localhost:4000/api/docs`](http://localhost:4000/api/docs).

![](images/clipboard-4139976596.png)

### Cierre del ISS

``` bash
npm run dev
```

> ![](images/clipboard-1571080896.png)

### Realizamos el commit

``` bash
git add .     
git commit -m "ISS-05: Learner - Registry Swagger y montaje en Config" 
git push origin main
```

![](images/clipboard-2092756271.png)

# 11. ISS-06 — Modelo Teacher

**Objetivo:** CRUD + seeder + swagger de Teacher (sin FK).\
**Bloqueado por:** ISS-05.\
**API:** `/api/tipos-producto` — **SIN AUTH**.\
**Patrón:** mismo que Client (ISS-03-A…E + 04 + 05).

## 11.1 Modelo Teacher

``` bash
mkdir -p src/features/business/Teacher/http
```

![](images/clipboard-2992846301.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-06: Teacher - Modelo"
git push origin main
```

![](images/clipboard-820870763.png)

## 11.2 Teacher Controller + routes (CRUD completo)

![](images/clipboard-4176700479.png)

### 11.2.1 crear teacher routers 

![](images/clipboard-3526349902.png)

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-06: Teacher - Controller y Routes CRUD"
git push origin main
```

![](images/clipboard-2691941968.png)

## 11.3 HTTP TEACHER

### 1. GET TEACHER 

![](images/clipboard-4100364245.png)

### 2. CREATE TEACHER 

![](images/clipboard-2686102223.png)

### 3. UPDATE TECAHER 

![](images/clipboard-4183076279.png)

### 4. DELETE TEACHER

### ![](images/clipboard-3528468085.png)

### VERIFICAMOS 

``` bash
npm run dev 
curl -i http://localhost:4000/api/docentes
curl -i http://localhost:4000/api/docentes/1
```

![](images/clipboard-188761636.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-06: Teacher - Archivos HTTP CRUD" 
git push origin main
```

![](images/clipboard-1845473533.png)

### 11.4 Cableado Routes + Config

**PARCHE** — `src/routes/index.ts` **ya existe**.

![](images/clipboard-2352344287.png)

![](images/clipboard-1059702087.png)

**PARCHE** — `src/config/index.ts` **ya existe**.

4.  **Dentro de** `routes()`, **debajo de** `this.routePrv.clientRoutes.routes(this.app);`, **añadir**:

    ![](images/clipboard-3712369330.png)

### Verificación

``` bash
curl -s -X POST http://localhost:4000/api/docentes \
  -H 'Content-Type: application/json' \
  -d '{"name":"Carlos Rodríguez","description":"Docente de CampusNube","isActive":true}'
curl -s http://localhost:4000/api/docentes
```

![](images/clipboard-3936777926.png)

![](images/clipboard-4089557078.png)

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-06: Teacher - Cableado Routes y Config"
git push origin main
```

![](images/clipboard-944646274.png)

------------------------------------------------------------------------

## 11.5 Seeder Teacher

![](images/clipboard-1493444869.png)

**PARCHE** — `src/database/seeders/counts.ts` **ya existe**.

- **Dentro de** `SeedCounts`, **añadir** `product_types: number;`

  ![](images/clipboard-2959504469.png)

- **Dentro de** `DEFAULT_SEED_COUNTS`, **añadir** `product_types: 25,`

  ![](images/clipboard-2789759370.png)

- **Dentro de** la resolución por env, **añadir** lectura de `SEED_PRODUCT_TYPES` (ver archivo final abajo en ISS-08 si consolidás).

![](images/clipboard-2627503530.png)

**PARCHE** — `src/database/seeders/index.ts` **ya existe**.

1.  **Debajo de** imports de client, **añadir** import de `seedProductTypes`.

    ![](images/clipboard-3525252515.png)

2.  **Debajo de** `await seedClients(...)`, **añadir** `await`

    ![](images/clipboard-1426080087.png)

------------------------------------------------------------------------

### Realizamos el commit

``` bash
git add .   
git commit -m "ISS-06: Teacher - Seeder y SeedersRunner"
git push origin main
```

![](images/clipboard-59558932.png)

## 11.6 Swagger Teacher 

![](images/clipboard-2417628166.png)

**PARCHE** — `src/swagger/index.ts` **ya existe**.

1.  **Debajo de** `import { leanerSwagger } ...`, **añadir** import de `productTypeSwagger`.

    ![](images/clipboard-4269622362.png)

2.  **Dentro de** `featureSwaggerModules`, **debajo de** `leanerSwagger,`, **añadir** `teacherpeSwagger,`.

![](images/clipboard-4277551330.png)

### Cierre del ISS

``` bash
npm run dev
```

![](images/clipboard-984999072.png)

### Realizamos el commit

``` bash
git add .    
git commit -m "ISS-06: Teacher - Seeder y Swagger"
git push origin main
```

![](images/clipboard-545633439.png)

# 12. ISS-07 — Modelo Course

### **Objetivo:** CRUD + seeder + swagger de Course y preparación de sus relaciones con las demás entidades de CampusNube.  **Bloqueado por:** ISS-06.  **API:** `/api/cursos` — **SIN AUTH**. 

### 12.1 Modelo Course

Primero creamos la carpeta HTTP.

mkdir -p src/features/business/course/http

![](images/clipboard-307959277.png)

### Realizamos el commit

``` bash
git add .  
git commit -m "ISS-07: Course - Modelo"
git push origin main
```

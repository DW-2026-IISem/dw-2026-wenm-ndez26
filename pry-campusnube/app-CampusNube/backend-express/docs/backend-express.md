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

### HTTP — archivo nuevo

``` bash
: > src/features/business/client/http/clients.update.http cat >> src/features/business/client/http/clients.update.http << 'EOF' ### Feature Client — UPDATE (PUT) / UPDATE (PATCH) ### Leyenda: SIN AUTH (sin middleware JWT / sin autenticación) @baseUrl = http://localhost:4000 @id = 1  # @name updateClientPut PUT {{baseUrl}}/api/clientes/{{id}} Content-Type: application/json  {   "name": "Ana Pérez Actualizada",   "address": "Carrera 15 #40-10",   "phone": "3009876543",   "email": "ana.perez@example.com",   "password": "Password123!",   "status": "active" }  ###  # @name updateClientPatch PATCH {{baseUrl}}/api/clientes/{{id}} Content-Type: application/json  {   "phone": "3011112233",   "address": "Nueva dirección parcial" } EOF
```

### Verificación

``` bash
curl -s -X PUT http://localhost:4000/api/clientes/1 -H 'Content-Type: application/json' \   -d '{"name":"Ana","address":"x","phone":"300","email":"ana@test.com","status":"active"}' curl -s -X PATCH http://localhost:4000/api/clientes/1 -H 'Content-Type: application/json' \   -d '{"phone":"301"}'
```

### Cierre del ISS

``` bash
npm run dev
```

> El servidor debe arrancar sin error. Detenerlo con Ctrl+C antes de continuar.

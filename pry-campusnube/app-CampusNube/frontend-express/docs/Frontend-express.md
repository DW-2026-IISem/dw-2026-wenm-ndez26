# Frontend Express — CampusNube

# Fase 0: Preparación — ISS-00 — Requisitos previos

## Contenido de este ISS

- Criterios de aceptación (ISS-00) — consolidados

- 0.1 Node, npm y Angular CLI

- 0.2 Backend en marcha

- 0.3 Login y permisos

- 0.4 Credenciales del seeder

- 0.5 Navegador y herramientas

- 0.6 Estructura de trabajo

- Verificación del ISS

- Cierre del ISS

## 0.1 Node, npm y Angular CLI

``` bash
node --version
npm --version
npm view @angular/cli version engines --json
npm install -g @angular/cli
ng version
```

![](images/clipboard-3561181213.png)

## 0.2 Backend en marcha (preparación para integrar HTTP)

**Criterios de este sub-ítem**

- [ ] `npm run db:seed` del backend termina sin error

- [ ] `npm run dev` deja el puerto **4000** escuchando

- [ ] El log muestra conexión a la BD y `sync` exitoso

![](images/clipboard-3239666407.png)

### Comprobación de la matriz de permisos

## 0.3 Login y permisos

El login del backend devuelve **solo el par de tokens**. El perfil y los permisos se piden aparte:

\# 1. Login (OPEN)

![](images/clipboard-1394340962.png)

\# 2. Perfil (JWT)

![](images/clipboard-1357335014.png)

`GET /api/permisos` devuelve **una fila por permiso efectivo**:

![](images/clipboard-3802468683.png)

## 0.4 Credenciales del seeder

- [ ] `admin / Admin123!` inicia sesión y recibe 58 permisos

- [ ] `seller / Seller123!` inicia sesión y recibe 7 permisos

- [ ] Un usuario **sin rol** se autentica pero recibe `403` en recursos RBAC

| **Usuario** | **Password** | **Rol**  | **Permisos** |
|:------------|:-------------|:---------|:-------------|
| `admin`     | `Admin123!`  | `ADMIN`  | 58 recursos  |
| `seller`    | `Seller123!` | `SELLER` | 7 recursos   |

## 0.6 Estructura de trabajo

![](images/clipboard-460785883.png)

## Cierre del ISS

### Realizamos el primer commit

``` bash
git add .
git commit -m "ISS-00: Requisitos previos del proyecto"
git push origin main
```

![](images/clipboard-1756138638.png)

# Fase I: Frontend — ISS-01 — Bootstrap Angular 22 con CLI

## 1.1 Verificar el proyecto

![](images/clipboard-2015470550.png)

### Preparar la instalación

Dependencias declaradas en tu `package.json` y generará `package-lock.json`

![](images/clipboard-3879928876.png)

## 1.2 Instalar PrimeNG compatible con Angular

Consulta primero las peer dependencies:

```         
ng version 
npm view primeng version peerDependencies --json npm 
install primeng @primeuix/themes primeicons @angular/cdk
```

![](images/clipboard-3036563613.png)

### **Verifica versiones:**

![](images/clipboard-1742193632.png)

## 1.3 Estilos globales

![](images/clipboard-1373260562.png)

## 1.4 Configurar PrimeNG en `app.config.ts`

![](images/clipboard-427834265.png)

### 1.4.2 Por qué el tema no está en el CSS compilado

`providePrimeNG` **no** genera CSS estático: serializa el preset `Aura` a variables CSS (`--p-primary-color`, `--p-content-background`, …) en tiempo de ejecución.

Evidencia 1.4.2-A — Configuración de PrimeNG

![](images/clipboard-1773236929.png)

## 1.5: composición de `App`

Dentro del 1.5 están los archivos y criterios

- `1.5.1` — Configurar `src/app/app.ts`.

- `1.5.2` — Configurar `src/app/app.html`.

- `1.5.3` — Dejar `src/app/app.css` vacío.

- `1.5.4` — Mantener `src/app/app.routes.ts` con `routes: []`.

- `1.5.5` — Actualizar `src/app/app.spec.ts`.

- `1.5.6` — Crear `src/app/demo/ejemplo/` con sus cuatro archivos.

- `1.5.7` — Verificar que se muestre la tarjeta del ejemplo.

**Paso 1.5.1 — Crear la estructura del componente**

![](images/clipboard-3241440754.png)

#### 1.5.2 — Crear el componente `Ejemplo`

![](images/clipboard-1682094183.png)

**Verificación del código:** comprobar que existe el directorio `src/app/demo/ejemplo/` con los archivos `ejemplo.ts`, `ejemplo.html`, `ejemplo.css` y `ejemplo.spec.ts`.

![](images/clipboard-1015705256.png)

#### 1.5.3. Configurar el componente `Ejemplo`

**Verificación del código:** comprobar que `src/app/demo/ejemplo/ejemplo.ts` declara el componente `Ejemplo`, utiliza el selector `app-ejemplo` e importa los módulos de PrimeNG necesarios para mostrar la tarjeta.

![](images/clipboard-1887098462.png)

#### 1.5.4. Crear la plantilla de ejemplo

**Procedimiento:** En `src/app/demo/ejemplo/ejemplo.html` se implementa la tarjeta de ejemplo adaptada a CampusNube.

![](images/clipboard-3442840589.png)

#### 1.5.5. Configurar el componente principal `App`

**Archivo:** `src/app/app.ts`

Reemplazar todo el contenido por:

![](images/clipboard-2532470287.png)

#### 1.5.6. Configurar la plantilla principal

**Archivo:** `src/app/app.html`

Reemplazar todo el contenido por:

![](images/clipboard-462709151.png)

#### 1.5.7. Dejar vacía la hoja de estilos de `App`

**Archivo:** `src/app/app.css`

Eliminar todo el contenido y guardar el archivo completamente vacío.

![](images/clipboard-3334230374.png)

#### 1.5.8. Mantener vacías las rutas de la aplicación

**Archivo:** `src/app/app.routes.ts`

Reemplazar todo el contenido por:

![](images/clipboard-3082438386.png)

#### 1.5.9. Actualizar las pruebas del componente principal

**Archivo:** `src/app/app.spec.ts`

Reemplazar todo el contenido por:

![](images/clipboard-2231477104.png)

#### 1.5.10. Configurar las pruebas del componente `Ejemplo`

**Archivo:** `src/app/demo/ejemplo/ejemplo.spec.ts`

![](images/clipboard-1983366819.png)

#### 1.5.11. Ejecutar las pruebas unitarias

**Comando**

```         
npm test -- --watch=false
```

![](images/clipboard-282010278.png)

#### 1.5.12. Verificar la pantalla de arranque

![](images/clipboard-10448217.png)

![](images/clipboard-2557157059.png)

## 1.6 Personalizar `index.html`

### 1.6.1. Modificar el archivo `src/index.html`

![](images/clipboard-1073943153.png)

## 1.7 Ajustar el presupuesto de build

### 1.7.1. Modificar los presupuestos de producción

![](images/clipboard-3408313246.png)

## 1.8 Primera ejecución

### 1.8.1. Iniciar la aplicación

![](images/clipboard-2898292655.png)

Verificación:

- `npm start` compila sin errores.

- La página responde correctamente.

- Se visualiza el componente `Ejemplo`.

#### 1.8.2. Verificar la pantalla de ejemplo

![](images/clipboard-2186228125.png)

### 1.8.3. Verificar el título de la pestaña

En el punto 1.6 personalizamos `src/index.html` con el título:

CampusNube - Aprendizaje virtual

![](images/clipboard-3062387847.png)

## 1.9 Anatomía del componente `demo/ejemplo` y signals

### 1.9.1. De `index.html` a la pantalla

![](images/clipboard-576403926.png)

### 1.9.2 Los cuatro archivos de un componente

![](images/clipboard-3290673026.png)

### 1.9.3 Leer `ejemplo.ts` línea a línea

![](images/clipboard-54578515.png)

### 1.9.4 Las cuatro formas de conectar la clase con el HTML

| Forma            | Sintaxis                  | Ejemplo en CampusNube          |
|------------------|-------------------------|-----------------------------|
| Interpolación    | `{{ expresión }}`         | `{{ curso().nombre }}`         |
| Property binding | `[propiedad]="expresión"` | `[value]="curso().nombre"`     |
| Event binding    | `(evento)="método()"`     | `(click)="variarPrecio(1000)"` |
| Two-way binding  | `[(ngModel)]="campo"`     | No se utiliza en este ejemplo. |

### 1.9.4.2 Flujo de control moderno con `@if` y `@else`

### 

![](images/clipboard-3667364828.png)

## Estado inicial del curso

## ![](images/clipboard-1327390416.png)

\# 1. El servidor debe compilar ng build ![](images/clipboard-2549395611.png)

**\# 2. Debe imprimir la configuración de Tailwind/PrimeNG** grep -R "providePrimeNG\\\|\@import 'tailwindcss'" src \| head

![](images/clipboard-2939967457.png)

**\# 3. Versiones compatibles**

npm ls primeng \@primeuix/themes primeicons \@angular/cdk --depth=0

![](images/clipboard-1140289055.png)

**\# 4. Presupuesto y estilos** node -e "const a=require('./angular.json');const p=a.projects[Object.keys(a.projects)[0]];console.log(p.architect.build.configurations.production.budgets[0])" cat src/styles.css

**\# 5. La composición y el componente de ejemplo declaran signals** grep -n "imports: \\[Ejemplo\\]" src/app/app.ts grep -n "app-ejemplo" src/app/app.html grep -n "signal(\\\|computed(\\\|effect(" src/app/demo/ejemplo/ejemplo.ts

![](images/clipboard-1171563858.png)

### Realizamos el commit

``` bash
git add . 
git commit -m "Fase I: Frontend — ISS-01 — Bootstrap Angular 22 con CLI" 
git push origin main
```

![](images/clipboard-3978678860.png)

# Fase I: Frontend — ISS-01A — Esqueleto Header / Aside / contenido / Footer

## Contenido de este ISS

- 1.1 Qué es un componente y por qué el padre debe importarlo

- 1.2 Generar las tres piezas de `layout/`

- 1.3 Contenido de cada componente

- 1.4 Componer las cuatro regiones en `App`

- 1.5 Comprobar antes de avanzar

- Verificación del ISS

- Cierre del ISS

**Revisar la estructura actual de `src/app`**

![](images/clipboard-3253253944.png)

- **1.2 Generar las tres piezas de `layout/`**

1\. Crear el Header

# ![](images/clipboard-3756947004.png)

2\. Crear el Aside

# ![](images/clipboard-741973999.png)

3\. Crear el Footer

![](images/clipboard-3569392935.png)

**Verificar la estructura**

![](images/clipboard-889062473.png)

**1.3: contenido de cada componente**

1.3.1. Archivo `header.ts`

![](images/clipboard-749533391.png)

1.3.2. Archivo `header.html`

![](images/clipboard-2367381467.png)

1.3.3. Archivo `header.css`

![](images/clipboard-2765306541.png)

1.3.4. Archivo `aside.ts`

![](images/clipboard-1415097019.png)

1.3.5. Archivo `aside.html`

![](images/clipboard-3300500083.png)

1.3.6. Archivo `aside.css`

![](images/clipboard-2401221882.png)

1.3.7 Archivo `footer.ts`

![](images/clipboard-4114458011.png)

1.3.8. Archivo `footer.html`

![](images/clipboard-2093504899.png)

1.3.9 Archivo `footer.css`

![](images/clipboard-3649875583.png)

**1.4. Componer las cuatro regiones en `App`**

1\. Modificar `src/app/app.ts`

![](images/clipboard-4021009915.png)

- Importamos los tres componentes.

- Los declaramos en `imports` para que Angular permita utilizarlos en la plantilla.

- Conservamos `app.html` como plantilla principal.

- Dejamos de importar `Ejemplo`, porque la tarjeta de demostración ya no formará parte de la pantalla de ISS-01A.}

**2. Modificar `src/app/app.html`**

![](images/clipboard-686462475.png)

**1.5 Comprobar antes de avanzar**

![](images/clipboard-3719550177.png)

![](images/clipboard-1021689412.png)

## Verificación del ISS

**\# 1. Compila** ng build

![](images/clipboard-549731154.png)

**\# 2. Existen las tres piezas con sus tres archivos**

![](images/clipboard-3827621407.png)

**\# 3. App declara los tres imports y compone las regiones**

![](images/clipboard-380624001.png)

**\# 4. demo/ejemplo ya no se compone**

![](images/clipboard-264063350.png)

**\# 5. Los CSS de layout no tienen reglas**

![](images/clipboard-1864877729.png)

**\# 6. Pruebas**

![](images/clipboard-4138086029.png)

## Cierre del ISS

**Commit**

```         
git add . 
git commit -m "Fase I: Frontend — ISS-01A — Esqueleto Header / Aside / contenido / Footer" 
git push origin main
```

![](images/clipboard-843420582.png)

# Fase I: Frontend — ISS-01B — Menú PrimeNG y primera interacción

## Contenido de este ISS

- 1.1 Los conceptos que se agregan, uno por vez

- 1.2 El Aside recibe el menú con `input()`

- 1.3 El Header avisa al padre con `output()`

- 1.4 `features/construir`: estado local y Drawer móvil

- 1.5 `App` pasa a ser punto de entrada con `router-outlet`

- 1.6 Comprobar antes de avanzar

- Verificación del ISS

- Cierre del ISS

**1.2 — El Aside recibe el menú con `input()`**

**1. Archivo `src/app/layout/aside/aside.ts`**

![](images/clipboard-3429931542.png)

**2. Archivo `src/app/layout/aside/aside.html`**

![](images/clipboard-3942448769.png)

**1.3 — El Header avisa al padre con `output()`**

1\. Archivo `src/app/layout/header/header.ts`

![](images/clipboard-3965925261.png)

2\. Archivo `src/app/layout/header/header.html`

![](images/clipboard-3333557869.png)

3\. Archivo `src/app/layout/header/header.css`

![](images/clipboard-1413843434.png)

**1.4 — `features/construir`: estado local y Drawer móvil**

1\. Crear el componente `Construir`

![](images/clipboard-2486301024.png)

2.  Crear el helper para detectar el ancho

![](images/clipboard-2323739422.png)

3\. Configurar `construir.ts`

![](images/clipboard-2454020603.png)

4\. Configurar `construir.html`

![](images/clipboard-2908866726.png)

5.  Configurar `construir.css`

![](images/clipboard-3464547288.png)

1.4 — `Construir`, en el archivo `src/app/features/construir/construir.spec.ts`.

![](images/clipboard-3969719231.png)

2.  Ejecutar las pruebas

![](images/clipboard-299264750.png)

**1.5 — `App` pasa a ser punto de entrada con `router-outlet`.**

1\. Actualizar `src/app/app.ts`

![](images/clipboard-3413156810.png)

2\. Actualizar `src/app/app.html`

![](images/clipboard-2860660870.png)

3\. Configurar `src/app/app.routes.ts`

![](images/clipboard-3587235927.png)

4\. Revisar `src/app/app.config.ts`

![](images/clipboard-3609425715.png)

**1.5 — `App` como punto de entrada con `router-outlet`.**

![](images/clipboard-4097371892.png)

## 1.6 Comprobar antes de avanzar

**Criterios de este sub-ítem**

- [ ] A 1280 px se ve el Aside con las cinco opciones y no hay scroll horizontal

- [ ] A 1280 px **el botón de menú se ve** y al pulsarlo oculta el Aside (sin abrir el Drawer)

- [ ] A 390 px el Aside no se ve y el botón del Header abre el Drawer

- [ ] Elegir una opción cambia el título y cierra el Drawer

- [ ] La URL no cambia y Network no registra `/api`

- [ ] Con teclado se recorre el menú y se activa con Enter

- [ ] `ng build` termina con código 0

![](images/clipboard-21878387.png)

\# 1. Compila y separa el chunk diferido

![](images/clipboard-4157326334.png)

\# 2. El Aside recibe el menú y el Header emite el aviso

![](images/clipboard-118615528.png)

\# 2b. El botón no se esconde en escritorio

![](images/clipboard-311903785.png)

\# 3. La pantalla tiene el estado y compone el layout

![](images/clipboard-2567042979.png)

\# 4. App es solo el outlet y las rutas cargan diferido

![](images/clipboard-3223411821.png)

\# 5. Los CSS siguen sin reglas (ninguno contiene llaves)

![](images/clipboard-3270078249.png)

```         
# 6. Pruebas automatizadas
```

![](images/clipboard-1515740167.png)

## Cierre del ISS

Commit

```         
git add .
git commit -m "Fase I: Frontend — ISS-01B — Menú PrimeNG y primera interacción"
git push origin main 
```

![](images/clipboard-1133957092.png)

# Fase I: Frontend — ISS-02 — Núcleo: environment, modelos, servicios y layout

## Contenido de este ISS

- 2.1 `environment`: una sola URL para todo el frente

- 2.2 Modelos: reflejar el backend, no inventarlo

- 2.3 Servicios HTTP por feature: desenvolver la respuesta

- 2.4 Utilidades transversales: `toApiMessage` y `NotificationService`

- 2.5 Componentes compartidos: `PageHeader`, `EmptyState`, `StatusTag`

- 2.6 `Shell`: conservar el esqueleto al navegar

- 2.7 Registrar `HttpClient` sin interceptores de sesión

- 2.8 Comprobar antes de avanzar

- Verificación del ISS

- Cierre del ISS

  ## 2.1 `environment`: una sola URL para todo el frente

  **Criterios de este sub-ítem**

  - [ ] `apiUrl` termina en `/api`, nunca en `/`

  - [ ] Existen `environment.ts` (build) y `environment.development.ts` (`ng serve`)

  - [ ] `angular.json` sustituye el archivo en la configuración `development`

  - [ ] `primeUiLicense` está documentado en ambos archivos (clave Community PrimeUI; ISS-01 §1.4.1)

  ```         
  ng generate environments 
  ```

  Crea los dos archivos y registra el reemplazo. Si ya existen, edítalos sin repetir el generador.

  `src/environments/environment.ts` — lo usa `ng build`, es el **base**,ya existe.

1\. Crear `environment.development.ts`

![](images/clipboard-2901709027.png)

2\. Configurar el entorno de desarrollo

![](images/clipboard-1083840537.png)

**3. editar `environment.environment.development.ts`**

![](images/clipboard-1077542238.png)

## 1. Abrir el archivo de desarrollo

`src/environments/environment.development.ts`

![](images/clipboard-1663408184.png)

`angular.json` → `projects.<proyecto>.architect.build.configurations.development`:

![](images/clipboard-2923865113.png)

## 2.2 Modelos: reflejar el backend, no inventarlo

**Criterios de este sub-ítem**

- [ ] Cada entidad tiene su interfaz y su `Payload` de escritura

- [ ] Los modelos de lectura **no** exponen `password`

- [ ] `Money` cubre `number | string`; `toNumber()` normaliza

- [ ] Los campos son los del backend, en `snake_case`

### `api.model.ts` — los tipos que comparten todos

![](images/clipboard-3030453636.png)

**2. Crear el modelo de Cursos**

![Reemplazar el contenido](images/clipboard-3315229750.png)

![](images/clipboard-2693503773.png)

**3. Crear el modelo de Aprendices (`Learner`)**

![![](images/clipboard-2493094611.png)](images/clipboard-135115602.png)

Crear los archivos restantes

**teacher.model.ts**

![](images/clipboard-1398728388.png)

### `module.model.ts`

![](images/clipboard-1192276120.png)

**lesson.model.ts**

![](images/clipboard-3109368904.png)

**enrollment.model.ts**

![](images/clipboard-616668652.png)

**evaluation.model.ts**

![](images/clipboard-1591949040.png)

**attempt.model.ts**

![](images/clipboard-635381628.png)

**submission.model.ts**

![](images/clipboard-1031825294.png)

**progress.model.ts**

![](images/clipboard-1070843626.png)

**certificate.model.ts**

![](images/clipboard-784824053.png)

**3. Modelos de roles, recursos y permisos**

### `role.model.ts`

![](images/clipboard-1023923284.png)

### **resource.model.ts**

![](images/clipboard-3758092727.png)

### **role-user.model.ts**

![](images/clipboard-3766571628.png)

### resource-role.model.ts

![](images/clipboard-1062577613.png)

### 4. Modelo de usuario

**user.model.ts**

![](images/clipboard-3667969105.png)

### `refresh-token.model.ts`

![](images/clipboard-3955002357.png)

**Verificar todos los modelos**

![](images/clipboard-831968503.png)

## 2.3 Servicios HTTP por feature: desenvolver la respuesta

## 1. Generar los servicios

![](images/clipboard-2299022837.png)

### El contrato real del backend

| Entidad                 | Endpoint base           |
|-------------------------|-------------------------|
| Cursos                  | `/api/cursos`           |
| Aprendices              | `/api/aprendices`       |
| Docentes                | `/api/docentes`         |
| Módulos                 | `/api/modulos`          |
| Lecciones               | `/api/lecciones`        |
| Inscripciones           | `/api/inscripciones`    |
| Evaluaciones            | `/api/evaluaciones`     |
| Intentos                | `/api/intentos`         |
| Entregas                | `/api/entregas`         |
| Progreso                | `/api/progress`         |
| Certificados            | `/api/certificates`     |
| Usuarios                | `/api/usuarios`         |
| Roles                   | `/api/roles`            |
| Recursos                | `/api/recursos`         |
| Asignaciones de roles   | `/api/asignaciones-rol` |
| Concesiones de permisos | `/api/concesiones-rol`  |

2\. `course-api.ts` — Cursos

![](images/clipboard-4169824594.png)

### 3. `learner-api.ts` — Aprendices

![](images/clipboard-1317944447.png)

**4. `teacher-api.ts` — Docentes**

![](images/clipboard-3962633097.png)

**5. `module-api.ts` — Módulos**

![](images/clipboard-2092590470.png)

**6. `lesson-api.ts` — Lecciones**

![](images/clipboard-2591887673.png)

**7. `enrollment-api.ts` — Inscripciones**

![](images/clipboard-553018913.png)

**8. `evaluation-api.ts` — Evaluaciones**

![](images/clipboard-217187568.png)

**9. `attempt-api.ts` — Intentos**

![](images/clipboard-3342644405.png)

**10. `submission-api.ts` — Entregas**

![](images/clipboard-858656917.png)

**11. `progress-api.ts` — Progreso**

![](images/clipboard-3053938623.png)

**12. `certificate-api.ts` — Certificados**

![](images/clipboard-2556928385.png)

**13. `user-api.ts` — Usuarios**

![](images/clipboard-3861203492.png)

**14. `role-api.ts` — Roles**

![](images/clipboard-453998512.png)

**15. `resource-api.ts` — Recursos**

![](images/clipboard-2043451639.png)

**16. `role-user-api.ts` — Asignaciones de roles**

![](images/clipboard-153681711.png)

**17. `resource-role-api.ts` — Permisos por rol**

![](images/clipboard-120624786.png)

**18. `session-api.ts` — Autenticación**

![](images/clipboard-897168648.png)

**19. `notification.service.ts` — Notificaciones**

![](images/clipboard-2674929152.png)

**20. Regla de las URL y comprobación**

private readonly base = `${environment.apiUrl}/cursos`;

### Pruebas de servicios HTTP con HttpTestingController

**1. Servicio de course**

![](images/clipboard-2801312233.png)

**2. Servicio de leaners**

![](images/clipboard-652510134.png)

**3. Servicio de teacher**

![](images/clipboard-273579205.png)

**4. Servicio de module**

![](images/clipboard-2770613147.png)

**5. Servicio de lesson**

![](images/clipboard-3629168501.png)

6\. Servicio de enrrollments

![](images/clipboard-3830941128.png)

**7. Servicio de evaluation**

![](images/clipboard-2409371281.png)

## Ocho servicios HTTP pasaron sus pruebas:

1.  **Cursos**

2.  **Aprendices**

3.  **Docentes**

4.  **Módulos**

5.  **Lecciones**

6.  **Inscripciones**

7.  **Evaluaciones**

8.  **Intentos**

![](images/clipboard-1457782051.png)

## 2.4 Utilidades transversales: `toApiMessage` y `NotificationService`

**Crear `api-error.ts`**

![](images/clipboard-885791299.png)

**Modificar `NotificationService`**

![](images/clipboard-3985376207.png)

## 2.5 Componentes compartidos: `PageHeader`, `EmptyState`, `StatusTag`

![](images/clipboard-2937733513.png)

**1. `PageHeader`**

![](images/clipboard-296290388.png)

`src/app/shared/ui/page-header/page-header.html`

![](images/clipboard-805469652.png)

**2. `EmptyState`**

![](images/clipboard-3014545658.png)

**src/app/shared/ui/empty-state/empty-state.html**

![](images/clipboard-886943250.png)

**3. `StatusTag`**

**src/app/shared/ui/status-tag/status-tag.ts**

![](images/clipboard-2352769116.png)

**src/app/shared/ui/status-tag/status-tag.html**

![](images/clipboard-1852500121.png)

## 2.6 `Shell`: conservar el esqueleto al navegar

![](images/clipboard-4281922687.png)

Código de `shell.ts`

![](images/clipboard-3489850915.png)

Código de `shell.html`

![](images/clipboard-3634073944.png)

**Comprobar la compilación**

![](images/clipboard-2520965668.png)

## 1. Configurar las rutas

![](images/clipboard-4008327277.png)

`src/app/layout/shell/shell.spec.ts`

![](images/clipboard-2082635088.png)

## 2.7 Registrar `HttpClient` sin interceptores de sesión

![](images/clipboard-3131500485.png)

## 2.8 Comprobar antes de avanzar

**Criterios de este sub-ítem**

- [ ] `ng build` termina con código 0 y sin `✘ [ERROR]`

- [ ] `shell` aparece como chunk diferido

- [ ] `npm test` pasa completo

- [ ] `/` redirige a `/construir` y la pantalla del prototipo sigue funcionando

- [ ] Network no registra llamadas `/api` en ninguna pantalla

```         
ng build
npm test -- --watch=false 
npm start
```

![](images/clipboard-940435536.png)

## Verificación del ISS

\# 1. Compila y separa los chunks diferidos ng build

![](images/clipboard-1781208332.png)

\# 2. La URL del backend existe una sola vez

![\# 3. Los modelos existen y coinciden con el backend](images/clipboard-3673682762.png)

![](images/clipboard-2092348756.png)

\# 4. Los servicios desenvuelven con map

![](images/clipboard-2085548197.png)

![](images/clipboard-239111258.png)

## Cierre del ISS

Commit

```         
git add .
git commit -m "Fase I: Frontend — ISS-02 — Núcleo: environment, modelos, servicios y layout"
git push origin main
```

# ISS-03 · CRUD de docentes con Signals

bjetivo: implementar las operaciones para administrar docentes:

1.  Listar docentes.

2.  Buscar docentes.

3.  Registrar un docente.

4.  Editar sus datos.

5.  Desactivar docentes.

6.  Eliminar docentes, si el backend contempla esa operación.

**3.1 Generar componentes con CLI**

![](images/clipboard-3370591780.png)

## 3.2 Utilidad de filtro local

`src/app/core/utils/filter-rows.ts`:

![](images/clipboard-2637473277.png)

| Decisión              | Por qué                                |
|-----------------------|----------------------------------------|
| `pick` recibe la fila | El llamador decide qué campos buscar.  |
| `[...rows]`           | Devuelve una copia si no hay búsqueda. |
| `(value ?? '')`       | Evita errores con valores nulos.       |

## 3.3 Formulario reactivo reutilizable

El mismo formulario sirve para crear y editar docentes.

Archivo: `src/app/features/teachers/teacher-form/teacher-form.ts`

![](images/clipboard-2851824729.png)

**src/app/features/teachers/teacher-form/teacher-form.html**

![](images/clipboard-2674801327.png)

src/app/features/teachers/teacher-form/teacher-form.css

![](images/clipboard-3406502943.png)

## 3.4 Lista con estado en Signals

El componente mantiene los registros, la carga, el filtro, los errores y el diálogo.

Archivo: `src/app/features/teachers/teacher-list/teacher-list.ts`

![](images/clipboard-2191007467.png)

## 3.5 Plantilla de la lista

Archivo: `src/app/features/teachers/teacher-list/teacher-list.html`

![](images/clipboard-1822543171.png)

## 3.6 Baja lógica vs. baja física

Los dos métodos ya están incluidos en `teacher-list.ts`:

- `deactivate(teacher)`: realiza `PATCH /api/docentes/:id/deactivate`.

- `remove(teacher)`: realiza `DELETE /api/docentes/:id`.

### 3.7 Ruta y menú

Archivo: `src/app/app.routes.ts`

La ruta de docentes quedará dentro de `Shell` y será la pantalla inicial.

![](images/clipboard-2467506140.png)

Archivo: `src/app/layout/shell/shell.ts`

![](images/clipboard-1533319566.png)

## Verificación del ISS

```         
# 1. Verificar la utilidad de filtro
```

![](images/clipboard-3337712057.png)

```         
# 2. Verificar que el formulario solo emite datos y no llama a la API
```

![](images/clipboard-1992521566.png)

```         
# 3. Verificar que la lista usa computed y no tiene filtros imperativos 
```

![](images/clipboard-1427590192.png)

```         
# 4. Verificar las plantillas de PrimeNG 22
```

![](images/clipboard-941840379.png)

### Cierre del ISS-03 – Docentes

Commit

```         
git add . 
git commit -m "Fase I: Frontend — ISS-03 — Docentes: CRUD, formulario reactivo, listado y filtros" 
git push origin main
```

![](images/clipboard-1627466701.png)

# Fase I: Business — ISS-04 — CRUD de aprendices

## 4.2 Generar con CLI

![](images/clipboard-1013626423.png)

## 4.3 Servicio

El archivo `learner-api.ts` ya existe y contiene los métodos necesarios.

![](images/clipboard-2112565128.png)

## 4.4 Formulario reactivo

El formulario servirá para crear y editar aprendices. La contraseña será obligatoria al crear y opcional al editar. El estado solo se cambiará mediante la operación de desactivación.

Archivo: `src/app/features/learners/learner-form/learner-form.ts`

![](images/clipboard-3844828993.png)

Archivo: `src/app/features/learners/learner-form/learner-form.html`

![](images/clipboard-3355927278.png)

Archivo: `src/app/features/learners/learner-form/learner-form.css`

![](images/clipboard-1193097063.png)

## 4.5 Lista de aprendices

La lista manejará los estados con Signals, el filtro con `computed`, el formulario en un diálogo y las operaciones de creación, edición, desactivación y eliminación.

Archivo: `src/app/features/learners/learner-list/learner-list.ts`

![](images/clipboard-3026630553.png)

Archivo: `src/app/features/learners/learner-list/learner-list.html`

![](images/clipboard-2114118911.png)

Archivo: `src/app/features/learners/learner-list/learner-list.css`

![](images/clipboard-3658984521.png)

## 4.6 Ruta

Agregaremos la ruta `/aprendices` dentro del Shell, conservando Header, Aside y Footer.

Archivo: `src/app/app.routes.ts`

![](images/clipboard-429776920.png)

Archivo: `src/app/layout/shell/shell.ts`

![](images/clipboard-2574638221.png)

## Criterios de aceptación – ISS-04

1.  La tabla muestra los aprendices activos del backend.

2.  Crear y editar validan el nombre obligatorio y máximo 120 caracteres.

3.  La contraseña es obligatoria al crear y opcional al editar.

4.  La baja lógica cambia el estado a inactivo.

5.  El buscador filtra por nombre, descripción y estado mediante `filterRows`.

6.  La ruta `/aprendices` funciona directamente.

7.  Se conserva el diseño general del Shell.

    | **Comprobación**            | **Resultado** |
    |:----------------------------|:--------------|
    | `npm test -- --watch=false` |               |

![](images/clipboard-2619524332.png)

### Cierre del ISS-04 – Aprendices

Commit

```         
git add . 
git commit -m "Fase I: Frontend — ISS-04 — Aprendices: CRUD, formulario reactivo, listado y filtros"
git push origin main
```

![](images/clipboard-545150996.png)

# ISS-05. CRUD de cursos y relación con docentes

## 5.1 Modelo y reglas del backend

El curso permitirá recibir una lista de identificadores de docentes mediante `teacherIds`.

Archivo: `backend-express/src/features/business/course/dto/create-course.dto.ts`

### 5.1 Modelo y reglas del backend

El modelo `Course` tiene estos campos:

| Campo         | Tipo           | Regla                  |
|---------------|----------------|------------------------|
| `id`          | number         | Identificador          |
| `name`        | string         | Obligatorio            |
| `description` | string \| null | Opcional               |
| `isActive`    | boolean        | Activo por defecto     |
| `createdAt`   | Date           | Fecha de creación      |
| `updatedAt`   | Date           | Fecha de actualización |

Operaciones disponibles:

- `GET /api/cursos`

- `GET /api/cursos/:id`

- `POST /api/cursos`

- `PATCH /api/cursos/:id`

- `PUT /api/cursos/:id`

- `PATCH /api/cursos/:id/deactivate`

- `DELETE /api/cursos/:id`

## 5.2 Generar con CLI

![](images/clipboard-1795844649.png)

## 5.3 Servicio

![](images/clipboard-556632189.png)

## 5.4 Cargar datos relacionados

Cargar los cursos y docentes en paralelo utilizando `forkJoin`.

Archivo: `src/app/features/courses/course-list/course-list.ts`

![](images/clipboard-1807313745.png)

## Mapa `id → nombre` con `computed`

Construimos un `Map` para relacionar el ID del docente con su nombre, siguiendo el ejemplo del profesor.

Archivo: `src/app/features/courses/course-list/course-list.ts`

![](images/clipboard-81088363.png)

Uso en la plantilla:

![](images/clipboard-2900849746.png)

La propiedad se utiliza así en la columna de docentes:

## 5.5 Total de cursos activos con `computed`

```         
readonly activeCourseCount = computed(   () => this.rows().filter((course) => course.isActive).length, );
```

En el header:

```         
<p-tag   [value]="activeCourseCount() + ' cursos activos'"   severity="success"   [rounded]="true" />
```

### 5.6 Formulario de cursos

El formulario permitirá registrar y editar cursos, con selección de los docentes asociados.

Archivo: `src/app/core/models/course.model.ts`

![](images/clipboard-944387352.png)

Archivo: `src/app/features/courses/course-form/course-form.ts`

![](images/clipboard-3335809617.png)

Archivo: `src/app/features/courses/course-form/course-form.html`

![](images/clipboard-1206663876.png)

Archivo: `src/app/features/courses/course-form/course-form.css`

![](images/clipboard-2500259317.png)

## 5.7 Listado de cursos

| Condición            | Severidad | Significado |
|----------------------|-----------|-------------|
| `isActive === true`  | `success` | Activo      |
| `isActive === false` | `danger`  | Inactivo    |

![](images/clipboard-2659958498.png)

## 5.8 Ruta

![](images/clipboard-3833706428.png)

## Comprobación

![](images/clipboard-4045069406.png)

### **Commit ISS-05 – Cursos**

```         
 git add . 
 git commit -m "Fase I: Frontend — ISS-05 — Cursos: CRUD, formulario reactivo, listado y relación con docentes" 
git push origin main
```

## ISS-06 – Módulos

Objetivo: construir el CRUD de módulos y vincular cada módulo con un curso.

Vamos a seguir la misma estructura que utilizamos en Docentes, Aprendices y Cursos:

1.  Generar los componentes de listado y formulario.

2.  Revisar el modelo y el servicio API de módulos.

3.  Cargar los cursos disponibles.

4.  Crear el formulario para registrar y editar módulos.

5.  Construir el listado con búsqueda y acciones CRUD.

6.  Configurar la ruta y el menú lateral.

7.  Realizar pruebas, tomar evidencias y hacer el commit.

**6.1 Generar componentes**

![](images/clipboard-1359400049.png)

### 6.2 Revisar el modelo y el servicio API de módulos

Objetivo: verificar los atributos del módulo y los métodos disponibles para consumir el backend.

Archivos que se revisarán:

- `src/app/core/models/module.model.ts`

- `src/app/features/modules/module-api.ts`

- `src/app/core/models/course.model.ts`

- `src/app/features/courses/course-api.ts`

![](images/clipboard-1784629877.png)

## 6.3 Servicio

El servicio `ModuleApi` permite la comunicación entre el frontend Angular y el backend Express para realizar las operaciones CRUD de módulos.

El endpoint principal es `/api/modulos`.

Las operaciones disponibles son:

| Método HTTP | Endpoint                      | Operación               |
|-------------|-------------------------------|-------------------------|
| GET         | `/api/modulos`                | Consultar módulos       |
| GET         | `/api/modulos/:id`            | Consultar un módulo     |
| POST        | `/api/modulos`                | Registrar módulo        |
| PATCH       | `/api/modulos/:id`            | Actualizar parcialmente |
| PUT         | `/api/modulos/:id`            | Reemplazar información  |
| PATCH       | `/api/modulos/:id/deactivate` | Desactivar módulo       |
| DELETE      | `/api/modulos/:id`            | Eliminar módulo         |

Archivo: `src/app/features/modules/module-api.ts`

![](images/clipboard-124342591.png)

## 6.4 Cargar datos relacionados

Archivo: `module-list.ts`

Este código incluye los imports, inyección de servicios, señales, carga paralela con `forkJoin`, manejo de errores y relación entre el identificador y el nombre del curso.

![](images/clipboard-1498997846.png)

Archivo: `module-list.html`

Esta plantilla permite visualizar los módulos, su identificador, el nombre del curso relacionado y el estado de cada registro.

![](images/clipboard-3773871345.png)

Uso en la plantilla:

```         
{{ courseName()(row.course_id) }}
```

## 6.5 Indicador de módulos activos con `computed`

![En el encabezado de la tabla se utilizará:](images/clipboard-2318167390.png)

```         
<p-tag   
[value]="activeModuleCount() + ' módulos activos'"  
severity="success"   
[rounded]="true" />
```

## 6.6 Formulario de módulos

El formulario permitirá registrar y editar módulos, con selección del curso al que pertenece cada uno.

Archivo: `src/app/core/models/module.model.ts`

![](images/clipboard-1337419533.png)

### Componente TypeScript del formulario

Archivo: `src/app/features/modules/module-form/module-form.ts4`

![](images/clipboard-3081784071.png)

**Plantilla HTML del formulario**

![](images/clipboard-1979307239.png)

### Estilos CSS

Archivo: `src/app/features/modules/module-form/module-form.css`

![](images/clipboard-2755789485.png)

## 6.7 Listado de módulos

El listado permitirá consultar, buscar, registrar, editar, desactivar y eliminar módulos.

Se utilizará una ventana modal para abrir el formulario, una tabla PrimeNG para presentar los registros y etiquetas para identificar el estado de cada módulo.

###  Componente TypeScript del listado

Archivo: `src/app/features/modules/module-list/module-list.ts`

![](images/clipboard-200373016.png)

### Plantilla HTML del listado

Archivo: `src/app/features/modules/module-list/module-list.html`

La tabla incluye búsqueda, indicador de módulos activos, nombre del curso relacionado, estado y botones para las operaciones.

![](images/clipboard-471864692.png)

### Estilos CSS del listado

Archivo: `src/app/features/modules/module-list/module-list.css`

![](images/clipboard-2153440355.png)

###  Agregar el módulo Tooltip

El listado utiliza `pTooltip` en los botones de acciones. Para que Angular reconozca esa directiva, hay que importar `TooltipModule`.

![](images/clipboard-2169162386.png)

**Ajustar el envío de datos al backend**

![](images/clipboard-1552619558.png)

## 6.8 Ruta

Debemos registrar la ruta de módulos en `app.routes.ts` para que el componente `ModuleList` pueda visualizarse desde el navegador.

Archivo: `src/app/app.routes.ts`

![](images/clipboard-1084423594.png)

## Agregar Módulos al menú lateral

`src/app/layout/shell/shell.ts`.

![](images/clipboard-832619099.png)

Comprobación del ISS-06

![](images/clipboard-817576459.png)

![](images/clipboard-2918442529.png)

## Commit ISS-06 – Módulos

```         
git add . 
git commit -m "Fase I: Frontend — ISS-06 — Módulos: CRUD y relación con cursos" 
git push origin main
```

# ISS-07 – Lecciones: CRUD y vinculación con Módulos

## 7.1. Modelo y reglas del backend

El modelo ya existe en `src/app/core/models/lesson.model.ts`. Sus campos son `id`, `module_id`, `name`, `description` e `isActive`, además de las marcas de tiempo.

La relación es de uno a muchos: un módulo puede tener varias lecciones y cada lección pertenece a un módulo mediante `module_id`.

Reglas confirmadas:

- `module_id` y `name` son obligatorios al crear.

- El módulo debe existir y estar activo.

- El backend permite consultar, crear, actualizar, desactivar y eliminar.

- La desactivación es lógica; la eliminación es física.

- Las rutas están protegidas por autenticación y autorización.

## 7.2. Generar componentes con Angular CLI

![](images/clipboard-2964468223.png)

## 7.3. Servicio de Lecciones

El servicio ya existe, pero debemos corregirlo para que interprete las respuestas reales del backend.

![](images/clipboard-3652514414.png)

## 7.4. Cargar Lecciones y Módulos en paralelo

Objetivo: consultar simultáneamente las lecciones y los módulos para mostrar en el listado el nombre del módulo al que pertenece cada lección.

Para ello utilizaremos:

- `forkJoin`: ejecuta las dos consultas en paralelo.

- `LessonApi`: obtiene las lecciones.

- `ModuleApi`: obtiene los módulos.

- `computed`: construye una relación entre el identificador del módulo y su nombre.

Archivo: `src/app/features/lessons/lesson-list/lesson-list.ts`

![](images/clipboard-1786809297.png)

## 7.5. Indicador de Lecciones activas

![](images/clipboard-1549838439.png)

## 7.6. Formulario reactivo de Lecciones

![](images/clipboard-3968209957.png)

**7.7. Listado y operaciones CRUD**

![](images/clipboard-72917916.png)

## 7.8. Configurar la ruta y el menú

Se agrega la ruta `/lecciones` y la opción del menú sin reemplazar el resto de la configuración:

![](images/clipboard-3782533857.png)

## Criterios de aceptación de ISS-07

- Se muestra el listado de lecciones.

- Se identifica el módulo asociado por su nombre.

- Se registra una lección seleccionando un módulo.

- Se valida que el nombre y el módulo sean obligatorios.

- Se edita una lección existente.

- Se desactiva una lección.

- Se elimina físicamente una lección.

- Se puede buscar por nombre, descripción o módulo.

- Se muestra el indicador de lecciones activas.

## Comprobación de ISS-07

```         
npm test -- --watch=false
```

![](images/clipboard-3620364108.png)

### commit de ISS-07

```         
git add . 
git commit -m "Fase I: Frontend — ISS-07 — Lecciones: CRUD y vinculación con módulos"
git push origin main
```

# ISS-08 – Evaluaciones

CRUD y relación Evaluación–Curso

## 8.1. Modelo y reglas del backend

El modelo que ya existe en `evaluation.model.ts` y contiene:

```         
export interface Evaluation {   
id: number;   
course_id: number;   
name: string;   
description: string | null;   
isActive: boolean; 
}  
export interface EvaluationPayload {   
course_id: number;   
name: string;   
description?: string | null;   
isActive?: boolean; 
}
```

**Reglas confirmadas en el backend:**

1.  `course_id` es obligatorio.

2.  `name` es obligatorio.

3.  El curso relacionado debe existir y estar activo.

4.  La evaluación se crea activa por defecto.

5.  La desactivación es lógica mediante `isActive = false`.

6.  La eliminación física utiliza `DELETE /api/evaluaciones/:id`.

El listado del backend devuelve únicamente evaluaciones activas.

## 8.2. Generar los componentes con Angular CLI

![](images/clipboard-303854514.png)

## 8.3. Servicio API de Evaluaciones

![](images/clipboard-3405617399.png)

## 8.4. Cargar Evaluaciones y Cursos en paralelo

Utilizaremos `forkJoin` para consultar las evaluaciones y los cursos simultáneamente.

![](images/clipboard-2526230959.png)

`forkJoin` evita cargar primero las evaluaciones y después los cursos. El `Map` permite mostrar el nombre del curso sin recorrer repetidamente el arreglo completo para cada fila.

## 8.5. Indicador de Evaluaciones activas

- Cantidad de evaluaciones activas.

- Total de evaluaciones cargadas.

- Búsqueda por nombre, descripción o curso.

![](images/clipboard-402067950.png)

## 8.6. Formulario reactivo de Evaluaciones

El formulario permitirá registrar y editar evaluaciones.

![](images/clipboard-2431057659.png)

## 8.7. Listado y operaciones CRUD de Evaluaciones

![](images/clipboard-3789849484.png)

## 8.8. Configurar ruta y menú de Evaluaciones

![](images/clipboard-1738824092.png)

## Criterios de aceptación de ISS-08

1.  Se muestra el listado de evaluaciones.

2.  Se identifica el curso asociado por su nombre.

3.  Se registran evaluaciones con un curso seleccionado.

4.  Se bloquea el envío cuando falta el nombre o el curso.

5.  Se edita una evaluación existente.

6.  Se desactiva una evaluación.

7.  Se elimina físicamente una evaluación.

8.  Se puede buscar por nombre, descripción o curso.

9.  Se muestra el indicador de evaluaciones activas.

10. El selector envía `course_id` como identificador numérico.

## Comprobación de ISS-08

![](images/clipboard-3781248007.png)

![](images/clipboard-3118122219.png)

## Commit de ISS-08

```         
git add .  
git commit -m "Fase I: Frontend — ISS-08 — Evaluaciones: CRUD y vinculación con cursos" 
git push origin main
```

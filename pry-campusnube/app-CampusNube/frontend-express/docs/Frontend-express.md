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
|------------------|---------------------------|--------------------------------|
| Interpolación    | `{{ expresión }}`         | `{{ curso().nombre }}`         |
| Property binding | `[propiedad]="expresión"` | `[value]="curso().nombre"`     |
| Event binding    | `(evento)="método()"`     | `(click)="variarPrecio(1000)"` |
| Two-way binding  | `[(ngModel)]="campo"`     | No se utiliza en este ejemplo. |

### 1.9.4.2 Flujo de control moderno con `@if` y `@else`

### 

![](images/clipboard-3667364828.png)

## Estado inicial del curso

## ![](images/clipboard-1327390416.png)

\# 1. El servidor debe compilar
ng build
![](images/clipboard-2549395611.png)

**\# 2. Debe imprimir la configuración de Tailwind/PrimeNG**
grep -R "providePrimeNG\\\|\@import 'tailwindcss'" src \| head

![](images/clipboard-2939967457.png)

**\# 3. Versiones compatibles**

npm ls primeng \@primeuix/themes primeicons \@angular/cdk --depth=0

![](images/clipboard-1140289055.png)

**\# 4. Presupuesto y estilos**
node -e "const a=require('./angular.json');const p=a.projects[Object.keys(a.projects)[0]];console.log(p.architect.build.configurations.production.budgets[0])"
cat src/styles.css

**\# 5. La composición y el componente de ejemplo declaran signals**
grep -n "imports: \\[Ejemplo\\]" src/app/app.ts
grep -n "app-ejemplo" src/app/app.html
grep -n "signal(\\\|computed(\\\|effect(" src/app/demo/ejemplo/ejemplo.ts

![](images/clipboard-1171563858.png)

### Realizamos el commit

``` bash
git add . 
git commit -m "Fase I: Frontend — ISS-01 — Bootstrap Angular 22 con CLI" 
git push origin main
```

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

  `src/environments/environment.ts` — lo usa `ng build`, es el **base**:

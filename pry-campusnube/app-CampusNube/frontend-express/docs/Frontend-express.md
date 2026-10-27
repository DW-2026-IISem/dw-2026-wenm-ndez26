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

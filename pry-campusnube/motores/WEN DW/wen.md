## MOTORES DE BASE DE DATOS CON DOCKER COMPOSE

### WENYURE MENDEZ LAFAURIE 

### Crear 4 Motores de Base de Datos con Docker Compose
## 1. Requisitos Previos

## 1.1 WSL2 instalado y funcionando
Wsl2 instalado correctamente y funcionando 

![alt text](image.png)

## Docker funcionando dentro de WSL
![alt text](image-1.png)

## Acceso a terminal bash en WSL
![alt text](image-2.png)

## Instalar Docker y Compose
### Add Docker's official GPG key:
![alt text](image-4.png)
## Add the repository to Apt sources:
![alt text](image-5.png)
En este paso se instalo compose anteriormmente instalamos docker 
![alt text](image-3.png)
## Verifica Docker:
![alt text](image-6.png)

## 2. Paso 1: Crear Carpetas
Iniciamos instalando tree
![alt text](image-8.png)
En este paso cree las carpetas  
![alt text](image-7.png)
## Se verificó que se creo correctamente y su estructura
![alt text](image-9.png)

## 3. Paso 2: Crear la Red Docker Compartida
Todos los contenedores compartirán una misma red Docker para comunicarse entre sí:
En este paso cree una red docker compartida 
![alt text](image-10.png)
# 4. Paso 3: MySQL
## 4.1 Crear el archivo docker-compose.yml
este paso cree un archivo docker-compose.yml
![alt text](image-11.png)
### 4.2 Crear el archivo .env
cree un archivo .env 
![alt text](image-12.png)
### 4.3 Crear README.md
cree corectamente el archivo 
![alt text](image-14.png)
## Conectar desde WSL (local)
En este paso conecte desde la wsl local.
![alt text](image-15.png)
## Conectar remotamente desde cualquier equipo
En este paso conecte correctamente desde cualquier equipo 
![alt text](image-16.png)
## Crear un usuario PROPIO con ACCESO REMOTO
cree exitosamente un usuario propio con acceso remoto
![alt text](image-17.png)
## Backup de una base de datos
se realizó un backaup y se verifico que se creo correctamnente 
![alt text](image-18.png)
## Variables clave del .env

| Variable              | Descripcion                                      |
|-----------------------|--------------------------------------------------|
| `MYSQL_ROOT_PASSWORD` | Password del usuario root                        |
| `MYSQL_DATABASE`      | Base de datos creada automaticamente al arrancar |
## 4.4 Levantar MySQL
En este paso se levanto MySQL y así mismo se verfificó que estiviera corriendo correctamente 
![alt text](image-19.png)
Verificar que está corriendo los logs:
![alt text](image-20.png)
## 5. Paso 4: PostgreSQL
Ahora en este paso haremos lo mismo que hicimos con MySQL 
### 5.1 Crear docker-compose.yml
Ahora cree el docker-compose.yml para posgretSQL
![alt text](image-21.png)
### Se verificó que este se creo correctamente 
![alt text](image-22.png)
## 5.2 Crear .env
En este paso creamos el archivo .env y verficamos que se creo correctamente 
![alt text](image-23.png)
## 5.3 Crear README.md
En este paso cree el archivo correctamente 
![alt text](image-24.png)
## Conectar desde WSL (local)
se hizo la conexión desde WSL local
![alt text](image-25.png)
## instalar psql
En este paso antes de hacer la conexión desde cualquier equipo se instalo psql
![alt text](image-26.png)
## Conectar remotamente desde cualquier equipo
Se realizó la conexión desde cualquier equipo 
![alt text](image-27.png)
## Crear un usuario PROPIO con ACCESO REMOTO
Crear la base de datos (este paso ya esta creado)
### Crear usuario propio (por defecto puede conectarse desde cualquier host)
![alt text](image-28.png)
### Dar permisos sobre la base de datos
![alt text](image-29.png)
## Backup de una base de datos 
En este paso se creo correctamenre el backaup de esta base de datos 
![alt text](image-30.png)
## Se verificó que se creó correctamente 
![alt text](image-31.png)
## Variables clave del .env

| Variable            | Descripcion                              |
|---------------------|------------------------------------------|
| `POSTGRES_USER`     | Usuario administrador (ialab)            |
| `POSTGRES_PASSWORD` | Password del administrador               |
| `POSTGRES_DB`       | Base de datos inicial creada al arrancar |

### 5.4 Levantar PostgreSQL
![alt text](image-38.png)
![alt text](image-32.png)
## 6. Paso 5: SQL Server
Ahora se trabajará el motor SQL Server
# 6.1 Crear docker-compose.yml
### Inciamos creando el docker-compose.yml
![alt text](image-33.png)
# 6.2 Crear .env
en este caso se creo el archivo .env
![alt text](image-34.png)

### 6.3 Crear README.md
en este paso siguiendo la guia creamos el README.md
![alt text](image-35.png)
## Conectar desde WSL (local)
Se conecto desde wsl local
![alt text](image-36.png)
y se verfica que se creo correctamente
![alt text](image-37.png)
## Crear un usuario PROPIO con ACCESO REMOTO

###  Crear la base de datos
primero creamos la base de datos
![alt text](image-39.png)
##  Crear login (autenticacion a nivel servidor, acceso remoto por defecto)
![alt text](image-40.png)
## Crear usuario dentro de la base de datos
creamos el usuario dentro de la base de datos creada
![alt text](image-41.png)
## Dar permisos de dueno de la base de datos
se le dió permmisos a la base de datos
![alt text](image-42.png)

## Backup de una base de datos
Realizamos el backaup de manera exitosa y verficamos que este se realizó correctamente
![alt text](image-43.png)

## Variables clave del .env

| Variable            | Descripcion                             |
|---------------------|-----------------------------------------|
| `MSSQL_SA_PASSWORD` | Password del usuario SA (administrador) |
| `MSSQL_PID`         | Edicion de SQL Server (Developer)       |

EOF
### 6.4 Levantar SQL Server
![alt text](image-44.png)

## 7. Paso 6: Oracle XE
Ahora iniciamos con el ultimó motor que es Oracle XE
### 7.1 Crear docker-compose.yml
Iniciamos con crear el docker-compose.yml
![alt text](image-45.png)
### 7.2 Crear .env
Cree un archivo .env exitosamente 
![alt text](image-46.png)
### 7.3 Crear README.md
Ahora creamos un README.md
![alt text](image-47.png)
## Conectar desde WSL (local)
![alt text](image-48.png)
## Conectar remotamente desde cualquier equipo
![alt text](image-49.png)
# Crear un usuario PROPIO con ACCESO REMOTO
## Crear tablespace para el usuario
![alt text](image-50.png)
## Crear usuario propio (puede conectarse desde cualquier host via listener)
![alt text](image-53.png)
## Dar permisos basicos
![alt text](image-54.png)
## Dar permisos de DBA
![alt text](image-55.png)
## Variables clave del .env

| Variable          | Descripcion                 |
|-------------------|-----------------------------|
| `ORACLE_PASSWORD` | Password del usuario SYSTEM |
| `ORACLE_DATABASE` | Nombre de la instancia (XE) |

### 7.4 Levantar Oracle
![alt text](image-56.png)
![alt text](image-57.png)
## INICIAMOS CON LA CONEXIÓN DE MYSQL EN DBeaver 
### Para este paso teniendo en cuenta los datos y ip que se usaron cuando creamos las base de datos
![alt text](image-58.png)
### Seleccionamos nuestra base de datos en este caso MySQL
### Ahora realizamos la coenzión 
![alt text](image-59.png)
### Realizamos una test conetion antes 
![alt text](image-60.png)
### Finalizamos y conectamos correctamente 
![alt text](image-61.png)
## INICIAMOS CON LA CONEXIÓN DE MYSQL SERVER EN DBeaver
### Seleccionamos nuestra base de datos en este caso MySQL Server
### Ahora realizamos la coenzión 
![alt text](image-62.png)
 ### Realizamos una test conetion antes 
 ![alt text](image-63.png)
 ###  Finalizamos y conectamos correctamente 
 ![alt text](image-64.png)
 ## INICIAMOS CON LA CONEXIÓN DE POSGRET EN DBeaver
### Seleccionamos nuestra base de datos en este caso Posgret
### Ahora realizamos la coenzión 
!![alt text](image-65.png)
 ### Realizamos una test conetion antes 
 ![alt text](image-66.png)
 ### Finalizamos y conectamos correctamente 
 ![alt text](image-67.png)
 ## INICIAMOS CON LA CONEXIÓN DE ORACLE EN DBeaver
### Seleccionamos nuestra base de datos en este caso Oracle
### Ahora realizamos la coenzión 
![alt text](image-68.png)
 ## Realizamos una test conetion antes 
 ![alt text](image-69.png)
 ## Finalizamos y conectamos correctamente 
 ![alt text](image-70.png)


```markdown
# 🛠️ Boxful | Prueba Técnica Senior Full Stack Developer - NestJS API - Guía de Configuración y Documentación

Esta es una API RESTful construida con [NestJS](https://nestjs.com/) y MongoDB como base de datos. Soporta autenticación y operaciones CRUD básicas para `orders` (órdenes) y `products` (productos).

---

## 📑 Índice

1. [📦 Requisitos del Proyecto](#-requisitos-del-proyecto)  
2. [🚀 Configuración Local](#-configuración-local)  
3. [🌐 Live Peview](#-despliegue-en-producción)  
4. [📬 Autenticación](#-autenticación)  
5. [📦 API de Órdenes](#-api-de-órdenes)  
6. [🛍️ API de Productos](#️-api-de-productos)  
7. [🧪 Variables de Entorno](#-variables-de-entorno)  
8. [🔐 Autorización](#-autorización)  
9. [📝 Notas](#-notas)

---

## 📦 Requisitos del Proyecto

- [Node.js](https://nodejs.org/en/) v18 o superior  
- [Docker y Docker Compose](https://docs.docker.com/get-docker/)
- CLI de NestJS (opcional pero recomendado): `npm i -g @nestjs/cli`

---

## 🚀 Configuración Local

### 1. Clonar el Repositorio

```bash
git clone https://github.com/jralvarenga/boxful-backend
cd boxful-backend
```

### 2. Crear el archivo `.env`

Copia el contenido de .env.sample a .env y reemplaza con tus variables de base de datos y secretos

```env
DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST/DATABASE
AUTH_SECRET=testauthsecret_changeit
```

### 4. Instalar dependencias e iniciar la API

```bash
npm install
npm run start
```

La API estará corriendo en: `http://localhost:3000`


## 📬 Autenticación

### 🔐 POST `/auth/login`

**Body**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tucontraseña"
}
```

**Respuesta**

```json
{
  "access_token": "jwt.token.aquí"
}
```

---

### 📝 POST `/auth/register`

**Body**

```json
{
  "email": "usuario@ejemplo.com",
  "password": "tucontraseña"
}
```

**Respuesta**

```json
{
  "access_token": "jwt.token.aquí"
}
```

**🔑 Se requiere token de acceso tipo Bearer para todos los demás endpoints.**

---

## 📦 API de Órdenes

### 🔐 GET `/orders`

- Devuelve todas las órdenes.
- **Requiere Autenticación:** Sí

---

### 🔐 GET `/orders/:id`

- Devuelve una orden específica por ID.
- **Requiere Autenticación:** Sí

---

### 🔐 POST `/orders`

- Crea una nueva orden.
- **Requiere Autenticación:** Sí

**Body** (por definir)

```json
{
  // Por definir
}
```

---

### 🔐 PUT `/orders`

- Actualiza una orden existente.
- **Requiere Autenticación:** Sí

**Body** (por definir)

```json
{
  // Por definir
}
```

---

### 🔐 DELETE `/orders/:id`

- Elimina una orden específica por ID.
- **Requiere Autenticación:** Sí

---

## 🛍️ API de Productos

### 🔐 GET `/products`

- Devuelve todos los productos.
- **Requiere Autenticación:** Sí

---

### 🔐 GET `/products/:id`

- Devuelve un producto específico por ID.
- **Requiere Autenticación:** Sí

---

### 🔐 POST `/products`

- Crea un nuevo producto.
- **Requiere Autenticación:** Sí

**Body** (por definir)

```json
{
  // Por definir
}
```

---

### 🔐 PUT `/products`

- Actualiza un producto.
- **Requiere Autenticación:** Sí

**Body** (por definir)

```json
{
  // Por definir
}
```

---

### 🔐 DELETE `/products/:id`

- Elimina un producto por ID.
- **Requiere Autenticación:** Sí

---

## 🔐 Autorización

Todos los endpoints (excepto `/auth/login` y `/auth/register`) requieren autenticación con token Bearer en el encabezado:

```http
Authorization: Bearer <access_token>
```

---

## 📝 Notas

- Asegúrate de que MongoDB esté corriendo en tu entorno local antes de usar la API.
- Recomendamos herramientas como Postman o Insomnia para probar la API.

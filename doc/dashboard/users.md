# EndPoints

- [Usuarios](#usuarios)
- [Usuario](#usuario)
- [Modificar rol usuario](#modificar-rol-usuario)
- [Eliminar usuario](#eliminar-usuario)

## Usuarios

| Método | Ruta                      | Descripción                             |
| :----- | :------------------------ | :-------------------------------------- |
| `GET`  | `/api/v1/dashboard/users` | Obtiene todos los usuarios en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/users
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": "clp7246tc0000t3e80c38zf1y",
    "name": "Brayan Huanca",
    "email": "brayan_libra1@hotmail.com",
    "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
    "emailVerified": null,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1694964554/wm1hvbu4znuawf14n6rk.webp",
    "role": "User",
    "cart": null
  }
  // otros usuarios...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron usuarios:

```json
{
  "message": "users not found"
}
```

## Usuario

| Método | Ruta                                | Descripción                     |
| :----- | :---------------------------------- | :------------------------------ |
| `GET`  | `/api/v1/dashboard/users/${userId}` | Obtiene un usuario de la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/users/clp7246tc0000t3e80c38zf1y
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "id": "clp7246tc0000t3e80c38zf1y",
  "name": "Brayan Huanca",
  "email": "brayan_libra1@hotmail.com",
  "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
  "emailVerified": null,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1694964554/wm1hvbu4znuawf14n6rk.webp",
  "role": "User",
  "cart": null
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontro el usuario:

```json
{
  "message": "user not found"
}
```

## Modificar rol usuario

| Método  | Ruta                                            | Descripción                               |
| :------ | :---------------------------------------------- | :---------------------------------------- |
| `PATCH` | `/api/v1/dashboard/users/${userId}?role=${rol}` | Modifica el rol a un usuario de la tienda |

**Ejemplo de Solicitud:**

```
PATCH /api/v1/dashboard/users/clp7246tc0000t3e80c38zf1y?role=Admin
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "message": "Rol asignado con éxito",
  {
    "id": "clp7246tc0000t3e80c38zf1y",
    "name": "Brayan Huanca",
    "email": "brayan_libra1@hotmail.com",
    "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
    "emailVerified": null,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1694964554/wm1hvbu4znuawf14n6rk.webp",
    "role": "Admin",
    "cart": null
  }
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 403 Forbidden, El acceso al recurso está prohibido:

```json
{
  "message": "La sesión ha expirado o no está autorizado para acceder a esta página."
}
```

## Eliminar usuario

| Método   | Ruta                                | Descripción                       |
| :------- | :---------------------------------- | :-------------------------------- |
| `DELETE` | `/api/v1/dashboard/users/${userId}` | Elimina a un usuario de la tienda |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/dashboard/users/clp7246tc0000t3e80c38zf1y
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "id": "clp7246tc0000t3e80c38zf1y",
  "name": "Brayan Huanca",
  "email": "brayan_libra1@hotmail.com",
  "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
  "emailVerified": null,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1694964554/wm1hvbu4znuawf14n6rk.webp",
  "role": "Admin",
  "cart": null
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontro al usuario:

```json
{ "message": "user not found" }
```

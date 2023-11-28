# EndPoints

- [Usuarios](#usuarios)

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

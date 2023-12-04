# EndPoints

- [Usuario](#usuario)
- [Crear usuario](#crear-usuario)
- [Modificar usuario](#modificar-usuario)
- [Modificar contraseña de usuario](#modificar-contraseña-de-usuario)
- [Generar token para cambiar contraseña](#generar-token-para-cambiar-contraseña)
- [Cambiar contraseña con el token](#cambiar-contraseña-con-el-token)

## Usuario

| Método | Ruta                     | Descripción                     |
| :----- | :----------------------- | :------------------------------ |
| `GET`  | `/api/v1/user/${userId}` | Obtiene un usuario en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/user/clnnpsdft0000usmcuajpf1vo
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
  "role": "User"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, indicando que no se encontro el usuario:

```json
{
  "message": "user not found"
}
```

## Crear usuario

| Método | Ruta                 | Descripción                        |
| :----- | :------------------- | :--------------------------------- |
| `POST` | `/api/auth/register` | Crea un nuevo usuario en la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `name` | `string` | Nombre de usuario. |
| `email` | `string` | Email del usuario. |
| `password` | `string` | Contraseña del usuario. |
| `image` | `string` | URL de imagen del usuario (_opcional_) |

**Ejemplo de Solicitud:**

```
POST /api/auth/register

{
    "name": "Junior Brayan Huanca Peña",
    "email": "jhuanca_21@outlook.com",
    "password": "password123"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 201 Created:

```json
{
  "message": "User created successfully",
  "email": "jhuanca_211@outlook.com",
  "status": 201
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "error": {
    "name": "PrismaClientValidationError",
    "clientVersion": "5.5.2"
  }
}
```

## Modificar usuario

| Método | Ruta                     | Descripción                   |
| :----- | :----------------------- | :---------------------------- |
| `PUT`  | `/api/v1/user/${userId}` | modifica usuario en la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `name` | `string` | Nombre de usuario. |
| `email` | `string` | Email del usuario. |
| `image` | `string` | URL de imagen del usuario. |

**Ejemplo de Solicitud:**

```
PUT /api/v1/user/clnxqzdnh0000us40i83e4bqq

{
  "name": "juan camilo garcia ",
  "email": "juan@gmail.com",
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1697754143/sfntq0xb02hebhlzypat.webp"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "id": "clnxqzdnh0000us40i83e4bqq",
  "name": "juan camilo garcia ",
  "email": "juan@gmail.com",
  "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
  "emailVerified": null,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1697754143/sfntq0xb02hebhlzypat.webp",
  "role": "User"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "error": {
    "name": "PrismaClientValidationError",
    "clientVersion": "5.5.2"
  }
}
```

## Modificar contraseña de usuario

| Método | Ruta                                         | Descripción                       |
| :----- | :------------------------------------------- | :-------------------------------- |
| `PUT`  | `/api/v1/user/${userId}?passwordChange=true` | Desactiva el usuario en la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `password` | `string` | Nueva contraseña de usuario. |

**Ejemplo de Solicitud:**

```
PUT /api/v1/user/clnxqzdnh0000us40i83e4bqq?passwordChange=true

{
  "password": "Dashboard"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "messag": "Contraseña Cambiada correctamente!",
  "userUpdate": {
    "id": "clnxqzdnh0000us40i83e4bqq",
    "name": "juan camilo garcia ",
    "email": "juan@gmail.com",
    "password": "$2a$05$Mzsti.n5AshtBBMYZxu8Ce9lZRT6gM0LDl28VAabt2Z/mG0nVvq4.",
    "emailVerified": null,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1697754143/sfntq0xb02hebhlzypat.webp",
    "role": "User"
  }
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, indicando que el servidor fallo en la petición:

```json
{
  "name": "PrismaClientKnownRequestError",
  "code": "P2025",
  "clientVersion": "5.5.2",
  "meta": {
    "cause": "Record to delete does not exist."
  }
}
```

## Generar token para cambiar contraseña

| Método | Ruta                      | Descripción                                                                              |
| :----- | :------------------------ | :--------------------------------------------------------------------------------------- |
| `POST` | `/api/auth/resetPassword` | Genera un token para poder restablecer la contraseña del usuario y se le envia un email. |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `email` | `string` | Correo electronico del usuario para restablecer la contraseña. |

**Ejemplo de Solicitud:**

```
POST /api/auth/resetPassword

{
  "email":"rasena7743@vinthao.com"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "message": "Se ha generado con éxito el token para restablecer la contraseña."
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": "El correo electrónico no está registrado."
}
```

## Cambiar contraseña con el token

| Método | Ruta                       | Descripción                                                       |
| :----- | :------------------------- | :---------------------------------------------------------------- |
| `POST` | `/api/auth/changePassword` | Cambia la contraseña del usuario en caso de que la haya olvidado. |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `token` | `string` | token generado anteriormente. |
| `password` | `string` | Nueva contraseña de usuario. |

**Ejemplo de Solicitud:**

```
POST /api/auth/changePassword

{
  "token":"c9edc3a351c36b5fa536dee98920e7e9d966ad8d100df32512cb7c953b15daed",
  "password": "newPassword"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "message": "Contraseña cambiada para el usuario"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": "El token de restablecimiento de contraseña es inválido o ya ha sido utilizado."
}
```

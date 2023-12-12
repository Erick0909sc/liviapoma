# EndPoints

- [Reseñas](#reseñas)
- [Enviar reseña de producto](#enviar-reseña-de-producto)
- [Modificar reseña de producto](#modificar-reseña-de-producto)
- [Eliminar reseña](#eliminar-reseña)

## Reseñas

| Método | Ruta                             | Descripción                              |
| :----- | :------------------------------- | :--------------------------------------- |
| `GET`  | `/api/v1/reviews/${productCode}` | Obtiene todas las reseñas de un producto |

**Ejemplo de Solicitud:**

```
GET /api/v1/reviews/0101001
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 56,
    "productCode": "0102001",
    "userId": "clp4775jn0000l908gkh618n7",
    "description": "afs",
    "rating": 5,
    "createdAt": "2023-11-22T16:34:14.618Z",
    "updatedAt": "2023-11-22T16:34:14.618Z",
    "user": {
      "id": "clp4775jn0000l908gkh618n7",
      "name": "Junior Huanca",
      "email": "jhuanca_21@outlook.com",
      "password": "$2a$05$IKHSUA5XbEpEQGpUG1/PQ.eN/qruflKrx24YOSoc2F8fsfu76PYpi",
      "emailVerified": null,
      "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1700398485/dbwr0ssc3cytvqmxgl4f.webp",
      "role": "Admin"
    }
  }
  // otras reseñas
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que el producto no tiene reseñas aun:

```json
{
  "message": "Este producto aún no ha recibido reseñas"
}
```

## Enviar reseña de producto

| Método | Ruta              | Descripción                   |
| :----- | :---------------- | :---------------------------- |
| `POST` | `/api/v1/reviews` | Agrega una reseña al producto |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `productCode` | `string` | Código de producto. |
| `userId` | `string` | Id del usuario. |
| `description` | `string` | Descripción de la reseña. |
| `rating` | `number` | Puntaje de calificacion (_**1 - 5**_) |

**Ejemplo de Solicitud:**

```
POST /api/v1/reviews

{
  "productCode": "0101001",
  "userId": "cloysv7pn0000t3g4bnz1e0iz",
  "description": "Buen Producto",
  "rating": 1
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 201 Created:

```json
{
  "review": {
    "id": 5,
    "productCode": "0101001",
    "userId": "cloysv7pn0000t3g4bnz1e0iz",
    "description": "Buen Producto",
    "rating": 1,
    "createdAt": "2023-12-05T19:39:30.767Z",
    "updatedAt": "2023-12-05T19:39:30.767Z"
  },
  "updatedProduct": {
    "code": "0101001",
    "name": "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    "description": "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    "price": 30.4,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    "rating": 1,
    "discount": 0,
    "categoryId": 1,
    "deletedAt": null,
    "brandId": 1,
    "unitOfMeasureId": 3,
    "reviews": [
      {
        "id": 5,
        "productCode": "0101001",
        "userId": "cloysv7pn0000t3g4bnz1e0iz",
        "description": "Buen Producto",
        "rating": 1,
        "createdAt": "2023-12-05T19:39:30.767Z",
        "updatedAt": "2023-12-05T19:39:30.767Z"
      }
    ]
  }
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bab Request, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": "Antes de dejar una reseña, asegúrate de haber realizado una compra del producto."
}
```

## Modificar reseña de producto

| Método | Ruta              | Descripción      |
| :----- | :---------------- | :--------------- |
| `PUT`  | `/api/v1/reviews` | Edita una reseña |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `id` | `number` | id de la reseña a editar |
| `productCode` | `string` | Código de producto. |
| `userId` | `string` | Id del usuario. |
| `description` | `string` | Descripción de la reseña. |
| `rating` | `number` | Puntaje de calificacion (_**1 - 5**_) |

**Ejemplo de Solicitud:**

```
PUT /api/v1/reviews

{
  "id": 10,
  "productCode": "0101001",
  "userId": "cloysv7pn0000t3g4bnz1e0iz",
  "description": "Muy buen productos",
  "rating": 5
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "editReview": {
    "id": 5,
    "productCode": "0101001",
    "userId": "cloysv7pn0000t3g4bnz1e0iz",
    "description": "Muy buen productos",
    "rating": 5,
    "createdAt": "2023-12-05T19:39:30.767Z",
    "updatedAt": "2023-12-05T19:48:00.097Z"
  },
  "updatedProduct": {
    "code": "0101001",
    "name": "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    "description": "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    "price": 30.4,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    "rating": 5,
    "discount": 0,
    "categoryId": 1,
    "deletedAt": null,
    "brandId": 1,
    "unitOfMeasureId": 3,
    "reviews": [
      {
        "id": 5,
        "productCode": "0101001",
        "userId": "cloysv7pn0000t3g4bnz1e0iz",
        "description": "Muy buen productos",
        "rating": 5,
        "createdAt": "2023-12-05T19:39:30.767Z",
        "updatedAt": "2023-12-05T19:48:00.097Z"
      }
    ]
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
    "cause": "Record to update not found."
  }
}
```

## Eliminar reseña

| Método   | Ruta                             | Descripción        |
| :------- | :------------------------------- | :----------------- |
| `DELETE` | `/api/v1/reviews?id=${reviewId}` | Elimina una reseña |

**Parametros de la Solicitud (Request Params):**

| Parámetro  | Tipo     | Descripción              |
| :--------- | :------- | :----------------------- |
| `reviewId` | `string` | Id de review a eliminar. |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/reviews?id=5
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "deleteReview": {
    "id": 5,
    "productCode": "0101001",
    "userId": "cloysv7pn0000t3g4bnz1e0iz",
    "description": "Muy buen productos",
    "rating": 5,
    "createdAt": "2023-12-05T19:39:30.767Z",
    "updatedAt": "2023-12-05T19:48:00.097Z"
  },
  "updatedProduct": {
    "code": "0101001",
    "name": "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    "description": "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    "price": 30.4,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    "rating": 0,
    "discount": 0,
    "categoryId": 1,
    "deletedAt": null,
    "brandId": 1,
    "unitOfMeasureId": 3,
    "reviews": []
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

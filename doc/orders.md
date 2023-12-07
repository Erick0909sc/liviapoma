# Endpoints

- [Ordenes](#ordenes)
- [Historial de compras](#historial-de-compras)
- [Detalle de orden](#detalle-de-orden)
- [Cambiar estado de orden](#cambiar-estado-de-orden)

## Ordenes

| Método | Ruta                              | Descripción                                                                     |
| :----- | :-------------------------------- | :------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/orders?userId=${userId}` | Obtiene todas las ordenes de un usuario con `productsStatus` en (`PENDIENTE` o `POR_RECOGER`) |

**Ejemplo de Solicitud:**

```
GET /api/v1/orders?userId=cloek9xgv0000t36oz3o7zb2s
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 6,
    "userId": "clp4anehv0000l4080997vrbq",
    "checkoutUuid": "6e58cc08d92249e09dfad7228a636036",
    "orderTotalAmount": 5880,
    "orderStatus": "PAID",
    "productsStatus": "PENDIENTE",
    "orderCurrency": "PEN",
    "formToken": "262nLwn3IjR16j6z3g_eJV1g23CeyJhbW91bnQiOjU4ODAsImN1cnJlbmN5IjoiUEVOIiwibW9kZSI6IlRFU1QiLCJ2ZXJzaW9uIjo0LCJvcmRlcklkIjoiNiIsInNob3BOYW1lIjoiSVpJKkRpc3RyaWJ1Y2lvbmVzIGxpdmlhcG9tYSBFSVJMICg1NTYzMDk1KSIsInJpc2tBbmFseXNlciI6eyJmaW5nZXJQcmludHNJZCI6ImM4ZmRlOWNlLTI5YjItNGYzNC1iNmI1LTBkY2YwZmI3NWY1NSIsImpzVXJsIjoiaHR0cHM6Ly9zZ...",
    "createdAt": "2023-12-06T00:47:39.857Z",
    "updatedAt": "2023-12-06T00:48:13.876Z",
    "dailyDataId": 3,
    "products": [
      {
        "id": 23,
        "quantity": 1,
        "productCode": "0102004",
        "orderId": 6,
        "createdAt": "2023-12-06T00:47:39.857Z",
        "updatedAt": "2023-12-06T00:47:39.857Z",
        "product": {
          "code": "0102004",
          "name": "VARILLA CORRUGADA 5/8\"",
          "description": "Las varillas corrugadas de 5/8\" de Siderperú son un testimonio de fuerza en cada centímetro. Diseñadas para superar expectativas, estas varillas son la base en la que tus proyectos se elevan. Cada doblez refleja un compromiso con la integridad estructural.",
          "price": 58.8,
          "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/06.webp",
          "rating": 0,
          "discount": 0,
          "categoryId": 2,
          "deletedAt": null,
          "brandId": 2,
          "unitOfMeasureId": 3
        }
      }
      // otros productos
    ],
    "user": {
      "id": "clp4anehv0000l4080997vrbq",
      "name": "Erick Inga Calle",
      "email": "erickingacalle@gmail.com",
      "password": null,
      "emailVerified": null,
      "image": "https://lh3.googleusercontent.com/a/ACg8ocJacyeoSLJR5NH9G3eUFOV3PJX5CjrckN0tJCQFxAmC=s96-c",
      "role": "User"
    }
  }
  // otras ordenes
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron ordenes:

```json
{
  "message": "orders not found"
}
```

## Historial de compras

| Método | Ruta                                           | Descripción                                                                                 |
| :----- | :--------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `GET`  | `/api/v1/orders?userId=${userId}&history=true` | Obtiene todas las ordenes de un usuario con `productsStatus` en (`ENTREGADO`) y `orderStatus` en (`PAID`) |

**Ejemplo de Solicitud:**

```
GET /api/v1/orders?userId=clp4anehv0000l4080997vrbq&history=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 2,
    "userId": "clp4anehv0000l4080997vrbq",
    "checkoutUuid": "c6ee2a6c07274806b401d134616bdc5c",
    "orderTotalAmount": 10210,
    "orderStatus": "PAID",
    "productsStatus": "ENTREGADO",
    "orderCurrency": "PEN",
    "formToken": "26AwriuG1bSIufYwR93cIXVA23BeyJhbW91bnQiOjEwMjEwLCJjdXJyZW5jeSI6Il...",
    "createdAt": "2023-11-18T16:59:45.640Z",
    "updatedAt": "2023-11-18T17:03:54.738Z",
    "dailyDataId": null,
    "products": [
      {
        "id": 8,
        "quantity": 1,
        "productCode": "0102001",
        "orderId": 2,
        "createdAt": "2023-11-18T16:59:45.640Z",
        "updatedAt": "2023-11-18T16:59:45.640Z",
        "product": {
          "code": "0102001",
          "name": "VARILLA CORRUGADA 1/2\"",
          "description": "La varilla corrugada de Siderperú en calibre 1/2\" es un pilar de fuerza en cada construcción. Cada pieza cuenta una historia de solidez y resistencia, asegurando que tus proyectos se mantengan firmes en el tiempo. Confiabilidad en cada doblez.",
          "price": 38,
          "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/03.webp",
          "rating": 5,
          "discount": 0,
          "categoryId": 2,
          "deletedAt": null,
          "brandId": 2,
          "unitOfMeasureId": 3
        }
      }
      // otros productos
    ],
    "user": {
      "id": "clp4anehv0000l4080997vrbq",
      "name": "Erick Inga Calle",
      "email": "erickingacalle@gmail.com",
      "password": null,
      "emailVerified": null,
      "image": "https://lh3.googleusercontent.com/a/ACg8ocJacyeoSLJR5NH9G3eUFOV3PJX5CjrckN0tJCQFxAmC=s96-c",
      "role": "User"
    }
  }
  // otras ordenes
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron ordenes de compra:

```json
{
  "message": "orders not found"
}
```

## Detalle de orden

| Método | Ruta                                         | Descripción                    |
| :----- | :------------------------------------------- | :----------------------------- |
| `GET`  | `/api/v1/orders/${orderId}?userId=${userId}` | Obtiene el detalle de la orden |

**Ejemplo de Solicitud:**

```
GET /api/v1/orders/2?userId=clohec2sw0000kx0a8g2imv4d
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "id": 1,
  "userId": "clo8rtxhk0000t3a4go2etjjt",
  "checkoutUuid": "f9cdca97ac524fdd9a94e4e3364ba6e1",
  "orderTotalAmount": 159650,
  "orderStatus": "PAID",
  "orderCurrency": "PEN",
  "formToken": "26iaYFRVuuQXifVtxUQj_lrA23AeyJhbW91bnQiOjE1OTY1MCwiY3VycmVuY3kiOiJQRU4i...",
  "createdAt": "2023-10-27T15:32:16.218Z",
  "updatedAt": "2023-10-27T15:33:07.991Z",
  "productCode": null,
  "products": [
    {
      "id": 1,
      "quantity": 10,
      "productCode": "0102002",
      "orderId": 1,
      "createdAt": "2023-10-27T15:32:16.218Z",
      "updatedAt": "2023-10-27T15:32:16.218Z",
      "product": {
        "code": "0102002",
        "name": "VARILLA CORRUGADA 3/8\"",
        "description": "Las varillas corrugadas de 3/8\" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.",
        "price": 21.2,
        "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
        "rating": 4,
        "discount": 0,
        "categoryId": 2,
        "deletedAt": null,
        "brandId": 2,
        "unitOfMeasureId": 3,
        "category": {
          "id": 2,
          "name": "Varillas"
        },
        "brand": {
          "id": 2,
          "name": "SIDERPERU"
        },
        "unitOfMeasure": {
          "id": 3,
          "name": "Unidad",
          "abbreviation": "Ud"
        }
      }
    },
    // otros productos
  ]
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontro orden:

```json
{
  "message": "order not found"
}
```

## Cambiar estado de orden

| Método  | Ruta                        | Descripción                     |
| :------ | :-------------------------- | :------------------------------ |
| `PATCH` | `/api/v1/orders/${orderId}` | Modifica el estado de una orden |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `status` | `string` | Estado de una orden (`PENDIENTE`, `POR_RECOGER`, `ENTREGADO`) |

**Ejemplo de Solicitud:**

```
PATCH /api/v1/orders/16
{
  "status": "POR_RECOGER"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "id": 16,
  "userId": "cloysv7pn0000t3g4bnz1e0iz",
  "checkoutUuid": null,
  "orderTotalAmount": 3000,
  "orderStatus": "PAID",
  "productsStatus": "POR_RECOGER",
  "orderCurrency": "PEN",
  "formToken": null,
  "createdAt": "2023-11-17T15:56:04.323Z",
  "updatedAt": "2023-12-06T16:22:38.622Z",
  "dailyDataId": null
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Not Found, indicando que hubo un error en el servidorf:

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

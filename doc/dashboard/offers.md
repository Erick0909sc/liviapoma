# EndPoints

- [Ofertas](#ofertas)
- [Ofertas desactivadas](#ofertas-desactivadas)
- [Crear oferta](#crear-oferta)
- [Modificar oferta](#modificar-oferta)
- [Eliminar oferta](#eliminar-oferta)

## Ofertas

| Método | Ruta                       | Descripción                            |
| :----- | :------------------------- | :------------------------------------- |
| `GET`  | `/api/v1/dashboard/offers` | Obtiene todas las ofertas en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/offers
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 1,
    "startDate": "2023-10-09T17:23:00.000Z",
    "endDate": "2023-10-12T00:00:00.000Z",
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1696890149/zfnjqqahrn4g1k2zhx41.webp",
    "brands": [],
    "categories": [
      {
        "id": 1,
        "offerId": 1,
        "categoryId": 1,
        "discount": 50,
        "category": {
          "id": 1,
          "name": "Cementos"
        }
      }
    ]
  }
  // otras ofertas...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron ofertas:

```json
{
  "message": "offers not found"
}
```

## Ofertas desactivadas

| Método | Ruta                                     | Descripción                                         |
| :----- | :--------------------------------------- | :-------------------------------------------------- |
| `GET`  | `/api/v1/dashboard/offers?disabled=true` | Obtiene todas las ofertas desactivadas en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/offers?disabled=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 1,
    "startDate": "2023-10-09T17:23:00.000Z",
    "endDate": "2023-10-12T00:00:00.000Z",
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1696890149/zfnjqqahrn4g1k2zhx41.webp",
    "brands": [],
    "categories": [
      {
        "id": 1,
        "offerId": 1,
        "categoryId": 1,
        "discount": 50,
        "category": {
          "id": 1,
          "name": "Cementos"
        }
      }
    ]
  }
  // otras ofertas...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron ofertas:

```json
{
  "message": "offers not found"
}
```

## Crear oferta

| Método | Ruta                       | Descripción               |
| :----- | :------------------------- | :------------------------ |
| `POST` | `/api/v1/dashboard/offers` | Crea una oferta la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `startDate` | `string` | Fecha de inicio de la oferta. |
| `endDate` | `string` | Fecha de fin de la oferta. |
| `image` | `string` | Imagen de la oferta. |
| `brands` | `number` | Marcas que estarán con descuento. |
| `categories` | `number` | Categorías que estarán con descuento. |

**Ejemplo de Solicitud:**

```
POST /api/v1/dashboard/offers

{
    "startDate": "2023-09-27T10:05",
    "endDate": "2023-10-02T15:55",
    "image": "https://assets.isu.pub/document-structure/230607120922-2c5c232729585842273d4d814d749bb8/v1/95016803dd58a8cab99a5d8bff5ab12e.jpeg",
    "categories": [],
    "brands": [
        {
            "name": "SIDERPERU",
            "discount": 15
        },
        {
            "name": "ETERNIT",
            "discount": 25
        }
    ]
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 201 Created:

```json
{
  "message": "Las ofertas estarán activas desde el 2023-09-27 hasta el 2023-10-02"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, Se ha producido un error interno en el servidor:

```json
{
  "name": "PrismaClientKnownRequestError",
  "code": "P2025",
  "clientVersion": "5.5.2"
}
```

## Modificar oferta

| Método | Ruta                                  | Descripción                                                  |
| :----- | :------------------------------------ | :----------------------------------------------------------- |
| `PUT`  | `/api/v1/dashboard/offers/${offerId}` | Modifica la imagen o el porcentaje de descuento de los items |

**Ejemplo de Solicitud:**

```
PUT /api/v1/dashboard/offers/1

{
    "image": "https://assets.isu.pub/document-structure/230607120922-2c5c232729585842273d4d814d749bb8/v1/95016803dd58a8cab99a5d8bff5ab12e.jpeg",
    "categories": [],
    "brands": [
        {
            "name": "SIDERPERU",
            "discount": 55
        },
        {
            "name": "ETERNIT",
            "discount": 15
        }
    ]
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "updatedOferta": {
    "id": 1,
    "startDate": "2023-10-09T17:23:00.000Z",
    "endDate": "2023-10-12T00:00:00.000Z",
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1696890149/zfnjqqahrn4g1k2zhx41.webp",
    "brands": [
      {
        "id": 1,
        "offerId": 1,
        "categoryId": 1,
        "discount": 55,
        "category": {
          "id": 1,
          "name": "SIDERPERU"
        }
      },
      {
        "id": 2,
        "offerId": 1,
        "categoryId": 2,
        "discount": 15,
        "category": {
          "id": 2,
          "name": "ETERNIT"
        }
      }
    ],
    "categories": []
  },
  "message": "Oferta actualizada correctamente"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 403 Forbidden, El acceso al recurso está prohibido:

```json
{
  "message": "Algo salió mal. Por favor, inténtelo de nuevo."
}
```

## Eliminar oferta

| Método   | Ruta                                  | Descripción                     |
| :------- | :------------------------------------ | :------------------------------ |
| `DELETE` | `/api/v1/dashboard/offers/${offerId}` | Elimina una oferta de la tienda |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/dashboard/offers/1
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "message": "Oferta número 1 eliminada correctamente"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontro la oferta:

```json
{ "message": "offer not found" }
```

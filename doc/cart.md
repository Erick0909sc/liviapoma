# EndPoints

- [Carrito](#carrito)
- [Agregar producto al carrito](#agregar-producto-al-carrito)
- [Eliminar producto del carrito](#eliminar-producto-del-carrito)
- [Modificar cantidad de un producto en el carrito](#modificar-cantidad-de-un-producto-en-el-carrito)
- [Vaciar carrito](#vaciar-carrito)

## Carrito

| Método | Ruta                            | Descripción                                              |
| :----- | :------------------------------ | :------------------------------------------------------- |
| `GET`  | `/api/v1/cart?userId=${userId}` | Obtiene el carrito de compras de un usuario en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/cart?userId=cloysv7pn0000t3g4bnz1e0iz
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "id": 2,
  "userId": "cloysv7pn0000t3g4bnz1e0iz",
  "createdAt": "2023-11-18T14:51:55.682Z",
  "updatedAt": "2023-11-18T14:51:55.682Z",
  "products": [
    {
      "id": 10,
      "quantity": 1,
      "productCode": "0201004",
      "cartId": 2,
      "createdAt": "2023-12-05T15:24:32.766Z",
      "updatedAt": "2023-12-05T15:24:32.766Z",
      "product": {
        "code": "0201004",
        "name": "CLAVO P/MADERA 2\"",
        "description": "Los clavos para madera de 2\" son los soportes valientes que unen tus ideas en un todo coherente. Diseñados para atravesar y resistir, estos clavos son una declaración de que en cada unión, se encuentra la perseverancia y la determinación que refuerzan tus construcciones.",
        "price": 4.5,
        "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/22.webp",
        "rating": 0,
        "discount": 0,
        "categoryId": 5,
        "deletedAt": null,
        "brandId": null,
        "unitOfMeasureId": 1,
        "category": {
          "id": 5,
          "name": "Clavos"
        },
        "brand": null,
        "unitOfMeasure": {
          "id": 1,
          "name": "Kilo",
          "abbreviation": "kg"
        }
      }
    }
    // Otros productos
  ]
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, indicando que el usuario no tiene carrito de compras:

```json
{
  "message": "cart is empty"
}
```

## Agregar producto al carrito

| Método | Ruta           | Descripción                 |
| :----- | :------------- | :-------------------------- |
| `POST` | `/api/v1/cart` | Agrega un producto al carro |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `productCode` | `string` | Código de producto. |
| `userId` | `string` | Id del usuario. |

**Ejemplo de Solicitud:**

```
POST /api/v1/cart

{
  "productCode": "0201004",
  "userId": "cloysv7pn0000t3g4bnz1e0iz"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 201 Created:

```json
{
  "id": 10,
  "quantity": 1,
  "productCode": "0201004",
  "cartId": 2,
  "createdAt": "2023-12-05T15:24:32.766Z",
  "updatedAt": "2023-12-05T15:24:32.766Z"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": {
    "name": "PrismaClientKnownRequestError",
    "code": "P2003",
    "clientVersion": "5.5.2",
    "meta": {
      "field_name": "(not available)"
    }
  }
}
```

## Eliminar producto del carrito

| Método   | Ruta                                                       | Descripción                   |
| :------- | :--------------------------------------------------------- | :---------------------------- |
| `DELETE` | `/api/v1/cart?productCode=${productCode}&userId=${userId}` | Elimina un producto del carro |

**Parametros de la Solicitud (Request Params):**

| Parámetro     | Tipo     | Descripción         |
| :------------ | :------- | :------------------ |
| `productCode` | `string` | Código de producto. |
| `userId`      | `string` | Id del usuario.     |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/cart?productCode=0201001&userId=clly3ubde0000t3joyuwnszyb
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "id": 10,
  "quantity": 1,
  "productCode": "0201004",
  "cartId": 2,
  "createdAt": "2023-12-05T15:24:32.766Z",
  "updatedAt": "2023-12-05T15:24:32.766Z"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": "product not found in the cart"
}
```

## Modificar cantidad de un producto en el carrito

| Método  | Ruta           | Descripción                                           |
| :------ | :------------- | :---------------------------------------------------- |
| `PATCH` | `/api/v1/cart` | Edita la cantidad de items de un producto en el carro |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `productCode` | `string` | Código de producto. |
| `userId` | `string` | Id del usuario. |
| `quantity` | `number` | nueva cantidad del producto |

**Ejemplo de Solicitud:**

```
PATCH /api/v1/cart

{
  "productCode": "0201004",
  "quantity": 3,
  "userId": "cloysv7pn0000t3g4bnz1e0iz"
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "id": 11,
  "quantity": 3,
  "productCode": "0201004",
  "cartId": 2,
  "createdAt": "2023-12-05T15:46:47.724Z",
  "updatedAt": "2023-12-05T15:46:54.588Z"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, La solicitud contiene datos no válidos o no cumple con los requisitos:

```json
{
  "message": "cart not found"
}
```

## Vaciar carrito

| Método   | Ruta                                    | Descripción                                  |
| :------- | :-------------------------------------- | :------------------------------------------- |
| `DELETE` | `/api/v1/cart?deleteCartUser=${userId}` | Elimina todo el carro de compras del usuario |

**Parametros de la Solicitud (Request Params):**

| Parámetro        | Tipo     | Descripción     |
| :--------------- | :------- | :-------------- |
| `deleteCartUser` | `string` | Id del usuario. |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/cart?deleteCartUser=cloysv7pn0000t3g4bnz1e0iz

```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "deletedCart": {
    "id": 2,
    "userId": "cloysv7pn0000t3g4bnz1e0iz",
    "createdAt": "2023-11-18T14:51:55.682Z",
    "updatedAt": "2023-11-18T14:51:55.682Z"
  },
  "message": "¡Carrito de compras ha sido eliminado exitosamente!"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, La solicitud contiene datos no válidos o no cumple con los requisitos:

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

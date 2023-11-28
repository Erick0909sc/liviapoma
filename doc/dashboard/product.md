# EndPoints

- [Producto](#producto)
- [Crear producto](#crear-producto)
- [Modificar producto](#modificar-producto)
- [Eliminar producto](#eliminar-producto)
- [Desactivar producto](#desactivar-producto)
- [Activar producto](#activar-producto)

## Producto

| Método | Ruta                                 | Descripción                              |
| :----- | :----------------------------------- | :--------------------------------------- |
| `GET`  | `/api/v1/dashboard/products/${code}` | Obtiene todos los productos en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/products/0101002
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "code": "0101002",
  "name": "CEMENTO PACAS AZUL FORTIMAX 42.5 KG",
  "description": "El cemento Pacasmayo en su versión azul Fortimax te brinda la solidez que necesitas para tus proyectos. Cada bolsa es un símbolo de confianza y calidad, llevando tus construcciones al siguiente nivel. Con Fortimax, cada estructura toma vida en tonos de éxito.",
  "price": 33.7,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/02.webp",
  "rating": 3,
  "discount": 0,
  "categoryId": 1,
  "deletedAt": null,
  "brandId": 1,
  "unitOfMeasureId": 3,
  "category": {
    "id": 1,
    "name": "Cementos"
  },
  "brand": {
    "id": 1,
    "name": "PACASMAYO"
  },
  "unitOfMeasure": {
    "id": 3,
    "name": "Unidad",
    "abbreviation": "Ud"
  }
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, indicando que no se encontro el producto:

```json
{
  "message": "product not found"
}
```

## Crear producto

| Método | Ruta                         | Descripción                         |
| :----- | :--------------------------- | :---------------------------------- |
| `POST` | `/api/v1/dashboard/products` | Crea un nuevo producto en la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `code` | `string` | Codigo de producto. |
| `name` | `string` | Nombre del producto. |
| `description` | `string` | Descripción del producto. |
| `price` | `number` | Precio del producto. |
| `image` | `string` | Imagen del producto. |
| `discount` | `number` | Porcentaje de descuento del producto. |
| `categoryId` | `number` | ID de la categoria del producto. |
| `unitOfMeasureId` | `number` | ID de la unidad de medida del producto. |
| `brandId` | `number` | ID de la marca del producto. (opcional) |

**Ejemplo de Solicitud:**

```
POST /api/v1/dashboard/products

{
  "code": "0109002",
  "name": "Producto de prueba",
  "description": "Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba ",
  "price": 21.21,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
  "discount": 0,
  "categoryId": 1,
  "unitOfMeasureId": 1,
  "brandId": 1
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 201 Created:

```json
{
  "newProduct": {
    "code": "0109002",
    "name": "Producto de prueba",
    "description": "Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba Producto de prueba ",
    "price": 21.21,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    "rating": 0,
    "discount": 0,
    "categoryId": 1,
    "deletedAt": null,
    "brandId": 1,
    "unitOfMeasureId": 1
  },
  "message": "El producto se ha creado exitosamente"
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{
  "message": "Todos los campos son obligatorios."
}
```

## Modificar producto

| Método | Ruta                                 | Descripción                         |
| :----- | :----------------------------------- | :---------------------------------- |
| `POST` | `/api/v1/dashboard/products/${code}` | Crea un nuevo producto en la tienda |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `code` | `string` | Codigo de producto. |
| `name` | `string` | Nombre del producto. |
| `description` | `string` | Descripción del producto. |
| `price` | `number` | Precio del producto. |
| `image` | `string` | Imagen del producto. |
| `discount` | `number` | Porcentaje de descuento del producto. |
| `categoryId` | `number` | ID de la categoria del producto. |
| `unitOfMeasureId` | `number` | ID de la unidad de medida del producto. |
| `brandId` | `number` | ID de la marca del producto. (opcional) |

**Ejemplo de Solicitud:**

```
POST /api/v1/dashboard/products/0104002

{
  "code": "0104002",
  "name": "ALAMBRE NEGRO #16",
  "description": "El alambre negro #16 es la pieza que teje tus proyectos con precisión. Con la capacidad de unir y asegurar, este alambre es una herramienta esencial en tu caja de herramientas. Cada vuelta refleja la habilidad y la atención que pones en cada construcción.",
  "price": 4.5,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/18.webp",
  "rating": 5,
  "discount": 21,
  "categoryId": 4,
  "deletedAt": null,
  "brandId": null,
  "unitOfMeasureId": 3
}
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 Ok:

```json
{
  "code": "0104002",
  "name": "ALAMBRE NEGRO #16",
  "description": "El alambre negro #16 es la pieza que teje tus proyectos con precisión. Con la capacidad de unir y asegurar, este alambre es una herramienta esencial en tu caja de herramientas. Cada vuelta refleja la habilidad y la atención que pones en cada construcción.",
  "price": 4.5,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/18.webp",
  "rating": 5,
  "discount": 21,
  "categoryId": 4,
  "deletedAt": null,
  "brandId": null,
  "unitOfMeasureId": 3
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad request, indicando que no se encontraron productos:

```json
{
  "message": "Todos los campos son obligatorios."
}
```

## Eliminar producto

| Método   | Ruta                                 | Descripción                              |
| :------- | :----------------------------------- | :--------------------------------------- |
| `DELETE` | `/api/v1/dashboard/products/${code}` | Obtiene todos los productos en la tienda |

**Ejemplo de Solicitud:**

```
DELETE /api/v1/dashboard/products/0101002
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "code": "0102002",
  "name": "VARILLA CORRUGADA 3/8\"",
  "description": "Las varillas corrugadas de 3/8\" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.",
  "price": 21.2,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
  "rating": 0,
  "discount": 0,
  "categoryId": 2,
  "deletedAt": null,
  "brandId": 2,
  "unitOfMeasureId": 3
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, indicando que no se encontro el producto:

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

## Desactivar producto

| Método  | Ruta                                 | Descripción                        |
| :------ | :----------------------------------- | :--------------------------------- |
| `PATCH` | `/api/v1/dashboard/products/${code}` | Desactiva el producto en la tienda |

**Ejemplo de Solicitud:**

```
PATCH /api/v1/dashboard/products/0101001
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, indicando que no se encontro el producto:

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

## Activar producto

| Método  | Ruta                                              | Descripción                     |
| :------ | :------------------------------------------------ | :------------------------------ |
| `PATCH` | `/api/v1/dashboard/products/${code}?restore=true` | Activa el producto en la tienda |

**Ejemplo de Solicitud:**

```
PATCH /api/v1/dashboard/products/0101001?restore=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
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
  "unitOfMeasureId": 3
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 500 Internal Server Error, indicando que no se encontro el producto:

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

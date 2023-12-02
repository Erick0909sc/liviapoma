# EndPoints

- [Productos](#productos)
- [Productos por nombre](#productos-por-nombre)
- [Productos con descuento](#productos-con-descuento)
- [Productos por categoria](#productos-por-categoria)
- [Productos Recomendados](#productos-recomendados)
- [Detalle de producto](#detalle-de-producto)

## Productos

| Método | Ruta               | Descripción                              |
| :----- | :----------------- | :--------------------------------------- |
| `GET`  | `/api/v1/products` | Obtiene todos los productos en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/products
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0102002",
    "name": "VARILLA CORRUGADA 3/8\"",
    "description": "Las varillas corrugadas de 3/8\" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.",
    "price": 21.2,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
    "rating": 4,
    "discount": 15,
    "categoryId": 2,
    "deletedAt": null,
    "brandId": 2,
    "category": {
      "id": 2,
      "name": "Varillas"
    },
    "brand": {
      "id": 2,
      "name": "SIDERPERU"
    }
  }
  // Otros productos...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "products not found" }
```

## Productos por nombre

| Método | Ruta                           | Descripción                                                       |
| :----- | :----------------------------- | :---------------------------------------------------------------- |
| `GET`  | `/api/v1/products?name={name}` | Obtiene todos los productos en la tienda que contienen ese nombre |

**Parámetros de la Solicitud (Request params):**

| Parámetro | Tipo     | Descripción                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| `name`    | `string` | Nombre del producto a buscar, puede ser las iniciales del producto |

**Ejemplo de Solicitud:**

```
GET /api/v1/products?name=vari
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0102002",
    "name": "VARILLA CORRUGADA 3/8\"",
    "description": "Las varillas corrugadas de 3/8\" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.",
    "price": 21.2,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
    "rating": 4,
    "discount": 15,
    "categoryId": 2,
    "deletedAt": null,
    "brandId": 2,
    "category": {
      "id": 2,
      "name": "Varillas"
    },
    "brand": {
      "id": 2,
      "name": "SIDERPERU"
    }
  }
  // Otros productos...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "products not found" }
```

## Productos con descuento

| Método | Ruta                             | Descripción                                                       |
| :----- | :------------------------------- | :---------------------------------------------------------------- |
| `GET`  | `/api/v1/products?discount=true` | Obtiene todos los productos en la tienda que contienen ese nombre |

**Ejemplo de Solicitud:**

```
GET /api/v1/products?discount=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0102002",
    "name": "VARILLA CORRUGADA 3/8\"",
    "description": "Las varillas corrugadas de 3/8\" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.",
    "price": 21.2,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
    "rating": 4,
    "discount": 50,
    "categoryId": 2,
    "deletedAt": null,
    "brandId": 2,
    "category": {
      "id": 2,
      "name": "Varillas"
    },
    "brand": {
      "id": 2,
      "name": "SIDERPERU"
    }
  }
  // Otros productos...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "products not found" }
```

## Productos por categoria

| Método | Ruta                               | Descripción                                                       |
| :----- | :--------------------------------- | :---------------------------------------------------------------- |
| `GET`  | `/api/v1/products?category={name}` | Obtiene todos los productos en la tienda que contienen ese nombre |

**Parámetros de la Solicitud (Request params):**

| Parámetro | Tipo     | Descripción                     |
| :-------- | :------- | :------------------------------ |
| `name`    | `string` | Nombre de la categoria a buscar |

**Ejemplo de Solicitud:**

```
GET /api/v1/products?category=Estribos
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0103002",
    "name": "ESTRIBOS P/VIGA (15 X 20)18 X 15 (V2)",
    "description": "Los estribos para viga (15 X 20) de 18 X 15 (V2) son la conexión que une la estabilidad y la elegancia en tus creaciones. Diseñados para dar soporte y agregar un toque estético, estos estribos son una declaración de que en cada detalle, reside la integridad.",
    "price": 23,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/12.webp",
    "rating": 0,
    "discount": 0,
    "categoryId": 3,
    "deletedAt": null,
    "brandId": null,
    "category": {
      "id": 3,
      "name": "Estribos"
    },
    "brand": null
  }
  // Otros productos...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "products not found" }
```

## Detalle de producto

| Método | Ruta                      | Descripción                       |
| :----- | :------------------------ | :-------------------------------- |
| `GET`  | `/api/v1/products/{code}` | Obtiene el detalle de un producto |

**Parámetros de la Solicitud (Request params):**

| Parámetro | Tipo     | Descripción                  |
| :-------- | :------- | :--------------------------- |
| `code`    | `string` | código del producto a buscar |

**Ejemplo de Solicitud:**

```
GET /api/v1/products/0103001
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "code": "0103001",
  "name": "ESTRIBOS P/COLUMNA (13 X 25)8.5 X 21 (C5)",
  "description": "Los estribos para columna (13 X 25) de 8.5 X 21 (C5) son el detalle que marca la diferencia en tus construcciones. Diseñados para brindar una base estable y segura, estos estribos son una muestra de atención a los detalles y cuidado en cada proyecto.",
  "price": 27.5,
  "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/11.webp",
  "rating": 0,
  "discount": 47,
  "categoryId": 3,
  "deletedAt": null,
  "brandId": null,
  "category": {
    "id": 3,
    "name": "Estribos"
  },
  "brand": null
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "product not found" }
```

# EndPoints

- [Productos](#productos)
- [Productos por nombre](#productos-por-nombre)
- [Productos por categoria](#productos-por-categoria)
- [Productos Recomendados](#productos-recomendados)
- [Otro Endpoint](#otro-endpoint)
- [Otro Endpoint](#otro-endpoint)
- [Otro Endpoint](#otro-endpoint)
- [Otro Endpoint](#otro-endpoint)
- [Otro Endpoint](#otro-endpoint)
- [Otro Endpoint](#otro-endpoint)

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

Gracias por señalar la corrección necesaria.

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

## Productos por categoría

- **Obtener Todos los Productos**

```http
GET  /api/v1/products
```

| Parámetro | Tipo      | Descripción                              |
| :-------- | :-------- | :--------------------------------------- |
| `ninguno` | `ninguno` | Obtiene todos los productos en la tienda |

## Productos Recomendados

- **Obtener Todos los Productos Recomendados**

```http
GET  /api/v1/products?recommended=true
```

| Parámetro | Tipo      | Descripción                              |
| :-------- | :-------- | :--------------------------------------- |
| `ninguno` | `ninguno` | Obtiene todos los productos recomendados |

Claro, aquí tienes una versión actualizada de la documentación que explica qué se espera en el cuerpo (body) de la solicitud POST:

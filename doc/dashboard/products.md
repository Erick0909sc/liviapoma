# EndPoints

- [Productos](#productos)
- [Productos desactivados](#productos-desactivados)

## Productos

| Método | Ruta                         | Descripción                              |
| :----- | :--------------------------- | :--------------------------------------- |
| `GET`  | `/api/v1/dashboard/products` | Obtiene todos los productos en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/products
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0104002",
    "name": "ALAMBRE NEGRO #16",
    "description": "El alambre negro #16 es la pieza que teje tus proyectos con precisión. Con la capacidad de unir y asegurar, este alambre es una herramienta esencial en tu caja de herramientas. Cada vuelta refleja la habilidad y la atención que pones en cada construcción.",
    "price": 4.5,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/18.webp",
    "rating": 0,
    "discount": 0,
    "categoryId": 4,
    "deletedAt": null,
    "brandId": null,
    "unitOfMeasureId": 3,
    "category": {
      "id": 4,
      "name": "Alambres"
    },
    "brand": null,
    "unitOfMeasure": {
      "id": 3,
      "name": "Unidad",
      "abbreviation": "Ud"
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

## Productos desactivados

| Método | Ruta                                       | Descripción                                           |
| :----- | :----------------------------------------- | :---------------------------------------------------- |
| `GET`  | `/api/v1/dashboard/products?disabled=true` | Obtiene todos los productos desactivados en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/products?disabled=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "code": "0101001",
    "name": "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    "description": "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    "price": 30.4,
    "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    "rating": 5,
    "discount": 0,
    "categoryId": 1,
    "deletedAt": "2023-10-10T16:51:50.601Z",
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
  // Otros productos...
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron productos:

```json
{ "message": "products not found" }
```

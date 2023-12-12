# Endpoints

Aquí podrás encontrar endpoints con alguna información que no tiene una clasificación clara pero que es importante.

- [Datos](#datos)
- [Primera Inyección de Datos](#primera-inyección-de-datos)
- [Notificaciones](#notificaciones)
- [Categorías](#categorías)
- [Ofertas](#ofertas)

## Datos

| Método | Ruta           | Descripción                          |
| :----- | :------------- | :----------------------------------- |
| `GET`  | `/api/v1/data` | Obtiene todos los datos en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/data
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "products": 35,
  "unitOfMeasure": 7,
  "categories": 7,
  "brands": 4
}
```

## Primera inyeccion de datos

| Método | Ruta           | Descripción                                              |
| :----- | :------------- | :------------------------------------------------------- |
| `POST` | `/api/v1/data` | Crea todos los datos ubicados en `src/data` en la tienda |

**Ejemplo de Solicitud:**

```
POST /api/v1/data
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "products": {
    "count": 35
  },
  "categories": {
    "count": 7
  },
  "brands": {
    "count": 4
  },
  "unitOfMeasure": {
    "count": 7
  }
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 400 Bad Request, indicando que los productos ya existen:

```json
{
  "message": "The data already exists"
}
```

## Notificaciones

| Método | Ruta                   | Descripción                                   |
| :----- | :--------------------- | :-------------------------------------------- |
| `GET`  | `/api/pusher?count=40` | Obtiene todas las notificaciones en la tienda |

**Parámetros de Consulta:**

| Parámetro | Tipo     | Descripción                                          |
| :-------- | :------- | :--------------------------------------------------- |
| `count`   | `number` | Número de elementos por página (predeterminado: 25). |

**Ejemplo de Solicitud:**

```
GET /api/pusher?count=40
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 3,
    "message": "¡Junior Huanca ha realizado una nueva compra!",
    "time": "viernes, 17 de noviembre de 2023",
    "createdAt": "2023-11-17T17:27:30.523Z",
    "orderId": 7,
    "order": {
      "id": 7,
      "userId": "cloysv7pn0000t3g4bnz1e0iz",
      "checkoutUuid": "ba36b6e364db4b34903a50dcd6ed0b73",
      "orderTotalAmount": 50550,
      "orderStatus": "PAID",
      "productsStatus": "POR_RECOGER",
      "orderCurrency": "PEN",
      "formToken": "26ObcONvUfTTuZvRgsasVc1Q23BeyJhbW91bnQiOjUwNTUwLCJjdXJyZW5jeSI6IlBFTiIsIm1vZGUiOiJURVNUIiwidmVyc2lvbiI6NCwib3JkZXJJZCI6IjciLCJzaG9wTmFtZSI6IklaSSpEaXN0cmlidWNpb25lcyBsaXZpYXBvbWEgRUlSTCAoNTU2M...",
      "createdAt": "2023-11-17T17:26:58.057Z",
      "updatedAt": "2023-11-18T15:00:04.245Z",
      "dailyDataId": null
    }
  }
  // otras notificaciones
]
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron notificaciones:

```json
{
  "message": "notifications not found"
}
```

## Categorías

| Método | Ruta                 | Descripción                               |
| :----- | :------------------- | :---------------------------------------- |
| `GET`  | `/api/v1/categories` | Obtiene todos las categorias en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/categories
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[
  {
    "id": 1,
    "name": "Cementos"
  },
  {
    "id": 2,
    "name": "Varillas"
  },
  {
    "id": 3,
    "name": "Estribos"
  },
  {
    "id": 4,
    "name": "Alambres"
  },
  {
    "id": 5,
    "name": "Clavos"
  },
  {
    "id": 6,
    "name": "Eternits"
  },
  {
    "id": 7,
    "name": "Cumbreras"
  }
]
```

## Ofertas

| Método | Ruta             | Descripción                            |
| :----- | :--------------- | :------------------------------------- |
| `GET`  | `/api/v1/offers` | Obtiene todas las ofertas en la tienda |

**Ejemplo de Solicitud:**

```
GET /api/v1/offers
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
[{}]
```

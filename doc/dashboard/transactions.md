# EndPoints

- [Transacciones](#transacciones)

## Transacciones

| Método | Ruta                             | Descripción                                  |
| :----- | :------------------------------- | :------------------------------------------- |
| `GET`  | `/api/v1/dashboard/transactions` | Obtiene todas las transacciones en la tienda |

**Parámetros de Consulta:**

| Parámetro | Tipo      | Descripción                                                       |
| :-------- | :-------- | :---------------------------------------------------------------- |
| `page`    | `number`  | Número de página para la paginación (predeterminado: 1).          |
| `count`   | `number`  | Número de elementos por página (predeterminado: 25, máximo: 100). |
| `paid`    | `boolean` | _Opcional_ - Valor `true` traerá solo transacciones pagadas.      |

**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/transactions?page=1&count=25&paid=true
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "page": 1,
  "orders": [
    {
      "id": 5,
      "userId": "cloysv7pn0000t3g4bnz1e0iz",
      "checkoutUuid": "db2626c90eec42e6b3645dc14ee71785",
      "orderTotalAmount": 3370,
      "orderStatus": "PAID",
      "productsStatus": "PENDIENTE",
      "orderCurrency": "PEN",
      "formToken": "26HMN90i1qS8u-8iVoDiOnAA23BeyJhbW91bnQiOjMzNzAsImN1cnJlbmN5IjoiUEVOIiwibW9kZSI6IlRFU1QiLCJ2ZXJzaW9uIjo0LCJvcmRlcklkIjoiNSIsInNob3BOYW1lIj...",
      "createdAt": "2023-11-17T17:19:41.602Z",
      "updatedAt": "2023-11-17T17:20:20.743Z",
      "dailyDataId": 1
    }
    // otras transacciones
  ],
  "totalOrdersCount": 5
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron transacciones:

```json
{
  "message": "orders not found"
}
```

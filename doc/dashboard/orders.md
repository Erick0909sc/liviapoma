# EndPoints

- [Ordenes](#ordenes)

## Ordenes

| Método | Ruta                       | Descripción                            |
| :----- | :------------------------- | :------------------------------------- |
| `GET`  | `/api/v1/dashboard/offers` | Obtiene todas las ofertas en la tienda |

**Parámetros de Consulta:**

| Parámetro | Tipo     | Descripción                                                             |
| :-------- | :------- | :---------------------------------------------------------------------- |
| `page`    | `number` | Número de página para la paginación (predeterminado: 1).                |
| `count`   | `number` | Número de elementos por página (predeterminado: 25, máximo: 100).       |
| `status`  | `string` | Estado de la orden (opciones: `PENDIENTE`, `POR_RECOGER`, `ENTREGADO`). |
| `search`  | `string` | Parámetro para buscar (opciones: `userId`, `orderId`, `checkoutId`).    |


**Ejemplo de Solicitud:**

```
GET /api/v1/dashboard/orders?page=1&count=25&status=ENTREGADO
```

**Ejemplo de Respuesta Exitosa:**

Respuesta con código de estado HTTP 200 OK:

```json
{
  "page": 1,
  "orders": [
    {
      "id": 4,
      "userId": "cloysv7pn0000t3g4bnz1e0iz",
      "checkoutUuid": null,
      "orderTotalAmount": 3000,
      "orderStatus": "PROCESS",
      "productsStatus": "ENTREGADO",
      "orderCurrency": "PEN",
      "formToken": null,
      "createdAt": "2023-11-17T17:12:43.489Z",
      "updatedAt": "2023-11-17T17:12:43.489Z",
      "dailyDataId": null,
      "user": {
        "id": "cloysv7pn0000t3g4bnz1e0iz",
        "name": "Junior Huanca",
        "email": "jhuanca_21@outlook.com",
        "password": "$2a$05$BOsjyv26noqp/cmFH0HV2.vXAIFAi2WATy9i6cjNHE/71U6M5nRn2",
        "emailVerified": null,
        "image": "https://res.cloudinary.com/dsofguadj/image/upload/v1694964554/wm1hvbu4znuawf14n6rk.webp",
        "role": "Admin"
      }
    }
    //otras ordenes
  ],
  "totalOrdersCount": 3
}
```

**Ejemplo de Respuesta Fallida:**

Respuesta con código de estado HTTP 404 Not Found, indicando que no se encontraron ordenes:

```json
{
  "message": "orders not found"
}
```

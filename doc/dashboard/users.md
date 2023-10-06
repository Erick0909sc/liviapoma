# EndPoints

- [Crear nuevo usuario](#nuevo-usuario)

# Nuevo usuario

| Método | Ruta         | Descripción            |
| :----- | :----------- | :--------------------- |
| `POST` | `/api/users` | Crea un nuevo usuario. |

**Cuerpo de la Solicitud (Request Body):**

El cuerpo de la solicitud debe ser un objeto JSON que contenga los siguientes campos:
| Parámetro | Tipo | Descripción |
| :--------- | :------- | :------------------------------------ |
| `name` | `string` | Nombre del nuevo usuario. |
| `email` | `string` | Correo electrónico del nuevo usuario. |
| `password` | `string` | Contraseña del nuevo usuario. |

```json
POST /api/users
{
  "name": "Ejemplo",
  "email": "ejemplo@example.com",
  "password": "contraseña123"
}
```

Estos ejemplos muestran cómo se puede documentar una solicitud GET y una solicitud POST utilizando cuadros en formato markdown. Cada cuadro proporciona detalles sobre el método, la ruta, una breve descripción y los parámetros esperados en la solicitud. Además, se incluye un ejemplo de solicitud para ayudar a comprender cómo se debe estructurar la solicitud.

```http
GET  /api/v1/products
```

| Parámetro | Tipo      | Descripción                              |
| :-------- | :-------- | :--------------------------------------- |
| `ninguno` | `ninguno` | Obtiene todos los productos en la tienda |

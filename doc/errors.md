# Errores y Códigos de Estado

En esta sección, proporcionamos información detallada sobre los posibles errores que pueden ocurrir al interactuar con nuestra API y los códigos de estado HTTP correspondientes. Esto ayudará a los desarrolladores a comprender mejor cómo manejar situaciones de error y a garantizar una experiencia de usuario fluida en sus aplicaciones.

## Códigos de Estado HTTP

Nuestra API utiliza códigos de estado HTTP estándar para comunicar el resultado de una solicitud. A continuación, se detallan algunos de los códigos de estado más comunes que puede encontrar al interactuar con nuestra API:

- **200 OK**: La solicitud se ha completado con éxito y se devuelve una respuesta.

- **201 Created**: Se ha creado un nuevo recurso, y la respuesta incluye detalles sobre la ubicación del recurso recién creado.

- **204 No Content**: La solicitud se ha completado con éxito, pero no hay contenido que devolver en la respuesta.

- **400 Bad Request**: La solicitud contiene datos no válidos o no cumple con los requisitos.

- **401 Unauthorized**: Se requiere autenticación para acceder al recurso, pero no se proporcionaron credenciales válidas.

- **403 Forbidden**: El acceso al recurso está prohibido incluso después de la autenticación.

- **404 Not Found**: El recurso solicitado no se encontró en el servidor.

- **500 Internal Server Error**: Se ha producido un error interno en el servidor.

## Formato de Respuesta de Error

Cuando se produce un error en nuestra API, el formato de respuesta generalmente incluirá la siguiente estructura:

```json
{
  "message": "Mensaje descriptivo del error."
}
```

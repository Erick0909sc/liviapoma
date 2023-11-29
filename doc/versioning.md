# Documentación de la API de Liviapoma

Bienvenido a la documentación de la API de nuestro e-commerce. Aquí encontrarás información detallada sobre cómo utilizar nuestra API para gestionar productos, categorías, marcas y más.

## Introducción a la Versionado

Nuestra API se basa en un sistema de versionado para garantizar que las futuras actualizaciones y expansiones no afecten la funcionalidad existente. Cada versión de la API se representa en la URL de la siguiente manera:

- `http://localhost:3000/api/v1/`: En esta URL, "v1" se refiere a la versión 1 de nuestra API. Utilizamos la notación "v1" para indicar que esta es la primera versión de nuestra API pública. La inclusión de la versión en la URL nos permite mantener múltiples versiones de la API a lo largo del tiempo.

Cuando lanzamos futuras actualizaciones o mejoras en nuestra API, es posible que introduzcamos una versión "v2" o posterior. Cada versión nueva puede tener cambios en las rutas, funcionalidades o datos disponibles. Mantener el versionado nos permite garantizar la compatibilidad hacia atrás con las aplicaciones existentes que utilizan la API, al tiempo que permite a los desarrolladores adoptar nuevas versiones de la API según sus necesidades.

Por lo tanto, al acceder a la URL base de "v1", los usuarios interactuarán con la versión 1 de la API, mientras que las futuras versiones se representarán en la URL de manera similar, como "v2", "v3", etc., cuando se lancen. Esto asegura que los desarrolladores puedan elegir la versión que mejor se adapte a sus necesidades y que sus aplicaciones sigan funcionando sin problemas incluso después de las actualizaciones de la API.

## Secciones Principales

- [Errores y Códigos de Estado](errors.md)
- [Recursos Adicionales](resources.md)

## Rutas generales

- [Rutas de Productos](products.md)
- [Rutas de Categorías](categories.md)
- [Rutas de Marcas](brands.md)

## Rutas para el Dashboard (Área Administrativa)

- [Rutas de Dashboard](dashboard.md)

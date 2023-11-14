const productsData = [
  {
    code: "0101001",
    name: "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    description:
      "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    price: 30.4,
    brandId: 1,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    rating: 0,
    discount: 0,
    categoryId: 1,
    unitOfMeasureId: 3,
  },
  {
    code: "0101002",
    name: "CEMENTO PACAS AZUL FORTIMAX 42.5 KG",
    description:
      "El cemento Pacasmayo en su versión azul Fortimax te brinda la solidez que necesitas para tus proyectos. Cada bolsa es un símbolo de confianza y calidad, llevando tus construcciones al siguiente nivel. Con Fortimax, cada estructura toma vida en tonos de éxito.",
    price: 33.7,
    brandId: 1,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/02.webp",
    rating: 0,
    discount: 0,
    categoryId: 1,
    unitOfMeasureId: 3,
  },
  {
    code: "0102001",
    name: 'VARILLA CORRUGADA 1/2"',
    description:
      'La varilla corrugada de Siderperú en calibre 1/2" es un pilar de fuerza en cada construcción. Cada pieza cuenta una historia de solidez y resistencia, asegurando que tus proyectos se mantengan firmes en el tiempo. Confiabilidad en cada doblez.',
    price: 38.0,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/03.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102002",
    name: 'VARILLA CORRUGADA 3/8"',
    description:
      'Las varillas corrugadas de 3/8" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.',
    price: 21.2,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102003",
    name: 'VARILLA CORRUGADA 12"',
    description:
      'Las varillas corrugadas de 12" de Siderperú representan el equilibrio entre resistencia y flexibilidad. Perfectamente diseñadas para brindar soporte en diversas aplicaciones, estas varillas son un testimonio de la calidad que impulsa tus construcciones.',
    price: 34.0,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/05.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102004",
    name: 'VARILLA CORRUGADA 5/8"',
    description:
      'Las varillas corrugadas de 5/8" de Siderperú son un testimonio de fuerza en cada centímetro. Diseñadas para superar expectativas, estas varillas son la base en la que tus proyectos se elevan. Cada doblez refleja un compromiso con la integridad estructural.',
    price: 58.8,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/06.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102005",
    name: 'VARILLA CORRUGADA 3/4"',
    description:
      'En las varillas corrugadas de 3/4" de Siderperú, se encuentra el compromiso con la seguridad. Su diseño meticuloso asegura la resistencia necesaria para enfrentar cargas desafiantes. Cada centímetro es una prueba de que incluso en la construcción, la elegancia reside en la fuerza.',
    price: 87.0,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/07.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102006",
    name: "VARILLA CORRUGADA 8MM",
    description:
      "En cada trazo de la varilla corrugada de 8mm de Siderperú, se esconde una historia de solidez. Diseñada para encajar perfectamente en diversas aplicaciones, esta varilla es la base sobre la cual construyes confianza. En cada segmento, se encuentra la resistencia que necesitas.",
    price: 15.4,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/08.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102007",
    name: 'VARILLA CORRUGADA 1/4" (6MM)',
    description:
      'Las varillas corrugadas de 1/4" (6mm) de Siderperú son un testimonio de precisión y versatilidad. Su tamaño compacto las convierte en la elección perfecta para aplicaciones donde la fuerza y la estabilidad son esenciales. En cada doblez, se encuentra la resistencia que necesitas.',
    price: 8.6,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/09.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0102008",
    name: 'VARILLA CORRUGADA 1"',
    description:
      'La varilla corrugada de 1" de Siderperú es una columna de fortaleza en tus proyectos. Diseñada para resistir desafíos y cargas pesadas, esta varilla es un recordatorio de que la fuerza puede llevar a la grandeza. En cada pulgada, se encuentra la determinación que impulsa tus creaciones.',
    price: 152.5,
    brandId: 2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/10.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    unitOfMeasureId: 3,
  },
  {
    code: "0103001",
    name: "ESTRIBOS P/COLUMNA (13 X 25)8.5 X 21 (C5)",
    description:
      "Los estribos para columna (13 X 25) de 8.5 X 21 (C5) son el detalle que marca la diferencia en tus construcciones. Diseñados para brindar una base estable y segura, estos estribos son una muestra de atención a los detalles y cuidado en cada proyecto.",
    price: 27.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/11.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0103002",
    name: "ESTRIBOS P/VIGA (15 X 20)18 X 15 (V2)",
    description:
      "Los estribos para viga (15 X 20) de 18 X 15 (V2) son la conexión que une la estabilidad y la elegancia en tus creaciones. Diseñados para dar soporte y agregar un toque estético, estos estribos son una declaración de que en cada detalle, reside la integridad.",
    price: 23.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/12.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0103003",
    name: "ESTRIBOS P/COLUMNA (24 X 24)18 X 18 (C1)",
    description:
      "Los estribos para columna (24 X 24) de 18 X 18 (C1) son la base sobre la cual se construye la confianza. Diseñados para mantener la integridad de tus columnas, estos estribos son una muestra de compromiso con la seguridad y la durabilidad en cada proyecto.",
    price: 20.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/13.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0103004",
    name: "ESTRIBOS P/COLUMNA (13 X 20)8.5 X 26 (C2)",
    description:
      "Los estribos para columna (13 X 20) de 8.5 X 26 (C2) son el abrazo de seguridad que tus columnas necesitan. Diseñados para brindar soporte y estabilidad, estos estribos son la promesa de que incluso en los desafíos, encontrarás la fortaleza necesaria.",
    price: 20.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/14.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0103005",
    name: "ESTRIBOS P/VIGA (25 X 17)18 X 12.5 (V1)",
    description:
      "Los estribos para viga (25 X 17) de 18 X 12.5 (V1) son el toque de firmeza en cada estructura. Diseñados para proporcionar soporte y protección en cada esquina, estos estribos son una declaración de que la confianza se encuentra en la base que construyes.",
    price: 20.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/15.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0103006",
    name: "ESTRIBOS P/VIGA (25 X 25)18 X 20 (V3)",
    description:
      "Los estribos para viga (25 X 25) de 18 X 20 (V3) son la unión de fuerza y resistencia en cada esquina. Diseñados para mantener la integridad de tus vigas, estos estribos son una muestra de que incluso en la construcción, la sinfonía de la solidez y la belleza resuena.",
    price: 23.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/16.webp",
    rating: 0,
    discount: 0,
    categoryId: 3,
    unitOfMeasureId: 3,
  },
  {
    code: "0104001",
    name: "ALAMBRE NEGRO #8",
    description:
      "El alambre negro #8 es la herramienta que da forma a tus proyectos. Diseñado para unir y crear conexiones fuertes, este alambre es una extensión de tus ideas y sueños. Cada giro es una manifestación de la creatividad que fluye en tus construcciones.",
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/17.webp",
    rating: 0,
    discount: 0,
    categoryId: 4,
    unitOfMeasureId: 3,
  },
  {
    code: "0104002",
    name: "ALAMBRE NEGRO #16",
    description:
      "El alambre negro #16 es la pieza que teje tus proyectos con precisión. Con la capacidad de unir y asegurar, este alambre es una herramienta esencial en tu caja de herramientas. Cada vuelta refleja la habilidad y la atención que pones en cada construcción.",
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/18.webp",
    rating: 0,
    discount: 0,
    categoryId: 4,
    unitOfMeasureId: 3,
  },
  {
    code: "0201001",
    name: 'CLAVO P/MADERA 1"',
    description:
      'Los clavos para madera de 1" son los cimientos invisibles que sostienen tus creaciones. Diseñados para unir y asegurar, estos clavos son una muestra de la solidez y la estabilidad que aportan a cada pieza de madera. En cada golpe, se encuentra la precisión que da forma a tus ideas.',
    price: 6.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/19.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201002",
    name: 'CLAVO P/MADERA 1 1/4"',
    description:
      'Los clavos para madera de 1 1/4" son los vínculos confiables que mantienen tus proyectos en conjunto. Diseñados para atravesar y unir con firmeza, estos clavos son una manifestación de la conexión y la durabilidad que aportan a cada pieza de madera. En cada enlace, se encuentra la resistencia que perdura.',
    price: 6.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/20.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201003",
    name: 'CLAVO P/MADERA 1 1/2"',
    description:
      'Los clavos para madera de 1 1/2" son los testimonios silenciosos de tu maestría. Diseñados para sostener y asegurar con gracia, estos clavos son una demostración de que incluso en los detalles más pequeños, reside la robustez y el ingenio que aportan a cada estructura.',
    price: 6.0,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/21.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201004",
    name: 'CLAVO P/MADERA 2"',
    description:
      'Los clavos para madera de 2" son los soportes valientes que unen tus ideas en un todo coherente. Diseñados para atravesar y resistir, estos clavos son una declaración de que en cada unión, se encuentra la perseverancia y la determinación que refuerzan tus construcciones.',
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/22.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201005",
    name: 'CLAVO P/MADERA 2 1/2"',
    description:
      'Los clavos para madera de 2 1/2" son los enlaces confiables que fortalecen tus proyectos. Diseñados para unir y resistir, estos clavos son una muestra de la solidez y la estabilidad que infunden a cada pieza de madera. En cada unión, se encuentra la firmeza que impulsa tus creaciones.',
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/23.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201006",
    name: 'CLAVO P/MADERA 3"',
    description:
      'Los clavos para madera de 3" son los anclajes que mantienen tus ideas en su lugar. Diseñados para penetrar y asegurar con firmeza, estos clavos son una manifestación de la conexión y la estabilidad que aportan a cada estructura. En cada fijación, se encuentra la confianza que das forma a tus visiones.',
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/24.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201007",
    name: 'CLAVO P/MADERA 4"',
    description:
      'Los clavos para madera de 4" son los pilares invisibles que sustentan tus proyectos. Diseñados para unir y asegurar con solidez, estos clavos son una muestra de la estabilidad y la resistencia que aportan a cada pieza de madera. En cada fijación, se encuentra la fortaleza que sostiene tus creaciones.',
    price: 4.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/25.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201008",
    name: 'CLAVO P/MADERA 5"',
    description:
      'Los clavos para madera de 5" son los cimientos en los que se construyen tus proyectos. Diseñados para unir y asegurar con firmeza, estos clavos son una manifestación de la solidez y la durabilidad que aportan a cada estructura. En cada sujeción, se encuentra la base sobre la que crecen tus creaciones.',
    price: 7.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/26.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201009",
    name: 'CLAVO P/MADERA 6"',
    description:
      'Los clavos para madera de 6" son los soportes robustos en los que confías. Diseñados para unir y asegurar con firmeza, estos clavos son una muestra de la solidez y la resistencia que aportan a cada pieza de madera. En cada sujeción, se encuentra la confianza que respalda tus construcciones.',
    price: 7.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/27.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201010",
    name: 'CLAVO P/MADERA 7"',
    description:
      'Los clavos para madera de 7" son los anclajes que construyen la confianza en tus proyectos. Diseñados para unir y asegurar con solidez, estos clavos son una manifestación de la robustez y la estabilidad que añaden a cada pieza de madera. En cada sujeción, se encuentra la seguridad que respalda tus creaciones.',
    price: 7.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/28.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0201011",
    name: 'CLAVO CALAMINA 2 1/2"',
    description:
      'Los clavos para calamina de 2 1/2" son los vínculos que aseguran tus proyectos en su lugar. Diseñados para penetrar y unir con firmeza, estos clavos son una muestra de la solidez y la resistencia que aportan a cada construcción. En cada unión, se encuentra la tenacidad que sostiene tus creaciones.',
    price: 7.5,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/29.webp",
    rating: 0,
    discount: 0,
    categoryId: 5,
    unitOfMeasureId: 1,
  },
  {
    code: "0301001",
    name: 'ETERNIT GRAN ONDA 10"',
    description:
      'El eternit de gran onda de 10" es la protección que resguarda tus proyectos de las inclemencias. Diseñado para resistir y durar, este material es una manifestación de la confiabilidad y la resistencia que añade a cada techo. En cada lámina, se encuentra la solidez que defiende tus espacios.',
    price: 75.5,
    brandId: 3,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/30.webp",
    rating: 0,
    discount: 0,
    categoryId: 6,
    unitOfMeasureId: 3,
  },
  {
    code: "0301002",
    name: 'ETERNIT PERFIL 4"',
    description:
      'El eternit de perfil 4" es el escudo que protege tus construcciones. Diseñado para resguardar y perdurar, este material es una muestra de la confiabilidad y la durabilidad que aporta a cada proyecto. En cada pieza, se encuentra la resistencia que sostiene tus creaciones.',
    price: 57.5,
    brandId: 3,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/31.webp",
    rating: 0,
    discount: 0,
    categoryId: 6,
    unitOfMeasureId: 3,
  },
  {
    code: "0301003",
    name: 'TRASLUCIDA GRAN ONDA 10"',
    description:
      'La traslúcida de gran onda de 10" es la elegancia que ilumina tus espacios. Diseñada para filtrar la luz y embellecer, este material es una manifestación de la sofisticación y el estilo que añade a cada techo. En cada lámina, se encuentra la luminosidad que realza tus ambientes.',
    price: 90.0,
    brandId: 4,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/32.webp",
    rating: 0,
    discount: 0,
    categoryId: 6,
    unitOfMeasureId: 3,
  },
  {
    code: "0301004",
    name: "TRASLUCIDA TIPO CALAMINA",
    description:
      "La traslúcida tipo calamina es la unión perfecta entre función y estética. Diseñada para proporcionar luz y protección, este material es una muestra de la versatilidad y la elegancia que aporta a cada techo. En cada lámina, se encuentra la armonía que equilibra tus espacios.",
    price: 58.0,
    brandId: 4,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/33.webp",
    rating: 0,
    discount: 0,
    categoryId: 6,
    unitOfMeasureId: 3,
  },
  {
    code: "0301006",
    name: "CUMBRERA INFERIOR GRAN ONDA",
    description:
      "La cumbrera inferior de gran onda es el toque final que completa tus techos. Diseñada para sellar y proteger, esta pieza es una manifestación de la atención al detalle y la funcionalidad que agrega a cada estructura. En cada cumbrera, se encuentra la seguridad que resguarda tus espacios.",
    price: 20.0,
    brandId: 3,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/34.webp",
    rating: 0,
    discount: 0,
    categoryId: 7,
    unitOfMeasureId: 3,
  },
  {
    code: "0301007",
    name: "CUMBRERA SUPERIOR GRAN ONDA",
    description:
      "La cumbrera superior de gran onda es la coronación que agrega distinción a tus techos. Diseñada para rematar y realzar, esta pieza es una muestra de la elegancia y el detalle que complementa cada estructura. En cada cumbrera, se encuentra la belleza que adorna tus espacios.",
    price: 20.0,
    brandId: 3,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/35.webp",
    rating: 0,
    discount: 0,
    categoryId: 7,
    unitOfMeasureId: 3,
  },
];

export const dataTest = [
  {
    code: "0101001",
    name: "CEMENTO PACAS ROJO EXTRAFORTE 42.5 KG",
    description:
      "Descubre la fuerza y durabilidad del cemento Pacasmayo en su variante roja. Diseñado para brindar una base sólida en cada construcción, este cemento representa pasión y excelencia. Tu proyecto encontrará su cimiento en la confiabilidad de Pacasmayo.",
    price: 30.4,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/01.webp",
    rating: 0,
    discount: 0,
    categoryId: 1,
    deletedAt: null,
    brandId: 1,
    unitOfMeasureId: 3,
    category: {
      id: 1,
      name: "Cementos",
    },
    brand: {
      id: 1,
      name: "PACASMAYO",
    },
    unitOfMeasure: {
      id: 3,
      name: "Unidad",
      abbreviation: "Ud",
    },
  },
  {
    code: "0101002",
    name: "CEMENTO PACAS AZUL FORTIMAX 42.5 KG",
    description:
      "El cemento Pacasmayo en su versión azul Fortimax te brinda la solidez que necesitas para tus proyectos. Cada bolsa es un símbolo de confianza y calidad, llevando tus construcciones al siguiente nivel. Con Fortimax, cada estructura toma vida en tonos de éxito.",
    price: 33.7,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/02.webp",
    rating: 0,
    discount: 0,
    categoryId: 1,
    deletedAt: null,
    brandId: 1,
    unitOfMeasureId: 3,
    category: {
      id: 1,
      name: "Cementos",
    },
    brand: {
      id: 1,
      name: "PACASMAYO",
    },
    unitOfMeasure: {
      id: 3,
      name: "Unidad",
      abbreviation: "Ud",
    },
  },
  {
    code: "0102001",
    name: 'VARILLA CORRUGADA 1/2"',
    description:
      'La varilla corrugada de Siderperú en calibre 1/2" es un pilar de fuerza en cada construcción. Cada pieza cuenta una historia de solidez y resistencia, asegurando que tus proyectos se mantengan firmes en el tiempo. Confiabilidad en cada doblez.',
    price: 38,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/03.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    deletedAt: null,
    brandId: 2,
    unitOfMeasureId: 3,
    category: {
      id: 2,
      name: "Varillas",
    },
    brand: {
      id: 2,
      name: "SIDERPERU",
    },
    unitOfMeasure: {
      id: 3,
      name: "Unidad",
      abbreviation: "Ud",
    },
  },
  {
    code: "0102002",
    name: 'VARILLA CORRUGADA 3/8"',
    description:
      'Las varillas corrugadas de 3/8" de Siderperú son el reflejo de estabilidad en cada proyecto. Su diseño meticuloso garantiza una unión firme con el concreto, proporcionando el soporte necesario para tus creaciones. En cada curva, se esconde la solidez.',
    price: 21.2,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/04.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    deletedAt: null,
    brandId: 2,
    unitOfMeasureId: 3,
    category: {
      id: 2,
      name: "Varillas",
    },
    brand: {
      id: 2,
      name: "SIDERPERU",
    },
    unitOfMeasure: {
      id: 3,
      name: "Unidad",
      abbreviation: "Ud",
    },
  },
  {
    code: "0102003",
    name: 'VARILLA CORRUGADA 12"',
    description:
      'Las varillas corrugadas de 12" de Siderperú representan el equilibrio entre resistencia y flexibilidad. Perfectamente diseñadas para brindar soporte en diversas aplicaciones, estas varillas son un testimonio de la calidad que impulsa tus construcciones.',
    price: 34,
    image:
      "https://res.cloudinary.com/dsofguadj/image/upload/v1692652693/05.webp",
    rating: 0,
    discount: 0,
    categoryId: 2,
    deletedAt: null,
    brandId: 2,
    unitOfMeasureId: 3,
    category: {
      id: 2,
      name: "Varillas",
    },
    brand: {
      id: 2,
      name: "SIDERPERU",
    },
    unitOfMeasure: {
      id: 3,
      name: "Unidad",
      abbreviation: "Ud",
    },
  },
];

export default productsData;

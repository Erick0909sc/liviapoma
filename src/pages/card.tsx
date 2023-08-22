import React from "react";
import Card from "@/components/card";

type Props = {};

const Cards: React.FC = () => {
  const products = [
    {
      name: "Martillo de Garra",
      description:
        "Martillo de garra resistente para trabajos de carpintería y construcción.dadasdasdasdadasdasdasdasdkñlasmdsnmaskdmasldaslkdas",
      price: 15.99,
      brand: "HerramientaMax",
    },
    {
      name: "Destornillador Kit",
      description:
        "Juego de destornilladores con diversas puntas para todo tipo de tareas.",
      price: 24.95,
      brand: "ProTool",
    },
    {
      name: "Sierra Circular",
      description:
        "Sierra circular potente para cortes precisos en madera y materiales similares.",
      price: 89.99,
      brand: "CutMaster",
    },
    {
      name: "Cinta Métrica",
      description:
        "Cinta métrica de 5 metros con marcas claras para mediciones precisas.",
      price: 9.49,
      brand: "MeasurePro",
    },
    {
      name: "Pistola de Calor",
      description:
        "Pistola de calor para trabajos de secado, remoción de pintura y moldeado.",
      price: 32.75,
      brand: "HeatMaster",
    },
  ];
  return (
    <div className="flex flex-col justify-center">
      {products.map((product, index) => (
        <Card
          key={index}
          title={product.name}
          description={product.description}
          price={product.price}
          brand={product.brand}
        />
      ))}
    </div>
  );
};

export default Cards;

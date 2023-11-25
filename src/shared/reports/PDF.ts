import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { IOrderDataDashboard, CategoryData, Datum, Item } from "../types";
import { formatPrice } from "../ultis";
import { Content } from "pdfmake/interfaces";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generateReportsPDF = (data: IOrderDataDashboard) => {
  const content = [];

  // Título del informe
  content.push({ text: "Informe de Ventas - Liviapoma", style: "header" });

  // Resumen general
  content.push({ text: "Resumen General", style: "subheader" });
  content.push(
    `Ingresos Totales: ${formatPrice(parseFloat(data.summary.totalRevenue))}`
  );
  content.push(
    `Variación porcentual en las ventas: ${data.summary.percentageChange}%`
  );
  content.push(
    `Número de Transacciones Mensuales: ${data.summary.numberOfTransactions}`
  );
  content.push(`Total de Clientes: ${data.summary.numberOfUsers}`);

  // Datos diarios, mensuales y anuales
  content.push({ text: "Datos de Ventas Diarias", style: "subheader" });
  content.push(generateTable(data.dayData));

  content.push({ text: "Datos de Ventas Mensuales", style: "subheader" });
  content.push(generateTable(data.monthData));

  content.push({ text: "Datos de Ventas Anuales", style: "subheader" });
  content.push(generateTable(data.yearData));

  // Datos por categoría
  content.push({
    text: "Análisis de las Cinco Categorías Más Relevantes",
    style: "subheader",
  });
  content.push({
    ol: [
      generateCategorySection(data.category1),
      // Verificar si data.category2 existe antes de agregarlo
      data.category2 ? generateCategorySection(data.category2) : null,
      // Verificar si data.category3 existe antes de agregarlo
      data.category3 ? generateCategorySection(data.category3) : null,
      // Verificar si data.category4 existe antes de agregarlo
      data.category4 ? generateCategorySection(data.category4) : null,
      // Verificar si data.category5 existe antes de agregarlo
      data.category5 ? generateCategorySection(data.category5) : null,
    ].filter((section) => section !== null) as Content[], // Filtrar para quitar las categorías nulas
  });

  pdfMake
    .createPdf({
      content: content,
      info: {
        title: "Informe de Ventas - Liviapoma",
        author: "Liviapoma",
        subject: "Informe de Ventas de Liviapoma",
      },
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: "center",
          color: "#000",
          margin: [0, 0, 0, 20], // Aumenté el margen inferior para separar más del contenido
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 15, 0, 5], // Ajusté el margen superior e inferior para dar más espacio
        },
        subsubheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 3], // Ajusté el margen superior e inferior
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: "#000",
          fillColor: "#ecf0f1",
        },
      },
      defaultStyle: {
        fontSize: 12,
        color: "#000",
        margin: [10, 10, 10, 10],
      },
    })
    .print();
};

// Función para generar sección de categoría
const generateCategorySection = (categoryData: CategoryData) => {
  const section = [];

  section.push({
    text: `Categoría: ${categoryData.name}`,
    style: "subsubheader",
  });
  section.push(generateCategoryTable(categoryData.data));
  section.push({
    text: `Ingresos Totales: ${formatPrice(categoryData.sumValue as number)}`,
    style: "subsubheader",
  });

  return section;
};

// Función para generar tabla de categoría
const generateCategoryTable = (data: Item[]) => {
  return {
    table: {
      headerRows: 1,
      widths: ["*", "*"],
      body: [
        [
          { text: "Fecha", style: "tableHeader", alignment: "center" },
          {
            text: "Ingreso de Ventas",
            style: "tableHeader",
            alignment: "center",
          },
        ],
        ...data.map((item) => [
          formatDate(item.time as { day: number; year: number; month: number }),
          formatPrice(item.value),
        ]),
      ],
    },
    layout: {
      fillColor: function (i: number) {
        return i % 2 === 0 ? "#f2f2f2" : null;
      },
    },
  };
};

const generateTable = (data: Datum[]) => {
  return {
    table: {
      headerRows: 1,
      widths: ["*", "*"],
      body: [
        [
          { text: "Fecha", style: "tableHeader", alignment: "center" },
          {
            text: "Ingreso de Ventas",
            style: "tableHeader",
            alignment: "center",
          },
        ],
        ...data.map((item) => {
          return [item.time, formatPrice(item.value)];
        }),
      ],
    },
    layout: {
      fillColor: function (i: number) {
        return i % 2 === 0 ? "#f2f2f2" : null;
      },
    },
  };
};

const formatDate = (time: { day: number; year: number; month: number }) => {
  const { day, year, month } = time;
  return `${day}/${month}/${year}`;
};

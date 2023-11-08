import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { Order } from "./types";
import { formatFechaISO } from "./ultis";
import { codeStatusOrderTranslation } from "./translate";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDF = (data: Order) => {
  const content = [];

  // Título y subtítulo
  content.push({ text: "Liviapoma - Orden", style: "header" });
  content.push({ text: `Orden Número: ${data.id}`, style: "subheader" });

  // Información del usuario
  content.push({ text: "Datos del Usuario", style: "subheader" });
  content.push(`ID: ${data.user.id}`);
  content.push(`Nombre: ${data.user.name}`);
  content.push(`Email: ${data.user.email}`);

  // Detalles de la orden
  content.push({ text: "Detalles de la Orden", style: "subheader" });
  content.push(`ID del pago: ${data.checkoutUuid}`);
  content.push(`Total: (${data.orderTotalAmount / 100}) ${data.orderCurrency}`);
  content.push(`Estado: ${codeStatusOrderTranslation[data.orderStatus]}`);
  content.push(`Creada el: ${formatFechaISO(data.createdAt)}`);
  content.push(`Actualizada el: ${formatFechaISO(data.updatedAt)}`);

  // Productos en la orden
  content.push({ text: "Productos en la Orden", style: "subheader" });

  const productTable = {
    table: {
      headerRows: 1,
      widths: [100, "*", 80, 80],
      body: [
        ["Código de Producto", "Nombre", "Cantidad", "Precio"],
        ...data.products.map((product) => [
          product.productCode,
          product.product.name,
          `${product.quantity} ${product.product.unitOfMeasure.name}`,
          `${product.product.price} ${data.orderCurrency}`,
        ]),
      ],
    },
    layout: {
      fillColor: function (i: number) {
        return i % 2 === 0 ? "#c2c2c2" : null;
      },
    },
  };
  content.push(productTable);

  pdfMake
    .createPdf({
      content: content,
      info: {
        title: `Liviapoma Orden N° ${data.id}`, // Título del documento
        author: "Liviapoma",
        subject: "Liviapoma - Orden de Compra",
      },
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: "center",
          color: "#010101",
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: "black",
          fillColor: "#fff",
        },
      },
      defaultStyle: {
        fontSize: 12,
        margin: [10, 10, 10, 10], // Márgenes personalizados (izquierda, arriba, derecha, abajo)
      },
    })
    .print();
};

import prisma from "@/lib/prismadb";
import { peruDateTimeFormat } from "@/shared/ultis";
type Category = {
  name: string;
  discount: number;
};
type Brand = {
  name: string;
  discount: number;
};
export const offerValidation = async ({
  categories = [],
  brands = [],
  startDate,
  endDate,
}: {
  categories: Category[];
  brands: Brand[];
  startDate: string;
  endDate: string;
}) => {
  try {
    // BLOQUE DE PRUEBAS
    // if (brands.length === 1 && categories.length === 1) {
    //   const findBrandCategory = await prisma.product.findMany({
    //     where: {
    //       brand: {
    //         name: brands[0].name,
    //       },
    //       category: {
    //         name: categories[0].name,
    //       },
    //       NOT: {
    //         discount: 0,
    //       },
    //     },
    //   });
    //   if (findBrandCategory.length) {
    //     return {
    //       success: false,
    //       error: `La marca ${brands[0].name} ya tiene un descuento aplicado en la categoria ${categories[0].name}`,
    //     };
    //   }
    // }
    // BLOQUE DE PRUEBAS

    for (const brand of brands) {
      const prodcutsWithDiscount = await prisma.product.findMany({
        where: {
          brand: {
            name: brand.name,
          },
          NOT: {
            discount: 0,
          },
        },
      });
      if (prodcutsWithDiscount.length > 0) {
        const firstDiscount = prodcutsWithDiscount[0].discount;
        const allHaveSameDiscount = prodcutsWithDiscount.every(
          (product) => product.discount === firstDiscount
        );

        if (allHaveSameDiscount) {
          return {
            success: false,
            error: `La marca ${brand.name} ya tiene un descuento del ${firstDiscount}% aplicado en todos sus productos.`,
          };
        }
      }
    }
    for (const category of categories) {
      const prodcutsWithDiscount = await prisma.product.findMany({
        where: {
          category: {
            name: category.name,
          },
          NOT: {
            discount: 0,
          },
        },
      });
      if (prodcutsWithDiscount.length > 0) {
        const firstDiscount = prodcutsWithDiscount[0].discount;
        const allHaveSameDiscount = prodcutsWithDiscount.every(
          (product) => product.discount === firstDiscount
        );

        if (allHaveSameDiscount) {
          return {
            success: false,
            error: `La categoría ${category.name} ya tiene un descuento del ${firstDiscount}% aplicado en todos sus productos.`,
          };
        }
      }
    }
    return {
      success: true,
      message: `Las ofertas estaran activas desde las ${peruDateTimeFormat(
        startDate,
        "H:mm"
      )} el ${peruDateTimeFormat(
        startDate,
        "D [de] MMMM [de] YYYY"
      )} hasta las ${peruDateTimeFormat(
        endDate,
        "H:mm"
      )} del ${peruDateTimeFormat(endDate, "D [de] MMMM [de] YYYY")}`,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const offerProductsByCategory = async ({
  startDate,
  endDate,
  image,
  categories,
}: {
  categories: Category[];
  startDate: string;
  endDate: string;
  image: string;
}) => {
  try {
    const offer = await prisma.offer.create({
      data: {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        image,
      },
    });

    for (const category of categories) {
      const findCategory = await prisma.category.findFirst({
        where: { name: category.name },
      });
      await prisma.categoryDiscount.create({
        data: {
          offerId: offer.id,
          categoryId: findCategory?.id as number,
          discount: category.discount,
        },
      });
    }

    // Productos relacionados con las categorías en la oferta
    for (const category of categories) {
      await prisma.product.updateMany({
        where: {
          category: {
            name: category.name,
          },
          discount: 0,
        },
        data: {
          discount: category.discount,
        },
      });
    }
    return {
      success: true,
      data: offer,
      message: "descuentos listos",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

export const desactivateOfferProductsByCategory = async ({
  categories,
}: {
  categories: Category[];
}) => {
  try {
    for (const category of categories) {
      await prisma.product.updateMany({
        where: {
          category: {
            name: category.name,
          },
          NOT: {
            discount: 0,
          },
        },
        data: {
          discount: 0,
        },
      });
    }
    return {
      success: true,
      message: "descuentos desactivados",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

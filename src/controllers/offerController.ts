import prisma from "@/lib/prismadb";
type Category = {
  name: string;
  discount: number;
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
      // const findCategoryDiscount = await prisma.categoryDiscount.findFirst({
      //   where: {
      //     categoryId: findCategory?.id,
      //   },
      // });
      // if (findCategoryDiscount) {
      //   // La categoría ya tiene un descuento aplicado, manejar el error aquí
      //   return {
      //     success: false,
      //     error: `La categoría ${category.name} ya tiene un descuento aplicado.`,
      //   };
      // }
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

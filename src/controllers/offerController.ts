import prisma from "@/lib/prismadb";
import {
  formatDate,
  formatDateOfInputDate,
  formatFechaISO,
} from "@/shared/ultis";
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
    const now = formatDate(new Date());
    const [existingCategories, existingBrands, existingOffers] =
      await Promise.all([
        prisma.category.findMany({
          where: {
            name: {
              in: categories.map((category) => category.name),
            },
          },
        }),
        prisma.brand.findMany({
          where: {
            name: {
              in: brands.map((brand) => brand.name),
            },
          },
        }),
        prisma.offer.findMany({
          where: {
            startDate: {
              lte: now,
            },
            endDate: {
              gte: now,
            },
          },
          include: {
            categories: true,
            brands: true,
          },
        }),
      ]);

    const categoryMap = new Map(
      existingCategories.map((category) => [category.name, category])
    );
    const brandMap = new Map(
      existingBrands.map((brand) => [brand.name, brand])
    );
    const discountCategoriesMap = new Map(
      existingOffers.flatMap((offer) =>
        offer.categories.map((cat) => [cat.categoryId, cat.discount])
      )
    );
    const discountBrandsMap = new Map(
      existingOffers.flatMap((offer) =>
        offer.brands.map((brand) => [brand.brandId, brand.discount])
      )
    );

    for (const category of categories) {
      const findCategory = categoryMap.get(category.name);
      if (findCategory) {
        const discount = discountCategoriesMap.get(findCategory.id);
        if (discount !== undefined) {
          return {
            success: false,
            error: `La categoria ${category.name} ya tiene un descuento aplicado de ${discount}%`,
          };
        }
      }
    }
    for (const brand of brands) {
      const findBrand = brandMap.get(brand.name);
      if (findBrand) {
        const discount = discountBrandsMap.get(findBrand.id);
        if (discount !== undefined) {
          return {
            success: false,
            error: `La marca ${brand.name} ya tiene un descuento aplicado de ${discount}%`,
          };
        }
      }
    }

    return {
      success: true,
      message: `Las ofertas estarán activas desde el ${formatFechaISO(
        new Date(startDate)
      )} hasta el ${formatFechaISO(new Date(endDate))}`,
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
        startDate: formatDateOfInputDate(new Date(startDate)),
        endDate: formatDateOfInputDate(new Date(endDate)),
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

export const offerProductsByBrand = async ({
  startDate,
  endDate,
  image,
  brands,
}: {
  brands: Category[];
  startDate: string;
  endDate: string;
  image: string;
}) => {
  try {
    const offer = await prisma.offer.create({
      data: {
        startDate: formatDateOfInputDate(new Date(startDate)),
        endDate: formatDateOfInputDate(new Date(endDate)),
        image,
      },
    });

    for (const brand of brands) {
      const findBrand = await prisma.brand.findFirst({
        where: { name: brand.name },
      });
      await prisma.brandDiscount.create({
        data: {
          offerId: offer.id,
          brandId: findBrand?.id as number,
          discount: brand.discount,
        },
      });
      await prisma.product.updateMany({
        where: {
          brand: {
            name: brand.name,
          },
          discount: 0,
        },
        data: {
          discount: brand.discount,
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

export const desactivateOfferProductsByBrand = async ({
  brands,
}: {
  brands: Brand[];
}) => {
  try {
    for (const brand of brands) {
      await prisma.product.updateMany({
        where: {
          brand: {
            name: brand.name,
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

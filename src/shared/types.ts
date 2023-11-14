import { Prisma } from "@prisma/client";

export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
}



export interface productsorders {
  id: number;
  quantity:number;
  product: {
    code: string;
    name: string;
    description: string;
    price: number;
    image: string
    discount: number;
    categoryId: number;
    // deletedAt: ;
    // brandId: ;
    unitOfMeasureId: number

  }
}

export interface IOrders {
  id: number;
  userId: string;
  checkoutUuid: null,
  orderTotalAmount: number,
  orderStatus: string,
  productsStatus: string,
  orderCurrency: string,
  formToken: null,
  createdAt: string,
  updatedAt: string,
  productCode: null,
  products: productsorders[]
}


export interface IEditUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
}

export interface IOneUser {
  id: string;
  name: string;
  email: string;
  password: string;
  emailVerified: string;
  image: string;
  role: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  role: string;
}

export interface IProduct {
  code: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  discount: number;
  categoryId: number;
  brandId: number;
  unitOfMeasureId: number;
  category: Category;
  brand: Brand;
  unitOfMeasure: UnitOfMeasure;
  reviews: IReview[];
}

export interface UnitOfMeasure {
  id: number;
  name: string;
  abbreviation: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Brand {
  id: number;
  name: string;
}

export interface ICategory {
  name: string;
}

export interface ICart {
  id: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  products: IProductCart[];
}

export interface IProductCart {
  id: number;
  quantity: number;
  productCode: string;
  cartId: number;
  product: IProduct;
}

export interface IOffer {
  id: number;
  startDate: Date;
  endDate: Date;
  image: string;
}

export interface IOfferDashboard extends IOffer {
  brands: IBrandOffer[];
  categories: ICategoryOffer[];
}

export interface IBrandOffer {
  id: number;
  offerId: number;
  brandId: number;
  discount: number;
  brand: Brand;
}

export interface ICategoryOffer {
  id: number;
  offerId: number;
  categoryId: number;
  discount: number;
  category: Category;
}

// export interface ICategory{
//   id: number;
//   name: string;
// }

export interface IOrders {
  page: number;
  orders: Order[];
  totalOrdersCount: number;
}

export interface Order {
  id: number;
  userId: string;
  checkoutUuid: string;
  orderTotalAmount: number;
  orderStatus: string;
  orderCurrency: string;
  formToken: string;
  createdAt: string;
  productsStatus: string;
  updatedAt: string;
  user: IOneUser;
  products: IProductCart[];
}

export interface paymentConf {
  amount: number;
  currency: string;
  customer: {
    email: string;
    shoppingCart: {
      cartItemInfo: {
        productLabel: string;
        productQty: number;
        productAmount: string;
        productRef: string;
      }[];
    };
    billingDetails: {
      firstName: string;
    };
    reference: string;
  };
  orderId: number;
}

export interface IOrderDetail {
  user: {
    name: string;
    email: string;
  };
  shoppingCart: ShoppingCart[];
  amount: number;
}

export interface ShoppingCart {
  productLabel: string;
  productType: null;
  productRef: string;
  productQty: number;
  productAmount: string;
  productVat: null;
  _type: string;
}

export interface IOrderDataDashboard {
  dayData: DayDatum[];
  monthData: Datum[];
  yearData: Datum[];
  category1: CategoryData;
  category2: CategoryData;
  category3: CategoryData;
  category4: CategoryData;
  category5: CategoryData;
  summary: {
    totalRevenue: string;
    percentageChange: string;
    numberOfTransactions: number;
    numberOfUsers: number;
  };
}

export interface DayDatum extends Datum {
  id: number;
}

export interface Datum {
  time: string;
  value: number;
}

interface Item {
  id: number;
  time: Prisma.JsonValue;
  value: number;
  categoryId: number;
  category: Category;
}

export interface CategoryData {
  name: string;
  data: Item[];
  sumValue?: number;
}

export interface IReview {
  id: number;
  productCode: string;
  userId: string;
  description: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  user: IUser;
}

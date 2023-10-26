export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
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
  // image:string,
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
  // createdAt: Date;
  updatedAt: string;
  // updatedAt: Date;
}

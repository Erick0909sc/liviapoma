export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
}

export interface Iuser {
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
  category: Category;
  brandId: number;
  brand: Brand;
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

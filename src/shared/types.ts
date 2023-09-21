export enum EStateGeneric {
  IDLE = "idle",
  SUCCEEDED = "succeeded",
  PENDING = "pending",
  FAILED = "failed",
}

export interface IProduct {
  code: string;
  name: string;
  description: string;
  price: number;
  marca: string;
  image: string;
  rating: number;
  discount: number;
  categoryId: number;
  category: Category;
  id: number;
  title:string

}

export interface Phidden{
  code: string;
  name: string;
  description: string;
  price: number;
  marca: string;
  category: Category;
  discount: number;
  image: string;
}



export interface Category {
  id: number;
  name: string;
}

export interface ICategory {
  name: string;
}


export interface ICart {
  id:        number;
  userId:    string;
  createdAt: Date;
  updatedAt: Date;
  products:  IProductCart[];
}

export interface IProductCart {
  id:          number;
  quantity:    number;
  productCode: string;
  cartId:      number;
  product:     IProduct;
}



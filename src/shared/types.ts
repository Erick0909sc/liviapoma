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
}

export interface ICategory{
  name: string;
}



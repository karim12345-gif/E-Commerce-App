import { ResponseModel } from "../models";

export type Price = {
  amount: number;
  currency: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: Price;
  images: string[];
  categories: string[];
  slug?:string;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type LineItem = {
  id: string;
  referenceId: string;
  type: 'PRODUCT' | 'DISCOUNT' | 'DELIVERY';
  price: Price;
  quantity?: number;
};

export type Cart = {
  tax: number;
  items: LineItem[];
  subtotal: Price;
  total: Price;
};

export type Checkout = {
  user: User;
  products: CheckoutItem[];
};

export type CheckoutItem = {
  id: string;
  quantity?: number;
};

export type User = {
  id: string;
  name: string;
};

export type Order = {
  id: string;
  user: User;
  cart: Cart;
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
  timestamp?: Date;
  total:number
};

export type CheckoutDto = {
  user: User;
  products: CheckoutItem[];
  cart?: Cart;
};

export interface ErrorResponse {
  response?: {
    data: ResponseModel<unknown> | unknown;
    status: number;
  };
  message?: string;
  error?: string;
}



export type ButtonIconLeftProps = {
  onClick: () => void;
  variant?: 'ghost' | 'default' | 'outline';
  className?: string;
};
 

export type BackButtonProps = {
  path?: string;
  variant?: 'ghost' | 'default' | 'outline';
  className?: string;
};
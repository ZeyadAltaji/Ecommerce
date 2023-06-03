import { Cart } from "../Classes/Cart";

export interface ICartItem   {
  id:number;

  subProductsId: number;
   quantity: number;
  price: number;
  cartId: number;
  }

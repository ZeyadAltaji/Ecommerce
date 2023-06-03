import { ICartItem } from "../Models/ICartItem";
import { Cart } from "./Cart";

export class CartItem implements ICartItem {
  id!:number;
  subProductsId!: number;
  quantity!: number;
  price!: number;
  cartId!: number;

}

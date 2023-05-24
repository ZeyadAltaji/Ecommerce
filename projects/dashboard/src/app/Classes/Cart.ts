import { ICart } from "../Models/ICart";
import { CartItem } from "./CartItem";

export class Cart   implements ICart{
  id?:number;
  Customer_Id!: number;
  Items!: CartItem[];


}

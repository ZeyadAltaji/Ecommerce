 import { CartItem } from "../Classes/CartItem";

export interface ICart {
  id?: number;
  // customerId: number;
  // ItemCart_Id:number;
  Customer_Id: number;
  Items: CartItem[];
  }

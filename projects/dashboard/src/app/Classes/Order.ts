import { IOrder } from "../Models/IOrder";

export class Order implements IOrder {
   customerId!: number;
  fullName!: string;
  email!: string;
  mobile!: string;
  totalPrice!: number;
  shippingAddress!: string;
  orderStatus!: string;
  cartId!: number;

}

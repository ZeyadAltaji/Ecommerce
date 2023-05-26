export interface IOrder {
  id:number;
   customerId: number;
  fullName: string;
  email: string;
  mobile: string;
  totalPrice: number;
  shippingAddress: string;
  orderStatus: string;
  cartId: number;

}

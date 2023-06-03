export interface IOrder {
  id:number;
  customer_Id: number;
  fullName: string;
  email: string;
  mobile: string;
  totalPrice: number;
  shippingAddress: string;
  orderStatus: string;
  cartId: number;

}

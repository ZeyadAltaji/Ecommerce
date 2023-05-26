 import { Environment } from '../Environments/Environments';
import { ICartItem } from '../Models/ICartItem';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../Classes/CartItem';
import { Observable } from 'rxjs';
import { Cart } from '../Classes/Cart';
import { Order } from '../Classes/Order';
import { IOrder } from '../Models/IOrder';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  baseUrl =Environment.baseUrl;
  listProducts:ICartItem[]=[];
  ListOrder:IOrder[]=[];
  constructor( private http: HttpClient) { }
    addProperty(cartItems: CartItem[]) {
      return this.http.post(`${this.baseUrl}CartItem`, cartItems);
    }
    createCart(cart: Cart): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}Cart`, cart);
    }

    createCartItem(cartItem: CartItem[]): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}ItemCart`, cartItem);
    }
    createOrder(order: Order): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}Order`, order);
    }
    GetAllOrder(): Observable<IOrder[]>{
      return this.http.get<IOrder[]>(`${this.baseUrl}Order/GetAllOrders`);

    }
    GetOrdersBydelivery(): Observable<IOrder[]>{
      return this.http.get<IOrder[]>(`${this.baseUrl}Order/order/delivery`);

    }
    getOrderById(id: number): Observable<Order> {
      return this.http.get<Order>(`${this.baseUrl}Order/GetOrder/${id}`);
    }

    getOrdersByCustomerId(customerId: number): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.baseUrl}Order/customer/${customerId}`);
    }
    updateOrderStatus(orderId: number, newStatus: string) {
      const formData = new FormData();
      formData.append('id', orderId.toString());
      formData.append('orderStatus', newStatus);
  
      return this.http.put<any>(`https://localhost:7241/api/Order/Orders/update`,formData);
 
    }
    // updateOrderStatus(orderId: number, newStatus: string) {
    //   const formData = { id: orderId, orderStatus: newStatus };
  
    //   return this.http.put<any>(`${this.baseUrle`, formData);
    // }
    // UpdateOrders(formData:FormData){
    //   return this.http.put<Order>(`${this.baseUrl}OrderOrders/update/`,formData);
    // }
}

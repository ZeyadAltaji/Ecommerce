import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { ICartItem } from '../Models/ICartItem';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../Classes/CartItem';
import { Observable } from 'rxjs';
import { Cart } from '../Classes/Cart';
import { Order } from '../Classes/Order';
import { IOrder } from '../Models/IOrder';

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
    GetAllCategorise(): Observable<IOrder[]>{
      return this.http.get<IOrder[]>(`${this.baseUrl}Order/GetAllOrders`);

    }
    getOrderById(id: number): Observable<Order> {
      return this.http.get<Order>(`${this.baseUrl}Order/GetOrder/${id}`);
    }

    getOrdersByCustomerId(customerId: number): Observable<Order[]> {
      return this.http.get<Order[]>(`${this.baseUrl}Order/customer/${customerId}`);
    }
}

import { Environment } from '../Environments/Environments';
import { ICartItem } from '../Models/ICartItem';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../Classes/CartItem';
import { Observable } from 'rxjs';
import { Cart } from '../Classes/Cart';
import { Order } from '../Classes/Order';
import { IOrder } from '../Models/IOrder';
import { Injectable } from '@angular/core';
import { SubProducts } from '../Classes/SubProducts';
import { Shoppingcart } from '../Classes/Shoppingcart';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  baseUrl = Environment.baseUrl;
  listProducts: ICartItem[] = [];
  ListOrder: IOrder[] = [];
  constructor(private http: HttpClient) {}
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
  GetAllOrder(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}Order/GetAllOrders`);
  }
  getItemCart(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}ItemCart/ItemCart`);
  }
  GetOrdersBydelivery(): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.baseUrl}Order/order/delivery`);
  }
  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}Order/GetOrder/${id}`);
  }

  getOrdersByCustomerId(customerId: number): Observable<Order[]> {
    return this.http.get<Order[]>(
      `${this.baseUrl}Order/customer/${customerId}`
    );
  }
  updateOrderStatus(orderId: number, newStatus: string) {
    const formData = new FormData();
    formData.append('id', orderId.toString());
    formData.append('orderStatus', newStatus);

    return this.http.put<any>(
      `https://localhost:7241/api/Order/Orders/update`,
      formData
    );
  }
  getCartItemsByCustomerId(customerId: number): Observable<ICartItem[]> {
    const url = `${this.baseUrl}ItemCart/${customerId}`;
    return this.http.get<ICartItem[]>(url);
  }
  deleteCartItem(itemCartId: number): Observable<any> {
    const url = `${this.baseUrl}ItemCart/${itemCartId}`;
    return this.http.delete(url);
  }

  getProductsByIds(id: number): Observable<Shoppingcart> {
    return this.http.get<Shoppingcart>(
      `${this.baseUrl}SubProduct/Products/${id}`
    );
  }
  updateItems(itemCarts: ICartItem[]): Observable<any> {
    const url = `${this.baseUrl}ItemCart/update-items`;
     return this.http.put(url, itemCarts);
  }
  getCartItemsByCustomerCartId(customerId: number, cartId: number): Observable<ICartItem[]> {
    const url = `${this.baseUrl}ItemCart/customer/${customerId}/cart/${cartId}`;
    return this.http.get<ICartItem[]>(url);
  }
}

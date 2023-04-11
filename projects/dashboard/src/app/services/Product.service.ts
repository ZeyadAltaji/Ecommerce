import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../Models/IProduct';
import { Product } from '../Classes/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl =Environment.baseUrl;
  listProducts:IProducts[]=[];
  constructor( private http: HttpClient) { }

  GetAllProducts():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(`${this.baseUrl}Product/AllProduct`).pipe()
  }
  GetByIdProducts(id:string){
    return this.http.get<Product>(`${this.baseUrl}Product/Products/`+id.toString());

  }
  UpdateProducts(id: number){
    return this.http.get<Product>(`${this.baseUrl}Product/Products/update/`+id.toString());
  }
}

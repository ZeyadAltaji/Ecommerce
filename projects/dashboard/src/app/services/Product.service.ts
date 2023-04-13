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
  AddProducts(product:Product){
    return this.http.post(`${this.baseUrl}Product`,product);
  }
  GetAllProducts():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(`${this.baseUrl}Product/AllProduct`).pipe()
  }
  GetByIdProducts(id:string){
    return this.http.get<Product>(`${this.baseUrl}Product/Products/`+id.toString());
  }
  GetByIdModal(id:number){
    return this.http.get<Product>(`${this.baseUrl}Product/Products/${id}`.toString()).pipe()
  }
  UpdateProducts(id: number){
    return this.http.get<Product>(`${this.baseUrl}Product/Products/update/`+id.toString());
  }
  getAllcategorise(): Observable<string[]> {
     return this.http.get<string[]>(`${this.baseUrl}Category/categorise`);
  }
  DeleteProducts(id: number){
    return this.http.put<Product>(`${this.baseUrl}Product/Products/Delete/` + id.toString(), {});

  }

}

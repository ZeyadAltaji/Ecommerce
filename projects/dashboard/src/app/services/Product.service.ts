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
  AddProducts(formData: FormData){
    return this.http.post(`${this.baseUrl}Product`,formData);
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
  UpdateProducts(formData:FormData){
    return this.http.put<Product>(`${this.baseUrl}Product/Products/update/`,formData);
  }
  getAllcategorise(): Observable<string[]> {
     return this.http.get<string[]>(`${this.baseUrl}Category/categorise`);
  }
  DeleteProducts(id: number){
    return this.http.put<Product>(`${this.baseUrl}Product/Products/Delete/` + id.toString(), {});
  }
  GetProductsByCarOrBrand(id:string, type:string){
    if (type === 'car') {
      return this.http.get<Product[]>(`${this.baseUrl}Product/ByCars/${id}`).pipe();
    } else if (type === 'brand') {
      return this.http.get<Product[]>(`${this.baseUrl}Product/ByBrand/${id}`).pipe();
    } else {
      return null;
    }
  }
  GetProductsBycategorise(id:string, type:string){
    if (type === 'External') {
      return this.http.get<Product[]>(`${this.baseUrl}Product/ByCateogers/${id}`).pipe();
    } else if (type === 'Indoor') {
      return this.http.get<Product[]>(`${this.baseUrl}Product/ByCateogers/${id}`).pipe();
    } else if (type === 'Mechanical') {
      return this.http.get<Product[]>(`${this.baseUrl}Product/ByCateogers/${id}`).pipe();
    } else {
      return null;
    }
   }
}

import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { IProducts } from '../Models/IProduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Classes/Product';

@Injectable({
  providedIn: 'root'
})
export class SubproductsService {
  baseUrl =Environment.baseUrl;
  listProducts:IProducts[]=[];
constructor(private http: HttpClient) { }
AddProducts(formData: FormData){
  return this.http.post(`${this.baseUrl}SubProduct`,formData);
}
GetAllProducts():Observable<IProducts[]>{
  return this.http.get<IProducts[]>(`${this.baseUrl}SubProduct/GetAllproducts`).pipe()
}
GetByIdProducts(id:string){
  return this.http.get<Product>(`${this.baseUrl}SubProduct/Products/`+id.toString());
}
GetByIdModal(id:number){
  return this.http.get<Product>(`${this.baseUrl}SubProduct/Products/${id}`.toString()).pipe()
}
UpdateProducts(formData:FormData){
  return this.http.put<Product>(`${this.baseUrl}SubProduct/update/`,formData);
}
DeleteProducts(id: number){
  return this.http.put<Product>(`${this.baseUrl}SubProduct/Delete/` + id.toString(), {});

}

}

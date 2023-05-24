import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
 import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 import { ISubProducts } from '../Models/ISubProducts';
import { SubProducts } from '../Classes/SubProducts';

@Injectable({
  providedIn: 'root'
})
export class SubproductsService {
  baseUrl =Environment.baseUrl;
  listProducts:ISubProducts[]=[];
constructor(private http: HttpClient) { }
AddProducts(formData: FormData){
  return this.http.post(`${this.baseUrl}SubProduct`,formData);
}
GetAllProducts():Observable<ISubProducts[]>{
  return this.http.get<ISubProducts[]>(`${this.baseUrl}SubProduct/GetAllproducts`).pipe()
}
GetByIdProducts(id:string){
  return this.http.get<SubProducts>(`${this.baseUrl}SubProduct/Products/`+id.toString());
}
GetByIdModal(id:number){
  return this.http.get<SubProducts>(`${this.baseUrl}SubProduct/Products/${id}`.toString()).pipe()
}
UpdateProducts(formData:FormData){
  return this.http.put<SubProducts>(`${this.baseUrl}SubProduct/update/`,formData);
}
DeleteProducts(id: number){
  return this.http.put<SubProducts>(`${this.baseUrl}SubProduct/Delete/` + id.toString(), {});
}
GetByProducts(id:string){
  return this.http.get<SubProducts[]>(`${this.baseUrl}SubProduct/ByProducts/${id}`).pipe();

}
ProductsByUserId(id:number){
  return this.http.get<SubProducts[]>(`${this.baseUrl}SubProduct/GetAllproducts/${id}`.toString()).pipe()
}

}

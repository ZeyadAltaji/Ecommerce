import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { IBrands } from '../Models/IBrands';
import { Brands } from '../Classes/Brands';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  baseUrl =Environment.baseUrl;
  listBrands:IBrands[]=[];

  constructor( private http: HttpClient) { }
  AddProducts(Brand:Brands){
    return this.http.post(`${this.baseUrl}Brands`,Brand);
  }
  GetAllBrands(){
    return this.http.get<IBrands[]>(`${this.baseUrl}Brands/GetAllBrand`).pipe()

  }
  GetByIDBrands(id:string){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/${id}`.toString()).pipe()

  }
  UpdateBrand(Brand:Brands){
    return this.http.put<Brands>(`${this.baseUrl}Brands/Brand/update/`+Brand.id,Brand);

  }
  DeleteBrands(id:number){
    return this.http.put<Brands>(`${this.baseUrl}Brands/Brand/Delete/` + id.toString(), {});

  }
  GetByIdModal(id:number){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/${id}`.toString()).pipe()
  }

}

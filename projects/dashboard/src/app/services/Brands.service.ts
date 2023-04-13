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
  constructor( private http: HttpClient) { }
  AddProducts(Brand:Brands){
    return this.http.post(`${this.baseUrl}Brands`,Brand);
  }
  GetAllBrands(){
    return this.http.get<IBrands[]>(`${this.baseUrl}Brands/GetAllBrand`).pipe()

  }
  GetByIDBrands(id:number){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/${id}`.toString()).pipe()

  }
  UpdateBrands(id:number){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/update/`+id.toString());

  }
  DeleteBrands(id:number){
    return this.http.put<Brands>(`${this.baseUrl}Brands/Brand/Delete/` + id.toString(), {});

  }


}
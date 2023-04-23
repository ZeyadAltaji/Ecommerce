import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { IBrands } from '../Models/IBrands';
import { Brands } from '../Classes/Brands';
import { Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  baseUrl =Environment.baseUrl;
  listBrands:IBrands[]=[];

  constructor( private http: HttpClient) { }


  AddBrands(formData: FormData) {
    return this.http.post(`${this.baseUrl}Brands`, formData);
  }
  GetAllBrands(){
    return this.http.get<IBrands[]>(`${this.baseUrl}Brands/GetAllBrand`).pipe()
  }
  GetByIDBrands(id:string){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/${id}`.toString()).pipe()
  }
  UpdateBrand(formData:FormData){
    return this.http.put<Brands>(`${this.baseUrl}Brands/update/`,formData).pipe();
  }
  DeleteBrands(id:number){
    return this.http.put<Brands>(`${this.baseUrl}Brands/Brand/Delete/` + id.toString(), {});
  }
  GetByIdModal(id:number){
    return this.http.get<Brands>(`${this.baseUrl}Brands/Brand/${id}`.toString()).pipe()
  }
}

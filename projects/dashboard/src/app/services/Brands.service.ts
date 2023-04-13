import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  GetAllBrands(){

  }
  GetByIDBrands(id:number){

  }
  UpdateBrands(id:number){

  }
  DeleteBrands(id:number){

  }


}

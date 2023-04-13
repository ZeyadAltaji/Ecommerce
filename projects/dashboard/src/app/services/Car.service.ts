import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  GetAllCars(){

  }
  GetByIDCars(id:number){

  }
  UpdateCars(id:number){

  }
  DeleteCars(id:number){

  }


}

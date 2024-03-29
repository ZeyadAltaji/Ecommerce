 import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Cars } from '../Classes/Cars';
import { Observable } from 'rxjs';
import { ICars } from '../Models/ICars';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl =Environment.baseUrl;
  ListCars:ICars[]=[];
  constructor( private http: HttpClient) { }


  AddCars(formData: FormData){
    return this.http.post(`${this.baseUrl}Car`,formData);
  }
  GetAllCars():Observable<ICars[]>{
      return this.http.get<ICars[]>(`${this.baseUrl}Car/GetAllCar`).pipe()
  }
  GetByIDCars(id:string){
    return this.http.get<Cars>(`${this.baseUrl}Car/Cars/${id}`.toString()).pipe()
  }
  UpdateCars(formData:FormData){
    return this.http.put<Cars>(`${this.baseUrl}Car/update/`,formData).pipe();
  }
  DeleteCars(id:number){
    return this.http.put<Cars>(`${this.baseUrl}Car/Cars/Delete/` + id.toString(), {});
  }
  GetByIdModal(id:number){
    return this.http.get<Cars>(`${this.baseUrl}Car/Cars/${id}`.toString()).pipe()
  }
}

import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Cars } from '../Classes/Cars';
import { Observable } from 'rxjs';
import { ICars } from '../Models/ICars';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  AddCars(car:Cars){
    return this.http.post(`${this.baseUrl}Car`,car);

  }
  GetAllCars():Observable<ICars[]>{
      return this.http.get<ICars[]>(`${this.baseUrl}Car/GetAllCar`).pipe()
  }
  GetByIDCars(id:number){
    return this.http.get<Cars>(`${this.baseUrl}Car/Cars/${id}`.toString()).pipe()

  }
  UpdateCars(id:number){
    return this.http.get<Cars>(`${this.baseUrl}Cars/update/`+id.toString());

  }
  DeleteCars(id:number){
    return this.http.put<Cars>(`${this.baseUrl}Car/Cars/Delete/` + id.toString(), {});
  }


}

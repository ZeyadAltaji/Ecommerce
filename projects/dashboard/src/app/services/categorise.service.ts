import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorise } from '../Classes/Categorise';

@Injectable({
  providedIn: 'root'
})
export class CategoriseService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  AddProducts(categorise:Categorise){
    return this.http.post(`${this.baseUrl}Category`,categorise);
  }
  GetAllCategorise(): Observable<string[]>{
    return this.http.get<string[]>(`${this.baseUrl}Category/categorise`);

  }
  GetByIDCategorise(id:number){
    return this.http.get<Categorise>(`${this.baseUrl}Category/categorise/${id}`.toString()).pipe()

  }
  UpdateCategorise(id:number){
    return this.http.get<Categorise>(`${this.baseUrl}Category/categorise/update/`+id.toString());

  }
  DeleteCategorise(id:number){
    return this.http.put<Categorise>(`${this.baseUrl}Category/categorise/Delete/` + id.toString(), {});

  }

}

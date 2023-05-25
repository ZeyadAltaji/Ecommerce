 import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorise } from '../Classes/Categorise';
import { ICategorise } from '../Models/ICategorise';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriseService {

  baseUrl =Environment.baseUrl;
  listCategory:ICategorise[]=[];

  constructor( private http: HttpClient) { }
  AddCategory(categorise:Categorise){
    return this.http.post(`${this.baseUrl}Category`,categorise);
  }
  GetAllCategorise(): Observable<ICategorise[]>{
    return this.http.get<ICategorise[]>(`${this.baseUrl}Category/categorise`);

  }
  GetByIdModal(id:number){
    return this.http.get<Categorise>(`${this.baseUrl}Category/categorise/${id}`.toString()).pipe()
  }
  GetByIDCategorise(id:string){
    return this.http.get<Categorise>(`${this.baseUrl}Category/categorise/${id}`.toString()).pipe()

  }
  UpdateCategorise(Category:Categorise){
    return this.http.put<Categorise>(`${this.baseUrl}Category/categorise/update/`+Category.id,Category);

  }
  DeleteCategorise(id:number){
    return this.http.put<Categorise>(`${this.baseUrl}Category/categorise/Delete/` + id.toString(), {});

  }

}

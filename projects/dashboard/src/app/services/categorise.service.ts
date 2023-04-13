import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriseService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  GetAllCategorise(){

  }
  GetByIDCategorise(id:number){

  }
  UpdateCategorise(id:number){

  }
  DeleteCategorise(id:number){

  }
}

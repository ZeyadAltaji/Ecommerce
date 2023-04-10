import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProducts } from '../Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }

  GetAllProducts():Observable<IProducts[]>{
    return this.http.get<IProducts[]>(`${this.baseUrl}Product`).pipe()

  }
}

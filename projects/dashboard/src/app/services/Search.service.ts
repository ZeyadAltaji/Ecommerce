import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environments';
import { Observable } from 'rxjs';
import { ICategorise } from '../Models/ICategorise';
import { IProducts } from '../Models/IProduct';
import { ISubProducts } from '../Models/ISubProducts';
import { IBrands } from '../Models/IBrands';
import { ICars } from '../Models/ICars';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  baseUrl =Environment.baseUrl;

  constructor( private http: HttpClient) { }
  searchCategories(query: string): Observable<ICategorise[]> {
    return this.http.get<ICategorise[]>(`${this.baseUrl}Category/categorise?query=${query}`);
  }
  searchProducts(query: string): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${this.baseUrl}Product/AllProduct?query=${query}`);
  }
  searchSubProducts(query: string): Observable<ISubProducts[]> {
    return this.http.get<ISubProducts[]>(`${this.baseUrl}SubProduct/GetAllproducts?query=${query}`);
  }
  searchBrands(query: string): Observable<IBrands[]> {
    return this.http.get<IBrands[]>(`${this.baseUrl}Brands/GetAllBrand?query=${query}`);
  }
  searchCars(query: string): Observable<ICars[]> {
    return this.http.get<ICars[]>(`${this.baseUrl}Car/GetAllCar?query=${query}`);
  }
}

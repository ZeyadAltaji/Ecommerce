import { HttpClient } from '@angular/common/http';
 import { Environment } from '../Environments/Environments';
import { Observable } from 'rxjs';
import { ContactUs } from '../Classes/ContactUs';
import { IContactUs } from '../Models/IContactUs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  listContactUs:IContactUs[]=[];

  baseUrl =Environment.baseUrl;

  constructor( private http: HttpClient) { }
AddMessages(formData: FormData){
  return this.http.post(`${this.baseUrl}ContactUs`,formData);
}
GetAllMessages():Observable<IContactUs[]>{
    return this.http.get<IContactUs[]>(`${this.baseUrl}ContactUs/Messages`).pipe()
}
GetByIDMessages(id:string){
  return this.http.get<ContactUs>(`${this.baseUrl}ContactUs/Messages/${id}`.toString()).pipe()
}
}

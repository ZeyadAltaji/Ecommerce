import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environment';
import { UserForLogin } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  // AuthenticationLogin(user:UserForLogin){
  //   // return this.http.post(this.baseUrl+'Accounts/Login',user)
  // }

  AuthenticationLogin(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Accounts/Login`,loginObj)
  }
  RegisterUser(Registerobj:any){
    return this.http.post<any>(`${this.baseUrl}Accounts/register`,Registerobj)

  }

}

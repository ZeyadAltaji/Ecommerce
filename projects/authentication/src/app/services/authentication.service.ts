import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environment';
import { BusinessAccount, UserForLogin, UserForRegister } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl =Environment.baseUrl;
  constructor( private http: HttpClient) { }
  AuthenticationLogin(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Accounts/Login`,loginObj)
  }
  RegisterUser(Registerobj:UserForRegister){
    return this.http.post<any>(`${this.baseUrl}Accounts/register`,Registerobj)
  }
  BusinessAccount(BusinessAccount:BusinessAccount){
    return this.http.post<any>(`${this.baseUrl}Accounts/BusinessAccount`,BusinessAccount)
  }
}

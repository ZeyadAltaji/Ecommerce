import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from '../Environments/Environment';
import { BusinessAccount, UserForLogin, UserForRegister } from '../Models/User';
import { Observable } from 'rxjs';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { User } from 'projects/dashboard/src/app/Classes/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseUrl =Environment.baseUrl;
  ListUser:IUser[]=[];

  constructor( private http: HttpClient) { }
  AuthenticationLogin(loginObj:any){
    return this.http.post<any>(`${this.baseUrl}Accounts/Login`,loginObj)
  }
  RegisterUser(Registerobj:UserForRegister){
    return this.http.post<UserForRegister>(`${this.baseUrl}Accounts/register`,Registerobj).pipe()
  }
  BusinessAccount(BusinessAccount:BusinessAccount){
    return this.http.post<BusinessAccount>(`${this.baseUrl}Accounts/BusinessAccount`,BusinessAccount).pipe()
  }
  GetAllUser():Observable<IUser[]>{
    return this.http.get<IUser[]>(`${this.baseUrl}Accounts/AllUsers`);
  }
  GetByIdModal(id:number){
    return this.http.get<User>(`${this.baseUrl}Accounts/AllUsers/${id}`.toString()).pipe()
  }
  DeleteUser(id:number){
    return this.http.put<User>(`${this.baseUrl}Accounts/Users/Delete/` + id.toString(), {});
  }
  UpdateUser(user:User){
    return this.http.put<User>(`${this.baseUrl}Accounts/Users/update/`+user.id,user);

  }
}

import { Injectable } from '@angular/core';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { IUser } from '../Models/IUser';
import { HttpClient } from '@angular/common/http';
import { NewUser } from '../Classes/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl =Environment.baseUrl;
  ListUser:IUser[]=[];
  header={
    withCredentials:true,
  };
  constructor( private http: HttpClient) { }
  NewUser(formData:FormData){
    return this.http.post(`${this.baseUrl}Accounts/NewUser`,formData,{withCredentials:false}).pipe()
  }
  // NewUser(newuser: NewUser, user_files: File) {
  //   if (user_files == null) {
  //     return null;
  //   }
  //   const formData = new FormData();
  //   formData.append("userDTOs", JSON.stringify(newuser));
  //   formData.append("user_files", user_files);
  //   return this.http.post<NewUser>(`${this.baseUrl}Accounts/NewUser`, formData)
  //     .pipe();
  // }

}

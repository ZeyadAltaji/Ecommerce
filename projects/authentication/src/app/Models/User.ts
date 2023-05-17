import { User } from "projects/dashboard/src/app/Classes/User";

export  interface UserForLogin{
   userName: string;
  password: string;
  token: string;
  fullUser:User;
}
export interface UserForRegister {
  Frist_Name: string;
  Last_Name:string;
  UserName:string;
  Email?: string;
  Password: string;
  ComfirmPassword:string;
 }
 export interface BusinessAccount {
  UserName:string;
  Email?: string;
  Password: string;
  ComfirmPassword:string;
 }
export interface RestPassword{
  UserName:string;
  Email?: string;
}


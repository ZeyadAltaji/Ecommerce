export  interface UserForLogin{
  userName: string;
  password: string;
  token: string;
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


export  interface UserForLogin{
  userName: string;
  password: string;
  token: string;
}
export interface UserForRegister {
  FName: string;
  LName:string;
  Email?: string;
  password: string;
  confirmpassword:string;
 }
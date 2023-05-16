import { INewUser, IUser } from "../Models/IUser";

export class User implements IUser {
  id!: number;
  userName!: string;
  frist_Name!: string;
  last_Name!: string;
  email!: string;
  password!: string;
  comfirmPassword!: string;
  passwordKey!: string;
  phone1!: string;
  phone2!: string;
  address!: string;
  role!: number;
  userCreate!: string;
   userUpdate!: string;
   isDelete!: boolean;
  isActive!: boolean;
  image_userUrl?: string;
  public_id!: string;
  additionalData?:any;

}

export class NewUser implements INewUser {
  frist_Name!: string;
  last_Name!: string;
  userName!: string;
  email!: string;
  password!: string;
  comfirmPassword!: string;
  role!: number;
  phone1!: string;
  phone2!: string;
  address!: string;
  image_userUrl!: string;


}

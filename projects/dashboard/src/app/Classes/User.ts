import { IUser } from "../Models/IUser";

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
  createDate!: Date;
  userUpdate!: string;
  updateDate!: Date;
  isDelete!: boolean;
  isActive!: boolean;
  image_userUrl?: string;
  Public_id!: string;

}

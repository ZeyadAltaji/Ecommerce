import { IProducts } from "../Models/IProduct";

export class Product implements IProducts
{

  id!: number;

  title!:string;
  brands_Id!: number;
  brands!:string;
  category_Id!: number;
  category!:string;
  car_Id!: number;
  cars!:string;
 
  isPrimaryImage!: string;
  isForeignImage1!: string;
  isForeignImage2!: string;
  Primary_Image!: string;
  ForeignImage1!: string;
  ForeignImage2!: string;
  
  UserId!:number;
  admin_Id!:number;
  createDate!:string;
  isActive!:boolean;
  isDelete!:boolean;
  
  userCreate!: string;
  userUpdate!: string;

}


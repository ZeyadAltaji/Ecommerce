import { IProducts } from "../Models/IProduct";

export class Product implements IProducts
{
  id!: number;
  title!:string;
  description?:string;
  // image?: Photo[];
  price!:number;
  offers!:number;
  new!:number;
  Quantity!:number;
  id_Brands!:number;
  id_Car!:number;
  category_Id!:number;
  UserId!:number;
  admin_Id!:number;
  createDate!:string;
  isActive!:boolean;
  isDelete!:boolean;
}


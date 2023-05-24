import { ISubProducts } from "../Models/ISubProducts";

export class SubProducts implements ISubProducts {
  isPrimaryImage!: string;
  Primary_Image!: string;
  id!: number;
  serial_Id!:string;
  title!:string;
  description?:string;
  price!:number;
  offers?:number;
  new_price!:number;
  quantity!:number;
  UserId!:number;
  admin_Id!:number;
  createDate!:string;
  isActive!:boolean;
  isDelete!:boolean;
  brandsId!: number;
  brands!:string;
  categoryId!: number;
  category!:string;
  carId!: number;
  cars!:string;
  productId!:number;
  Products!:string;

}

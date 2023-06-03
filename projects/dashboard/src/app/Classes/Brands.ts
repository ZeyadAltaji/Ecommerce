import { IBrands } from "../Models/IBrands";

export class Brands implements IBrands
{
  id!: number;
  name!: string;
  Image_BrandUrl!:string;
  public_id!:string;
  Admin_Id!:number;
  userCreate!:string;
  userUpdate!:string;
  isActive!: boolean;

}

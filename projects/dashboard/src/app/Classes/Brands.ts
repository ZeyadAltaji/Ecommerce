import { IBrands } from "../Models/IBrands";

export class Brands implements IBrands
{
  id!: number;
  name!: string;
  Image_BrandUrl!:File;
  public_id!:string;
}

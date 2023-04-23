import { ICars } from "../Models/ICars";

export class Cars implements ICars {
  production_Date!: number;
  id!: number;
  name!: string;
  image_CarUrl!:string;
  class!: string;
  isActive!:boolean;
  public_id!:string;

}

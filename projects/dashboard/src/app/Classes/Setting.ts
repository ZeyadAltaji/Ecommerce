import { ISetting } from "../Models/ISetting";

export class Setting implements ISetting{
  id!:number;
  Logoimage!: string;
  isLogoUrl!: string;
}

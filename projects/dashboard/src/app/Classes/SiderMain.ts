import { ISiderMain } from "../Models/ISiderMain";

export class SiderMain implements ISiderMain {
  id!:number;
  Image!: string;
  imageURl!: string;
  title!: string;
  description!: string;
  isActive!:boolean;
  button!: string;

}

export interface IProducts {
  id: number;
  Serial_Id:string;
  title:string;
  description?:string;
  // photos?: Photo[];
  price?:number;
  offers:number;
  new:number;
  Quantity?:number;
  UserId:number;
  admin_Id:number;
  createDate:string;
  isActive:boolean;
  isDelete:boolean;
  Brands_Id: number;
  brands:string;
  Category_Id: number;
  category:string;
  Car_Id: number;
  cars:string;

}






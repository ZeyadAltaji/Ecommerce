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
  BrandsId:number;
  CarId:number;
  CategoryId:number;
  UserId:number;
  admin_Id:number;
  createDate:string;
  isActive:boolean;
  isDelete:boolean;
  brands:string;
  category:string;
  cars:string;
}






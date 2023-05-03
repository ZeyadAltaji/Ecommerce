export interface ISubProducts {
  id: number;
  serial_Id:string;
  title:string;
  description?:string;
   price?:number;
  offers?:number;
  New_price?:number;
  quantity?:number;
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
  isPrimaryImage:string;
  isForeignImage1:string;
  isForeignImage2:string;
   Primary_Image:string;
   ForeignImage1:string;
   ForeignImage2:string;
}
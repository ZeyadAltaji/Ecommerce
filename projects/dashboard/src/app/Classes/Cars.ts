import { ICars } from "../Models/ICars";

export class Cars implements ICars {
  id!: number;
  name!: string;
  Production_Date!: string;
}

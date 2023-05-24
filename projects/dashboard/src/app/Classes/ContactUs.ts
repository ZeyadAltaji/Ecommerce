import { IContactUs } from "../Models/IContactUs";

export class ContactUs implements IContactUs {
  id!: number;
  name!: string;
  email!: string;
  subject!: string;
  show!: boolean;
  message!: string;
}

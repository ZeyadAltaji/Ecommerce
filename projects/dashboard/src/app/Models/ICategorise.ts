export interface ICategorise {
  id: number,
  name: string,
  Admin_Id: number,
  userCreate:string,
  userUpdate:string
}

export interface ICategoriseList {
  id: number,
  name: string,
    admin_Id: number,
    user: number,
    userCreate: Date | undefined;
    createDate: Date | undefined;
    userUpdate: Date | undefined;
    updateDate: Date | undefined;
    isDelete: boolean,
    isActive: boolean
}

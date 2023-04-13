export interface ICategorise {
  id: number,
  name: string,
}

export interface ICategoriseList {
  id: number,
  name: string,
    admin_Id: number,
    user: number,
    userCreate: Date,
    createDate: Date,
    userUpdate: Date,
    updateDate: Date,
    isDelete: boolean,
    isActive: boolean
}

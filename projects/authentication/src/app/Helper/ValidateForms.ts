import { FormControl, FormGroup } from "@angular/forms";

export default class ValidateForms{
  static validateAllFromsFiled(RegisterForm: FormGroup<any>) {
    throw new Error('Method not implemented.');
  }
  static validateAllFroms(formGroup:FormGroup)
  {
    Object.keys(formGroup.controls).forEach(filed=>{
      const control =formGroup.get(filed);
      if(control instanceof FormControl)
      {
        control.markAsDirty({onlySelf:true})
      }else if(control instanceof FormGroup){
        this.validateAllFroms(control);
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from '../../../Models/User';
 import { AuthenticationService } from '../../../services/authentication.service';
import ValidateForms from '../../../Helper/ValidateForms';
 
@Component({
  selector: 'app-UserAccount',
  templateUrl: './UserAccount.component.html',
  styleUrls: ['./UserAccount.component.css']
})
export class UserAccountComponent implements OnInit {

   RegisterForm!: FormGroup;
   user: UserForRegister | undefined;


  constructor(private fb:FormBuilder,
    private router:Router,
    private authService:AuthenticationService    ) { }

  ngOnInit() {
    this.NewUserForm();
      
  }
  NewUserForm() {
    this.RegisterForm =this.fb.group({
      FName: [null, Validators.required,Validators.pattern('[a-zA-Z]{1,10}')],
      LName: [null, Validators.required,Validators.pattern('[a-zA-Z]{1,10}')],
      Email: [null, [Validators.email, Validators.required],Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')],
      password: [null, [Validators.required, Validators.minLength(2)],Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),],
      passwordComfirm: [null, Validators.required,Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),],
    },
    // { Validators: this.passwordMatchingValidatior });
    )
    
  }
//   passwordMatchingValidatior(fg: FormGroup): Validators {
//     return fg.get('password').value === fg.get('confirmPassword').value ? null :
//         {notmatched: true};
// }

  onSubmit(){
      if(this.RegisterForm.valid){
        this.authService.RegisterUser(this.userData()).subscribe(() =>
        {
            this.onReset();
            // this.alertify.success('Congrats, you are successfully registered');
            console.log('Congrats, you are successfully registered');
        });
        console.log(this.RegisterForm.value);
        
      }else{
          console.log("invalid data !!");
          ValidateForms.validateAllFroms(this.RegisterForm);
      }
  }

  onReset() {
     this.RegisterForm.reset();
}

userData(): UserForRegister {
  return this.user = {
      FName: this._FName.value,
      LName: this._FName.value,
      Email: this._Email.value,
      password: this._password.value,
      confirmpassword: this._confirmpassword.value
  };
}

  get _FName() {
    return this.RegisterForm.get('first_name') as FormControl;
  }
  get _LName() {
    return this.RegisterForm.get('last_name') as FormControl;
  }
  get _Email() {
    return this.RegisterForm.get('Email') as FormControl;
  }
  get _password() {
    return this.RegisterForm.get('password') as FormControl;
  }
  get _confirmpassword() {
    return this.RegisterForm.get('comfirm_password') as FormControl;
  }

  
}
 


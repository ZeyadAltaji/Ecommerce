import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from '../../../Models/User';
 import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-UserAccount',
  templateUrl: './UserAccount.component.html',
  styleUrls: ['./UserAccount.component.css']
})
export class UserAccountComponent implements OnInit {

  RegisterForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted!: boolean;

  constructor(private fb: FormBuilder, private authService: AuthenticationService,
      private router:Router,) { }



    ngOnInit() {
      this.NewUserForm();
    }
    NewUserForm() {
      this.RegisterForm = this.fb.group({
        Frist_Name: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        Last_Name: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
        Password: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')]],
        ComfirmPassword: [null, [Validators.required, Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')]],
      });
    }
    onRegister(RegisterForm:FormGroup){

      console.log(this.RegisterForm.value);
      this.userSubmitted = true;

      if (this.RegisterForm.valid) {
           this.authService.RegisterUser(this.userData()).subscribe(() =>
          {
              this.onReset();
              console.log('Congrats, you are successfully registered');
          });
      }
    }
    onReset() {
        this.RegisterForm.reset();
    }
    userData(): UserForRegister {
      return {
        Frist_Name: this.Frist_Name.value,
        Last_Name: this.Last_Name.value,
        UserName:this.UserName.value,
        Email: this.Email.value,
        Password: this.Password.value,
        ComfirmPassword: this.ComfirmPassword.value
      };
    }

      get Frist_Name() {
        return this.RegisterForm.get('Frist_Name') as FormControl;
      }
      get Last_Name() {
        return this.RegisterForm.get('Last_Name') as FormControl;
      }
      get UserName() {
        return this.RegisterForm.get('UserName') as FormControl;
      }
      get Email() {
        return this.RegisterForm.get('Email') as FormControl;
      }
      get Password() {
        return this.RegisterForm.get('Password') as FormControl;
      }
      get ComfirmPassword() {
        return this.RegisterForm.get('ComfirmPassword') as FormControl;
      }


}



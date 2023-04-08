import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessAccount } from '../../../Models/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-BusinessAccount',
  templateUrl: './BusinessAccount.component.html',
  styleUrls: ['./BusinessAccount.component.css']
})
export class BusinessAccountComponent implements OnInit {
  BusinessAccountForm!: FormGroup;
  user!: BusinessAccount;
  userSubmitted!: boolean;
  constructor(private fb: FormBuilder, private authService: AuthenticationService,
    private router:Router,) { }


  ngOnInit() {
    this.NewUserForm();
  }
  NewUserForm() {
    this.BusinessAccountForm = this.fb.group({
      UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
      Password: [null, [Validators.required, Validators.minLength(2), Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')]],
      ComfirmPassword: [null, [Validators.required, Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})')]],
    });
  }
  OnBusinessAccount(BusinessAccountForm:FormGroup){
    console.log(this.BusinessAccountForm.value);
    this.userSubmitted = true;

    if (this.BusinessAccountForm.valid) {
          this.authService.BusinessAccount(this.userData()).subscribe(() =>
        {
            this.onReset();
            console.log('Congrats, you are successfully registered');
        });
    }
  }
  onReset() {
      this.BusinessAccountForm.reset();
  }
  userData(): BusinessAccount {
    return {
      UserName:this.UserName.value,
      Email: this.Email.value,
      Password: this.Password.value,
      ComfirmPassword: this.ComfirmPassword.value
    };
  }

  get UserName() {
    return this.BusinessAccountForm.get('UserName') as FormControl;
  }
  get Email() {
    return this.BusinessAccountForm.get('Email') as FormControl;
  }
  get Password() {
    return this.BusinessAccountForm.get('Password') as FormControl;
  }
  get ComfirmPassword() {
    return this.BusinessAccountForm.get('ComfirmPassword') as FormControl;
  }

}

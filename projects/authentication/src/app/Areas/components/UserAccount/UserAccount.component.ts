import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { UserForRegister } from '../../../Models/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-UserAccount',
  templateUrl: './UserAccount.component.html',
  styleUrls: ['./UserAccount.component.css'],
})
export class UserAccountComponent implements OnInit {
  RegisterForm!: FormGroup;
  user!: UserForRegister;
  userSubmitted!: boolean;
  private cartItemsKey = 'cartItems';
  cartItems: any[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    @Inject(CookieService) private cookieServices: CookieService
  ) {}

  ngOnInit() {
    this.NewUserForm();
    this.retrieveCartItems();
  }

  retrieveCartItems() {
    const storedItems = this.cookieServices.get('cartItems');
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];
  }
  NewUserForm() {
    this.RegisterForm = this.fb.group(
      {
        Frist_Name: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')],
        ],
        Last_Name: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')],
        ],
        UserName: [
          null,
          [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')],
        ],
        Email: [
          null,
          [
            Validators.email,
            Validators.required,
            Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}'),
          ],
        ],
        Password: [null, [Validators.required, Validators.minLength(2)]],
        ComfirmPassword: [null, Validators.required],
      },
      { Validators: this.passwordMatchingValidator }
    );
  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ComfirmPassword')?.value
      ? null
      : { notmatched: true };
  }

  onRegister(RegisterForm: FormGroup) {
    debugger
    this.userSubmitted = true;
       this.authService.RegisterUser(this.userData()).subscribe(
        (data) => {
          this.onReset();
        },
        (error) => {
          console.log(error);
        }
      );
   }
  onReset() {
    this.RegisterForm.reset();
  }
  userData(): UserForRegister {
    return {
      Frist_Name: this.FristName.value,
      Last_Name: this.LastName.value,
      UserName: this.UserName.value,
      Email: this._Email.value,
      Password: this._Password.value,
      ComfirmPassword: this._ComfirmPassword.value,
    };
  }

  get FristName() {
    return this.RegisterForm.get('Frist_Name') as FormControl;
  }
  get LastName() {
    return this.RegisterForm.get('Last_Name') as FormControl;
  }
  get UserName() {
    return this.RegisterForm.get('UserName') as FormControl;
  }
  get _Email() {
    return this.RegisterForm.get('Email') as FormControl;
  }
  get _Password() {
    return this.RegisterForm.get('Password') as FormControl;
  }
  get _ComfirmPassword() {
    return this.RegisterForm.get('ComfirmPassword') as FormControl;
  }
}

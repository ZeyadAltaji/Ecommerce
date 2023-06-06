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
import { first } from 'rxjs';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';

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
  usernameExists = false;
  emailExists = false;
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
    if (this.RegisterForm.valid) {
      const newUser: UserForRegister = this.userData();
      this.authService.GetAllUser().pipe(first()).subscribe(
        (users: IUser[]) => {
          debugger

          const usernameExists = users.some(user => user.userName === newUser.UserName);
          const emailExists = users.some(user => user.email === newUser.Email);
          if (usernameExists) {
            debugger

            this.usernameExists=true;
             // Display an error message to the user or perform any other required action
          }

          if (emailExists) {
            debugger

            this.emailExists=true;
             // Display an error message to the user or perform any other required action
          }
          if (!usernameExists && !emailExists) {
            debugger

            this.authService.RegisterUser(newUser).subscribe(
              (data) => {
                this.onReset();
                this.router.navigate(['/Login']);

              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      )
    }
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

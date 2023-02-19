import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-UserAccount',
  templateUrl: './UserAccount.component.html',
  styleUrls: ['./UserAccount.component.css']
})
export class UserAccountComponent implements OnInit {

  LoginForm !:FormGroup;
  RegisterForm!:FormGroup;

  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit():void {
      this.LoginForm=this.fb.group({
        FName :[''],
        LName:[''],
        Email:['',Validators.required],
        password :['',Validators.required],
        passwordComfirm:[''],
      });
  }
  NewUserForm() {
    this.RegisterForm =this.fb.group({
      FName: [null, Validators.required,Validators.pattern('[a-zA-Z]{1,10}')],
      LName: [null, Validators.required,Validators.pattern('[a-zA-Z]{1,10}')],
      Email: [null, [Validators.email, Validators.required],Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')],
      password: [null, [Validators.required, Validators.minLength(2)],Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),],
      passwordComfirm: [null, Validators.required,Validators.pattern('^((?!.*[s])(?=.*[A-Z])(?=.*d).{8,99})'),],
    })

  }



}

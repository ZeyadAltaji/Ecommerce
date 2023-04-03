import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForLogin } from '../../../Models/User';
 import { AuthenticationService } from '../../../services/authentication.service';
import ValidateForms from '../../../Helper/ValidateForms';
  
@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
   constructor(private router:Router,
   private authService : AuthenticationService,
   private builder : FormBuilder) { }
   ngOnInit():void {
    this.loginForm=this.builder.group({
      UserName:this.builder.control('',Validators.required),
      Password:this.builder.control('',Validators.required)
    })
  }
  gotodashbord(){
    this.router.navigate(["dashbord"]);
  }
  onLogin(loginForm:FormGroup){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      this.authService.AuthenticationLogin(this.loginForm.value).subscribe({
        next:(response:UserForLogin)=>{
          console.log(response);
          const user = response;
        if (user) {
          localStorage.setItem('UserName', user.userName);
          localStorage.setItem('token', user.token);
         }
        },error:(err)=>{
          console.log(err?.error.message);
        }
      });
    }else{
        console.log("invalid Data")
        ValidateForms.validateAllFroms(this.loginForm);

    }
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showcart: boolean = false;
  showUser: boolean = false;
  showsearch: boolean = false;
  logo: string = "assets/images/logo.png";

  LoginForm!:FormGroup;
  constructor(private fb:FormBuilder,private router:Router) { }
  ngOnInit():void {
    this.LoginForm=this.fb.group({
      UserName:['',Validators.required],
      password :['',Validators.required]
    });
}

  mycart() {
    // this.active = true;
    if (this.showcart == false) {
      this.showcart = true;
      this.showUser = false
      this.showsearch = false;
    }
    else {
      this.showcart = false;
    }
  }
  myuser() {
    if (this.showUser == false) {
      this.showUser = true;
      this.showcart = false;
      this.showsearch = false;
    }
    else {
      this.showUser = false;
    }
  }
  mymenu() {
    if (this.showsearch == false) {
      this.showsearch = true;
      this.showcart = false;
      this.showUser = false;

    }
    else {
      this.showsearch = false;
    }

  }
  onsubmit(){
    if(this.LoginForm.valid){
      console.log(this.LoginForm.value)

    }
    else{
        console.log("Some Error on Email or password ! ")
    }
  }
  onNavigate(){
    this.router.navigateByUrl('/New-User')
  }

}

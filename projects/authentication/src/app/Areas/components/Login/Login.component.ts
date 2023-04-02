import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-Login',
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router:Router) { }

  ngOnInit() {
  }
  OnLogin(loginForm:NgForm){
    console.log(loginForm.value);
    this.

  }
  gotodashbord(){
    this.router.navigate(["dashbord"]);
  }

}

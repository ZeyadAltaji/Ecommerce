import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'projects/my-app/src/environments/environment.development';

@Component({
  selector: 'app-Error',
  templateUrl: './Error.component.html',
  styleUrls: ['./Error.component.css']
})
export class ErrorComponent implements OnInit {


  constructor(private titleService:Title) {
    this.titleService.setTitle('Error Page !')
   }

    gotohomepage(){
      window.location.href= environment.Ecommerce_url;
    }
  ngOnInit() {
  }

}

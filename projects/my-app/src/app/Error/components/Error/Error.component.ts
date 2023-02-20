import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-Error',
  templateUrl: './Error.component.html',
  styleUrls: ['./Error.component.css']
})
export class ErrorComponent implements OnInit {


  constructor(private titleService:Title) {
    this.titleService.setTitle('Error Page !')
   }


  ngOnInit() {
  }

}

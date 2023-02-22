import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-page-home',
  templateUrl: './sub-page-home.component.html',
  styleUrls: ['./sub-page-home.component.css']
})
export class SubPageHomeComponent implements OnInit {
   profile:string="assets/user/zeyad.jpg"
  constructor() { }

  ngOnInit() {
  }

}

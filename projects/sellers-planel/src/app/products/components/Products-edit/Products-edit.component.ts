import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-Products-edit',
  templateUrl: './Products-edit.component.html',
  styleUrls: ['./Products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {

  constructor() { }
   showInputs = false;

  ngOnInit() {
  }
  OnSubmit(){
  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
}

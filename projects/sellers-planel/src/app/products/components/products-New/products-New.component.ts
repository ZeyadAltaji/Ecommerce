import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-New',
  templateUrl: './products-New.component.html',
  styleUrls: ['./products-New.component.css']
})
export class ProductsNewComponent implements OnInit {

  constructor() { }
  showInputs = false;
  NewProductsForm!:FormGroup;

  ngOnInit() {
  }
  OnSubmit(){
  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
}

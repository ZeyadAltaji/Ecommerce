import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';

@Component({
  selector: 'app-products-New',
  templateUrl: './products-New.component.html',
  styleUrls: ['./products-New.component.css']
})
export class ProductsNewComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
   ) { }
  categoriseList: any[] | undefined;
  ngOnInit() {
    this.productService.getAllcategorise().subscribe(data=>{
      this.categoriseList=data;
    console.log(data)
  })
  }

}

import { Component, OnInit } from '@angular/core';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  constructor(public productsService:ProductService) { }

  ngOnInit() {
    this.productsService.GetAllProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
    })
  }

}

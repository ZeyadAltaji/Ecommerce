import { Component, OnInit } from '@angular/core';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  listProducts: IProducts[] | undefined;

  constructor(public productsService:ProductService) { }

  ngOnInit() {
 
    this.productsService.GetAllProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
      console.log(listData);
    },
    error => {
      console.log('httperror:');
      console.log(error);
  });
  }

}

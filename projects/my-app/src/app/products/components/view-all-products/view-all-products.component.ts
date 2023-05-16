import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';

@Component({
  selector: 'app-view-all-products',
  templateUrl: './view-all-products.component.html',
  styleUrls: ['./view-all-products.component.css']
})
export class ViewAllProductsComponent implements OnInit {
  constructor(private productsService: ProductService ,private route: ActivatedRoute,
    private router: Router) {  }
      productsMainId:any;
     productsType:any;
     categoriseMainId:any;
     categoriseType:any;
     product: Product[] | null = []; // declare product as an array of Product objects

     ngOnInit() {
      debugger
      this.categoriseMainId = this.route.snapshot.paramMap.get('id');
      this.categoriseType = this.route.snapshot.paramMap.get('type');
      let categorise = this.productsService.GetProductsBycategorise(this.categoriseMainId, this.categoriseType);
      if (categorise) {
        categorise.subscribe({
          next:(response)=>{
            this.product=response;
          }
        });
      } else {
        // handle the case when products is null
        this.product = null;
      }

      this.productsMainId = this.route.snapshot.paramMap.get('id');
      this.productsType = this.route.snapshot.paramMap.get('type');
      let products = this.productsService.GetProductsByCarOrBrand(this.productsMainId, this.productsType);
      if (products) {
        products.subscribe({
          next:(response)=>{
            this.product=response;
          }
        });
      } else {
        // handle the case when products is null
        this.product = null;
      }
    }

}

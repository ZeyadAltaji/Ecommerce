import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit{
  productId:any;
  subProducts!: SubProducts;
  constructor(private route: ActivatedRoute,
    private router: Router,private SubProducts:SubproductsService) {  }


  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
     let products = this.SubProducts.GetByIdProducts(this.productId);
     if (products) {
      products.subscribe({
        next:(response)=>{
           this.subProducts=response;
          console.log(response)
        }
      });
    }
  }
}

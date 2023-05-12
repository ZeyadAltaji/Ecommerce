import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-single-producte-selft',
  templateUrl: './single-producte-selft.component.html',
  styleUrls: ['./single-producte-selft.component.css']
})
export class SingleProducteSelftComponent implements OnInit{
  constructor(private router:Router,public SubProductsService: SubproductsService,
    private route: ActivatedRoute, ) { }
    productId:any;
    subProducts: SubProducts[] | null = []; // declare product as an array of Product objects

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
     let products = this.SubProductsService.GetByProducts(this.productId);
    if (products) {
      products.subscribe({
        next:(response)=>{
           this.subProducts=response;
          console.log(response)
        }
      });
    } else {
      // handle the case when products is null
      this.subProducts = null;
    }
  }

  gotodelter(){
    this.router.navigate(["/Products-Detail"]);
  }
}

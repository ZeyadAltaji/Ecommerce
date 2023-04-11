import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';

@Component({
  selector: 'app-Products-edit',
  templateUrl: './Products-edit.component.html',
  styleUrls: ['./Products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  @Input()
  public ProductId: number | undefined;
  product = new Product();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductService) { }

  ngOnInit():void {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.productsService.GetByIdProducts(id).subscribe({
            next:(response)=>{
              this.product=response;
            }
          })
        }
      }
    })
  }
}

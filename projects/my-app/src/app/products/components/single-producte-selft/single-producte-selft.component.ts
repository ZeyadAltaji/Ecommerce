import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-single-producte-selft',
  templateUrl: './single-producte-selft.component.html',
  styleUrls: ['./single-producte-selft.component.css']
})
export class SingleProducteSelftComponent implements OnInit{
  constructor(private router:Router,public SubProductsService: SubproductsService,
    private route: ActivatedRoute, private cookieService: CookieService) { }
    productId:any;
    @Input()data:any={};
    @Output()item =new EventEmitter()
    subProducts: SubProducts[] | null = []; // declare product as an array of Product objects
    private cartItems: any[] = [];
    ngOnInit() {
      this.productId = this.route.snapshot.paramMap.get('id');
      let products = this.SubProductsService.GetByProducts(this.productId);
      if (products) {
        products.subscribe({
          next: (response) => {
            this.subProducts = response;
            console.log(response);

            // Save products in localStorage
            const expirationDate = new Date();
            expirationDate.setTime(expirationDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours in milliseconds
            this.cookieService.set('subProducts', JSON.stringify(response), expirationDate);          }
        });
      } else {
        // handle the case when products is null
        this.subProducts = null;
      }
      this.cartItems = this.getCartItems();
    }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cookieService.set('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItems(): any[] {
    const storedItems = this.cookieService.get('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }


}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent {
  constructor(private router:Router) { }

  gotoPayment(){
    this.router.navigate(["/shoppingCartPage/Payment"]);
  }
}

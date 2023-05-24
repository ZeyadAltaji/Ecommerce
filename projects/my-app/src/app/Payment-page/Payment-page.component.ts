import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-Payment-page',
  templateUrl: './Payment-page.component.html',
  styleUrls: ['./Payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
   total : number = 0; // Declare the total as a number

  constructor(private cookieServices:CookieService) { }

  ngOnInit() {
    const storedTotal = this.cookieServices.get('lastTotal'); // Retrieve the value from the cookie
    this.total = storedTotal ? parseInt(storedTotal, 10) : 0;
  }
  cardholder: string = '';
  cardNumber: string = '';
  date: string = '';
  cvv: string = '';

  isPaymentInfoIncomplete(): boolean {
    return !this.cardholder || !this.cardNumber || !this.date || !this.cvv;
  }
}

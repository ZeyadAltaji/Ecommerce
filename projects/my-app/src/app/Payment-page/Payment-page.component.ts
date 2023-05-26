import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-Payment-page',
  templateUrl: './Payment-page.component.html',
  styleUrls: ['./Payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {
   total : number = 0; // Declare the total as a number
   checkoutForm: FormGroup;

  constructor(
    @Inject(CookieService) private cookieServices:CookieService,private formBuilder: FormBuilder) {
      this.checkoutForm = this.formBuilder.group({
        cardholder: ['', Validators.required],
        cardnumber: ['', [Validators.required, Validators.pattern('[0-9]{16}')]],
        date: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\\/?([0-9]{2})$')]],
        verification: ['', [Validators.required, Validators.pattern('[0-9]{3}')]]
      });

    }

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

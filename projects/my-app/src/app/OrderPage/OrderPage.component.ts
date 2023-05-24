import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'projects/dashboard/src/app/Classes/Order';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';

@Component({
  selector: 'app-OrderPage',
  templateUrl: './OrderPage.component.html',
  styleUrls: ['./OrderPage.component.css']
})
export class OrderPageComponent implements OnInit {
  formData: FormData = new FormData();
  NewEmployyesForm!:FormGroup;

  constructor(private cookieServices:CookieService,private fb: FormBuilder,private OrderServices :CartItemService    ){}
  loggedInUser: any; // Declare a variable to store the logged-in user details
  totalPrice:any;
  public user :IUser | undefined;

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.AddNewUserForm();
   }

   OnSubmit() {
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      debugger;
      const customerId = this.loggedInUser.fullUser.id;
      const createdCart = JSON.parse(localStorage.getItem('createdCart') as string); // Type assertion added here
      const cartId = createdCart ? createdCart.id : 0;
      const totalPrice = this.cookieServices.get('totalPrice'); // Retrieve the totalPrice from the cookie

      const order: Order = {
        customerId: customerId,
        fullName: this.FullName.value,
        email: this._Email.value,
        mobile: this._Mobile.value,
        totalPrice: 5166 , // Convert totalPrice to number or default to 0
        shippingAddress: this._Address.value,
        orderStatus: '',
        cartId: cartId
      };

      this.OrderServices.createOrder(order).subscribe(
        (res) => {
          console.log(res);
          // Open the success modal
        }
      );
    }
  }
   showModal() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      modalElement.classList.add('show');
      modalElement.style.display = 'block';
      modalElement.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
    }
  }
    get FullName() {
      return this.NewEmployyesForm.get('FullName') as FormControl;
    }
    get _Email() {
      return this.NewEmployyesForm.get('Email') as FormControl;
    }
    get _Address() {
      return this.NewEmployyesForm.get('Address') as FormControl;
    }
    get _Mobile() {
      return this.NewEmployyesForm.get('Mobile') as FormControl;
    }
  AddNewUserForm() {
    this.NewEmployyesForm = this.fb.group({
      FullName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
       Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
       Address: [null, Validators.required],
       Mobile: [null, Validators.required],

    })
  }


}

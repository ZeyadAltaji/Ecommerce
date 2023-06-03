import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Order } from 'projects/dashboard/src/app/Classes/Order';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';

@Component({
  selector: 'app-OrderPage',
  templateUrl: './OrderPage.component.html',
  styleUrls: ['./OrderPage.component.css'],
})
export class OrderPageComponent implements OnInit {
  formData: FormData = new FormData();
  NewEmployyesForm!: FormGroup;

  constructor(
    @Inject(CookieService) private cookieServices: CookieService,
    private fb: FormBuilder,
    private OrderServices: CartItemService,
    private router:Router
  ) {}
  loggedInUser: any; // Declare a variable to store the logged-in user details
  totalPrice: any;
  public user: IUser | undefined;

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
      const cartIds = localStorage.getItem('cartId'); // Type assertion added here
      const total = localStorage.getItem('total');

      const order: Order = {
        customer_Id: customerId,
        fullName: this.FullName.value,
        email: this._Email.value,
        mobile: this._Mobile.value,
        totalPrice: Number(total),
        shippingAddress: this._Address.value,
        orderStatus: '',
        cartId: Number(cartIds), // Preserve the original value
        id: 0,
      };
      console.log(order);
      this.OrderServices.createOrder(order).subscribe((res) => {
        console.log(res);
        localStorage.clear();
        debugger
        // Open the success modal
        this.showModal();


      });
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
      FullName: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')],
      ],
      Email: [
        null,
        [
          Validators.email,
          Validators.required,
          Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}'),
        ],
      ],
      Address: [null, Validators.required],
      Mobile: [null, Validators.required],
    });
  }
  closeModal() {
    const modal = document.getElementById('successModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none; padding-right: 0;');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop?.parentNode?.removeChild(modalBackdrop);
  }
  OK(){
    this.router.navigate(['/']); // Replace '/' with the desired route for the homepage

  }
}

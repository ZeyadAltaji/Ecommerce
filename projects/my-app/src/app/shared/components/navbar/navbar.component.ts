import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from 'projects/authentication/src/app/Areas/components/Login/Login.component';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import ValidateForms from 'projects/authentication/src/app/Helper/ValidateForms';
import { UserForLogin } from 'projects/authentication/src/app/Models/User';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { CartItem } from 'projects/dashboard/src/app/Classes/CartItem';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';
import { environment } from 'projects/my-app/src/environments/environment.development';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  showcart: boolean = false;
  showUser: boolean = false;
  showsearch: boolean = false;
  logoData!: any;
  loggedInUser: any;
  loginForm!: FormGroup;
  showLoginForm = true;

  private cartItemsKey = 'cartItems';
  maxDisplayedProducts: number = 5;

  cartItems: any[] = [];
  products: any[] = [];

  public user: IUser = {
    id: 0,
    userName: '',
    frist_Name: '',
    last_Name: '',
    email: '',
    password: '',
    comfirmPassword: '',
    passwordKey: '',
    phone1: '',
    phone2: '',
    address: '',
    role: 0,
    userCreate: '',
    userUpdate: '',
    isDelete: false,
    isActive: false,
    public_id: '',
  };
  constructor(
    private fb: FormBuilder,
    public settingservice: SettingService,
    private cookieServices: CookieService,
    private authService: AuthenticationService,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService,
    private cartService: CartItemService
  ) {
    this.cartItems = this.getCartItems();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UserName: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.settingservice.GetByIDlogo(1).subscribe((data) => {
      console.log(data);
      this.logoData = data.isLogoUrl;
    });

    // Update cart items and run change detection every second
    // setInterval(() => {
    this.fetchCartItems();
    // }, 6000);
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
      console.log(this.loggedInUser.fullUser);
    }
    this.showLoginForm = this.cookieService.get('showLoginForm') !== 'false'; // Retrieve showLoginForm value from cookie
  }

  fetchCartItems() {
    debugger;
    const user = this.cookieService.get('loggedInUser');
    this.loggedInUser = user ? JSON.parse(user) : null;

    const products = localStorage.getItem('products');
    this.products = products ? JSON.parse(products) : [];
    const productIds = this.products.map((product: any) => product.id);
    const cartIds = localStorage.getItem('cartId'); // Type assertion added here
    const customerId = this.loggedInUser.fullUser.id;

    debugger;

    this.cartService
      .getCartItemsByCustomerCartId(customerId, Number(cartIds))
      .subscribe(
        (cartItems: CartItem[]) => {
          this.cartItems = cartItems;
          // Retrieve product details for each cart item
          for (const cartItem of this.cartItems) {
            const productId = cartItem.subProductsId;
            this.cartService.getProductsByIds(productId).subscribe(
              (productData: SubProducts) => {
                // Change the parameter type to SubProducts
                const matchingProduct = productData;
                if (matchingProduct) {
                  // Assign additional product details to the cart item
                  cartItem.title = matchingProduct.title;
                  cartItem.isPrimaryImage = matchingProduct.isPrimaryImage;
                  // Include any other required properties
                }
              },
              (error) => {
                console.log('Error fetching product details:', error);
              }
            );
          }

          console.log(this.cartItems);
        },
        (error) => {
          console.log('Error fetching cart items:', error);
        }
      );
  }
  deleteCartItem(itemCartId: number): void {
    console.log(itemCartId);
    this.cartService.deleteCartItem(itemCartId).subscribe(
      () => {
        // Success message or any other action you want to perform
        console.log('Item deleted successfully');
      },
      (error) => {
        // Handle error if deletion fails
        console.error('Error deleting item:', error);
      }
    );
  }
  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      if (item.new_price) {
        total += item.new_price;
      } else {
        total += item.price;
      }
    }
    return total;
  }

  getCartItems(): any[] {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  static GetAppURL(RoleName: number) {
    switch (RoleName) {
      case 1:
        return Environment.AdminURL;
      case 2:
        return Environment.SellerURl;
      case 4:
        return Environment.DeliveryURl;
      default:
        return Environment.AdminURL;
    }
  }
  onLogin(loginForm: FormGroup) {
    if (this.loginForm.valid) {
      this.authService.AuthenticationLogin(this.loginForm.value).subscribe({
        next: (response: UserForLogin) => {
          console.log(response);
          const user = response;
          const role = user.fullUser.role;
          if (user) {
            //admin
            if (role === 1) {
              window.location.href = Environment.AdminURL;
              // If login is successful, hide the login form
              this.showLoginForm = false;
            }
            //sler
            if (role === 2) {
              window.location.href = Environment.AdminURL;

              // If login is successful, hide the login form
              this.showLoginForm = false;
            }
            //clinet
            if (role === 3 && this.cartItems.length > 0) {
              // Redirect to the shopping cart page
              window.location.href = Environment.ClinetURlShop;
              // If login is successful, hide the login form
              this.showLoginForm = false;
            } else {
              // Redirect to the home page

              window.location.href = Environment.ClinetURlHome;

              // If login is successful, hide the login form
              this.showLoginForm = false;
            }

            this.cookieServices.set('loggedInUser', JSON.stringify(user));
            this.cookieService.set('showLoginForm', 'false'); // Store showLoginForm in cookie
          }
        },
        error: (err) => {
          console.log(err?.error.message);
        },
      });
    } else {
      console.log('Invalid Data');
      ValidateForms.validateAllFroms(this.loginForm);
    }
  }
  logout() {
    this.cookieService.delete('showLoginForm'); // Delete showLoginForm cookie on logout
    this.cookieService.delete('loggedInUser'); // Delete showLoginForm cookie on logout

    // Perform any other logout actions if needed
  }
  navigateToNewUser() {
    this.cookieService.set(
      'cartItems',
      JSON.stringify(this.cartItems),
      undefined,
      '/',
      'localhost'
    );
    window.location.href = 'http://localhost:4202/New-User';
  }
  mycart() {
    // this.active = true;
    if (this.showcart == false) {
      this.showcart = true;
      this.showUser = false;
      this.showsearch = false;
    } else {
      this.showcart = false;
    }
  }
  myuser() {
    if (this.showUser == false) {
      this.showUser = true;
      this.showcart = false;
      this.showsearch = false;
    } else {
      this.showUser = false;
    }
  }
  mymenu() {
    if (this.showsearch == false) {
      this.showsearch = true;
      this.showcart = false;
      this.showUser = false;
    } else {
      this.showsearch = false;
    }
  }

  onNavigate() {
    window.location.href = environment.authentication_URL;
  }
  showMore() {
    this.maxDisplayedProducts += 5;
  }
}

import { ChangeDetectorRef, Component, Inject, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'projects/dashboard/src/app/Classes/Cart';
import { CartItem } from 'projects/dashboard/src/app/Classes/CartItem';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css']
})
export class ShoppingcartComponent implements OnInit{
  private cartItemsKey = 'cartItems';
  count: number = 1; // Initial count value
  isLoggedIn: boolean = false; // Variable to track login status
  productData: any[] = []
  popoverVisible = false;
  popoverMessage = "Please log in to make a purchase";
 // Add a private property to store the Id value
 private totalItemPrice: number = 0;

 private _cartId!: number;

 // Add a getter method to return the Id value
 get cartIdentifier(): number {
  return this._cartId;
}


  cartItems: any[] = [];
  cartI: any[] = [];

  loggedInUser: any; // Declare a variable to store the logged-in user details
  public user :IUser | undefined;
  constructor(
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(CookieService) private cookieService:CookieService,
    private cartItemService: CartItemService,

  ) {}

  ngOnInit(): void {
    const userString = this.cookieService.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.isLoggedIn = this.cookieService.check('loggedInUser');
    this.calculateTotal();
  }

  ngAfterViewInit(): void {
    this.updateCartItems();
  }
  showPopover() {
    this.popoverVisible = true;
  }

  hidePopover() {
    this.popoverVisible = false;
  }
  updateCartItems() {
    const storedItems = this.cookieService.get(this.cartItemsKey);
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];

    for (const item of this.cartItems) {
      item.count = 1;
    }
    // Run change detection inside NgZone to update the view
    this.zone.run(() => {
      this.cdr.detectChanges();
    });
  }

  calculateItemPrice(item: any): number {
    const itemPrice = item.new_price ? item.new_price * item.count : item.price * item.count;
    this.totalItemPrice += itemPrice;
    return itemPrice;
  }

  calculateTotal(): number {
    let total = 0;
    for (const item of this.cartItems) {
      if (item.new_price) {
        total += item.new_price * item.count;
      } else {
        total += item.price * item.count;
      }
    }
    if (isNaN(total)) {
      total = 0;
    }
     this.cookieService.set('lastTotal', total.toString(), { expires: 7 }); // Set the cookie with an expiration of 7 days


    // Use the same key for both the totalPrice and the createdCart in the cookieService
    return total;

  }


  getTotalItemPrice(): number {
    let totalItemPrice = 0;
    this.cartItems.forEach(item => {
      const itemPrice = item.new_price ? item.new_price * item.count : item.price * item.count;
      totalItemPrice += itemPrice;
    });
    return totalItemPrice;
  }


  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.cookieService.set(this.cartItemsKey, JSON.stringify(this.cartItems));
       // Delete the cookie after 4 hours
       const expiryDate = new Date();
       expiryDate.setTime(expiryDate.getTime() + 4 * 60 * 60 * 1000); // 4 hours in milliseconds
       this.cookieService.set(this.cartItemsKey, '', expiryDate);
    }
  }

  validateCount(item: any) {
    // Ensure the count is within the valid range
    if (item.count < 1) {
      item.count = 1;
    } else if (item.count > item.quantity) {
      item.count = item.quantity;
    }
    this.calculateTotal();
  }

  // Increment the count
  incrementCount(item: any) {
    // Check if the current count is less than the available quantity in the database
    if (item.count < item.quantity) {
      item.count++;
    }
    this.calculateTotal();
  }
  //  incrementCount() {

  // decrement the count
  decrementCount(item: any) {
    if (item.count > 1) {
      item.count--;
    } else {
      item.count = 1;
    }
    this.calculateTotal();
  }
  calculateTotalPrices(): number {
    let totalPrice = 0;

    this.productData.forEach((product) => {
      if (product.new_price && !product.price) {
        totalPrice += product.new_price;
      } else if (product.price && !product.new_price) {
        totalPrice += product.price;
      }
    });

    return totalPrice;
  }
  getTotalItemCount(): number {
    return this.calculateTotal();
  }

   // Add a private property to store the Id value

   // Add a getter method to return the Id value
   get cartId(): number {
     return this._cartId;
   }
  gotoPayment(): void {
    debugger
    const user = this.cookieService.get('loggedInUser');
    this.loggedInUser = user ? JSON.parse(user) : null;
    const storedItems = this.cookieService.get(this.cartItemsKey);
    this.cartItems = storedItems ? JSON.parse(storedItems) : [];

    // Create the cart
    debugger
    const cart: Cart = {
      Customer_Id: this.loggedInUser.fullUser.id,
      Items: this.cartItems,
     };
     console.log(cart)

    // Create the cart and cart items
    this.cartItemService.createCart(cart).subscribe(
      (createdCart: Cart) => {
        console.log('Created cart ID:', createdCart.id);
        localStorage.setItem('createdCart', JSON.stringify(createdCart));

                const cartItem: CartItem[] = this.cartItems.map((item) => {
                  debugger;
                  const newItem: CartItem = {
                    subProductsId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                    cartId: createdCart.id !== undefined ? createdCart.id : 0,                    // Assign a default value if CartId is undefined

                 // Add the result of calculateItemPrice to the cartItem
                   };
                  return newItem;
                });
                this.getTotalItemPrice()
                this.cartItemService.createCartItem(cartItem).subscribe(
                  () => {
                    console.log('Added an added icon to Itemcart');
                    this.router.navigate(['/shoppingCartPage/Payment']);
                    // Continue with further processing or actions
                  },
                  (error: any) => {
                    console.error('Error adding an added icon to Itemcart:', error);
                  }
                );
              },

      (error: any) => {
        console.error('Error creating cart:', error);
      }
    );

  }
}

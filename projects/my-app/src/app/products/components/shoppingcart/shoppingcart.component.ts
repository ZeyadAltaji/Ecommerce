import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'projects/dashboard/src/app/Classes/Cart';
import { CartItem } from 'projects/dashboard/src/app/Classes/CartItem';
import { Shoppingcart } from 'projects/dashboard/src/app/Classes/Shoppingcart';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.css'],
})
export class ShoppingcartComponent implements OnInit {
  private cartItemsKey = 'cartItems';
  count: number = 1; // Initial count value
  isLoggedIn: boolean = false; // Variable to track login status
  productData: any[] = [];
  popoverVisible = false;
  popoverMessage = 'Please log in to make a purchase';
  // Add a private property to store the Id value
  private totalItemPrice: number = 0;

  private _cartId!: number;

  // Add a getter method to return the Id value
  get cartIdentifier(): number {
    return this._cartId;
  }

  cartItems: any[] = [];
  cartI: any[] = [];
  products: any[] = [];
  totalCount: number = 0;
  totalpriceforproducts: number = 0;

  loggedInUser: any; // Declare a variable to store the logged-in user details
  public user: IUser | undefined;
  constructor(
    private router: Router,
    private zone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(CookieService) private cookieService: CookieService,
    private cartItemService: CartItemService
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
    const products = this.cookieService.get('products');
    this.products = products ? JSON.parse(products) : [];
    const productIds = this.products.map((product: any) => product.id);
    const cartIds = localStorage.getItem('cartId'); // Type assertion added here
    const customerId = this.loggedInUser.fullUser.id;
    this.cartItemService
      .getCartItemsByCustomerCartId(customerId, Number(cartIds))
      .subscribe(
        (cartItems: CartItem[]) => {
          this.cartItems = cartItems;
          console.log('sadkldsj', cartItems);

          // Retrieve product details for each cart item
          for (const cartItem of this.cartItems) {
            const productId = cartItem.subProductsId;
            this.cartItemService.getProductsByIds(productId).subscribe(
              (productData: Shoppingcart) => {
                const matchingProduct = productData;
                if (matchingProduct) {
                  debugger;
                  // Assign additional product details to the cart item
                  cartItem.title = matchingProduct.title;
                  cartItem.isPrimaryImage = matchingProduct.isPrimaryImage;
                  cartItem.quantityselectuser = cartItem.quantity;
                  cartItem.originalPrice = matchingProduct.price;
                  cartItem.new_price = matchingProduct.price;
                  cartItem.count = cartItem.quantity;
                  cartItem.quantity = matchingProduct.quantity;
                  this.totalpriceforproducts += cartItem.price;

                  // Calculate the updated price based on the quantity
                  cartItem.updatedPrice =
                    cartItem.originalPrice * cartItem.quantity;
                }
              },
              (error) => {
                console.log('Error fetching product details:', error);
              }
            );
          }
        },
        (error) => {
          console.log('Error fetching cart items:', error);
        }
      );
  }

  incrementCount(item: Shoppingcart) {
    // Check if the current count is less than the available quantity in the database

    if (item.count < item.quantity) {
      item.count++;
    }
    this.calculateTotal();
  }
  decrementCount(item: Shoppingcart) {
    if (item.count > 1) {
      item.count--;
    } else {
      item.count = 1;
    }
    this.calculateTotal();
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
    return total; // Add this line to return the calculated total
  }
  getTotalItemPrice(): number {
    let totalItemPrice = 0;
    this.cartItems.forEach((item) => {
      const itemPrice = item.new_price
        ? item.new_price * item.count
        : item.price * item.count;
      totalItemPrice += itemPrice;
    });
    return totalItemPrice;
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
  calculateItemPrice(item: Shoppingcart): number {
    const itemPrice = item.new_price
      ? item.new_price * item.count
      : item.price * item.count;
    return itemPrice;
  }
  calculateDiscount(): number {
    return 50; // Return the fixed discount amount of $50
  }

  removeFromCart(itemCartId: number): void {
    console.log(itemCartId);
    this.cartItemService.deleteCartItem(itemCartId).subscribe(
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

  gotoPayment() {
    debugger;
    const cartIds = localStorage.getItem('cartId');

    for (const item of this.cartItems) {
      debugger;
      const updatedItem = {
        id: item.id,
        subProductsId: item.subProductsId, // Preserve the original value
        price: this.calculateItemPrice(item),
        quantity: item.count,
        cartId: Number(cartIds), // Preserve the original value
      };
      console.log('sdasad', updatedItem);
      this.cartItemService.updateItems([updatedItem]).subscribe(
        () => {
          // Success message or any other action you want to perform
          console.log('Item updated successfully');
          this.router.navigate(['/shoppingCartPage/Payment']);
          this.storeTotalInCookie();
        },
        (error) => {
          // Handle error if update fails
          console.error('Error updating item:', error);
        }
      );
    }
  }
  storeTotalInCookie(): void {
    debugger;
    const total = this.calculateTotal() - this.calculateDiscount();
    try {
      localStorage.setItem('total', total.toString());
      console.log('Total stored in cookie successfully.');
    } catch (error) {
      console.error('Error storing total in cookie:', error);
    }
  }
  retrieveTotalFromCookie(): number {
    let storedTotal = 0;
    try {
      const cookieValue = localStorage.getItem('total');
      if (cookieValue) {
        storedTotal = parseFloat(cookieValue);
        console.log('Total retrieved from cookie successfully.');
      }
    } catch (error) {
      console.error('Error retrieving total from cookie:', error);
    }
    return storedTotal;
  }

  displayTotal(): void {
    const total = this.retrieveTotalFromCookie();
    console.log('Total:', total);
  }
}

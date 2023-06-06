import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cart } from 'projects/dashboard/src/app/Classes/Cart';
import { CartItem } from 'projects/dashboard/src/app/Classes/CartItem';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-single-producte-selft',
  templateUrl: './single-producte-selft.component.html',
  styleUrls: ['./single-producte-selft.component.css'],
})
export class SingleProducteSelftComponent implements OnInit {
  loggedInUser: any; // Declare a variable to store the logged-in user details

  constructor(
    private router: Router,
    public SubProductsService: SubproductsService,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private cartItemService: CartItemService
  ) {}
  productId: any;
  @Input() data: any = {};
  @Output() item = new EventEmitter();
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
          this.cookieService.set(
            'subProducts',
            JSON.stringify(response),
            expirationDate
          );
        },
      });
    } else {
      // handle the case when products is null
      this.subProducts = null;
    }
    this.cartItems = this.getCartItems();
    this.createToCart();
  }
  addToCart(product: any) {
    // Retrieve the cartId from the cookie
    const cartId = localStorage.getItem('cartId');

    if (cartId) {
      if (this.isProductInCart(product)) {
        console.log('Product is already in the cart.');
        return; // Exit the function to prevent duplicate addition
      }
      // Create a new cart item
      const cartItem: CartItem = {
        subProductsId: product.id,
        quantity: 1,
        price: product.price,
        cartId: +cartId, // Convert cartId to number
        id: 0,
      };

      // Add the cart item to the backend
      this.cartItemService.createCartItem([cartItem]).subscribe({
        next: (response) => {
          debugger;
          console.log('CartItem created:', response);

          // Retrieve existing products from the products cookie
          const products = this.getProductsFromCookie() || [];

          // Push the new product
          products.push(product);

          // Save the updated products to the products cookie
          this.saveProductsToCookie(products);
        },
        error: (error) => {
          console.error('Failed to create cart item:', error);
        },
      });
    } else {
      console.log('No cartId found in the cookie.');
    }
  }
  isProductInCart(product: any): boolean {
    // Retrieve existing products from the products cookie
    const products = this.getProductsFromCookie() || [];

    // Check if the product is already in the products array
    return products.some((p: any) => p.id === product.id);
  }
  // Retrieve products from the products cookie
  getProductsFromCookie(): any[] {
    const productsString = localStorage.getItem('products');
    return productsString ? JSON.parse(productsString) : [];
  }

  // Save products to the products cookie
  saveProductsToCookie(products: any[]) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  // Retrieve cart items from the cartItems cookie
  getCartItemsFromCookie(): CartItem[] {
    const cartItemsString = localStorage.getItem('cartItems');
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }

  // Save cart items to the cartItems cookie
  saveCartItemsToCookie(cartItems: CartItem[]) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  createToCart(): void {
    debugger
    // Check if the user is logged in
    const user =this.cookieService.get('loggedInUser');
    this.loggedInUser = user ? JSON.parse(user) : null;

    // Check if the cart exists in localStorage
    const cartStorage = localStorage.getItem('cart');

    if (!cartStorage) {
      // Create a new cart
      const cart: Cart = {
        Customer_Id: this.loggedInUser.fullUser.id,
      };

      // Add the cart item to the backend
      this.cartItemService.createCart(cart).subscribe({
        next: (response) => {
          console.log('CartItem created:', response);

          // Store the cart in localStorage
          localStorage.setItem('cart', JSON.stringify(cart));

          // Store the cart's id in localStorage
          localStorage.setItem('cartId', response.id.toString());

          // Store the customer's id in localStorage
          localStorage.setItem('customerId', cart.Customer_Id.toString());
        },
        error: (error) => {
          console.error('Failed to create cart item:', error);
        },
      });
    } else {
      console.log('Cart already exists in localStorage.');
    }
  }
  getCartItems(): any[] {
    const storedItems = this.cookieService.get('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  }
  GoToShooping(){

  }
}

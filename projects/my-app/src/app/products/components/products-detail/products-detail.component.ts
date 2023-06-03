import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CartItem } from 'projects/dashboard/src/app/Classes/CartItem';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css'],
})
export class ProductsDetailComponent implements OnInit {
  productId: any;
  count = 1; // Initial quantity
  totalPrice!: number; // Total price variable
  agreeTerms = false; // Checkbox selection variable

  subProducts!: SubProducts;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private SubProducts: SubproductsService,
    private cookieService: CookieService,
    private cartItemService: CartItemService
  ) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
    let products = this.SubProducts.GetByIdProducts(this.productId);
    if (products) {
      products.subscribe({
        next: (response) => {
          this.subProducts = response;
          console.log(response);
          this.calculateTotalPrice();
        },
      });
    }
  }
  decreaseQuantity() {
    if (this.count > 1) {
      this.count--;
      this.calculateTotalPrice();
    }
  }
  increaseQuantity() {
    this.count++;
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): number {
    if (this.subProducts) {
      this.totalPrice = this.subProducts.new_price * this.count;
    }
    return 0; // Return a default value if subProducts is not defined
  }
  calculateItemPrice(): number {
    debugger;
    this.totalPrice = this.subProducts.new_price
      ? this.subProducts.new_price * this.count
      : this.subProducts.price * this.count;
    // Update totalPrice if needed

    return this.totalPrice;
  }
  addToCart(product: any) {
    debugger;
    const cartIds = this.cookieService.get('cartId');
    if (cartIds) {
      if (this.isProductInCart(product)) {
        console.log('Product is already in the cart.');
        return; // Exit the function to prevent duplicate addition
      }
      const cartItem: CartItem = {
        subProductsId: this.subProducts.id,
        quantity: this.count,
        price: this.calculateItemPrice(),
        id: 0,
        cartId: +cartIds,
      };

      console.log(cartItem);
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
    const productsString = this.cookieService.get('products');
    return productsString ? JSON.parse(productsString) : [];
  }

  // Save products to the products cookie
  saveProductsToCookie(products: any[]) {
    this.cookieService.set('products', JSON.stringify(products));
  }

  // Retrieve cart items from the cartItems cookie
  getCartItemsFromCookie(): CartItem[] {
    const cartItemsString = this.cookieService.get('cartItems');
    return cartItemsString ? JSON.parse(cartItemsString) : [];
  }

  // Save cart items to the cartItems cookie
  saveCartItemsToCookie(cartItems: CartItem[]) {
    this.cookieService.set('cartItems', JSON.stringify(cartItems));
  }
}

import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { ISubProducts } from 'projects/dashboard/src/app/Models/ISubProducts';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  constructor(
    private cookieServices: CookieService,
    public productsService: SubproductsService,
    private carService: CarService,
    private brandsService: BrandsService,
    private CategoryService: CategoriseService,
    private Productsservice: ProductService
  ) {}

  product = new SubProducts();
  isAccordionOpen = false;
  loggedInUser: any;
  public user: IUser | undefined;
  public listProducts: Product[] | undefined;
  categoriseList: any[] | undefined;
  CarsList: any[] | undefined;
  BrandList: any[] | undefined;
  ProductsList: any[] | undefined;

  showPrimaryImage = '';

  ngOnInit() {
    debugger;
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
      const userId = this.loggedInUser.fullUser.id; // Get the user ID from the logged-in user
      this.productsService.ProductsByUserId(userId).subscribe(
        (listData) => {
          this.productsService.listProducts = listData;
        },
        (error) => {
          console.log('httperror:');
          console.log(error);
        }
      );
    }
    this.CategoryService.GetAllCategorise().subscribe((data) => {
      this.categoriseList = data;
    });
    this.carService.GetAllCars().subscribe((data) => {
      this.CarsList = data;
    });
    this.brandsService.GetAllBrands().subscribe((data) => {
      this.BrandList = data;
    });
    this.Productsservice.GetAllProducts().subscribe((data) => {
      debugger;
      this.ProductsList = data;
    });
  }
  updateSpecialProduct(product: ISubProducts): void {
    debugger;
    product.isSpecialProduct = !product.isSpecialProduct; // Toggle the checkbox value

    // Send an HTTP PUT request to update the product in the database
    this.productsService.UpdateProducts(this.createFormData(product)).subscribe(
      (updatedProduct: SubProducts) => {
        // Product updated successfully
        console.log('Product updated:', updatedProduct);
      },
      (error: any) => {
        // Handle error
        console.error('Failed to update product:', error);
        // Reset the checkbox value to its previous state
        product.isSpecialProduct = !product.isSpecialProduct;
      }
    );
  }
  createFormData(product: ISubProducts): FormData {
    debugger;
    const formData = new FormData();
    // Append product properties to the form data
    formData.append('id', product.id.toString());
    formData.append('isSpecialProduct', product.isSpecialProduct.toString());
    // Append other properties if needed
    // formData.append('propertyKey', propertyValue);

    return formData;
  }
  openModal(id: number) {
    this.productsService.GetByIdModal(id).subscribe((response) => {
      this.product = response;
      this.showPrimaryImage = `assets/image/SubProduct/${response.isPrimaryImage}`;
      const modal = document.getElementById('productModal');
      modal?.classList.add('show');
      modal?.setAttribute('style', 'display: block; padding-right: 17px;');
      const modalBackdrop = document.createElement('div');
      modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(modalBackdrop);
    });
  }
  closeModal() {
    const modal = document.getElementById('productModal');
    modal?.classList.remove('show');
    modal?.setAttribute('style', 'display: none; padding-right: 0;');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    modalBackdrop?.parentNode?.removeChild(modalBackdrop);
  }
  DeleteMehtods(id: number) {}
  toggleAccordion(): void {
    this.isAccordionOpen = !this.isAccordionOpen;
  }

  showAccordion(): void {
    this.isAccordionOpen = true;
  }

  hideAccordion(): void {
    this.isAccordionOpen = false;
  }
}

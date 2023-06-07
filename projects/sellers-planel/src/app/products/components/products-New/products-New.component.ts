import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';

import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { ISubProducts } from 'projects/dashboard/src/app/Models/ISubProducts';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
@Component({
  selector: 'app-products-New',
  templateUrl: './products-New.component.html',
  styleUrls: ['./products-New.component.css'],
})
export class ProductsNewComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private productService: SubproductsService,
    private carService: CarService,
    private brandsService: BrandsService,
    private CategoryService: CategoriseService,
    private Productsservice: ProductService,
    private sweetAlertService: SweetAlertService,
    private cookieServices: CookieService
  ) {}
  product = new SubProducts();
  categoriseList: any[] | undefined;
  CarsList: any[] | undefined;
  BrandList: any[] | undefined;
  ProductsList: any[] | undefined;

  NewProductsForm!: FormGroup;
  showInputs = false;
  propertyView: ISubProducts = {
    id: 0,
    serial_Id: '',
    title: '',
    price: 0,
    quantity: 0,
    offers: 0,
    new_price: 0,
    UserId: 0,
    admin_Id: 0,
    createDate: '',
    isActive: false,
    isDelete: false,
    cars: '',
    category: '',
    brands: '',
    description: '',
    isPrimaryImage: '',
    Primary_Image: '',
    Products: '',
    brandsId: 0,
    categoryId: 0,
    carId: 0,
    productId: 0,
    isSpecialProduct: false,
  };
  loggedInUser: any;
  public user: IUser | undefined;
  formData: FormData = new FormData();
  @ViewChild('PrimaryImage') PrimaryImage?: ElementRef;
  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.AddNewProductsForm();
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
      this.ProductsList = data;
      console.log(data);
    });
  }
  OnSubmit() {
    if (this.NewProductsForm.valid) {
      if (this.loggedInUser && this.loggedInUser.fullUser) {
        debugger;
        const adminId = this.loggedInUser.fullUser.id; // Get the adminid from the logged-in user
        const username = this.loggedInUser.fullUser.userName; // Get the adminid from the logged-in user
        this.MapProducts(adminId, username); // Pass the adminid to the MapBrands method
        this.productService.AddProducts(this.formData).subscribe(
          (data) => {
            this.sweetAlertService.success(
              'Success',
              'Products added successfully.'
            );
            this.router.navigate(['/Prodcuts']);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }
  AddNewProductsForm() {
    this.NewProductsForm = this.fb.group({
      Serial_Id: [null],


      NameProducts: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,10}')],
      ],
      PriceProducts: [null, Validators.required],
      Categorise: [null, Validators.required],
      Cars: [null, Validators.required],
      Brands: [null, Validators.required],
      Products: [null, Validators.required],
      Quantity: [null, Validators.required],
      Description: [null, Validators.required],
      newprice: [null],
      Offer: [null],
      isActive: false,
      isSpecialProduct: false,
      Primary_Image: [null, Validators.required],
    });
  }
  get _SerialId() {
    return this.NewProductsForm.controls['Serial_Id'] as FormGroup;
  }
  get _NameProducts() {
    return this.NewProductsForm.controls['NameProducts'] as FormGroup;
  }
  get _PriceProducts() {
    return this.NewProductsForm.controls['PriceProducts'] as FormGroup;
  }
  get _Categorise() {
    return this.NewProductsForm.controls['Categorise'] as FormGroup;
  }
  get _Cars() {
    return this.NewProductsForm.controls['Cars'] as FormGroup;
  }
  get _Brands() {
    return this.NewProductsForm.controls['Brands'] as FormGroup;
  }
  get products() {
    return this.NewProductsForm.controls['Products'] as FormGroup;
  }
  get _Description() {
    return this.NewProductsForm.controls['Description'] as FormGroup;
  }
  get _Quantity() {
    return this.NewProductsForm.controls['Quantity'] as FormGroup;
  }
  get _new_price() {
    return this.NewProductsForm.controls['newprice'] as FormGroup;
  }

  get _offers() {
    return this.NewProductsForm.controls['Offer'] as FormGroup;
  }

  get _isActive() {
    return this.NewProductsForm.controls['isActive'] as FormGroup;
  }
  get _isSpecialProduct() {
    return this.NewProductsForm.controls['isSpecialProduct'] as FormGroup;
  }
  get _Primary_Image() {
    return this.NewProductsForm.controls['Primary_Image'] as FormGroup;
  }
  MapProducts(adminId: number, UserCreate: string) {
    debugger;
    this.formData = new FormData();
    this.formData.append('Serial_Id', this._SerialId.value);
    this.formData.append('Title', this._NameProducts.value);
    this.formData.append('Description', this._Description.value);
    this.formData.append('Price', this._PriceProducts.value.toString());

    const offersValue = this._offers.value != null ? this._offers.value : '';
  this.formData.append('Offers', offersValue);

  // Calculate the new price based on the offers value
  const price = parseFloat(this._PriceProducts.value);
  const offers = parseFloat(this._offers.value);
  const validOffers = isNaN(offers) ? 0 : offers; // Set to 0 if offers is NaN

  // const newPrice = (price - (price * (offers / 100))).toFixed(2);
  const newPrice = validOffers === 0 ? '' : (price - (price * (validOffers / 100))).toFixed(2);





  // this.formData.append('new_price', isNaN(newPrice) ? '' : newPrice);


  this.formData.append('new_price', newPrice !== '' ? newPrice : '');
    this.formData.append('Brands_Id', this._Brands.value);
    this.formData.append('Car_Id', this._Cars.value);
    this.formData.append('productId', this.products.value);
    this.formData.append('Category_Id', this._Categorise.value);
    this.formData.append('Quantity', this._Quantity.value);
    let Primary_Image = this.PrimaryImage?.nativeElement.files[0];
    this.formData.append('Primary_Image', Primary_Image);
    this.formData.append('Admin_Id', adminId.toString());
    this.formData.append('UserCreate', UserCreate);
    this.formData.append(
      'isSpecialProduct',
      this._isSpecialProduct.value.toString()
    );
    this.formData.append('isActive', this._isActive.value.toString());
  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
  HandleFilePrimaryimages(event: any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById(
          'PrimaryImage'
        ) as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    }
  }
  calculateNewPrice() {
    const price = parseFloat(this._PriceProducts.value);
    const offers = parseFloat(this._offers.value);
    const newPrice = (price - price * (offers / 100)).toFixed(2);
    return newPrice;
  }
}

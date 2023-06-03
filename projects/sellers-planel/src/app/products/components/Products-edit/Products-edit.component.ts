import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
import { ISubProducts } from 'projects/dashboard/src/app/Models/ISubProducts';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';
@Component({
  selector: 'app-Products-edit',
  templateUrl: './Products-edit.component.html',
  styleUrls: ['./Products-edit.component.css'],
})
export class ProductsEditComponent implements OnInit {
  @Input()
  public ProductId: number | undefined;
  EditProductsForm!: FormGroup;
  categoriseList: any[] | undefined;
  CarsList: any[] | undefined;
  BrandList: any[] | undefined;
  ProductsList: any[] | undefined;

  product = new SubProducts();
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
  productsId: any;
  showPrimaryImage = '';
  showForeignImage1 = '';
  showForeignImage2 = '';
  Primary_Image!: File;
  Foreign_Image1!: File;
  Foreign_Image2!: File;
  serial_Id: any;
  title: any;
  description: any;
  price: any;
  offers: any;
  new_price: any;
  quantity: any;
  brands_Id: any;
  car_Id: any;
  productId: any;
  isSpecialProduct!: any;
  category_Id: any;
  IsActive: any;
  loggedInUser: any;
  public user: IUser | undefined;
  formData: FormData = new FormData();
  @ViewChild('PrimaryImage') PrimaryImage?: ElementRef;
  selectedCategory: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: SubproductsService,
    private fb: FormBuilder,
    private carService: CarService,
    private CategoryService: CategoriseService,
    private brandsService: BrandsService,
    private sweetService: SweetAlertService,
    private Productsservice: ProductService,
    private cookieServices: CookieService
  ) {}

  ngOnInit(): void {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.EditProductForm();
    this.productsId = this.route.snapshot.params['id'];
    this.productsService.GetByIdProducts(this.productsId).subscribe({
      next: (response) => {
        this.product = response;
        debugger;
        this.showPrimaryImage = `http://localhost:4203/assets/image/SubProduct/${response.isPrimaryImage}`;
        this.serial_Id = this.EditProductsForm.controls['Serial_Id'].setValue(
          this.product.serial_Id
        );
        this.title = this.EditProductsForm.controls['NameProducts'].setValue(
          this.product.title
        );
        this.description = this.EditProductsForm.controls[
          'Description'
        ].setValue(this.product.description);
        this.price = this.EditProductsForm.controls['PriceProducts'].setValue(
          this.product.price
        );
        this.offers = this.EditProductsForm.controls['Offer'].setValue(
          this.product.offers
        );
        this.new_price = this.EditProductsForm.controls['newprice'].setValue(
          this.product.new_price
        );
        this.quantity = this.EditProductsForm.controls['Quantity'].setValue(
          this.product.quantity
        );
        this.brands_Id = this.EditProductsForm.controls['Brands'].setValue(
          this.product.brandsId
        );
        this.car_Id = this.EditProductsForm.controls['Cars'].setValue(
          this.product.carId
        );
        this.productId = this.EditProductsForm.controls['Products'].setValue(
          this.product.productId
        );
        this.category_Id = this.EditProductsForm.controls[
          'Categorise'
        ].setValue(this.product.categoryId);
        this.IsActive = this.EditProductsForm.controls['isActive'].setValue(
          this.product.isActive == true
        );
        this.isSpecialProduct = this.EditProductsForm.controls[
          'isSpecialProduct'
        ].setValue(this.product.isSpecialProduct == true);
      },
    });

    this.EditProductsForm.patchValue({
      Categorise: this.product.categoryId,
      Cars: this.product.carId,
      Brands: this.product.brandsId,
      product: this.product.productId,
    });
    this.CategoryService.GetAllCategorise().subscribe((data) => {
      this.categoriseList = data;
      this.selectedCategory =
        this.categoriseList.find((c) => c.id === this.product.categoryId)
          ?.name || '';
    });
    this.carService.GetAllCars().subscribe((data) => {
      this.CarsList = data;
      console.log(data);
      this.propertyView.cars =
        this.CarsList.find((c) => c.id === this.product.carId)?.id || '';
    });
    this.brandsService.GetAllBrands().subscribe((data) => {
      this.BrandList = data;
      this.propertyView.brands =
        this.BrandList.find((b) => b.id === this.product.brandsId)?.id || '';
    });
    this.Productsservice.GetAllProducts().subscribe((data) => {
      this.ProductsList = data;
      console.log(data);
      this.productId = this.product.productId;

      this.propertyView.brands =
        this.ProductsList.find((b) => b.id === this.product.productId)?.id ||
        '';
    });
  }
  EditProductForm() {
    this.EditProductsForm = this.fb.group({
      Serial_Id: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,10}')],
      ],
      NameProducts: [
        null,
        [Validators.required, Validators.pattern('[a-zA-Z0-9]{1,10}')],
      ],
      PriceProducts: [null, Validators.required],

      newprice: [null],
      Offer: null,
      isActive: false,
      isSpecialProduct: false,
      Categorise: [null, Validators.required],
      Cars: [null, Validators.required],
      Brands: [null, Validators.required],
      Products: [null, Validators.required],

      Quantity: [null, Validators.required],
      Description: [null, Validators.required],
      Primary_Image: [null, Validators.required],
    });
  }
  OnSubmit() {
    debugger;
    debugger;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      debugger;
      const username = this.loggedInUser.fullUser.userName;
      this.route.paramMap.subscribe({
        next: (params) => {
          const id = params.get('id');
          if (id) {
            debugger;

            const fd = new FormData();
            let imageFile = this.PrimaryImage?.nativeElement.files[0];
            fd.append('Primary_Image', imageFile);
            fd.append('Serial_Id', this._SerialId.value);
            fd.append('Title', this._NameProducts.value);
            fd.append('Description', this._Description.value);
            fd.append('Price', this._PriceProducts.value);

            fd.append('Offers', this._offers.value);
            const price = parseFloat(this._PriceProducts.value);
            const offers = parseFloat(this._offers.value);
            const newPrice = (price - price * (offers / 100)).toFixed(2);
            fd.append('New_price', newPrice.toString());
            // fd.append('New_price', this.new_priceProducts.value);
            fd.append('Quantity', this._Quantity.value);
            fd.append('Brands_Id', this._Brands.value);
            fd.append('productId', this._Brands.value);
            fd.append('Car_Id', this._Cars.value);
            const activeValue = this._isActive.value || false;
            const specialProductValue = this._isSpecialProduct.value || false;

            // Store true or false in FormData based on the values
            fd.append('isActive', activeValue ? 'true' : 'false');
            fd.append(
              'isSpecialProduct',
              specialProductValue ? 'true' : 'false'
            );
            fd.append('Category_Id', this._Categorise.value);
            fd.append('userUpdate', this.loggedInUser.fullUser.userName); // Show a warning message before updating the brand

            fd.append('id', id.toString());
            if (this.Primary_Image) {
              // check if a new image is selected
              fd.append(
                'Primary_Image',
                this.Primary_Image,
                this.Primary_Image.name
              );
            }

            // Show a warning message before updating the brand
            this.sweetService
              .warning('Are you sure?', 'Do you want to update this product?')
              .then((willUpdate) => {
                if (willUpdate) {
                  this.productsService.UpdateProducts(fd).subscribe(
                    (data) => {
                      // Show a success message after the product has been updated
                      this.sweetService.success(
                        'Success',
                        'The product has been successfully Updatedd'
                      );

                      this.router.navigate(['/Prodcuts']);
                    },
                    (ex) => {
                      this.sweetService.error(
                        'Errors ! ',
                        "There's something wrong with data entry!"
                      );
                    }
                  );
                }
              });
          }
        },
      });
    }
  }
  calculateNewPrice() {
    const price = parseFloat(this._PriceProducts.value);
    const offers = parseFloat(this._offers.value);
    const newPrice = (price - price * (offers / 100)).toFixed(2);
    return newPrice;
  }
  get _SerialId() {
    return this.EditProductsForm.controls['Serial_Id'] as FormGroup;
  }
  get _NameProducts() {
    return this.EditProductsForm.controls['NameProducts'] as FormGroup;
  }
  get _PriceProducts() {
    return this.EditProductsForm.controls['PriceProducts'] as FormGroup;
  }
  get new_priceProducts() {
    return this.EditProductsForm.controls['newprice'] as FormGroup;
  }
  get _Categorise() {
    return this.EditProductsForm.controls['Categorise'] as FormGroup;
  }
  get _Cars() {
    return this.EditProductsForm.controls['Cars'] as FormGroup;
  }
  get _Brands() {
    return this.EditProductsForm.controls['Brands'] as FormGroup;
  }
  get Products() {
    return this.EditProductsForm.controls['Products'] as FormGroup;
  }
  get _Description() {
    return this.EditProductsForm.controls['Description'] as FormGroup;
  }
  get _Quantity() {
    return this.EditProductsForm.controls['Quantity'] as FormGroup;
  }
  get _offers() {
    return this.EditProductsForm.controls['Offer'] as FormGroup;
  }
  get _isActive() {
    return this.EditProductsForm.controls['isActive'] as FormControl;
  }
  get _isSpecialProduct() {
    return this.EditProductsForm.controls['isSpecialProduct'] as FormControl;
  }
  MapProducts(): void {
    this.product.title = this._NameProducts.value;
    this.product.serial_Id = this._SerialId.value;
    this.product.price = this._PriceProducts.value;
    this.product.quantity = this._Quantity.value;
    this.product.description = this._Description.value;
    this.product.brandsId = this._Brands.value;
    this.product.carId = this._Cars.value;
    this.product.productId = this.Products.value;
    this.product.categoryId = this._Categorise.value;
    this.product.isActive = this._isActive.value;
    this.product.isSpecialProduct = this._isSpecialProduct.value;

    if (this.new_priceProducts && this._offers) {
      this.product.new_price = this.new_priceProducts.value;
      this.product.offers = this._offers.value;
    }
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
}

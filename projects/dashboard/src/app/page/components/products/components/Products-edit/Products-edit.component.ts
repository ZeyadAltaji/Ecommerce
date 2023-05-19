import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';
import { __values } from 'tslib';

@Component({
  selector: 'app-Products-edit',
  templateUrl: './Products-edit.component.html',
  styleUrls: ['./Products-edit.component.css']
})
export class ProductsEditComponent implements OnInit {
  @Input()
  public ProductId: number | undefined;
  EditProductsForm!:FormGroup;
  categoriseList: any[] | undefined;
  CarsList:any[]|undefined;
  BrandList:any[]|undefined;
  product = new Product();
  showInputs = false;
  propertyView: IProducts = {
    id: 0,
    title: '',
    UserId: 0,
    admin_Id: 0,
    createDate: '',
    isActive: false,
    isDelete: false,
    cars: '',
    category: '',
    brands: '',
    brands_Id: 0,
    category_Id: 0,
    car_Id: 0,
    isPrimaryImage: '',
    isForeignImage1: '',
    isForeignImage2: '',
    Primary_Image: '',
    ForeignImage1: '',
    ForeignImage2: '',
    userCreate: '',
    userUpdate: ''
  };
  productsId:any;
  showPrimaryImage = '';
  showForeignImage1='';
  showForeignImage2='';
  Primary_Image!:File;
  Foreign_Image1!:File;
  Foreign_Image2!:File;
  serial_Id:any;
  title:any;
  description:any;
  price:any;
  offers:any;
  new_price:any;
  quantity:any;
  brands_Id:any;
  car_Id:any;
  category_Id:any;
  IsActive: any;
  loggedInUser: any;
  public user :IUser | undefined;
  formData: FormData = new FormData();
  @ViewChild('PrimaryImage') PrimaryImage?: ElementRef;
  @ViewChild('ForeignImage1') ForeignImage1?: ElementRef;
  @ViewChild('ForeignImage2') ForeignImage2?: ElementRef;
  selectedCategory: string = '';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductService,
              private fb: FormBuilder,
              private carService:CarService,
              private brandsService:BrandsService,
              private sweetService:SweetAlertService,
              private cookieServices:CookieService) { }

  ngOnInit():void {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.EditProductForm();
    this.productsId=this.route.snapshot.params['id'];
    this.productsService.GetByIdProducts(this.productsId).subscribe({
      next:(response)=>{
          this.product=response;
           
          this.showPrimaryImage = `assets/image/Products/${response.isPrimaryImage}`;
          this.showForeignImage1 = `assets/image/Products/${response.isForeignImage1}`;
          this.showForeignImage2 = `assets/image/Products/${response.isForeignImage1}`;
          this.title = this.EditProductsForm.controls['NameProducts'].setValue(this.product.title);
          this.brands_Id = this.EditProductsForm.controls['Brands'].setValue(this.product.brands_Id);
          this.car_Id = this.EditProductsForm.controls['Cars'].setValue(this.product.car_Id);
          this.category_Id = this.EditProductsForm.controls['Categorise'].setValue(this.product.category_Id);
           this.IsActive=this.EditProductsForm.controls['Active'].setValue(this.product.isActive);
        }
    });
     
    this.EditProductsForm.patchValue({
      
      Categorise: this.product.category_Id,
      Cars: this.product.car_Id,
      Brands: this.product.brands_Id,
    });

 
    this.productsService.getAllcategorise().subscribe(data=>{
       
      this.categoriseList=data;
       this.selectedCategory = this.categoriseList.find(c => c.id === this.product.category_Id)?.name || '';

   });
  this.carService.GetAllCars().subscribe(data=>{
    this.CarsList=data;
    this.propertyView.cars = this.CarsList.find(c => c.id === this.product.car_Id)?.id || '';

   });
  this.brandsService.GetAllBrands().subscribe(data=>{
    this.BrandList=data;
    this.propertyView.brands = this.BrandList.find(b => b.id === this.product.brands_Id)?.id || '';

   });
  }

  EditProductForm() {
    this.EditProductsForm = this.fb.group({
      Serial_Id: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      NameProducts: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      PriceProducts: [null, Validators.required],

      newprice: [null],
      Offer: null,
      Active: false,

      Categorise: [null,Validators.required],
      Cars: [null, Validators.required],
      Brands: [null, Validators.required],
      Quantity:[null, Validators.required],
      Description:[null,Validators.required],
      Primary_Image:[null, Validators.required],
      Foreign_Image1:[null, Validators.required],
      Foreign_Image2:[null, Validators.required]

    });
  }
  OnSubmit(){
    debugger
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      const username = this.loggedInUser.fullUser.userName;
      this.route.paramMap.subscribe({
        next:(params)=>{
           const id=params.get('id');
          if(id){
            debugger
            const fd = new FormData();
            let imageFile = this.PrimaryImage?.nativeElement.files[0];
            fd.append('Primary_Image', imageFile);
            let imageFile1 = this.ForeignImage1?.nativeElement.files[0];
            fd.append('ForeignImage1', imageFile1);
            let imageFile2 = this.ForeignImage2?.nativeElement.files[0];
            fd.append('ForeignImage2', imageFile2);
             fd.append('Title', this._NameProducts.value);
 
            fd.append('Brands_Id', this._Brands.value);
            fd.append('Car_Id', this._Cars.value);
            fd.append('Category_Id', this._Categorise.value);
            fd.append('userUpdate', this.loggedInUser.fullUser.userName);           // Show a warning message before updating the brand

            fd.append('id', id.toString());
            if (this.Primary_Image) { // check if a new image is selected
              fd.append('Primary_Image', this.Primary_Image, this.Primary_Image.name);
            }
            if (this.Foreign_Image1) { // check if a new image is selected
              fd.append('ForeignImage1', this.Foreign_Image1, this.Foreign_Image1.name);
            }
            if (this.Foreign_Image2) { // check if a new image is selected
              fd.append('ForeignImage2', this.Foreign_Image2, this.Foreign_Image2.name);
            }
              // Show a warning message before updating the brand
              this.sweetService.warning("Are you sure?", "Do you want to update this product?")
              .then((willUpdate) => {
                if (willUpdate) {
  
                  this.productsService.UpdateProducts(fd).subscribe(data => {
                     // Show a success message after the product has been updated
                     this.sweetService.success("Success", "The product has been successfully Updatedd")
  
                    this.router.navigate(['/Prodcuts']);
                  }, ex => {
                    this.sweetService.error("Errors ! ", "There's something wrong with data entry!")
  
                  });
  
                }
  
              })
            }
  
          }
        });
    }
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
  get _Cars(){
    return this.EditProductsForm.controls['Cars'] as FormGroup;
  }
  get _Brands(){
    return this.EditProductsForm.controls['Brands'] as FormGroup;
  }
  get _Description(){
    return this.EditProductsForm.controls['Description'] as FormGroup;
  }
  get _Quantity(){
        return this.EditProductsForm.controls['Quantity'] as FormGroup;

  }
  get _offers(){
    return this.EditProductsForm.controls['Offer'] as FormGroup;
  }
  get _isActive(){
        return this.EditProductsForm.controls['Active'] as FormGroup;

  }
  MapProducts():void{
    this.product.title = this._NameProducts.value;

    this.product.brands_Id = this._Brands.value;
    this.product.car_Id = this._Cars.value;
    this.product.category_Id = this._Categorise.value;
    this.product.isActive=this._isActive.value;

  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
  HandleFilePrimaryimages(event:any){
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('PrimaryImage') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    }
  }
  HandleFileForeignImage1(event:any){
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('ForeignImage1') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    }
  }
  HandleFileForeignImage2(event:any){
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('ForeignImage2') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    }
  }
}

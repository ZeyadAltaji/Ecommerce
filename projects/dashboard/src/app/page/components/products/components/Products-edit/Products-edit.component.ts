import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
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
    serial_Id: '',
    title: '',
    price: 0,
    quantity: 0,
    offers: 0,
    New_price: 0,
    UserId: 0,
    admin_Id: 0,
    createDate: '',
    isActive: false,
    isDelete: false,
    cars: '',
    category: '',
    brands: '',
    Brands_Id: 0,
    Category_Id: 0,
    Car_Id: 0,
    description: '',
    isPrimaryImage: '',
    isForeignImage1: '',
    isForeignImage2: '',
    Primary_Image: '',
    ForeignImage1: '',
    ForeignImage2: ''
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
              private sweetService:SweetAlertService) { }

  ngOnInit():void {
    this.EditProductForm();
    this.productsId=this.route.snapshot.params['id'];
    this.productsService.GetByIdProducts(this.productsId).subscribe({
      next:(response)=>{
          this.product=response;
          this.showPrimaryImage = `assets/image/Products/${response.isPrimaryImage}`;
          this.showForeignImage1 = `assets/image/Products/${response.isForeignImage1}`;
          this.showForeignImage2 = `assets/image/Products/${response.isForeignImage1}`;
          this.serial_Id = this.EditProductsForm.controls['Serial_Id'].setValue(this.product.serial_Id);
          this.title = this.EditProductsForm.controls['NameProducts'].setValue(this.product.title);
          this.description = this.EditProductsForm.controls['Description'].setValue(this.product.description);
          this.price = this.EditProductsForm.controls['PriceProducts'].setValue(this.product.price);
          this.offers = this.EditProductsForm.controls['Offer'].setValue(this.product.offers);
          this.new_price = this.EditProductsForm.controls['newprice'].setValue(this.product.New_price);
          this.quantity = this.EditProductsForm.controls['Quantity'].setValue(this.product.quantity);
          this.brands_Id = this.EditProductsForm.controls['Brands'].setValue(this.product.Brands_Id);
          this.car_Id = this.EditProductsForm.controls['Cars'].setValue(this.product.Car_Id);
          this.category_Id = this.EditProductsForm.controls['Categorise'].setValue(this.product.Category_Id);
           this.IsActive=this.EditProductsForm.controls['Active'].setValue(this.product.isActive);
        }
    });


    this.productsService.getAllcategorise().subscribe(data=>{
      this.categoriseList=data;
      this.selectedCategory = this.categoriseList[0].name;
   });
  this.carService.GetAllCars().subscribe(data=>{
    this.CarsList=data;
   });
  this.brandsService.GetAllBrands().subscribe(data=>{
    this.BrandList=data;
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
    this.route.paramMap.subscribe({
      next:(params)=>{
         const id=params.get('id');
        if(id){

          const fd = new FormData();
          let imageFile = this.PrimaryImage?.nativeElement.files[0];
          fd.append('Primary_Image', imageFile);
          let imageFile1 = this.ForeignImage1?.nativeElement.files[0];
          fd.append('ForeignImage1', imageFile1);
          let imageFile2 = this.ForeignImage2?.nativeElement.files[0];
          fd.append('ForeignImage2', imageFile2);
          fd.append('Serial_Id', this._SerialId.value);
          fd.append('Title', this._NameProducts.value);
          fd.append('Description', this._Description.value);
          fd.append('Price', this._PriceProducts.value);
          fd.append('Offers', this._offers.value);
          fd.append('New_price', this.new_priceProducts.value);
          fd.append('Quantity', this._Quantity.value);
          fd.append('Brands_Id', this._Brands.value);
          fd.append('Car_Id', this._Cars.value);
          fd.append('Category_Id', this._Categorise.value);
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
    this.product.serial_Id = this._SerialId.value;
    this.product.price = this._PriceProducts.value;
    this.product.quantity = this._Quantity.value;
    this.product.description = this._Description.value;
    this.product.Brands_Id = this._Brands.value;
    this.product.Car_Id = this._Cars.value;
    this.product.Category_Id = this._Categorise.value;
    this.product.isActive=this._isActive.value;
    if (this.new_priceProducts && this._offers) {
      this.product.New_price = this.new_priceProducts.value;
      this.product.offers = this._offers.value;
    }
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

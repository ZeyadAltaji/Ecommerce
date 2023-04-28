import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';

@Component({
  selector: 'app-NewSubProducts',
  templateUrl: './NewSubProducts.component.html',
  styleUrls: ['./NewSubProducts.component.css']
})
export class NewSubProductsComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private router: Router,
    private productService: SubproductsService,
    private carService:CarService,
    private brandsService:BrandsService,
    private CategoryService:CategoriseService,

    private sweetAlertService :SweetAlertService
   ) { }
   product =new Product();
   categoriseList: any[] | undefined;
   CarsList:any[]|undefined;
   BrandList:any[]|undefined;
   NewProductsForm!:FormGroup;
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
   formData: FormData = new FormData();
   @ViewChild('PrimaryImage') PrimaryImage?: ElementRef;
  ngOnInit() {
    this.AddNewProductsForm();
    this.CategoryService.GetAllCategorise().subscribe(data=>{
    this.categoriseList=data;
   });
    this.carService.GetAllCars().subscribe(data=>{
    this.CarsList=data;
   });
    this.brandsService.GetAllBrands().subscribe(data=>{
    this.BrandList=data;
   });
  }
  OnSubmit(){
    debugger
    this.MapProducts();
    this.productService.AddProducts(this.formData).subscribe(
      (data)=>{
      this.sweetAlertService.success("Success", "Products added successfully.");
      this.router.navigate(['/Prodcuts']);

      },(error)=>{
        console.log(error);
      }
    )
  }
  AddNewProductsForm() {
    this.NewProductsForm = this.fb.group({
      Serial_Id: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      NameProducts: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      PriceProducts: [null, Validators.required],
      Categorise: [null,Validators.required],
      Cars: [null, Validators.required],
      Brands: [null, Validators.required],
      Quantity:[null, Validators.required],
      Description:[null,Validators.required],
      newprice: [null],
      Offer: [null],
      isActive: false,
      Primary_Image:[null, Validators.required],

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
  get _Cars(){
    return this.NewProductsForm.controls['Cars'] as FormGroup;
  }
  get _Brands(){
    return this.NewProductsForm.controls['Brands'] as FormGroup;
  }
  get _Description(){
    return this.NewProductsForm.controls['Description'] as FormGroup;
  }
  get _Quantity(){
    return this.NewProductsForm.controls['Quantity'] as FormGroup;
  }
  get _new_price() {
    return this.NewProductsForm.controls['newprice']as FormGroup;
  }

  get _offers() {
    return this.NewProductsForm.controls['Offer']as FormGroup;
  }

  get _isActive() {
    return this.NewProductsForm.controls['isActive']as FormGroup;
  }
  get _Primary_Image(){
    return this.NewProductsForm.controls['Primary_Image']as FormGroup;
  }
  MapProducts():void{
    debugger
    this.formData = new FormData();
    this.formData.append('Serial_Id', this._SerialId.value);
    this.formData.append('Title', this._NameProducts.value);
    this.formData.append('Description', this._Description.value);
    this.formData.append('Price', this._PriceProducts.value);
    this.formData.append('Offers', this._offers.value);
    this.formData.append('New_price', this._new_price.value);
    this.formData.append('Brands_Id', this._Brands.value);
    this.formData.append('Car_Id', this._Cars.value);
    this.formData.append('Category_Id', this._Categorise.value);
    this.formData.append('Quantity', this._Quantity.value);
    let Primary_Image = this.PrimaryImage?.nativeElement.files[0];
    this.formData.append('Primary_Image', Primary_Image);
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
}

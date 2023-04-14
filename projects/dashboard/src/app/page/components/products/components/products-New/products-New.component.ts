import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';
@Component({
  selector: 'app-products-New',
  templateUrl: './products-New.component.html',
  styleUrls: ['./products-New.component.css']
})
export class ProductsNewComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private router: Router,
    private productService: ProductService,
    private carService:CarService,
    private brandsService:BrandsService,
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
    Car_Id: 0
  };



  ngOnInit() {
    this.AddNewProductsForm();
    this.productService.getAllcategorise().subscribe(data=>{
      this.categoriseList=data;
    console.log(data)
  });
  this.carService.GetAllCars().subscribe(data=>{
    this.CarsList=data;
    console.log(data)
  });
  this.brandsService.GetAllBrands().subscribe(data=>{
    this.BrandList=data;
    console.log(data);
  });
  }

  OnSubmit(){
    this.MapProducts();
    this.productService.AddProducts(this.product).subscribe(
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
  MapProducts():void{
    this.product.title = this._NameProducts.value;
    this.product.serial_Id = this._SerialId.value;
    this.product.price = this._PriceProducts.value;
    this.product.quantity = this._Quantity.value;
    this.product.description = this._Description.value;
    this.product.Brands_Id = this._Brands.value;
    this.product.Car_Id = this._Cars.value;
    this.product.Category_Id = this._Categorise.value;
    this.product.isActive = this._isActive.value;
    if (this._new_price && this._offers) {
      this.product.New_price = this._new_price.value;
      this.product.offers = this._offers.value;
    }
  }
  toggleInputs() {
    this.showInputs = !this.showInputs;
  }
}


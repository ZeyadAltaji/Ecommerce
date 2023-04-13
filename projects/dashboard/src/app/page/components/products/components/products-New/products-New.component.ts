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
   products =new Product();
  categoriseList: any[] | undefined;
  CarsList:any[]|undefined;
  BrandList:any[]|undefined;
  NewProductsForm!:FormGroup;
  propertyView: IProducts = {
    id: 0,
    Serial_Id: '',
    title: '',
    price: 0,
    Quantity: 0,
    brands: '',
    category: '',
    cars: '',
    offers: 0,
    new: 0,
    UserId: 0,
    admin_Id: 0,
    createDate: '',
    isActive: false,
    isDelete: false,
    BrandsId: 0,
    CarId: 0,
    CategoryId: 0
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
    this.productService.AddProducts(this.products).subscribe(
      (data)=>{
      this.sweetAlertService.success("Success", "Products added successfully.");
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
      Description:[null,Validators.required]
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

  MapProducts():void{
    this.products.title = this._NameProducts.value;
    this.products.Serial_Id = this._SerialId.value;
    this.products.price=this._PriceProducts.value;
    this.products.CategoryId = this._Categorise.value;
    this.products.CarId=this._Cars.value;
    this.products.BrandsId=this._Brands.value;
    this.products.Quantity=this._Quantity.value;
    this.products.description=this._Description.value;
  }
}

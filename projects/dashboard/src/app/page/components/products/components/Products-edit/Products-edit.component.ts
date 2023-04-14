import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

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
    New_price:0,
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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productsService: ProductService,
              private fb: FormBuilder,
              private carService:CarService,
              private brandsService:BrandsService,
              private sweetService:SweetAlertService) { }

  ngOnInit():void {
    this.EditProductForm();
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.productsService.GetByIdProducts(id).subscribe({
            next:(response)=>{
              this.product=response;
            }
          })
        }
      }
    });
    this.productsService.getAllcategorise().subscribe(data=>{
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
      Description:[null,Validators.required]
    });
  }
  OnSubmit(){
    this.MapProducts();
    this.sweetService.warning("Are you sure?", "Do you want to update this product?")
    .then((willUpdate) => {
      if (willUpdate) {
        this.productsService.UpdateProducts(this.product).subscribe(
          (updatedProduct) => {
            console.log(updatedProduct)
            console.log("Product updated successfully:", updatedProduct);
            swal("Product updated successfully!", {
              icon: "success",
            });
            this.router.navigate(['/Prodcuts']);
           },
          (error) => {
            console.log(error);
            console.error("Error updating product:", error);
            swal("Error updating product!", {
              icon: "error",
            });
          }
        );
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
}

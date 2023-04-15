import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import * as $ from 'jquery';
import swal from 'sweetalert';

import 'bootstrap';
import { interval } from 'rxjs';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input()

  listProducts: IProducts[] | undefined;
  public ProductId: number | undefined;
  product = new Product();
  isAccordionOpen = false;
  categoriseList: any[] | undefined;
  CarsList:any[]|undefined;
  BrandList:any[]|undefined;
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
    Car_Id: 0,
    description:''
  };
  constructor(
    public productsService:ProductService,
    private carService:CarService,
    private brandsService:BrandsService,
    private router: Router
  ) { }

  ngOnInit() {
  interval(1000).subscribe(() => {
    this.productsService.GetAllProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
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
  openModal(id: number) {
    this.productsService.GetByIdModal(id)
      .subscribe(response => {
        this.product = response;
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
  DeleteMehtods(id: number)
  {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "error",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.productsService.DeleteProducts(id).subscribe((response) => {
          console.log(id);
          if (response) {
            swal("Poof! Your imaginary file has been deleted!", {
              icon: "success",
            });
          }
        });
      }
    });
  }

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

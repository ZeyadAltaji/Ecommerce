import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { SubProducts } from 'projects/dashboard/src/app/Classes/SubProducts';
 import { ISubProducts } from 'projects/dashboard/src/app/Models/ISubProducts';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { SubproductsService } from 'projects/dashboard/src/app/services/Subproducts.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-ListProducts',
  templateUrl: './ListProducts.component.html',
  styleUrls: ['./ListProducts.component.css']
})
export class ListProductsComponent implements OnInit {

  listProducts: ISubProducts[] | undefined;
  public ProductId: number | undefined;
  product = new SubProducts();
  isAccordionOpen = false;
  categoriseList: any[] | undefined;
  CarsList:any[]|undefined;
  BrandList:any[]|undefined;
  showPrimaryImage = '';
  showForeignImage1='';
  showForeignImage2='';
  displayedBrands: string[] = [];

  constructor(
    public productsService:SubproductsService,
    private carService:CarService,
    private brandsService:BrandsService,
    private CategoryService:CategoriseService,
     private router: Router
  ) { }

  ngOnInit() {
  // interval(1000).subscribe(() => {
    this.productsService.GetAllProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
      console.log(listData);
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
  // });
  this.CategoryService.GetAllCategorise().subscribe(data=>{
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




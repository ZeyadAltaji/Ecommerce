import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import * as $ from 'jquery';
import 'bootstrap';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  listProducts: IProducts[] | undefined;
  baseUrl='https://localhost:7241/api/'

   @Input()
  public ProductId: number | undefined;
  product = new Product();
  constructor(public productsService:ProductService,
     private router: Router) { }

  ngOnInit() {

    this.productsService.GetAllProducts().subscribe(listData=>{
      this.productsService.listProducts=listData;
      console.log(listData);
    },
    error => {
      console.log('httperror:');
      console.log(error);
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


}

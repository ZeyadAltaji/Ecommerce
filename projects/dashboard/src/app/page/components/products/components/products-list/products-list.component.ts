import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'projects/dashboard/src/app/Classes/Product';
import { IProducts } from 'projects/dashboard/src/app/Models/IProduct';
import { ProductService } from 'projects/dashboard/src/app/services/Product.service';
import * as $ from 'jquery';
import swal from 'sweetalert';

import 'bootstrap';
import { interval } from 'rxjs';
@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input()

  listProducts: IProducts[] | undefined;
  baseUrl='https://localhost:7241/api/'
  public ProductId: number | undefined;
  product = new Product();

  constructor(
    public productsService:ProductService,
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

}

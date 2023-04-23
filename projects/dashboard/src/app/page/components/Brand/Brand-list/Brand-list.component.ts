import { Component, OnInit } from '@angular/core';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { IBrands } from 'projects/dashboard/src/app/Models/IBrands';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { interval } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-Brand-list',
  templateUrl: './Brand-list.component.html',
  styleUrls: ['./Brand-list.component.css']
})
export class BrandListComponent implements OnInit {
  BrandsList:IBrands[]|undefined;
  public BrandsId: number | undefined;
  brands=new Brands;
  UrlImage='';
  constructor(public brandsService:BrandsService) { }

    ngOnInit() {
      // interval(1000).subscribe(() => {
        this.brandsService.GetAllBrands().subscribe(listData=>{
          this.brandsService.listBrands=listData;
         },
        error => {
          console.log('httperror:');
          console.log(error);
        });
      // });
  }
   openModal(id: number) {
    this.brandsService.GetByIdModal(id).subscribe(response => {
      this.brands = response;

        this.UrlImage = `assets/image/Brands/${this.brands.public_id}`;


      const modal = document.getElementById('BrandModal');
      if (modal) {
        modal.classList.add('show');
        modal.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
      }
    });
  }

  closeModal() {
    const modal = document.getElementById('BrandModal');
   modal?.classList.remove('show');
   modal?.setAttribute('style', 'display: none; padding-right: 0;');
   const modalBackdrop = document.querySelector('.modal-backdrop');
   modalBackdrop?.parentNode?.removeChild(modalBackdrop);
 }
 DeleteBrand(id: number)
  {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "error",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.brandsService.DeleteBrands(id).subscribe((response) => {
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

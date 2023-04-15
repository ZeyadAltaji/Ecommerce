import { Component, OnInit } from '@angular/core';
import { Categorise } from 'projects/dashboard/src/app/Classes/Categorise';
import { ICategorise } from 'projects/dashboard/src/app/Models/ICategorise';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';
import { interval } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-Category-list',
  templateUrl: './Category-list.component.html',
  styleUrls: ['./Category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  CategoryList:ICategorise[]|undefined;
  public CategoryId: number | undefined;
  Category=new Categorise;
  Categorylist:ICategorise={
    id: 0,
    name: ''
  }
  constructor(public CategoryService:CategoriseService) { }

  ngOnInit() {
    interval(1000).subscribe(() => {
      this.CategoryService.GetAllCategorise().subscribe(listData=>{
        this.CategoryService.listCategory=listData;
       },
      error => {
        console.log('httperror:');
        console.log(error);
      });
    });
  }
  openModal(id: number) {
    this.CategoryService.GetByIdModal(id)
      .subscribe(response => {
        this.Category = response;
        const modal = document.getElementById('CategoryModal');
        modal?.classList.add('show');
        modal?.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
      });
  }
  closeModal() {
    const modal = document.getElementById('CategoryModal');
   modal?.classList.remove('show');
   modal?.setAttribute('style', 'display: none; padding-right: 0;');
   const modalBackdrop = document.querySelector('.modal-backdrop');
   modalBackdrop?.parentNode?.removeChild(modalBackdrop);
 }
 DeleteCategory(id: number)
  {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "error",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.CategoryService.DeleteCategorise(id).subscribe((response) => {
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

import { Component, OnInit } from '@angular/core';
import { Cars } from 'projects/dashboard/src/app/Classes/Cars';
import { ICars } from 'projects/dashboard/src/app/Models/ICars';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { interval } from 'rxjs';
import swal from 'sweetalert';

@Component({
  selector: 'app-Cars-lsit',
  templateUrl: './Cars-lsit.component.html',
  styleUrls: ['./Cars-lsit.component.css']
})
export class CarsLsitComponent implements OnInit {
  carList:ICars[]|undefined;
  public CarId: number | undefined;
  Car=new Cars;
  Carlist:ICars={
    id: 0,
    production_Date: 0,
    name: '',
    image_CarUrl: '',
    class: '',
    isActive: false,
    public_id: ''
  }
  constructor(public carService:CarService ) { }

  ngOnInit() {
    // interval(1000).subscribe(() => {
      this.carService.GetAllCars().subscribe(listData=>{
        this.carService.ListCars=listData;
       },
      error => {
        console.log('httperror:');
        console.log(error);
      });
    // });
  }
  openModal(id: number) {
    this.carService.GetByIdModal(id)
      .subscribe(response => {
        this.Car = response;
        const modal = document.getElementById('carsModal');
        modal?.classList.add('show');
        modal?.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
      });
  }
  closeModal() {
    const modal = document.getElementById('carsModal');
   modal?.classList.remove('show');
   modal?.setAttribute('style', 'display: none; padding-right: 0;');
   const modalBackdrop = document.querySelector('.modal-backdrop');
   modalBackdrop?.parentNode?.removeChild(modalBackdrop);
 }
 Deletecars(id: number)
  {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "error",
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.carService.DeleteCars(id).subscribe((response) => {
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

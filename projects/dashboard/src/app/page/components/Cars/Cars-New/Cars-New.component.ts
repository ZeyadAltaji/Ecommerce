import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cars } from 'projects/dashboard/src/app/Classes/Cars';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';

@Component({
  selector: 'app-Cars-New',
  templateUrl: './Cars-New.component.html',
  styleUrls: ['./Cars-New.component.css']
})
export class CarsNewComponent implements OnInit {
  NewCarForm!:FormGroup;
  car=new Cars;
  showInputs=true;
  constructor( private fb: FormBuilder,private router: Router,
    private carService:CarService,
    private sweetAlertService :SweetAlertService
    ) { }
  ngOnInit() {
    this.AddNewCarsForm();

  }
  OnSubmit(){
    this.MapCars();
    this.carService.AddCars(this.car).subscribe(
      (data) => {
        this.sweetAlertService.success("Success", "Car added successfully.");
        this.router.navigate(['/Cars']);
      },(error)=>{
        console.log(error);
      }
    )
  }
  // OnSubmit() {
  //   this.MapCars();

  //   this.carService.AddCars(this.car).subscribe(
  //     (carData) => {
  //       const formData = new FormData();
  //       formData.append('CarsFiles', this.photo.value);

  //       this.carService.Addimage(carData.id, formData).subscribe(
  //         (imageData) => {
  //           this.sweetAlertService.success("Success", "Car added successfully.");
  //           this.router.navigate(['/Cars']);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       )
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   )
  // }


  // OnSubmit() {
  //   this.MapCars();
  //   const formData = new FormData();
  //   formData.append('CarsFiles', this.photo.value);
  //   const IdCar = String(this.car.id); // Convert id to string

  //   this.carService.AddCars(this.car).subscribe(
  //     () => {
  //       this.carService.Addimage(IdCar, formData).subscribe(
  //         () => {
  //           this.sweetAlertService.success("Success", "Car added successfully.");
  //           this.router.navigate(['/Cars']);
  //         },
  //         (error) => {
  //           console.log(error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }
  AddNewCarsForm() {
    this.NewCarForm = this.fb.group({
      NameCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      classCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      ProductionDate: [null, [Validators.required, Validators.min(1900), Validators.max(2099)]],
      Photo :[null, Validators.required],
      isActive: false
    });
  }
  get _NameCars() {
    return this.NewCarForm.controls['NameCar'] as FormGroup;
  }
  get classCar() {
    return this.NewCarForm.controls['classCar'] as FormGroup;
  }
  get ProductionDate(){
    return this.NewCarForm.controls['ProductionDate']as FormGroup;
  }
  get photo(){
    return this.NewCarForm.controls['Photo']as FormGroup;
  }
  get _isActive() {
    return this.NewCarForm.controls['isActive']as FormGroup;
  }
  MapCars() {
    this.car.name=this._NameCars.value;
    this.car.class=this.classCar.value;
    this.car.production_Date=this.ProductionDate.value;
    // this.car.image_CarUrl =this.photo.value;
    this.car.isActive = this._isActive.value;
  //   const formData = new FormData();
  // formData.append('CarsFiles', this.photo.value);


  }

}


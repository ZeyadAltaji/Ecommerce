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
  AddNewCarsForm() {
    this.NewCarForm = this.fb.group({
      NameCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],

    });
  }
  MapCars() {
    throw new Error('Method not implemented.');
  }
}

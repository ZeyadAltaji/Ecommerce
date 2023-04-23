import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  formData: FormData = new FormData();
  @ViewChild('imageInput') imageInput?: ElementRef;

  constructor( private fb: FormBuilder,private router: Router,
    private carService:CarService,
    private sweetAlertService :SweetAlertService
    ) { }
  ngOnInit() {
    this.AddNewCarsForm();

  }
  OnSubmit(){
    this.MapCars();

    this.carService.AddCars(this.formData).subscribe(
      (data) => {
        console.log(data)
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
      classCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      ProductionDate: [null, [Validators.required, Validators.min(1900), Validators.max(2099)]],
      Image_CarUrl :[null, Validators.required],
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
    return this.NewCarForm.controls['Image_CarUrl']as FormGroup;
  }
  get _isActive() {
    return this.NewCarForm.controls['isActive']as FormGroup;
  }
  MapCars() {
    this.formData = new FormData();
      this.formData.append('Name', this._NameCars.value);
      let imageFile = this.imageInput?.nativeElement.files[0];
      this.formData.append('Image_CarUrl', imageFile);
      this.formData.append('Class', this.classCar.value);
    if (this.ProductionDate.valid) {
      this.formData.append ('production_Date', this.ProductionDate.value);
    } else {
      console.error("Production date is required.");
      return;
    }
    this.formData.append ('isActive', this._isActive.value);
    //   this.formData.append=this.classCar.value;
    // if (this.ProductionDate.valid) {
    //   this.formData.append = this.ProductionDate.value;
    // } else {
    //   console.error("Production date is required.");
    //   return;
    // }
    // this.formData.append  = this._isActive.value;
   }
  HandleFile(event:any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('inputGroupFile03') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cars } from 'projects/dashboard/src/app/Classes/Cars';
import { CarService } from 'projects/dashboard/src/app/services/Car.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-Cars-edit',
  templateUrl: './Cars-edit.component.html',
  styleUrls: ['./Cars-edit.component.css']
})
export class CarsEditComponent implements OnInit {
  EditCarsForm!:FormGroup;
  cars=new Cars();
  constructor(private router: Router,private route: ActivatedRoute, private carService:CarService,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder) { }

    ngOnInit() {
      this.EditcarsForm();
      this.route.paramMap.subscribe({
        next:(params)=>{
          const id=params.get('id');
          if(id){
            this.carService.GetByIDCars(id).subscribe({
              next:(response)=>{
                this.cars=response;
              }
            })
          }
        }
      });
    }
    OnSubmit(){
      this.Mapcars();
      this.sweetAlertService.warning("Are you sure?", "Do you want to update this product?")
      .then((willUpdate) => {
        if (willUpdate) {
          this.carService.UpdateCars(this.cars).subscribe(
            (updatedProduct) => {
              console.log(updatedProduct)
              console.log("Product updated successfully:", updatedProduct);
              swal("Product updated successfully!", {
                icon: "success",
              });
              this.router.navigate(['/category']);
             },
            (error) => {
              console.log(error);
              console.error("Error updating product:", error);
              swal("Error updating product!", {
                icon: "error",
              });
            }
          );
        }
      });
    }
    EditcarsForm(){
      this.EditCarsForm = this.fb.group({
        NameCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      })

    }
    get _NameCar() {
      return this.EditCarsForm.controls['NameCar'] as FormGroup;
    }
    Mapcars():void{
      this.cars.name=this._NameCar.value;
    }
}

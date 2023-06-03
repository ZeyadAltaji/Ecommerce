import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Cars } from 'projects/dashboard/src/app/Classes/Cars';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
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
  showInputs=true;
  formData: FormData = new FormData();
  CarsId:any;
  CarsName:any;
  Carsclass:any;
  CarsisActive:any;
  Carsproduction_Date:any;

  UrlImage = '';
  Image_CarUrl!: File;
  selectedImage!: File;
  loggedInUser: any;
  public user :IUser | undefined;
  @ViewChild('imageInput') imageInput?: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private carService:CarService,
    private sweetAlertService:SweetAlertService,
    private fb: FormBuilder,
    @Inject(CookieService) private cookieServices:CookieService) {this.Image_CarUrl == null;}

    ngOnInit() {
      const userString = this.cookieServices.get('loggedInUser');
      this.loggedInUser = userString ? JSON.parse(userString) : null;
      if (this.loggedInUser && this.loggedInUser.fullUser) {
        this.user = this.loggedInUser.fullUser;
      }
      this.EditcarsForm();


      this.CarsId = this.route.snapshot.params['id']
      this.carService.GetByIDCars(this.CarsId).subscribe({
        next: (response) => {
           this.cars = response;
          this.UrlImage = `assets/image/Cars/${this.cars.public_id}`;

           this.CarsName = this.EditCarsForm.controls['NameCar'].setValue(this.cars.name);
           this.Carsclass = this.EditCarsForm.controls['classCar'].setValue(this.cars.class);
            this.CarsisActive = this.EditCarsForm.controls['isActive'].setValue(this.cars.isActive == true);
           this.Carsproduction_Date = this.EditCarsForm.controls['ProductionDate'].setValue(this.cars.production_Date);

         },
      });
    }
    OnSubmit(){
      if (this.loggedInUser && this.loggedInUser.fullUser) {
        const username = this.loggedInUser.fullUser.userName;
        this.route.paramMap.subscribe({

          next:(params)=>{
             const id=params.get('id');
            if(id){
              const fd = new FormData();
              let imageFile = this.imageInput?.nativeElement.files[0];
              fd.append('Image_CarUrl', imageFile);
              fd.append('Name', this._NameCar.value);
              fd.append('Class', this.classCar.value);
              const activeValue = this._isActive.value || false;

              // Store true or false in FormData based on the values
              fd.append('isActive', activeValue ? 'true' : 'false');
              fd.append('userUpdate', this.loggedInUser.fullUser.userName);

              if (this.ProductionDate.valid) {
               fd.append ('production_Date', this.ProductionDate.value);
              } else {
                console.error("Production date is required.");
                return;
              }
              fd.append('id', id.toString());
              if (this.selectedImage) { // check if a new image is selected
                fd.append('Image_CarUrl', this.selectedImage, this.selectedImage.name);
                  }
              // Show a warning message before updating the Car
              swal({
                title: "Are you sure?",
                text: "You are about to update the Car. Do you want to continue?",
                icon: "warning",
                dangerMode: true,
              })
              .then((willUpdate) => {
                if (willUpdate) {
                  const name = this.cars.name;
                  const updateimage=this.cars.public_id;
                  this.carService.UpdateCars(fd).subscribe(data => {
                     // Show a success message after the Cars has been updated
                    swal({
                      title: "Success!",
                      text: "The Cars has been updated.",
                      icon: "success",
                    });
                    this.router.navigate(['/Cars']);
                  }, ex => {
                    console.log(ex);
                  });
                } else {
                  // Do nothing if the user cancels the update
                }
              });
            }
          }
        });
      }
    }
    EditcarsForm(){
      this.EditCarsForm = this.fb.group({
        NameCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        classCar: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        ProductionDate: [null, [Validators.required, Validators.min(1900), Validators.max(2099)]],
        Image_CarUrl :[null, Validators.required],
        isActive: false
      })

    }
    get _NameCar() {
      return this.EditCarsForm.controls['NameCar'] as FormGroup;
    }
    get classCar() {
      return this.EditCarsForm.controls['classCar'] as FormGroup;
    }
    get ProductionDate(){
      return this.EditCarsForm.controls['ProductionDate']as FormGroup;
    }
    get photo(){
      return this.EditCarsForm.controls['Image_CarUrl']as FormGroup;
    }
    get _isActive() {
      return this.EditCarsForm.controls['isActive']as FormControl;
    }
    Mapcars():void{
      this.cars.name=this._NameCar.value;
      this.cars.class=this.classCar.value;
      this.cars.production_Date=this.ProductionDate.value;
      this.cars.image_CarUrl =this.photo.value;
      this.cars.isActive = this._isActive.value;

    }
    HandleFile(event: any) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgElement = document.getElementById(
          'Image_CarUrl'
        ) as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
debugger
      reader.readAsDataURL(file);

      this.cars.public_id = file.name;

      const imageName = file.name;
      const selectedImageLabel = document.getElementById(
        'selectedImageLabel'
      ) as HTMLLabelElement;
      if (selectedImageLabel) {
        selectedImageLabel.innerHTML = imageName;
      }
    }
}

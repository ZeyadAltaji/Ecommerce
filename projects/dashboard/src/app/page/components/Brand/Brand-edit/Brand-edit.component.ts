import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-Brand-edit',
  templateUrl: './Brand-edit.component.html',
  styleUrls: ['./Brand-edit.component.css'],
})
export class BrandEditComponent implements OnInit {
  Brand = new Brands();
  EditBrandForm!: FormGroup;
  formData: FormData = new FormData();
  UrlImage = '';
  Image_BrandUrl!: File;
  brandId:any;
  brandName:any;
  UserCreate:any;
  selectedImage!: File;
  loggedInUser: any;
  IsActive: any;

  public user :IUser | undefined;
  @ViewChild('imageInput') imageInput?: ElementRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private brandsService: BrandsService,
    private sweetAlertService: SweetAlertService,
    private fb: FormBuilder,
    @Inject(CookieService) private cookieServices:CookieService
  ) {this.Image_BrandUrl == null;}
  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.EditBrandsForm();
    this.brandId = this.route.snapshot.params['id']
    this.brandsService.GetByIDBrands(this.brandId).subscribe({
      next: (response) => {
        this.Brand = response;
        this.UrlImage = `assets/image/Brands/${response.public_id}`;
        (this.UrlImage = `assets/image/Brands/${response.public_id}`);
        this.brandName = this.EditBrandForm.controls['Name'].setValue(this.Brand.name);
        this.IsActive = this.EditBrandForm.controls['isActive'].setValue(this.Brand.isActive == true);

       },
    });
  }
  OnSubmit(){

    if (this.loggedInUser && this.loggedInUser.fullUser) {
      const username = this.loggedInUser.fullUser.userName;
      if (this.EditBrandForm.valid) {
      this.route.paramMap.subscribe({

      next:(params)=>{
        const id=params.get('id');
        if(id){

          const fd = new FormData();
          let imageFile = this.imageInput?.nativeElement.files[0];
          fd.append('Image_BrandUrl', imageFile);
          fd.append('Name', this._NameBrand.value);
          const activeValue = this._isActive.value || false;

              // Store true or false in FormData based on the values
              fd.append('isActive', activeValue ? 'true' : 'false');
          fd.append('id', id.toString());
          if (this.selectedImage) { // check if a new image is selected
            fd.append('Image_BrandUrl', this.selectedImage, this.selectedImage.name);
              }
              fd.append('userUpdate', this.loggedInUser.fullUser.userName);           // Show a warning message before updating the brand
          swal({
            title: "Are you sure?",
            text: "You are about to update the brand. Do you want to continue?",
            icon: "warning",
            dangerMode: true,
          })
          .then((willUpdate) => {
            if (willUpdate) {
               const name = this.Brand.name;
              const updateimage=this.Brand.public_id;
              this.loggedInUser.fullUser.userName= this.Brand.userUpdate;
              this.brandsService.UpdateBrand(fd).subscribe(data => {
                 // Show a success message after the brand has been updated
                swal({
                  title: "Success!",
                  text: "The brand has been updated.",
                  icon: "success",
                });
                this.router.navigate(['/Brand']);
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
  }
  EditBrandsForm() {
    this.EditBrandForm = this.fb.group({
      Name: [null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Image_BrandUrl: [null],
      isActive: false

    });
  }
  get _NameBrand() {
    return this.EditBrandForm.controls['Name'] as FormGroup;
  }
  get _Nameiamge() {
    return this.EditBrandForm.controls['Nameiamge'] as FormGroup;
  }
  get _isActive(){
    return this.EditBrandForm.controls['isActive'] as FormControl;

}
  MapBrands(UserUpdate:string) :void{

     this.formData.append('userUpdate', UserUpdate);

  }
  HandleFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const imgElement = document.getElementById(
        'Image_BrandUrl'
      ) as HTMLImageElement;
      if (imgElement && e.target) {
        imgElement.src = e.target.result as string;
      }
    };

    reader.readAsDataURL(file);

    this.Brand.public_id = file.name;

    const imageName = file.name;
    const selectedImageLabel = document.getElementById(
      'selectedImageLabel'
    ) as HTMLLabelElement;
    if (selectedImageLabel) {
      selectedImageLabel.innerHTML = imageName;
    }
  }
}

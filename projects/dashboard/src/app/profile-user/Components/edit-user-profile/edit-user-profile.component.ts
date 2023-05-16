import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SweetAlertService } from '../../../services/SweetAlert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { User } from '../../../Classes/User';
import swal from 'sweetalert';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sweetAlertService: SweetAlertService,
    private AuthService:AuthenticationService

  ) { }
  userId:any;
  user =new User();
  EditUserForm!: FormGroup;
  @ViewChild('imageInput') imageInput?: ElementRef;
  selectedImage!: File;
  UrlImage = '';
  Frist_Name:any;
  Last_Name:any;
  UserName:any;
  Email:any;
  Phone1:any;
  Phone2:any;
  Address:any;
  password:any;
  comfirmPassword:any;
    ngOnInit() {
    this.EditUsersForm();
    debugger
    this.userId = this.route.snapshot.params['id'];
    this.AuthService.GetByID(this.userId).subscribe({
      next:(response)=>{
        this.user=response;
        this.UrlImage = `http://localhost:4203/assets/image/Users/${response.public_id}`;
        this.Frist_Name = this.EditUserForm.controls['FirstName'].setValue(this.user.frist_Name);
        this.Last_Name = this.EditUserForm.controls['last_Name'].setValue(this.user.last_Name);
        this.UserName = this.EditUserForm.controls['UserName'].setValue(this.user.userName);
        this.Email = this.EditUserForm.controls['Email'].setValue(this.user.email);
        this.Phone1 = this.EditUserForm.controls['Mobile1'].setValue(this.user.phone1);
        this.Phone2 = this.EditUserForm.controls['Mobile2'].setValue(this.user.phone2);
        this.Address = this.EditUserForm.controls['Address'].setValue(this.user.address);
      }
    });

  }
  OnSubmit(){
    debugger
    this.route.paramMap.subscribe({
      next:(params)=>{
         const id=params.get('id');
        if(id){
          debugger
          const fd = new FormData();
            let imageFile = this.imageInput?.nativeElement.files[0];
            fd.append('Image_userUrl', imageFile);
            fd.append('Frist_Name', this._FristName.value);
            fd.append('Last_Name', this.LastName.value);
            fd.append('UserName', this._UserName.value);
            fd.append('Email', this._Email.value);
            fd.append('Phone1', this._Mobile1.value);
            fd.append('Phone2', this._Mobile2.value);
            fd.append('Address', this._Address.value);
            fd.append('password', this._Password.value);
            fd.append('comfirmPassword', this._ComfirmPassword.value);
             fd.append('id', id.toString());
            if (this.selectedImage) { // check if a new image is selected
              fd.append('Image_userUrl', this.selectedImage, this.selectedImage.name);
                }
            // Show a warning message before updating the brand
            swal({
              title: "Are you sure?",
              text: "You are about to update the brand. Do you want to continue?",
              icon: "warning",
              dangerMode: true,
            })
            .then((willUpdate) => {
              if (willUpdate) {
                const frist_Name = this.user.frist_Name;
                const Last_Name = this.user.last_Name;
                const UserName = this.user.userName;
                const Email = this.user.email;
                const Phone1 = this.user.phone1;
                const Phone2 = this.user.phone2;
                const Address = this.user.address;
                const password = this.user.password;
                const comfirmPassword = this.user.comfirmPassword;
                 const updateimage=this.user.public_id;
                this.AuthService.UpdateUser(fd).subscribe(data => {
                   // Show a success message after the User has been updated
                  swal({
                    title: "Success!",
                    text: "The User has been updated.",
                    icon: "success",
                  });
                  this.router.navigate(['/My-profile']);
                }, ex => {
                  console.log(ex);
                });

              }

            })
          }

        }
      });
  }
  EditUsersForm() {
    this.EditUserForm = this.fb.group({

      FirstName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      last_Name: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      UserName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
       Address: [null, Validators.required],
      Mobile1: [null, Validators.required],
      Mobile2: [null, Validators.required],
       Password: [null, [Validators.required, Validators.minLength(2)]],
      ConfirmPassword: [null, Validators.required],
      image_userUrl :[null, Validators.required],
    }, { Validators: this.passwordMatchingValidator });

  }
  passwordMatchingValidator(fc: AbstractControl): ValidationErrors | null {
    return fc.get('Password')?.value === fc.get('ConfirmPassword')?.value ? null :
      { notmatched: true }
  };
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

    this.user.public_id = file.name;

    const imageName = file.name;
    const selectedImageLabel = document.getElementById(
      'selectedImageLabel'
    ) as HTMLLabelElement;
    if (selectedImageLabel) {
      selectedImageLabel.innerHTML = imageName;
    }
  }
    get _FristName() {
       return this.EditUserForm.controls['FirstName'] as FormGroup;

    }
    get LastName() {
      return this.EditUserForm.controls['last_Name'] as FormGroup;

    }
    get _UserName() {

      return this.EditUserForm.controls['UserName'] as FormGroup;
    }
    get _Email() {
       return this.EditUserForm.controls['Email'] as FormGroup;
    }
    get _Password() {
       return this.EditUserForm.controls['Password'] as FormGroup;
    }
    get _ComfirmPassword() {
      return this.EditUserForm.controls['ConfirmPassword'] as FormGroup;
    }
    get _Address() {
      return this.EditUserForm.controls['Address'] as FormGroup;
    }
    get _Mobile1() {
      return this.EditUserForm.controls['Mobile1'] as FormGroup;
    }
    get _Mobile2() {
      return this.EditUserForm.controls['Mobile2'] as FormGroup;
    }
    get _selectRole(){
      return this.EditUserForm.controls['selectRole'] as FormGroup;
    }
    get photo(){
      return this.EditUserForm.controls['image_userUrl']as FormGroup;
    }

}

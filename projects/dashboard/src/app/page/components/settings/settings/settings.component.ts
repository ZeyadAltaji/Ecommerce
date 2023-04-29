import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { Setting } from 'projects/dashboard/src/app/Classes/Setting';
import { ISetting } from 'projects/dashboard/src/app/Models/ISetting';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  UrlImage = '';
  EditLogo!:FormGroup;
  selectedImage!: File;
  formData: FormData = new FormData();
  LogoId!:any;
  selectedSetting!: Setting;
  editForm!: FormGroup;
  logoUrl!: File;
  baseUrl =Environment.baseUrl;
  logo1:any;
id:any;
logoData!: ISetting;

  constructor(public settingservice:SettingService,
  private router: Router,private route: ActivatedRoute,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder
    , private http: HttpClient) {    this.UrlImage == null;    }


  @ViewChild('imageInput') imageInput?: ElementRef;

  setting=new Setting();
  ngOnInit() {
   this.EditSettingForm();
   this.getLogoData();

   }
   getLogoData() {
    this.settingservice.GetByIDlogo(4).subscribe(data => {
      this.logoData = data;
    });
  }
   onSubmit() {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=1;
          if(id){
debugger
            const formData = new FormData();
            let imageFile = this.imageInput?.nativeElement.files[0];
            formData.append('IsLogoUrl', imageFile);
            formData.append('id', id.toString());
            if (this.selectedImage) { // check if a new image is selected
              formData.append('IsLogoUrl', this.selectedImage, this.selectedImage.name);
                }
                this.settingservice.UpdateLogo(formData).subscribe(() => {
                  console.log(formData);
                  // do something after the logo is updated successfully
                });
          }
      }
    })
  }




   EditSettingForm(){
    this.EditLogo =this.fb.group({
      logo:[null, Validators.required],
    })
   }
   GeneralSettings(event:any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('Logo') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
   HandleFile(event:any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('image1') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
  HandleFile1(event:any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('image2') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
  HandleFile2(event:any) {
    if (event.target.files !== null && event.target.files.length > 0) {
      const image_userUrl = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgElement = document.getElementById('image3') as HTMLImageElement;
        if (imgElement && e.target) {
          imgElement.src = e.target.result as string;
        }
      };
      reader.readAsDataURL(image_userUrl);
    } else {
    }
  }
}

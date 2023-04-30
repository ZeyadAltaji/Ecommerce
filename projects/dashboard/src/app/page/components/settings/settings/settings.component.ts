import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { param } from 'jquery';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Environment } from 'projects/authentication/src/app/Environments/Environment';
import { Setting } from 'projects/dashboard/src/app/Classes/Setting';
import { SiderMain } from 'projects/dashboard/src/app/Classes/SiderMain';
import { SiderSub } from 'projects/dashboard/src/app/Classes/SiderSub';
import { ISetting } from 'projects/dashboard/src/app/Models/ISetting';
import { ISiderMain } from 'projects/dashboard/src/app/Models/ISiderMain';
import { SettingService } from 'projects/dashboard/src/app/services/Setting.service';
import { SiderSubService } from 'projects/dashboard/src/app/services/SiderSub.service';
import { SliderMainService } from 'projects/dashboard/src/app/services/SliderMain.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';
declare var $: any;
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SettingsComponent  implements OnInit  {
  //initialize classes
  formData: FormData = new FormData();
  siderMain=new SiderMain();
  logoData!: ISetting;
  SiderMain = new SiderMain;
  imageMain: any;
  SliderMain: ISiderMain[] = [];
  Main_Image!:File;
  brandId:any;
  setting=new Setting;
  Data: SiderMain[] = [];
  datasubintranal!:SiderSub;
  datasubEx!:SiderSub;
  datemechanic!:SiderSub;
  getAllSubSlider!:SiderSub;
  //froms
  EditLogo!:FormGroup;
  EditMainForm!:FormGroup;
  selectedImage!: File;
   LogoId!:any;
  selectedSetting!: Setting;
  editForm!: FormGroup;
  logoUrl!: File;
   logo1:any;
  title:any;
  description:any;
  Button:any;
  IsActive: any;
  id:any;
 // initialize mainSliderItems as an empty array
MainImage='';
SilderMain='';
showImage='';
UrlImage = '';




  constructor(public settingservice:SettingService,
  private router: Router,private route: ActivatedRoute,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder
    , private http: HttpClient,public slidermainService :SliderMainService,public siderSubService :SiderSubService) {       }


  @ViewChild('imageInput') imageInput?: ElementRef;
  @ViewChild('MainImages') MainImages?: ElementRef;


  ngOnInit() {
    this.siderSubService.GetByIdnumber(1).subscribe((result) => {
      this.datasubintranal = result;
      console.log(result);
    });
    this.siderSubService.GetByIdnumber(2).subscribe((result) => {
      this.datasubEx = result;
      console.log(result);
    });
    this.siderSubService.GetByIdnumber(3).subscribe((result) => {
      this.datemechanic = result;
      console.log(result);
    });
     this.getMainSlider();
     this.EditSettingForm();
     this.getLogoData();
     this.showbyeditMainSlider();

     }

   getLogoData() {
     this.settingservice.GetByIDlogo(1).subscribe(data => {
      this.logoData = data;

    });
  }
  openModal(id: number) {
    this.slidermainService.GetByIdModal(id)
      .subscribe(response => {
        this.siderMain = response;
        if (Array.isArray(response) && response.length > 0 && response[0].imageURl) {
                  this.Data=response

                  this.imageMain = response[0];

                  this.SilderMain = `assets/image/Slider/${this.imageMain.imageURl}`;
                  console.log(this.SilderMain);
          }

        const modal = document.getElementById('mainSliderModal');
        modal?.classList.add('show');
        modal?.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
      });
  }
  getMainSlider() {
    this.slidermainService.GetAllSiderMain().subscribe({
      next: (listData) => {

        if (Array.isArray(listData) && listData.length > 0 && listData[0].imageURl) {
          this.Data=listData

          this.imageMain = listData[0];

          this.MainImage = `assets/image/Slider/${this.imageMain.imageURl}`;
          console.log(this.MainImage);
        }
        this.SiderMain = listData;
        console.log(listData)
        if (listData && listData.imageURl) {
          this.UrlImage = `assets/image/Slider/${listData.imageURl}`;
          console.log(this.UrlImage)
        }
      }
    });
  }
   onSubmit() {
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=4;
          if(id){

            const formData = new FormData();
            let imageFile = this.imageInput?.nativeElement.files[0];
            formData.append('IsLogoUrl', imageFile);
            formData.append('id', id.toString());
            if (this.selectedImage) {
              formData.append('IsLogoUrl', this.selectedImage, this.selectedImage.name);
                }
                this.settingservice.UpdateLogo(formData).subscribe(() => {
                  console.log(formData);
                 });
          }
      }
    })
  }

  showbyeditMainSlider(){

    this.brandId = this.route.snapshot.params['id']
    this.slidermainService.GetByIDslider(this.brandId).subscribe({
      next: (response) => {
        this.siderMain = response;

        if (Array.isArray(response) && response.length > 0 && response[0].imageURl) {
          this.Data=response

          this.imageMain = response[0];
          this.MainImage = `assets/image/Slider/${this.imageMain.imageURl}`;
          console.log(this.showImage);
        }
        this.SiderMain = response;
        console.log(response)
        if (response && response.imageURl) {
          this.MainImage = `assets/image/Slider/${response.imageURl}`;
          console.log(this.UrlImage)
        }




         this.title = this.EditMainForm.controls['Name'].setValue(this.siderMain.title);
         this.description = this.EditMainForm.controls['Description'].setValue(this.siderMain.description);
         this.Button=this.EditMainForm.controls['Button'].setValue(this.siderMain.button);
         this.IsActive=this.EditMainForm.controls['Active'].setValue(this.siderMain.isActive);

       },
    });
  }
  OnEdit(){
    this.route.paramMap.subscribe({
      next:(params)=>{
         const id=params.get('id');
        if(id){

          const fd = new FormData();
          let imageFile = this.MainImages?.nativeElement.files[0];
          fd.append('Image', imageFile);

          fd.append('Title', this._Name.value);
           fd.append('Description', this._Description.value);
          fd.append('Button', this._Button.value);
           fd.append('id', id.toString());
          if (this.Main_Image) { // check if a new image is selected
            fd.append('Image', this.Main_Image, this.Main_Image.name);
          }

            // Show a warning message before updating the brand
            this.sweetAlertService.warning("Are you sure?", "Do you want to update this product?")
            .then((willUpdate) => {
              if (willUpdate) {

                this.slidermainService.UpdateSiderMain(fd).subscribe(data => {
                   // Show a success message after the product has been updated
                   this.sweetAlertService.success("Success", "The product has been successfully Updatedd")

                 }, ex => {
                  this.sweetAlertService.error("Errors ! ", "There's something wrong with data entry!")

                });

              }

            })
          }

        }
      });
   }
   EditSettingForm(){
    this.EditLogo =this.fb.group({
      logo:[null, Validators.required],
      Active: [null,Validators.required],
      Description:[null,Validators.required],
      Button:[null,Validators.required],
      Name: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],

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
  get _Name() {
    return this.EditMainForm.controls['Name'] as FormGroup;
}
get _Description(){
  return this.EditMainForm.controls['Description'] as FormGroup;
}
get _isActive(){
  return this.EditMainForm.controls['Active'] as FormGroup;
}
get _Button(){
  return this.EditMainForm.controls['Button'] as FormGroup;

}
closeModal() {
  const modal = document.getElementById('mainSliderModal');
 modal?.classList.remove('show');
 modal?.setAttribute('style', 'display: none; padding-right: 0;');
 const modalBackdrop = document.querySelector('.modal-backdrop');
 modalBackdrop?.parentNode?.removeChild(modalBackdrop);
}



openModalSubSlider(id: number) {
  this.siderSubService.GetByIdModal(id) // pass id to the method
    .subscribe(response => {
      this.getAllSubSlider = response;
      response.id=id;
      console.log(id); // this should now output the value of id
    });
}

}

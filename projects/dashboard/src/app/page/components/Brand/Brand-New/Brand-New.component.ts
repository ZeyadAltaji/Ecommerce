import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';

@Component({
  selector: 'app-Brand-New',
  templateUrl: './Brand-New.component.html',
  styleUrls: ['./Brand-New.component.css']
})
export class BrandNewComponent implements OnInit {
  NewBrandForm!:FormGroup;
  Brand=new Brands;
  Image = { name: '', image: null };
  formData: FormData = new FormData();
  @ViewChild('imageInput') imageInput?: ElementRef;


  constructor( private fb: FormBuilder,private router: Router,
    private brandsService:BrandsService,
    private sweetAlertService :SweetAlertService
    ) {    this.createForm();
    }


    createForm() {
      this.NewBrandForm = this.fb.group({
        name: ['', Validators.required],
        Image: [null, Validators.required]
      });
    }
    ngOnInit():void {
      this.NewBrandForm = this.fb.group({
        NameBrand: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        Image: [null]
      });
    }
    OnSubmit() {
      this.MapBrands();

      this.brandsService.AddBrands(this.formData).subscribe(
          (data) => {
              this.sweetAlertService.success("Success", "Brand added successfully.");
              this.router.navigate(['/Brand']);
          },
          (error) => {
              console.log(error);
          }
      )
  }
    AddNewBrandForm() {
      this.NewBrandForm = this.fb.group({
        NameBrand: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
        Image: new FormControl(null)

      });
    }
    get _NameBrand() {
      return this.NewBrandForm.controls['NameBrand'] as FormGroup;
    }
    get iamgebr() {
      return this.NewBrandForm.controls['Image_BrandUrl'] as FormGroup;
    }

    MapBrands() {
      this.formData = new FormData();
      this.formData.append('Name', this._NameBrand.value);
      let imageFile = this.imageInput?.nativeElement.files[0];
      this.formData.append('Image_BrandUrl', imageFile);
    }

    HandleFile(event:any) {
      if (event.target.files !== null && event.target.files.length > 0) {
        const image_userUrl = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgElement = document.getElementById('image') as HTMLImageElement;
          if (imgElement && e.target) {
            imgElement.src = e.target.result as string;
          }
        };
        reader.readAsDataURL(image_userUrl);
      } else {
      }
    }
}

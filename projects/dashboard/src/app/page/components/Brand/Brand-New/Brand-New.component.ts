import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor( private fb: FormBuilder,private router: Router,
    private brandsService:BrandsService,
    private sweetAlertService :SweetAlertService
    ) { }
    ngOnInit() {
      this.AddNewBrandForm();
    }

    OnSubmit(){
      this.MapBrands();
      this.brandsService.AddProducts(this.Brand).subscribe(
        (data) => {
          this.sweetAlertService.success("Success", "brands added successfully.");
          this.router.navigate(['/Brand']);
        },(error)=>{
          console.log(error);
        }
      )
    }

    AddNewBrandForm() {
      this.NewBrandForm = this.fb.group({
        NameBrand: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],

      });
    }
    get _NameBrand() {
      return this.NewBrandForm.controls['NameBrand'] as FormGroup;
    }
    MapBrands() {
      this.Brand.name=this._NameBrand.value;
    }
}

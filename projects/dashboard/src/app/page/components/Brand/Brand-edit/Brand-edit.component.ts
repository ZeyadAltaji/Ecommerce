import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Brands } from 'projects/dashboard/src/app/Classes/Brands';
import { BrandsService } from 'projects/dashboard/src/app/services/Brands.service';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-Brand-edit',
  templateUrl: './Brand-edit.component.html',
  styleUrls: ['./Brand-edit.component.css']
})
export class BrandEditComponent implements OnInit {
  Brand=new Brands();
  EditBrandForm!:FormGroup;
  constructor(private router: Router,private route: ActivatedRoute,private brandsService:BrandsService,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder) { }

    ngOnInit() {
      this.EditBrandsForm();
      this.route.paramMap.subscribe({
        next:(params)=>{
          const id=params.get('id');
          if(id){
            this.brandsService.GetByIDBrands(id).subscribe({
              next:(response)=>{
                this.Brand=response;
              }
            })
          }
        }
      });
    }
    OnSubmit(){
      this.MapCategorise();
      this.sweetAlertService.warning("Are you sure?", "Do you want to update this product?")
      .then((willUpdate) => {
        if (willUpdate) {
          this.brandsService.UpdateBrand(this.Brand).subscribe(
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
    EditBrandsForm(){
      this.EditBrandForm = this.fb.group({
        NameBrand: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
      })

    }
    get _NameBrand() {
      return this.EditBrandForm.controls['NameBrand'] as FormGroup;
    }
    MapCategorise():void{
      this.Brand.name=this._NameBrand.value;
    }

}

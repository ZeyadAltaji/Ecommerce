import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorise } from 'projects/dashboard/src/app/Classes/Categorise';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-Category-edit',
  templateUrl: './Category-edit.component.html',
  styleUrls: ['./Category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  Category=new Categorise();
  EditCategoryForm!:FormGroup;

  constructor(private router: Router,private route: ActivatedRoute, private CategoryService:CategoriseService,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder) { }

  ngOnInit() {
    this.EditCategoriseForm();
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.CategoryService.GetByIDCategorise(id).subscribe({
            next:(response)=>{
              this.Category=response;
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
        this.CategoryService.UpdateCategorise(this.Category).subscribe(
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
  EditCategoriseForm(){
    this.EditCategoryForm = this.fb.group({
      NameCategory: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
    })

  }
  get _NameCategory() {
    return this.EditCategoryForm.controls['NameCategory'] as FormGroup;
  }
  MapCategorise():void{
    this.Category.name=this._NameCategory.value;
  }
}

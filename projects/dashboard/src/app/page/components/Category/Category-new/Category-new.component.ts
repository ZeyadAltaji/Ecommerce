import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorise } from 'projects/dashboard/src/app/Classes/Categorise';
import { SweetAlertService } from 'projects/dashboard/src/app/services/SweetAlert.service';
import { CategoriseService } from 'projects/dashboard/src/app/services/categorise.service';

@Component({
  selector: 'app-Category-new',
  templateUrl: './Category-new.component.html',
  styleUrls: ['./Category-new.component.css']
})
export class CategoryNewComponent implements OnInit {
  NewCategoryForm!:FormGroup;
  Category=new Categorise;

  constructor( private fb: FormBuilder,private router: Router,
    private CategoryService:CategoriseService,
    private sweetAlertService :SweetAlertService
    ) { }

  ngOnInit() {
    this.AddNewCategoriseForm();
  }
  OnSubmit(){
    this.MapCategorise();
    this.CategoryService.AddCategory(this.Category).subscribe(
      (data) => {
        this.sweetAlertService.success("Success", "Category added successfully.");
        this.router.navigate(['/category']);
      },(error)=>{
        console.log(error);
      }
    )
  }
  AddNewCategoriseForm() {
    this.NewCategoryForm = this.fb.group({
      NameCategory: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],

    });
  }
  get _NameCategory() {
    return this.NewCategoryForm.controls['NameCategory'] as FormGroup;
  }
  MapCategorise():void{
    this.Category.name=this._NameCategory.value;
  }
}

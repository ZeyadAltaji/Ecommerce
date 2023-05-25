import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Categorise } from 'projects/dashboard/src/app/Classes/Categorise';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
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
  loggedInUser: any;
  public user :IUser | undefined;
  CategoryName:any;
  CategoryId:any;

  constructor(private router: Router,private route: ActivatedRoute, private CategoryService:CategoriseService,
    private sweetAlertService :SweetAlertService,private fb: FormBuilder,@Inject(CookieService) private cookieServices:CookieService) { }

  ngOnInit() {
    const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.EditCategoriseForm();
    this.CategoryId = this.route.snapshot.params['id']
    this.CategoryService.GetByIDCategorise(this.CategoryId).subscribe({
      next: (response) => {
        debugger
         this.Category = response;

         this.CategoryName = this.EditCategoryForm.controls['NameCategory'].setValue(this.Category.name);
          console.log(this.CategoryName);
        },

    });
  }
  OnSubmit(){
    if (this.loggedInUser && this.loggedInUser.fullUser) {
       const username = this.loggedInUser.fullUser.userName;
      this.MapCategorise(username);
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
  }
  EditCategoriseForm(){
    this.EditCategoryForm = this.fb.group({
      NameCategory: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
    })

  }
  get _NameCategory() {
    return this.EditCategoryForm.controls['NameCategory'] as FormGroup;
  }
  MapCategorise(UserUpdate:string):void{
    this.Category.name=this._NameCategory.value;
    this.Category.userUpdate=UserUpdate;

  }
}

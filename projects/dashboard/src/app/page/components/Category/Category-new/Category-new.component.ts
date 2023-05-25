import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Categorise } from 'projects/dashboard/src/app/Classes/Categorise';
import { IUser } from 'projects/dashboard/src/app/Models/IUser';
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
  loggedInUser: any;
  public user :IUser | undefined;

  constructor( private fb: FormBuilder,private router: Router,
    private CategoryService:CategoriseService,
    private sweetAlertService :SweetAlertService,
    @Inject(CookieService) private cookieServices:CookieService
    ) { }

  ngOnInit() {
     const userString = this.cookieServices.get('loggedInUser');
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    if (this.loggedInUser && this.loggedInUser.fullUser) {
      this.user = this.loggedInUser.fullUser;
    }
    this.AddNewCategoriseForm();
  }
  OnSubmit() {
     if (this.loggedInUser && this.loggedInUser.fullUser) {
      const adminId = this.loggedInUser.fullUser.id; // Get the adminid from the logged-in user
      const username = this.loggedInUser.fullUser.userName; // Get the adminid from the logged-in user
      this.MapCategorise(adminId,username); // Pass the adminid to the MapCategorise method

      this.CategoryService.AddCategory(this.Category).subscribe(
        (data) => {
          this.sweetAlertService.success("Success", "Category added successfully.");
          this.router.navigate(['/category']);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  AddNewCategoriseForm() {
    this.NewCategoryForm = this.fb.group({
      NameCategory: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],

    });
  }
  get _NameCategory() {
    return this.NewCategoryForm.controls['NameCategory'] as FormGroup;
  }
  MapCategorise(adminId: number,UserCreate:string):void{
     this.Category.name=this._NameCategory.value;
    this.Category.Admin_Id = adminId;
    this.Category.userCreate=UserCreate;

  }
}

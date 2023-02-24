import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeesListComponent } from './components/employees/employees-list/employees-list.component';



@NgModule({
  declarations: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],exports:[
    EmployeesListComponent

  ]
})
export class PageModule { }

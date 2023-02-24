import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './home/components/main/main.component';
import { SubPageHomeComponent } from './home/components/sub-page-home/sub-page-home.component';
import { EmployeesListComponent } from './page/components/employees/employees-list/employees-list.component';
import { NewEmployyesComponent } from './page/components/employees/New-employyes/New-employyes.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent ,
      },
      {
        path: '', component: SubPageHomeComponent ,outlet:'secondary'
      }
    ]
  },
  {
    path:'Employyes',
    component:EmployeesListComponent
  },{
    path:'NewEmployyes',
    component:NewEmployyesComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

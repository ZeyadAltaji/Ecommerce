import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/components/home-page/home-page.component';
import { SectionHomeComponent } from './home/components/section-home/section-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: SectionHomeComponent ,
      },
      {
        path: '', component: HomePageComponent ,outlet:'secondary'
      }

    ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

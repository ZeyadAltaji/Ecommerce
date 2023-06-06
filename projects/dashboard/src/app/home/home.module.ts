import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './components/main/main.component';
import { SubPageHomeComponent } from './components/sub-page-home/sub-page-home.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainComponent,
    SubPageHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule
    ],exports:[
    MainComponent,
    SubPageHomeComponent
  ]
})
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


import { ProfilePageComponent } from './Components/Profile-page/Profile-page.component';

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
     ReactiveFormsModule,
     RouterModule
    ],exports:[
      ProfilePageComponent

  ]
})
export class ProfileUserModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfilePageComponent } from './Components/Profile-page/Profile-page.component';
import { EditUserProfileComponent } from './Components/edit-user-profile/edit-user-profile.component';



@NgModule({
  declarations: [
    ProfilePageComponent,
    EditUserProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],exports:[
    ProfilePageComponent,
    EditUserProfileComponent
  ]
})
export class ProfileUserModule { }

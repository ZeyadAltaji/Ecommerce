import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SectionHomeComponent } from './components/section-home/section-home.component';
 import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Privacy_policyComponent } from './privacy_policy/privacy_policy.component';
import { Contact_usComponent } from './components/contact_us/contact_us.component';

@NgModule({
  declarations: [
    SectionHomeComponent,
    HomePageComponent,
Contact_usComponent,
    Privacy_policyComponent,

  ],

  imports: [
    CommonModule,
    CarouselModule,
    ReactiveFormsModule,
    RouterModule
   ],exports:[
    SectionHomeComponent,
    HomePageComponent,
    Privacy_policyComponent,
    Contact_usComponent
   ]
})
export class HomeModule { }

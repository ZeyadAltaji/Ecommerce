import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { SectionHomeComponent } from './components/section-home/section-home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SectionHomeComponent,
    HomePageComponent
  ],

  imports: [
    CommonModule,
    CarouselModule,
    ReactiveFormsModule,
    RouterModule
   ],exports:[
    SectionHomeComponent
  ]
})
export class HomeModule { }

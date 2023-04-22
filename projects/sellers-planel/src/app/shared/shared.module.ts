import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/Navbar/Navbar.component';



@NgModule({
  declarations: [
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports:[
    NavbarComponent,

  ]
})
export class SharedModule { }

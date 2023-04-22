import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/Navbar/Navbar.component';
import { SidebarComponent } from './components/Sidebar/Sidebar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent

  ],
  imports: [
    CommonModule,
    RouterModule

  ],
  exports:[
    NavbarComponent,
    SidebarComponent
  ]
})
export class SharedModule { }

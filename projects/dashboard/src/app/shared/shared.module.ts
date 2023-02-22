import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from './components/main/main.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    MainComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    SidebarComponent,
    NavbarComponent,
    MainComponent
  ]
})
export class SharedModule { }

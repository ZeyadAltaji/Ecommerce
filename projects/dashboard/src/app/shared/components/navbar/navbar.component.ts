import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  menustatus:boolean=false;
  showdropdown: boolean = false;

  // @Output()sidebarToggled=new EventEmitter<boolean>();
  logo: string = "assets/images/logo.png";
  sidebarToggle(){
    // this.menustatus=!this.menustatus;
    // this.sidebarToggled.emit(this.menustatus);
  }
  dropdown() {
    if (this.showdropdown == false) {
      this.showdropdown = true;

    }
    else {
      this.showdropdown = false;
    }
  }
}


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Navbar',
  templateUrl: './Navbar.component.html',
  styleUrls: ['./Navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  menustatus:boolean=false;
  showdropdown: boolean = false;
  ngOnInit() {
  }
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

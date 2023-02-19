import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-producte-selft',
  templateUrl: './single-producte-selft.component.html',
  styleUrls: ['./single-producte-selft.component.css']
})
export class SingleProducteSelftComponent {
  constructor(private router:Router) { }



  gotodelter(){
    this.router.navigate(["/Products-Detail"]);
  }
}

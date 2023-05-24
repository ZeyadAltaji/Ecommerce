import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {


  constructor(public contactUsService:CartItemService) { }

  ngOnInit() {
    this.contactUsService.GetAllCategorise().subscribe(listData=>{
      this.contactUsService.ListOrder=listData;
      console.log(this.contactUsService.ListOrder)
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
   }

}

import { Component, OnInit } from '@angular/core';
import { CartItemService } from 'projects/dashboard/src/app/services/CartItem.service';


@Component({
  selector: 'app-Orders',
  templateUrl: './Orders.component.html',
  styleUrls: ['./Orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(public orderService:CartItemService) { }

  ngOnInit() {
    this.orderService.GetOrdersBydelivery().subscribe(listData=>{
      this.orderService.ListOrder=listData;
      console.log(this.orderService.ListOrder)
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
   }
   updateDelivery(orderId: number) {
    this.orderService.updateOrderStatus(orderId, 'Delivered').subscribe(
      (res) => {
        console.log('Order delivery status updated successfully.',res);

      },
      (error)=>{
        console.error('Error updating order delivery status:', error);

      }
    )
  }

}

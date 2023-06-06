import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsService } from 'projects/dashboard/src/app/services/ContactUs.service';
import { CartItemService } from '../../../services/CartItem.service';
import { IOrder } from '../../../Models/IOrder';
import { AuthenticationService } from 'projects/authentication/src/app/services/authentication.service';
import { IUser } from '../../../Models/IUser';
import { BrandsService } from '../../../services/Brands.service';
import { IBrands } from '../../../Models/IBrands';
import { ISubProducts } from '../../../Models/ISubProducts';
import { SubproductsService } from '../../../services/Subproducts.service';

@Component({
  selector: 'app-sub-page-home',
  templateUrl: './sub-page-home.component.html',
  styleUrls: ['./sub-page-home.component.css'],
})
export class SubPageHomeComponent implements OnInit {
   constructor(public contactUsService:ContactUsService,
    private router:Router,
    public cartItemService:CartItemService,
    public userService:AuthenticationService,
    public brandsService:BrandsService,
    public productsService:SubproductsService,
    ) { }
   maxDisplayedMessage: number = 3;
   unansweredCount: number = 0;
   allorder:number=0;
    allseller:number=0;
    allsellerisActive:number=0;
    allcustomeActive:number=0;

    allCustomer:number=0;
    alldeliveryActive:number=0;

    alldelivery:number=0;
    allBrands:number=0;
allprouduts:number=0;
  ngOnInit() {
    this.contactUsService.GetAllMessages().subscribe(listData=>{
      this.contactUsService.listContactUs=listData;
      console.log(this.contactUsService.listContactUs)
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
  // interval(1000).subscribe(() => {
    this.getorder();
    this.getuser();
    this.getbrands();
    this.getProduts();
    // });
  }
  showMore(){
    this.router.navigate(['/Messages-list/']);

  }
  getorder(){

    this.cartItemService.GetAllOrder().subscribe((messages: IOrder[]) => {
      this.unansweredCount = messages.filter(message => message.orderStatus !== 'Delivered').length;
      this.allorder= messages.filter(message => message.orderStatus !== 'Delivered' && message.orderStatus=='' ).length;
    });
  }
  getuser(){
    this.userService.GetAllUser().subscribe((messages: IUser[]) => {
      this.allseller = messages.filter(message => message.role == 2).length;
      this.allsellerisActive = messages.filter(message => message.role == 2 && message.isActive===true).length;

      this.allCustomer= messages.filter(message => message.role === 3).length;
      this.allcustomeActive = messages.filter(message => message.role == 3 && message.isActive===true).length;
      this.alldelivery= messages.filter(message => message.role === 4).length;
      this.alldeliveryActive = messages.filter(message => message.role == 4 && message.isActive===true).length;
    });
  }
  getbrands(){
    this.brandsService.GetAllBrands().subscribe((messages: IBrands[]) => {
      this.allBrands = messages.filter(message => message.isActive ===true).length;
     });
  }
  getProduts(){
    this.productsService.GetAllProducts().subscribe((messages: ISubProducts[]) => {
      this.allprouduts = messages.filter(message => message.isActive ===true).length;
     });
  }
}

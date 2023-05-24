import { Component, OnInit } from '@angular/core';
import { ContactUsService } from 'projects/dashboard/src/app/services/ContactUs.service';

@Component({
  selector: 'app-Messages-list',
  templateUrl: './Messages-list.component.html',
  styleUrls: ['./Messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  constructor(public contactUsService:ContactUsService) { }

  ngOnInit() {
    this.contactUsService.GetAllMessages().subscribe(listData=>{
      this.contactUsService.listContactUs=listData;
      console.log(this.contactUsService.listContactUs)
     },
    error => {
      console.log('httperror:');
      console.log(error);
    });
   }

}

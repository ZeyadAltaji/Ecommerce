import { Component, OnInit } from '@angular/core';
import { ContactUs } from 'projects/dashboard/src/app/Classes/ContactUs';
import { ContactUsService } from 'projects/dashboard/src/app/services/ContactUs.service';

@Component({
  selector: 'app-Messages-list',
  templateUrl: './Messages-list.component.html',
  styleUrls: ['./Messages-list.component.css']
})
export class MessagesListComponent implements OnInit {

  constructor(public contactUsService:ContactUsService) { }
  selectedMessage: ContactUs|undefined;

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
   openModal(id: number) {
    this.contactUsService.GetByIdModal(id)
      .subscribe(response => {
        this.selectedMessage = response;
 
        const modal = document.getElementById('DataUserModal');
        modal?.classList.add('show');
        modal?.setAttribute('style', 'display: block; padding-right: 17px;');
        const modalBackdrop = document.createElement('div');
        modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
        document.body.appendChild(modalBackdrop);
        this.updateMessageShowValue(id);

      });
  }
  updateMessageShowValue(id: number) {
    const formData = new FormData();
    formData.append('show', '0'); // Set the value to 0
  
    this.contactUsService.UpdateMessage(id.toString(), formData).subscribe(() => {
      // Update successful
    }, error => {
      // Handle error
    });
  }
  
  closeModal() {
    const modal = document.getElementById('DataUserModal');
   modal?.classList.remove('show');
   modal?.setAttribute('style', 'display: none; padding-right: 0;');
   const modalBackdrop = document.querySelector('.modal-backdrop');
   modalBackdrop?.parentNode?.removeChild(modalBackdrop);
 }

}

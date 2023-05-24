import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactUs } from 'projects/dashboard/src/app/Classes/ContactUs';
import { ContactUsService } from 'projects/dashboard/src/app/services/ContactUs.service';

@Component({
  selector: 'app-contact_us',
  templateUrl: './contact_us.component.html',
  styleUrls: ['./contact_us.component.css']
})
export class Contact_usComponent implements OnInit {

  contact_us!:FormGroup;
  Category=new ContactUs;

  constructor(private fb: FormBuilder,private contactUsService:ContactUsService) { }

  ngOnInit() {
    this.AddNewMessages();
  }
  OnSubmit() {
       debugger
       const formData = new FormData();
       formData.append('Name', this.FullName.value);
       formData.append('Email', this._Email.value);
       formData.append('Subject', this.Subject.value);
       formData.append('Message', this.Message.value);

       this.contactUsService.AddMessages(formData).subscribe(
        (response) => {
          debugger
          // Handle successful response
          console.log('Message added successfully:', response);
        },
        (error) => {
          // Handle error
          console.error('Error adding message:', error);
        }
      );

  }
  get FullName() {
    return this.contact_us.get('FullName') as FormGroup;
  }
  get _Email() {
    return this.contact_us.get('Email') as FormGroup;
  }
  get Subject() {
    return this.contact_us.get('Subject') as FormGroup;
  }
  get Message() {
    return this.contact_us.get('Message') as FormGroup;
  }
  MapCategorise():void{
    this.Category.name=this.FullName.value;

   this.Category.email =this._Email.value;
   this.Category.subject=this.Subject.value;
   this.Category.message =this.Message.value;
 }
  AddNewMessages() {
    this.contact_us = this.fb.group({
      FullName: [null, [Validators.required, Validators.pattern('[a-zA-Z]{1,10}')]],
       Email: [null, [Validators.email, Validators.required, Validators.pattern('[^@]+@[^@]+.[a-zA-Z]{2,10}')]],
       Subject: [null, Validators.required],
       Message: [null, Validators.required],

    })
  }

}

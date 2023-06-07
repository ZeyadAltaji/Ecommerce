import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  isMessageSent: boolean = false;

  constructor(
    @Inject(FormBuilder) private fb:FormBuilder
  ,private contactUsService:ContactUsService,
  private router:Router) { }

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
          this.isMessageSent = true;
          this.hideModalAfterDelay();

          // Handle successful response
          console.log('Message added successfully:', response);


        },
        (error) => {
          // Handle error
          console.error('Error adding message:', error);
        }
      );

  }
  hideModalAfterDelay() {
    setTimeout(() => {
      this.isMessageSent = false;
    }, 10000); // 10000 milliseconds = 10 seconds
  }
  get FullName() {
    return this.contact_us.get('FullName') as FormControl;
  }
  get _Email() {
    return this.contact_us.get('Email') as FormControl;
  }
  get Subject() {
    return this.contact_us.get('Subject') as FormControl;
  }
  get Message() {
    return this.contact_us.get('Message') as FormControl;
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
  gotohome(){
    this.router.navigate(['/']);

  }
}

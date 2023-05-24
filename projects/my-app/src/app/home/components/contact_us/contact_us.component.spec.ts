/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Contact_usComponent } from './contact_us.component';

describe('Contact_usComponent', () => {
  let component: Contact_usComponent;
  let fixture: ComponentFixture<Contact_usComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Contact_usComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Contact_usComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

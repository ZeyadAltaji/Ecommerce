/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSubProductsComponent } from './EditSubProducts.component';

describe('EditSubProductsComponent', () => {
  let component: EditSubProductsComponent;
  let fixture: ComponentFixture<EditSubProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSubProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

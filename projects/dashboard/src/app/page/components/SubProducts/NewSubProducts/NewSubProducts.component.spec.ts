/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewSubProductsComponent } from './NewSubProducts.component';

describe('NewSubProductsComponent', () => {
  let component: NewSubProductsComponent;
  let fixture: ComponentFixture<NewSubProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

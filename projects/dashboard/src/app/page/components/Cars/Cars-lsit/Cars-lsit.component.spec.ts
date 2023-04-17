/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CarsLsitComponent } from './Cars-lsit.component';

describe('CarsLsitComponent', () => {
  let component: CarsLsitComponent;
  let fixture: ComponentFixture<CarsLsitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarsLsitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsLsitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

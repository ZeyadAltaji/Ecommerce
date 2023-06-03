/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ShopByComponent } from './ShopBy.component';

describe('ShopByComponent', () => {
  let component: ShopByComponent;
  let fixture: ComponentFixture<ShopByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

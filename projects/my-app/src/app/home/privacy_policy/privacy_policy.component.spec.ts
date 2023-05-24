/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Privacy_policyComponent } from './privacy_policy.component';

describe('Privacy_policyComponent', () => {
  let component: Privacy_policyComponent;
  let fixture: ComponentFixture<Privacy_policyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Privacy_policyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Privacy_policyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

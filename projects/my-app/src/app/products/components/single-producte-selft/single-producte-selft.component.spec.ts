import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProducteSelftComponent } from './single-producte-selft.component';

describe('SingleProducteSelftComponent', () => {
  let component: SingleProducteSelftComponent;
  let fixture: ComponentFixture<SingleProducteSelftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProducteSelftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleProducteSelftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

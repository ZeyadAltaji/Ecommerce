/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoriseService } from './categorise.service';

describe('Service: Categorise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoriseService]
    });
  });

  it('should ...', inject([CategoriseService], (service: CategoriseService) => {
    expect(service).toBeTruthy();
  }));
});

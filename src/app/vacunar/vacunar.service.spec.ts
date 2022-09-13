import { TestBed } from '@angular/core/testing';

import { VacunarService } from './vacunar.service';

describe('VacunarService', () => {
  let service: VacunarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VacunarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

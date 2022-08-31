import { TestBed } from '@angular/core/testing';

import { ServiciolService } from './serviciol.service';

describe('ServiciolService', () => {
  let service: ServiciolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

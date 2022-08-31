import { TestBed } from '@angular/core/testing';

import { RegistrarvService } from './registrarv.service';

describe('RegistrarvService', () => {
  let service: RegistrarvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrarvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

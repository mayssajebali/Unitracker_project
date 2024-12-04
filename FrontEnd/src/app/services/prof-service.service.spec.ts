import { TestBed } from '@angular/core/testing';

import { ProfServiceService } from './prof-service.service';

describe('ProfServiceService', () => {
  let service: ProfServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

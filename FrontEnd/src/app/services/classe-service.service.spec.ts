import { TestBed } from '@angular/core/testing';

import { ClasseServiceService } from './classe-service.service';

describe('ClasseServiceService', () => {
  let service: ClasseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

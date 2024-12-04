import { TestBed } from '@angular/core/testing';

import { EtudiantServiceService } from './etudiant-service.service';

describe('EtudiantServiceService', () => {
  let service: EtudiantServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtudiantServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

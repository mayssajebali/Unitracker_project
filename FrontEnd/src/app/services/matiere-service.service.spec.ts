import { TestBed } from '@angular/core/testing';

import { MatiereServiceService } from './matiere-service.service';

describe('MatiereServiceService', () => {
  let service: MatiereServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatiereServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

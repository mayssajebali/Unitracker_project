import { TestBed } from '@angular/core/testing';

import { CreerTacheService } from './creer-tache.service';

describe('CreerTacheService', () => {
  let service: CreerTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreerTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

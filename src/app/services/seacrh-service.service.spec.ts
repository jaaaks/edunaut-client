import { TestBed } from '@angular/core/testing';

import { SeacrhServiceService } from './seacrh-service.service';

describe('SeacrhServiceService', () => {
  let service: SeacrhServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeacrhServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

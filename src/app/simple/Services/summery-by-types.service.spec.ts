import { TestBed } from '@angular/core/testing';

import { SummeryByTypesService } from './summery-by-types.service';

describe('SummeryByTypesService', () => {
  let service: SummeryByTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummeryByTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

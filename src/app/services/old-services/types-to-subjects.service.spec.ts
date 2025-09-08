import { TestBed } from '@angular/core/testing';

import { TypesToSubjectsService } from './types-to-subjects.service';

describe('TypesToSubjectsService', () => {
  let service: TypesToSubjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesToSubjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

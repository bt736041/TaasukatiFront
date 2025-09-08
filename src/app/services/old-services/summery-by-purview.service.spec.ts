import { TestBed } from '@angular/core/testing';

import { SummeryByPurviewService } from './summery-by-purview.service';

describe('SummeryByPurviewService', () => {
  let service: SummeryByPurviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SummeryByPurviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

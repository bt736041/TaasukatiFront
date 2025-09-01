import { TestBed } from '@angular/core/testing';

import { PurviewService } from './purview.service';

describe('PurviewService', () => {
  let service: PurviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

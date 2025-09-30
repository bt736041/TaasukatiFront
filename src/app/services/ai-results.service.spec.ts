import { TestBed } from '@angular/core/testing';

import { AiResultsService } from './ai-results.service';

describe('AiResultsService', () => {
  let service: AiResultsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiResultsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { TestFlowService } from './test-flow.service';

describe('TestFlowService', () => {
  let service: TestFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

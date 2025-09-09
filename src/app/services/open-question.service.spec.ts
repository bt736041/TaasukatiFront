import { TestBed } from '@angular/core/testing';

import { OpenQuestionService } from './open-question.service';

describe('OpenQuestionService', () => {
  let service: OpenQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CloseQuestionService } from './close-question.service';

describe('CloseQuestionService', () => {
  let service: CloseQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CloseQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

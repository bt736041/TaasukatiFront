import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedQuestionsComponent } from './closed-questions.component';

describe('ClosedQuestionsComponent', () => {
  let component: ClosedQuestionsComponent;
  let fixture: ComponentFixture<ClosedQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClosedQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosedQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

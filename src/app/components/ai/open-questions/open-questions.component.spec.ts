import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenQuestionsComponent } from './open-questions.component';

describe('OpenQuestionsComponent', () => {
  let component: OpenQuestionsComponent;
  let fixture: ComponentFixture<OpenQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
